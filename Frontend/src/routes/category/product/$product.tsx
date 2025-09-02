import { Spinner } from "@/components/spinner";
import { createProductDetailsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/category/product/$product")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      slug: params.product,
    };
  },
  pendingComponent: () => (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();

  const {
    data: item,
    isPending,
    isError,
    error,
    refetch,
  } = useSuspenseQuery(createProductDetailsQueryOptions(slug));

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-red-500 mb-2 font-semibold text-center">
            Something went wrong.
          </p>
          <p className="text-app-secondary text-sm mb-4 text-center break-words">
            Error: {error.message}
          </p>
          <button
            aria-label="Refetch the api"
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  const { name, description, image, price } = item;
  return isPending ? (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ) : (
    <>
      <section className="flex flex-col items-center w-full py-8">
        <div className=" p-8 w-full max-w-2xl flex flex-col items-center">
          <img
            src={image}
            alt={name}
            className="w-full max-w-md mb-6 rounded object-cover aspect-[4/3]"
          />
          <h1 className="font-bold text-2xl mb-2 text-center text-gray-900">
            {name}
          </h1>
          <p className="text-base mb-4 text-center text-gray-700">
            {description}
          </p>
          <p className="font-semibold text-lg text-gray-900">
            Pris: {price} kr
          </p>
        </div>
        <hr className="py-[2px] bg-app-primary my-5 container mx-auto" />
      </section>
      <section>{/* Kontakt sælger */}</section>
    </>
  );
}
