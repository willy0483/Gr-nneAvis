import Donations from "@/components/donations";
import { SignUpForm } from "@/components/signUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "SignUp | My Template",
      },
      {
        name: "description",
        content:
          "Create a new account to get started and unlock all the features of My Template. Join our community today!",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <section className="w-full">
      <div className="p-8 mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-center text-2xl font-bold text-app-primary">
          Sign Up
        </h1>
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
