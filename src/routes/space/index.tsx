import { createFileRoute, Link } from "@tanstack/react-router";
import { ParaiStrip } from "@/components/parai";
import { StateChip } from "@/components/ui/badge";
import { agents } from "@/lib/registry";
import { daisyNodes } from "@/lib/nodes";
import { manifest } from "@/lib/dfrl";
import { dimensions, dualKernels, solvexContract } from "@/lib/architecture";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/space/")({ component: SpaceHome });

function SpaceHome() {
  const runs = useAppStore((s) => s.runs);
  const orders = useAppStore((s) => s.orders);
  const problems = useAppStore((s) => s.problems);
  const cells = useAppStore((s) => s.cells);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            k: "120",
            v: `${manifest.corpus120.unsat}/${manifest.corpus120.total}`,
            s: "formal corpus · UNSAT/total",
            n: dimensions.paradoxes.of,
          },
          {
            k: "46",
            v: `${manifest.gates.demonstrated}/${manifest.gates.target}`,
            s: "gates demonstrated / target",
            n: dimensions.gates.of,
          },
          {
            k: "54",
            v: `${manifest.daisyNodes.live}/${manifest.daisyNodes.total}`,
            s: "nodes live / topology",
            n: dimensions.nodes.of,
          },
        ].map((c) => (
          <div key={c.k} className="rounded-xl bg-surface p-4 hairline">
            <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
              {c.k}
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight tabular-nums">
              {c.v}
            </p>
            <p className="mt-1 font-mono text-3xs text-muted">{c.s}</p>
            <p className="mt-2 text-xs text-muted">{c.n}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-3xs uppercase tracking-kicker text-muted">
        120 ≠ 46 ≠ 54 · they are different dimensions of the architecture
      </p>

      <div className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Live PARAI
          </h2>
          <Link
            to="/space/execution"
            className="text-xs uppercase tracking-kicker text-muted hover:text-fg"
          >
            Open MMTAI
          </Link>
        </div>
        <ParaiStrip active={runs.find((r) => r.status === "CYCLING")?.stage} compact />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {dualKernels.map((k) => {
            const run = runs.find((r) => r.kernel === k.id && r.status === "CYCLING");
            return (
              <div key={k.id} className="rounded-lg bg-surface p-3 hairline">
                <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
                  {k.name}
                </p>
                <p className="mt-1 text-sm">{run ? run.stage : "Idle"}</p>
                <p className="mt-1 text-xs text-muted">{k.role}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Recent intake
            </h2>
            <Link
              to="/space/factory"
              className="text-xs uppercase tracking-kicker text-muted hover:text-fg"
            >
              Open factory
            </Link>
          </div>
          {problems.length === 0 ? (
            <p className="text-sm text-muted">
              No problem records yet. Discovery starts on the factory floor.
            </p>
          ) : (
            <ul className="space-y-2">
              {problems.slice(0, 4).map((p) => (
                <li key={p.id} className="rounded-lg bg-surface px-3 py-2 hairline">
                  <p className="text-sm">{p.statement}</p>
                  <p className="mt-1 font-mono text-2xs text-muted">
                    {p.path.slice(0, 5).join(" → ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Registered intelligences
          </h2>
          <ul className="mt-3 space-y-2">
            {agents.slice(0, 5).map((a) => (
              <li key={a.id}>
                <Link
                  to="/registry/$id"
                  params={{ id: a.id }}
                  className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 hairline hover:bg-elevated"
                >
                  <span className="text-sm">{a.name}</span>
                  <StateChip state={a.evidence} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Solvex contract
        </h2>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {solvexContract.map((r) => (
            <li key={r.id} className="rounded-lg bg-surface p-3 hairline">
              <p className="font-mono text-2xs text-muted">{r.id}</p>
              <p className="mt-1 text-sm">{r.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Node plane
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {daisyNodes.slice(0, 12).map((n) => (
            <div key={n.id} className="rounded-lg bg-surface p-3 hairline">
              <p className="font-mono text-2xs text-muted">{n.id}</p>
              <p className="mt-1 text-sm">{n.name}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full bg-fg"
                  style={{ width: `${Math.round(n.load * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-8 font-mono text-3xs text-muted">
        PayPal {manifest.gateways.paypal}
        {orders[0] ? ` · last commerce ${orders[0].id} ${orders[0].status}` : ""}
        {cells[0] ? ` · NOPOT ${cells[0].id} ${cells[0].state}` : ""}
      </p>
    </div>
  );
}
