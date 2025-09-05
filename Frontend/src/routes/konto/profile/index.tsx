import ProfileForm from "@/components/profileForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/konto/profile/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Min Profil - Den Grønne Avis",
      },
      {
        name: "description",
        content:
          "Se og opdater din brugerprofil på Den Grønne Avis. Administrer dine oplysninger og få overblik over din konto.",
      },
      {
        name: "keywords",
        content:
          "profil, bruger, konto, Den Grønne Avis, genbrug, handel, miljø",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <section>
      <ProfileForm />
    </section>
  );
}
