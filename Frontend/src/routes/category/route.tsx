import Aside from "@/components/aside";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/category")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto flex flex-col sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[15%_85%] gap-4 sm:gap-10 min-h-[calc(100vh-160px)] px-0 sm:px-4">
      <Aside />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
