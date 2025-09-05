import AnnonceForm from "@/components/annonceForm";
import { useAuth } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/annonce/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Opret annonce - Den Grønne Avis" },
      {
        name: "description",
        content:
          "Opret en ny annonce på Den Grønne Avis. Sælg dine brugte varer og støt klimaet!",
      },
      {
        name: "keywords",
        content:
          "opret annonce, sælg, Den Grønne Avis, genbrug, handel, miljø, brugte varer",
      },
    ],
  }),
});

function RouteComponent() {
  const { checkAuth } = useAuth();

  checkAuth();

  return (
    <section className=" container mx-auto min-h-[calc(100vh-160px)] flex flex-col justify-center items-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl">Opret ny annonce</h1>
        <span className="my-2">
          <h2 className="text-[16px]">Her kan du oprette en ny annonce.</h2>
          <h2 className="text-[16px]">
            Du har mulighed for at slette dine annoncer igen under “min konto”
            siden
          </h2>
        </span>
      </div>
      <AnnonceForm />
    </section>
  );
}
