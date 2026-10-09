import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StateChip } from "@/components/ui/badge";
import { corpus120, dfrlRun, dhRun, manifest, proofs, type CorpusKind } from "@/lib/dfrl";

export const Route = createFileRoute("/space/proofs")({ component: ProofsPage });

export function ProofsPage() {
  const [q, setQ] = useState("");
  const [corpus, setCorpus] = useState<CorpusKind | "ALL">("ALL");
  const [authored, setAuthored] = useState(false);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return proofs.filter((p) => {
      if (corpus !== "ALL" && p.corpus !== corpus) return false;
      if (authored && p.classification !== "AUTHORED_MODEL") return false;
      if (!needle) return true;
      return (
        p.code.toLowerCase().includes(needle) ||
        p.name.toLowerCase().includes(needle) ||
        p.domain.toLowerCase().includes(needle)
      );
    });
  }, [q, authored, corpus]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        120-case formal corpus
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        88 DFRL operators + 32 DH contracts. Recorded closure {corpus120.status}.
        Registered is not verified. Family variants are not extra proofs. Claim
        scope remains {manifest.claimScope}.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-surface p-4 hairline">
          <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
            Combined 120
          </p>
          <p className="mt-2 font-display text-2xl font-bold tabular-nums">
            {corpus120.unsat} UNSAT · {corpus120.sat} SAT
          </p>
          <p className="text-xs text-muted">
            {corpus120.replays} replays · 0 unknown · 0 error
          </p>
        </div>
        <div className="rounded-xl bg-surface p-4 hairline">
          <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
            DFRL 88
          </p>
          <p className="mt-2 text-sm">
            {dfrlRun.unsat} UNSAT · {dfrlRun.authored} authored · {dfrlRun.generated} family
          </p>
        </div>
        <div className="rounded-xl bg-surface p-4 hairline">
          <p className="font-mono text-2xs uppercase tracking-kicker text-muted">
            DH 32
          </p>
          <p className="mt-2 text-sm">
            {dhRun.unsat} UNSAT · {dhRun.sat} SAT · {dhRun.replays} replays
          </p>
        </div>
      </div>
      <p className="mt-3 break-all font-mono text-3xs text-muted">
        combined root {corpus120.root}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter code, name, domain"
          className="min-h-11 flex-1 rounded-md bg-surface px-3 text-sm hairline outline-none focus:shadow-[var(--shadow-border-hover)]"
        />
        <div className="flex flex-wrap gap-2">
          {(["ALL", "DFRL88", "DH32"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCorpus(c)}
              className={
                corpus === c
                  ? "rounded-md bg-fg px-3 py-2 text-xs uppercase tracking-kicker text-bg"
                  : "rounded-md px-3 py-2 text-xs uppercase tracking-kicker text-muted hairline"
              }
            >
              {c === "ALL" ? "All 120" : c === "DFRL88" ? "DFRL 88" : "DH 32"}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAuthored((v) => !v)}
            className={
              authored
                ? "rounded-md bg-fg px-3 py-2 text-xs uppercase tracking-kicker text-bg"
                : "rounded-md px-3 py-2 text-xs uppercase tracking-kicker text-muted hairline"
            }
          >
            Authored only
          </button>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl bg-surface hairline">
        <table className="w-full min-w-xl text-left text-sm">
          <thead className="font-mono text-2xs uppercase tracking-kicker text-muted">
            <tr className="border-b border-line">
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Domain</th>
              <th className="px-4 py-3 font-medium">Result</th>
              <th className="px-4 py-3 font-medium">State</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.code} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{p.code}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.domain}</td>
                <td className="px-4 py-3 font-mono text-xs">{p.result}</td>
                <td className="px-4 py-3">
                  <StateChip state={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-3xs text-muted">
        Showing {list.length} of {proofs.length}
      </p>
    </div>
  );
}
