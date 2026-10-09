import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StateChip } from "@/components/ui/badge";
import { ParaiStrip } from "@/components/parai";
import { dualKernels, mmtaiTracks } from "@/lib/architecture";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/space/execution")({
  component: ExecutionPage,
});

export function ExecutionPage() {
  const [operation, setOperation] = useState("Deploy DH-S-001 to tenant demo");
  const [authorized, setAuthorized] = useState(true);
  const [reversible, setReversible] = useState(true);
  const propose = useAppStore((s) => s.proposeRun);
  const advance = useAppStore((s) => s.advanceRun);
  const reverse = useAppStore((s) => s.reverseRun);
  const runs = useAppStore((s) => s.runs);
  const cycling = useMemo(
    () => runs.filter((r) => r.status === "CYCLING"),
    [runs],
  );
  const cyclingKey = cycling.map((r) => r.id).join("|");

  useEffect(() => {
    if (!cyclingKey) return;
    const ids = cyclingKey.split("|");
    const t = window.setInterval(() => {
      for (const id of ids) advance(id);
    }, 420);
    return () => window.clearInterval(t);
  }, [cyclingKey, advance]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        MMTAI dual kernel
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Kernel A proposes. Kernel B challenges. Authorization is a circumstance,
        not a role. If recovery cannot be established, the operation fails closed.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {mmtaiTracks.map((t) => (
          <div key={t.id} className="rounded-lg bg-surface p-3 hairline">
            <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
              Track {t.id}
            </p>
            <p className="mt-1 font-display text-sm font-semibold">{t.name}</p>
            <p className="mt-1 text-xs text-muted">{t.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          className="rounded-xl bg-surface p-5 hairline"
          onSubmit={(e) => {
            e.preventDefault();
            propose({ operation, authorized, reversible });
          }}
        >
          <label className="font-mono text-2xs uppercase tracking-kicker text-muted">
            Proposed operation
            <input
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-md bg-bg px-3 text-sm text-fg outline-none hairline"
            />
          </label>
          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={authorized}
              onChange={(e) => setAuthorized(e.target.checked)}
              className="size-4 accent-fg"
            />
            Human authorization present
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={reversible}
              onChange={(e) => setReversible(e.target.checked)}
              className="size-4 accent-fg"
            />
            Reversibility established
          </label>
          <Button className="mt-4 w-full" type="submit" disabled={cycling.length > 0}>
            {cycling.length > 0 ? "Dual cycle in flight" : "Propose dual-kernel run"}
          </Button>
        </form>

        <div>
          <ParaiStrip active={cycling[0]?.stage} compact />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {dualKernels.map((k) => {
              const run = cycling.find((r) => r.kernel === k.id) ??
                runs.find((r) => r.kernel === k.id);
              return (
                <div key={k.id} className="rounded-lg bg-surface p-3 hairline">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
                      {k.name}
                    </p>
                    {run ? <StateChip state={run.status} /> : null}
                  </div>
                  <p className="mt-2 text-sm">{run?.note ?? k.role}</p>
                </div>
              );
            })}
          </div>
          <ul className="mt-4 space-y-2">
            {runs.slice(0, 8).map((r) => (
              <li key={r.id} className="rounded-lg bg-surface p-3 hairline">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm">
                      <span className="font-mono text-2xs text-muted">
                        K{r.kernel}
                      </span>{" "}
                      {r.operation}
                    </p>
                    <p className="mt-1 text-xs text-muted">{r.note}</p>
                    <p className="mt-1 font-mono text-2xs text-subtle">
                      {r.receipt} · {r.stage}
                    </p>
                  </div>
                  <StateChip state={r.status} />
                </div>
                {r.status === "EXECUTED" || r.status === "CHALLENGED" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => reverse(r.id)}
                  >
                    Reverse
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
