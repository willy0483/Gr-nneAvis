import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/konto/annoncer/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/konto/annoncer/"!</div>;
}
