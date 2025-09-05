import Footer from "@/components/footer";
import Header from "@/components/header";
import NotFound from "@/components/notFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/authProvider";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main>
      {/* meta data */}
      <HeadContent />
      {/* auth and userData */}
      <AuthProvider>
        <Header />
        <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />
        <Outlet />
        <Toaster />
        <Footer />
        {/* Add dev tools for router */}
        <TanStackRouterDevtools />
      </AuthProvider>
    </main>
  ),
  notFoundComponent: NotFound,

  // Setup meta data for site
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Den Grønne Avis er en brugt handels markedsplads, hvor hver handel støtter klimaet. Køb og sælg brugte varer nemt og intuitivt.",
      },
      {
        title: "Den Grønne Avis - Brugt handels markedsplads for klimaet",
      },
      {
        name: "keywords",
        content:
          "Den Grønne Avis, brugt marked, klima, genbrug, handel, bæredygtighed, køb, salg, miljø",
      },
      {
        name: "author",
        content: "Den Grønne Avis",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "theme-color",
        content: "#1d8439",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon/favicon-32x32.png",
      },
    ],
  }),
});
