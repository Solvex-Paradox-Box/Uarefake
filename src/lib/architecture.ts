import { products, type Product } from "@/lib/catalog";
import { formalCorpus, type FormalRow } from "@/lib/dfrl";
import { daisyNodes, type DaisyNode } from "@/lib/nodes";

/** 120 ≠ 46 ≠ 54. Different dimensions. Do not conflate. */
export const dimensions = {
  paradoxes: { value: 120, of: "88 DFRL + 32 DH formal contracts", recovered: 120 },
  gates: {
    target: 46,
    demonstrated: 15,
    unrecovered: 31,
    of: "Current verification-gate architecture. Recovered demonstration is the 15-gate AGATE pipeline.",
  },
  nodes: { value: 54, of: "Logical Daisy brain topology — not 54 physical machines" },
} as const;

export type GateStatus =
  | "PASSED"
  | "BLOCKED"
  | "EXTERNAL_PROVIDER_REQUIRED"
  | "CONFIGURATION_REQUIRED"
  | "UNRECOVERED";

export type GateRow = {
  id: string;
  name: string;
  family: "AGATE_15" | "SANDBOX_7" | "TARGET_46";
  category: string;
  status: GateStatus;
  scope: string;
  note: string;
};

/** Recovered Project AGATE 15-gate pipeline (GATE-00 … GATE-14). */
export const agateGates: GateRow[] = [
  { id: "GATE-00", name: "Repository Integrity & Baseline Provenance", family: "AGATE_15", category: "artifact integrity", status: "PASSED", scope: "LOCAL", note: "Commit SHA bound when a working copy exists." },
  { id: "GATE-01", name: "Dependency Preflight Layer", family: "AGATE_15", category: "schema", status: "PASSED", scope: "LOCAL", note: "Required packages present before verification." },
  { id: "GATE-02", name: "Secret & Configuration Preflight", family: "AGATE_15", category: "security", status: "PASSED", scope: "LOCAL", note: "Missing credentials fail closed. Never simulated." },
  { id: "GATE-03", name: "Execution Environment Selection", family: "AGATE_15", category: "deployment", status: "PASSED", scope: "LOCAL", note: "Production claims require explicit opt-in." },
  { id: "GATE-04", name: "Build & TypeScript Static Verification", family: "AGATE_15", category: "formal validity", status: "PASSED", scope: "LOCAL", note: "Typecheck must be clean." },
  { id: "GATE-05", name: "Unit & Enterprise Invariant Test Suite", family: "AGATE_15", category: "proof", status: "PASSED", scope: "LOCAL", note: "30/30 enterprise invariants on the recovered run." },
  { id: "GATE-06", name: "DFRL 88-Operator Z3 SMT Formal Verification", family: "AGATE_15", category: "proof", status: "PASSED", scope: "MODEL", note: "88/88 UNSAT on the recorded Z3 WASM run." },
  { id: "GATE-07", name: "Cleanroom Deterministic Replay Verification", family: "AGATE_15", category: "replay", status: "PASSED", scope: "MODEL", note: "88 independent reconstructions. Bitrot divergence 0." },
  { id: "GATE-08", name: "SMT Mutation, SHA-256 Tamper & Fail-Closed Tests", family: "AGATE_15", category: "mutation", status: "PASSED", scope: "LOCAL", note: "Mutation detected. Tamper alarm triggered. Fail-closed held." },
  { id: "GATE-09", name: "Daisy 54-Node Architecture CUJ Execution Coverage", family: "AGATE_15", category: "execution", status: "PASSED", scope: "LOCAL", note: "54 registered, instantiated, reachable, executed." },
  { id: "GATE-10", name: "Multi-Tenant Relational & Merkle Chain Persistence", family: "AGATE_15", category: "tenant isolation", status: "PASSED", scope: "LOCAL", note: "Local persistence passed. Neon is a separate provider." },
  { id: "GATE-11", name: "External Provider Gateways (Neon, PayPal)", family: "AGATE_15", category: "external dependencies", status: "EXTERNAL_PROVIDER_REQUIRED", scope: "LOCAL", note: "Stripe prohibited. PayPal is the only fiat rail. Preview has no live credentials." },
  { id: "GATE-12", name: "End-to-End Lifecycle Execution", family: "AGATE_15", category: "execution", status: "PASSED", scope: "LOCAL", note: "21-stage candidate pipeline + order transitions on the recovered run." },
  { id: "GATE-13", name: "Evidence Generation & Artifact Packaging", family: "AGATE_15", category: "telemetry", status: "PASSED", scope: "LOCAL", note: "Proof dossiers and merkle receipts packaged." },
  { id: "GATE-14", name: "Final Truth-Boundary Audit & Production Gate", family: "AGATE_15", category: "deployment", status: "BLOCKED", scope: "LOCAL", note: "BLOCKED_MISSING_EXTERNAL_CREDENTIALS. Local verified ≠ production." },
];

