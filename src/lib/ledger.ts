import { createServerFn } from "@tanstack/react-start";
import { products } from "@/lib/catalog";
import { corpus120, dhContracts, dfrlResults, dfrlRun } from "@/lib/dfrl";
import { daisyNodes } from "@/lib/nodes";
import { adapters } from "@/lib/infra";

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const existing = await sql<{ n: number }>`select count(*)::int as n from paradoxes`;
  const already = existing[0]?.n ?? 0;
  if (already >= 120) {
    seeded = true;
    return;
  }

  const now = Date.now();
  const corpus = [...dfrlResults, ...dhContracts];
  for (const p of corpus) {
    await sql`
      insert into paradoxes (
        id, code, name, domain, category, classification, scope,
        formal_invariant, z3_smt_assertion, verification_status, created_at
      ) values (
        ${p.code}, ${p.code}, ${p.name}, ${p.domain}, ${p.category},
        ${p.classification}, ${p.scope}, ${p.invariant ?? ""},
        ${""}, ${p.result}, ${now}
      ) on conflict (id) do nothing
    `;
  }

  for (const n of daisyNodes) {
    await sql`
      insert into node_registry (
        id, node_code, node_name, subsystem, status, capabilities_json, created_at
      ) values (
        ${n.id}, ${n.id}, ${n.name}, ${n.category},
        ${n.mode === "EXTERNAL_PROVIDER_REQUIRED" ? "EXTERNAL_PROVIDER_REQUIRED" : "ACTIVE"},
        ${JSON.stringify({ mode: n.mode, purpose: n.purpose })},
        ${now}
      ) on conflict (id) do nothing
    `;
  }

  for (const p of products) {
    await sql`
      insert into solutions (
        id, code, title, domain, implementation_source, implementation_hash,
        verification_status, proof_bundle_id, performance_boost_percent,
        reversibility_guaranteed, status, created_at
      ) values (
        ${p.sku}, ${p.solutionId}, ${p.title}, ${p.category},
        ${p.blurb}, ${p.proofBundle}, ${p.evidence}, ${p.proofBundle},
        ${p.evidence === "VERIFIED" ? 12.5 : 0},
        ${p.reversible ? 1 : 0},
        ${p.evidence === "VERIFIED" ? "PUBLISHABLE" : "BLOCKED"},
        ${now}
      ) on conflict (id) do nothing
    `;
    await sql`
      insert into offers (
        id, solution_id, proof_bundle_id, title, description, cost_basis_cents,
        verification_complexity_factor, risk_class, price_cents, sla_tier,
        published, verification_status, publication_blocked_reason, created_at
      ) values (
        ${"off-" + p.sku}, ${p.sku}, ${p.proofBundle}, ${p.title}, ${p.short},
        ${Math.round(p.priceCents * 0.42)}, ${1.4}, ${p.evidence === "VERIFIED" ? "BOUNDED" : "OPEN"},
        ${p.priceCents}, ${p.sla}, ${p.evidence === "VERIFIED" ? 1 : 0},
        ${p.evidence},
        ${p.evidence === "VERIFIED" ? null : "Fail-closed: unverified goods cannot publish."},
        ${now}
      ) on conflict (id) do nothing
    `;
  }

  for (const a of adapters) {
    await sql`
      insert into adapter_status (
        id, adapter_name, provider, environment, status, last_error, checked_at
      ) values (
        ${a.node + "-" + a.provider}, ${a.name}, ${a.provider}, ${"preview"},
        ${a.status}, ${null}, ${now}
      ) on conflict (id) do nothing
    `;
  }

  await sql`
    insert into verification_runs (
      id, scope, environment, commit_sha, status, gates_passed, gates_total,
      root_hash, started_at, completed_at
    ) values (
      ${dfrlRun.executionId}, ${"DFRL-88"}, ${"local"}, ${null},
      ${dfrlRun.overall}, ${dfrlRun.unsat}, ${88}, ${dfrlRun.root},
      ${now - 1280}, ${now}
    ) on conflict (id) do nothing
  `;
  await sql`
    insert into verification_runs (
      id, scope, environment, commit_sha, status, gates_passed, gates_total,
      root_hash, started_at, completed_at
    ) values (
      ${corpus120.gate}, ${"CORPUS-120"}, ${"local"}, ${corpus120.commit},
      ${corpus120.status}, ${corpus120.unsat}, ${120}, ${corpus120.root},
      ${now - 2000}, ${now}
    ) on conflict (id) do nothing
  `;

  seeded = true;
}

export type LedgerSnapshot = {
  paradoxes: number;
  nodes: number;
  offers: number;
  published: number;
  auditHeight: number;
  lastHash: string;
  db: "neon" | "pglite";
};

export const getLedgerSnapshot = createServerFn({ method: "GET" }).handler(
  async () => {
    await ensureSeeded();
    const { getSql, dbSource } = await import("@/lib/db");
    const sql = await getSql();
    const paradoxes = await sql<{ n: number }>`select count(*)::int as n from paradoxes`;
    const nodes = await sql<{ n: number }>`select count(*)::int as n from node_registry`;
    const offers = await sql<{ n: number }>`select count(*)::int as n from offers`;
    const published = await sql<{ n: number }>`select count(*)::int as n from offers where published = 1`;
    const audit = await sql<{ n: number; h: string | null }>`
      select count(*)::int as n, max(record_hash) as h from audit_records
    `;
    return {
      paradoxes: paradoxes[0]?.n ?? 0,
      nodes: nodes[0]?.n ?? 0,
      offers: offers[0]?.n ?? 0,
      published: published[0]?.n ?? 0,
      auditHeight: audit[0]?.n ?? 0,
      lastHash: audit[0]?.h ?? dfrlRun.root,
      db: dbSource,
    } satisfies LedgerSnapshot;
  },
);

export const recordAudit = createServerFn({ method: "POST" })
  .validator((input: { action: string; target: string; targetId: string; payload: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeeded();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const prev = await sql<{ n: number; h: string | null }>`
      select count(*)::int as n, coalesce(max(record_hash), ${"GENESIS"}) as h from audit_records
    `;
    const index = (prev[0]?.n ?? 0) + 1;
    const previous = prev[0]?.h ?? "GENESIS";
    const payloadHash = await sha256(data.payload);
    const recordHash = await sha256(
      `${index}|${data.action}|${data.targetId}|${payloadHash}|${previous}`,
    );
    const id = `aud_${index.toString().padStart(6, "0")}`;
    const now = Date.now();
    await sql`
      insert into audit_records (
        id, index_num, actor, action, target_entity, target_id,
        payload_json, payload_hash, previous_hash, record_hash, created_at
      ) values (
        ${id}, ${index}, ${"HUMAN_ROOT"}, ${data.action}, ${data.target},
        ${data.targetId}, ${data.payload}, ${payloadHash}, ${previous},
        ${recordHash}, ${now}
      )
    `;
    return { id, index, recordHash, previous };
  });

export const persistOrder = createServerFn({ method: "POST" })
  .validator(
    (input: {
      id: string;
      sku: string;
      proof: string;
      priceCents: number;
      status: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    await ensureSeeded();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const now = Date.now();
    await sql`
      insert into orders (
        id, offer_id, solution_id, proof_bundle_id, price_cents, status,
        payment_id, deployment_id, created_at, updated_at
      ) values (
        ${data.id}, ${"off-" + data.sku}, ${data.sku}, ${data.proof},
        ${data.priceCents}, ${data.status}, ${null}, ${null}, ${now}, ${now}
      ) on conflict (id) do update set status = ${data.status}, updated_at = ${now}
    `;
    return { ok: true as const };
  });
