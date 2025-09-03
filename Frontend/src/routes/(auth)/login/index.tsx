import Donations from "@/components/donations";
import { LoginForm } from "@/components/logInForm";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
  head: () => ({
    meta: [
      {
        title: "Login | My Template",
      },
      {
        name: "description",
        content:
          "Login to access your account and explore the features of My Template.",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <section className="w-full">
      <div className="p-8 mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-center text-2xl font-bold">Velkommen tilbage</h1>
        <LoginForm />
      </div>
      <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Donations theme="klimant" />
        <Donations theme="jorden" />
      </div>
    </section>
  );
}