/** Recovered sandbox gates. Distinct from AGATE-15. */
export const sandboxGates: GateRow[] = [
  { id: "GATE-SB-01", name: "Baseline Freeze & Integrity", family: "SANDBOX_7", category: "artifact integrity", status: "PASSED", scope: "LOCAL", note: "Prior LOCAL/MODEL evidence frozen." },
  { id: "GATE-SB-02", name: "Secret & Configuration Preflight", family: "SANDBOX_7", category: "security", status: "PASSED", scope: "SANDBOX", note: "Zero client-bundle leaks on the recovered run." },
  { id: "GATE-SB-03", name: "PayPal Live Sandbox & Fail-Closed", family: "SANDBOX_7", category: "external dependencies", status: "CONFIGURATION_REQUIRED", scope: "LOCAL", note: "Invalid creds 401. Missing creds fail closed. Success is not simulated." },
  { id: "GATE-SB-04", name: "Sovereign Settlement Escrow (DN-38)", family: "SANDBOX_7", category: "authorization", status: "PASSED", scope: "LOCAL", note: "Native cryptographic escrow with timelock invariants." },
  { id: "GATE-SB-05", name: "External Failure Injections", family: "SANDBOX_7", category: "failure", status: "PASSED", scope: "LOCAL", note: "Missing/invalid provider paths fail closed." },
  { id: "GATE-SB-06", name: "Sandbox End-to-End Lifecycle", family: "SANDBOX_7", category: "execution", status: "PASSED", scope: "LOCAL", note: "21-stage pipeline and 5 order transitions with merkle append." },
  { id: "GATE-SB-07", name: "Production Boundary Interlock", family: "SANDBOX_7", category: "deployment", status: "BLOCKED", scope: "PRODUCTION", note: "Zero-mock policy blocks promotion." },
];

/** Remaining 46-gate slots. Names not recovered — do not invent. */
export const unrecoveredGates: GateRow[] = Array.from({ length: 31 }, (_, i) => ({
  id: `GATE-T-${String(i + 16).padStart(2, "0")}`,
  name: "UNRECOVERED — DO NOT INVENT",
  family: "TARGET_46" as const,
  category: (
    [
      "identity",
      "schema",
      "formal validity",
      "proof",
      "replay",
      "mutation",
      "failure",
      "authorization",
      "execution",
      "reversibility",
      "tenant isolation",
      "security",
      "external dependencies",
      "deployment",
      "telemetry",
      "artifact integrity",
    ] as const
  )[i % 16],
  status: "UNRECOVERED" as const,
  scope: "UNRECOVERED",
  note: "46-gate architecture is the current target. Individual names were not recovered from the authoritative registry.",
}));

export const allGates: GateRow[] = [...agateGates, ...sandboxGates, ...unrecoveredGates];

/** Historical 21-stage SolutionPipeline. Distinct from the 46-gate architecture. */
export const pipeline21 = [
  "Ingestion & source normalization",
  "Paradox domain classification",
  "Invariant specification extraction",
  "Structural self-reference guard",
  "Boundary mapping",
  "Sandbox authorization check",
  "Static TypeScript compilation",
  "Memory safety inspection",
  "Non-termination inspection",
  "Ranking-function inspection",
  "Candidate-specific SMT proof",
  "Proof certificate generation",
  "Hermetic test execution",
  "Independent oracle attestation",
  "Cleanroom replay",
  "Pricing calculation",
  "Customer evidence projection",
  "Audit ledger append",
  "Tenant partition verification",
  "Checkpoint creation",
  "Marketplace eligibility decision",
] as const;

export const mmtaiTracks = [
  { id: "A", name: "Cognition", role: "Daisy reasons, formalizes, proposes. Never inherits execution." },
  { id: "B", name: "Simulation", role: "Candidate behavior in a sandbox. Not production state." },
  { id: "C", name: "Verification", role: "DFRL, replay, mutation, fail-closed. Independent of generation." },
  { id: "D", name: "Construction", role: "JIT build after gates. Customer-specific artifact." },
  { id: "E", name: "Authorization", role: "NOPOT, tenant, entitlement. Capability is not permission." },
  { id: "F", name: "Execution", role: "Track of last resort. Observable. Reversible or refused." },
  { id: "G", name: "Telemetry", role: "Evidence of what happened. Not a second brain." },
  { id: "H", name: "Recovery", role: "Rollback, compensate, burn. The system does nothing it cannot reverse." },
] as const;

export const dualKernels = [
  { id: "A", name: "Kernel A", role: "Candidate execution, simulation, construction." },
  { id: "B", name: "Kernel B", role: "Independent, comparative, replay, challenge." },
] as const;

export const nopotLifecycle = [
  { id: "CREATE", hint: "Mint a validity cell. Not yet registered." },
  { id: "REGISTER", hint: "Bind tenant, node, proof, timestamp, author, HMAC." },
  { id: "VALIDATE", hint: "Runtime checks. Malformed fails closed." },
  { id: "USE", hint: "Authorize one scoped operation." },
  { id: "EXPIRE", hint: "Time-bound. Expired is not valid." },
  { id: "BURN", hint: "Destroyed. A burned cell never authorizes again." },
] as const;

