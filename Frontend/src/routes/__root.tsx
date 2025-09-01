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
        <section className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </section>
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
          "A modern, responsive web template built with React, Vite, and Tailwind CSS. Includes authentication, routing, and beautiful UI components.",
      },
      {
        title: "My Template",
      },
      {
        name: "keywords",
        content:
          "React, Vite, Tailwind, Tanstack, Template, Authentication, Routing, Web App, UI, Modern, Responsive",
      },
      {
        name: "author",
        content: "William Leander Jensen",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "theme-color",
        content: "#2563eb",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/icons/Template-White.png",
      },
    ],
  }),
});
