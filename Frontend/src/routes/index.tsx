import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section>
      <article className=" min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-2xl font-semibold text-app-text">Welcome</h1>
        <p className="text-app-muted max-w-md">
          This is a simple starter template. Edit
          <code> src/routes/index.tsx</code> to get started.
        </p>
      </article>
    </section>
  );
}