export const licenseLifecycle = [
  "CREATED",
  "ENTITLED",
  "AUTHORIZED",
  "ACTIVE",
  "EXPIRED",
  "REVOKED",
  "BURNED",
] as const;

export const factoryLoop = [
  { id: "PROBLEM", label: "Problem" },
  { id: "DISCOVERY", label: "Discovery" },
  { id: "INTAKE", label: "Intake" },
  { id: "DAISY", label: "Daisy" },
  { id: "PARADOX", label: "Paradox" },
  { id: "TETHER", label: "Tether" },
  { id: "SYNTHESIZE", label: "Synthesize" },
  { id: "DFRL", label: "DFRL" },
  { id: "DUAL", label: "Dual kernel" },
  { id: "MMTAI", label: "MMTAI" },
  { id: "JIT", label: "JIT build" },
  { id: "BOX", label: "Crystal box" },
  { id: "NOPOT", label: "NOPOT" },
  { id: "DISTRIBUTE", label: "Distribute" },
  { id: "DEPLOY", label: "Deploy" },
  { id: "OBSERVE", label: "Observe" },
  { id: "LEARN", label: "Learn" },
  { id: "RECUR", label: "Recur" },
] as const;

export const solvexContract = [
  { id: "R1", title: "No claim without appropriate evidence." },
  { id: "R2", title: "No verified status without verification." },
  { id: "R3", title: "No execution without authorization." },
  { id: "R4", title: "No authority merely because a capability exists." },
  { id: "R5", title: "No production promotion merely because a candidate was generated." },
  { id: "R6", title: "No simulated external success presented as real external success." },
  { id: "R7", title: "No burned or expired authorization accepted at runtime." },
  { id: "R8", title: "No protected artifact distributed without entitlement and authorization." },
  { id: "R9", title: "No autonomous operation without an appropriate recovery/reversal strategy." },
  { id: "R10", title: "No failure silently converted into success." },
  { id: "R11", title: "No second brain created outside the authoritative control plane." },
  { id: "R12", title: "No unverified learning promoted into verified knowledge." },
] as const;

export type TetherHit = {
  paradoxes: FormalRow[];
  nodes: DaisyNode[];
  products: Product[];
  path: string[];
  note: string;
};

const STOP = new Set([
  "the", "and", "for", "that", "with", "this", "from", "have", "not", "are",
  "was", "but", "what", "when", "how", "can", "into", "our", "any", "all",
]);

function tokens(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

export function matchProblem(statement: string): TetherHit {
  const words = tokens(statement);
  if (words.length === 0) {
    return {
      paradoxes: [],
      nodes: [],
      products: [],
      path: ["PROBLEM"],
      note: "Empty intake is not a problem record.",
    };
  }

  function score(hay: string) {
    const h = tokens(hay);
    return words.reduce((n, w) => n + (h.includes(w) ? 3 : h.some((x) => x.includes(w) || w.includes(x)) ? 1 : 0), 0);
  }

  const paradoxes = formalCorpus
    .map((p) => ({
      p,
      s: score(`${p.name} ${p.domain} ${p.category} ${p.invariant ?? ""} ${p.statement ?? ""}`),
    }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.p);

  const nodes = daisyNodes
    .map((n) => ({ n, s: score(`${n.name} ${n.purpose} ${n.category}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.n);

  const matchedProducts = products
    .map((p) => ({ p, s: score(`${p.title} ${p.blurb} ${p.short} ${p.category}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.p);

  if (paradoxes.length === 0 && nodes.length === 0) {
    return {
      paradoxes: formalCorpus.filter((p) => p.classification === "AUTHORED_MODEL").slice(0, 2),
      nodes: daisyNodes.filter((n) => n.id === "DN-20" || n.id === "DN-43"),
      products: products.filter((p) => p.sku === "daisy-parai"),
      path: ["PROBLEM", "INTAKE", "DAISY", "HOLD"],
      note: "No direct tether. Daisy can still formalize — this is not a verified solution.",
    };
  }

  const path = [
    "PROBLEM",
    paradoxes[0] ? paradoxes[0].code : "PARADOX",
    nodes[0] ? nodes[0].id : "NODE",
    paradoxes[1] ? paradoxes[1].code : "TETHER",
    matchedProducts[0] ? matchedProducts[0].solutionId : "CANDIDATE",
    "DFRL",
    "DUAL-KERNEL",
  ];

  return {
    paradoxes,
    nodes,
    products: matchedProducts,
    path,
    note: matchedProducts[0]?.evidence === "VERIFIED"
      ? "A verified component lies on this tether. Entitlement is still not execution."
      : "Partial tether. Unverified candidates cannot occupy the marketplace.",
  };
}
