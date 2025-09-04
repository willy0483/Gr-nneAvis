import ProfileForm from "@/components/profileForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/konto/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <ProfileForm />
    </section>
  );
}
