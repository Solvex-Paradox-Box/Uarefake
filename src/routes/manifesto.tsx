import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/nav";
import { Stamp } from "@/components/brand";
import { ParaiStrip } from "@/components/parai";
import { factoryLoop, solvexContract } from "@/lib/architecture";

export const Route = createFileRoute("/manifesto")({ component: Manifesto });

function Manifesto() {
  return (
    <PageShell>
      <div className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 scan-grid opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <Stamp>Contract</Stamp>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            From AI that acts
            <br />
            to intelligence that answers.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            UAREFAKE is the public face of Solvex. Daisy Haminja is Post-Agentic
            Recursive Autonomous Intelligence. DFRL is the formal bridge. MMTAI
            is modular execution. NOPOT is identity with a burn path. The Crystal
            Clear Box is how you inspect any of it.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-mono text-2xs uppercase tracking-mark text-muted">
          The Solvex contract · twelve rules
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {solvexContract.map((r, i) => (
            <li key={r.id} className="rounded-xl bg-surface p-5 hairline">
              <p className="font-mono text-2xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {r.title}
              </h2>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
            PARAI cycle
          </h2>
          <ParaiStrip />
        </div>
        <div className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
            Factory recursion
          </h2>
          <ol className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
            {factoryLoop.map((s, i) => (
              <li key={s.id} className="rounded-md bg-surface px-3 py-2 hairline">
                <p className="font-mono text-2xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-sm font-semibold">{s.label}</p>
              </li>
            ))}
          </ol>
        </div>
        <blockquote className="mt-12 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight">
          Daisy thinks. DFRL verifies. MMTAI controls execution. Solvex records
          and proves. NOPOT protects identity. Humans retain authority. The
          system does nothing it cannot reverse.
        </blockquote>
      </div>
    </PageShell>
  );
}
