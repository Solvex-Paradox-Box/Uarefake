import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { daisyNodes, nodeCategories } from "@/lib/nodes";
import { manifest } from "@/lib/dfrl";
import { StateChip } from "@/components/ui/badge";

export const Route = createFileRoute("/space/nodes")({ component: NodesPage });

export function NodesPage() {
  const [cat, setCat] = useState<(typeof nodeCategories)[number] | "ALL">("ALL");
  const list =
    cat === "ALL" ? daisyNodes : daisyNodes.filter((n) => n.category === cat);
  const live = daisyNodes.filter((n) => n.health === "live").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Node registry
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {manifest.daisyNodes.total} Daisy nodes. {live} code-executed and live.
        External-provider nodes stay HOLD until credentials exist. Capability is
        not authority.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat("ALL")}
          className={
            cat === "ALL"
              ? "rounded-md bg-fg px-3 py-2 text-xs uppercase tracking-kicker text-bg"
              : "rounded-md px-3 py-2 text-xs uppercase tracking-kicker text-muted hairline"
          }
        >
          All · {daisyNodes.length}
        </button>
        {nodeCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={
              cat === c
                ? "rounded-md bg-fg px-3 py-2 text-xs uppercase tracking-kicker text-bg"
                : "rounded-md px-3 py-2 text-xs uppercase tracking-kicker text-muted hairline"
            }
          >
            {c.replaceAll("_", " ")}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((n) => (
          <article key={n.id} className="rounded-xl bg-surface p-4 hairline">
            <div className="flex items-center justify-between">
              <p className="font-mono text-3xs text-muted">{n.id}</p>
              <span
                className={
                  n.health === "live"
                    ? "inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-kicker text-ok"
                    : "inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-kicker text-hold"
                }
              >
                <span
                  className={
                    n.health === "live"
                      ? "size-1.5 rounded-full bg-ok live-dot"
                      : "size-1.5 rounded-full bg-hold"
                  }
                />
                {n.health}
              </span>
            </div>
            <h2 className="mt-2 font-display text-lg font-semibold tracking-tight">
              {n.name}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-kicker text-muted">
              {n.category.replaceAll("_", " ")}
            </p>
            <p className="mt-2 text-sm text-muted">{n.purpose}</p>
            <div className="mt-3">
              <StateChip state={n.mode} />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between font-mono text-2xs text-muted">
                <span>Load</span>
                <span className="tabular-nums">{Math.round(n.load * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full bg-fg"
                  style={{ width: `${Math.round(n.load * 100)}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
