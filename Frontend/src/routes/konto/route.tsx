import { useAuth } from "@/lib/utils";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/konto")({
  component: RouteComponent,
});

function RouteComponent() {
  const { checkAuth } = useAuth();

  checkAuth();

  return (
    <section className="container mx-auto">
      <div className="w-full flex">
        <div className="flex w-full rounded border border-app-primary overflow-hidden">
          <Link
            to="/konto/profile"
            className="w-1/2 py-2 text-center font-medium transition-colors border-r border-app-primary [&.active]:bg-app-primary [&.active]:text-white bg-white text-app-primary"
            style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
          >
            Min Profil
          </Link>
          <Link
            to="/konto/annoncer"
            className="w-1/2 py-2 text-center font-medium transition-colors [&.active]:bg-app-primary [&.active]:text-white bg-white text-app-primary"
            style={{ borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
          >
            Mine Annoncer
          </Link>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
