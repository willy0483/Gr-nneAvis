import Aside from "@/components/aside";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/category/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className=" container mx-auto">
      <Aside />
      <Outlet />
    </div>
  );
}
