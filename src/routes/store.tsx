import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/nav";

export const Route = createFileRoute("/store")({ component: StoreLayout });

function StoreLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}
