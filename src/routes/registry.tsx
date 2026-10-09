import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/nav";

export const Route = createFileRoute("/registry")({ component: RegistryLayout });

function RegistryLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}
