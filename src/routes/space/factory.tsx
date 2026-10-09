import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StateChip } from "@/components/ui/badge";
import {
  agateGates,
  factoryLoop,
  matchProblem,
  nopotLifecycle,
  pipeline21,
  sandboxGates,
  unrecoveredGates,
} from "@/lib/architecture";
import { paradoxByCode } from "@/lib/dfrl";
import { daisyNodes } from "@/lib/nodes";
import { productBySku } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/space/factory")({
  component: FactoryPage,
});

const samples = [
  "Unbounded self-reference is leaking into a tenant identity check.",
  "Two services cannot agree over a lossy network and still claim consensus.",
  "A listing is being sold as verified without a proof bundle.",
];

function FactoryPage() {
  const [text, setText] = useState(samples[0]);
  const submitProblem = useAppStore((s) => s.submitProblem);
  const problems = useAppStore((s) => s.problems);
  const mintCell = useAppStore((s) => s.mintCell);
  const advanceCell = useAppStore((s) => s.advanceCell);
  const burnCell = useAppStore((s) => s.burnCell);
  const cells = useAppStore((s) => s.cells);
  const live = problems[0];
  const preview = matchProblem(text);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="font-mono text-2xs uppercase tracking-mark text-muted">
        Software factory · discovery → tether → gate
      </p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        What problem exists, and what can be built?
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Intake is not execution. A tether is a path through recovered paradoxes
        and nodes — not a generated product. Unrecovered 46-gate names are not
        invented.
      </p>

      <ol className="mt-6 grid grid-cols-3 gap-1 sm:grid-cols-6 lg:grid-cols-9">
        {factoryLoop.map((s, i) => (
          <li key={s.id} className="rounded-md bg-surface px-2 py-2 hairline">
            <p className="font-mono text-2xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="font-display text-xs font-semibold tracking-tight">
              {s.label}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form
          className="rounded-xl bg-surface p-5 hairline"
          onSubmit={(e) => {
            e.preventDefault();
            submitProblem(text);
          }}
        >
          <label className="font-mono text-2xs uppercase tracking-kicker text-muted">
            Problem statement
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={800}
              className="mt-2 w-full rounded-md bg-bg px-3 py-2 text-sm text-fg outline-none hairline"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {samples.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setText(s)}
                className="rounded-md px-2 py-1 text-left text-3xs text-muted hairline hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>
          <Button className="mt-4 w-full" type="submit">
            Formalize intake
          </Button>
        </form>

        <div className="rounded-xl bg-surface p-5 hairline">
          <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
            Tether preview
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {(live?.path ?? preview.path).map((step, i) => (
              <span
                key={`${step}-${i}`}
                className="rounded-sm bg-elevated px-2 py-1 font-mono text-2xs"
              >
                {step}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            {live?.note ?? preview.note}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Paradoxes
          </h2>
          <ul className="mt-3 space-y-2">
            {(live
              ? live.paradoxCodes.map((c) => paradoxByCode(c)).filter(Boolean)
              : preview.paradoxes
            ).map((p) =>
              p ? (
                <li key={p.code} className="rounded-lg bg-surface p-3 hairline">
                  <p className="font-mono text-2xs text-muted">{p.code}</p>
                  <p className="mt-1 text-sm">{p.name}</p>
                  <StateChip className="mt-2" state={p.result} />
                </li>
              ) : null,
            )}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Nodes
          </h2>
          <ul className="mt-3 space-y-2">
            {(live
              ? live.nodeIds
                  .map((id) => daisyNodes.find((n) => n.id === id))
                  .filter(Boolean)
              : preview.nodes
            ).map((n) =>
              n ? (
                <li key={n.id} className="rounded-lg bg-surface p-3 hairline">
                  <p className="font-mono text-2xs text-muted">{n.id}</p>
                  <p className="mt-1 text-sm">{n.name}</p>
                </li>
              ) : null,
            )}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Candidate solutions
          </h2>
          <ul className="mt-3 space-y-2">
            {(live
              ? live.skus.map((sku) => productBySku(sku)).filter(Boolean)
              : preview.products
            ).map((p) =>
              p ? (
                <li key={p.sku}>
                  <Link
                    to="/store/$sku"
                    params={{ sku: p.sku }}
                    className="block rounded-lg bg-surface p-3 hairline hover:bg-elevated"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm">{p.title}</p>
                      <StateChip state={p.evidence} />
                    </div>
                    <p className="mt-1 font-mono text-2xs text-muted">
                      {p.priceCents ? formatUsd(p.priceCents) : "Blocked"}
                    </p>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Gate board
          </h2>
          <p className="mt-1 text-sm text-muted">
            Demonstrated 15-gate AGATE pipeline. Target remains 46.{" "}
            {unrecoveredGates.length} slots unrecovered — not invented.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl bg-surface hairline">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="font-mono text-2xs uppercase tracking-kicker text-muted">
                <tr className="border-b border-line">
                  <th className="px-3 py-2 font-medium">Gate</th>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">State</th>
                </tr>
              </thead>
              <tbody>
                {[...agateGates, ...sandboxGates].map((g) => (
                  <tr key={g.id} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{g.id}</td>
                    <td className="px-3 py-2">{g.name}</td>
                    <td className="px-3 py-2">
                      <StateChip state={g.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl bg-surface p-5 hairline">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              NOPOT
            </h2>
            <p className="mt-1 text-sm text-muted">
              Register-and-burn. A burned cell never authorizes again.
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {nopotLifecycle.map((s) => (
                <span
                  key={s.id}
                  className="rounded-sm bg-elevated px-2 py-1 font-mono text-2xs"
                >
                  {s.id}
                </span>
              ))}
            </div>
            <Button className="mt-4" size="sm" onClick={() => mintCell()}>
              Mint validity cell
            </Button>
            <ul className="mt-3 space-y-2">
              {cells.slice(0, 4).map((c) => (
                <li key={c.id} className="rounded-md bg-bg p-3 hairline">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-2xs">{c.id}</p>
                    <StateChip state={c.state} />
                  </div>
                  <p className="mt-2 break-all font-mono text-3xs text-muted">
                    {c.header}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => advanceCell(c.id)}
                      disabled={c.state === "BURNED" || c.state === "EXPIRED"}
                    >
                      Advance
                    </Button>
                    <Button
                      size="sm"
                      variant="stamp"
                      onClick={() => burnCell(c.id)}
                      disabled={c.state === "BURNED"}
                    >
                      Burn
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-surface p-5 hairline">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              21-stage pipeline
            </h2>
            <p className="mt-1 text-sm text-muted">
              Historical SolutionPipeline. Distinct from the 46-gate target.
            </p>
            <ol className="mt-3 columns-1 gap-2 text-xs text-muted sm:columns-2">
              {pipeline21.map((s, i) => (
                <li key={s} className="break-inside-avoid py-0.5">
                  <span className="font-mono text-2xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
