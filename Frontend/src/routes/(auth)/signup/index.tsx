import Donations from "@/components/donations";
import { SignUpForm } from "@/components/signUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Opret konto - Den Grønne Avis",
      },
      {
        name: "description",
        content:
          "Opret en konto på Den Grønne Avis og bliv en del af fællesskabet. Køb og sælg brugte varer og støt klimaet!",
      },
      {
        name: "keywords",
        content:
          "opret konto, signup, Den Grønne Avis, genbrug, handel, miljø, bruger, fællesskab",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <section className="w-full h-full pb-10">
      <div className="p-8 mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-center text-2xl font-bold ">Opret en konto</h1>
        <SignUpForm />
      </div>
      <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Donations theme="klimant" />
        <Donations theme="jorden" />
      </div>
    </section>
  );
}
