import { Spinner } from "@/components/spinner";
import { createProductDetailsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$product")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      slug: params.product,
    };
  },
  pendingComponent: () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: ({ params }) => ({
    meta: [
      { title: `Produkt: ${params.product} | My Template` },
      {
        name: "description",
        content: `Se detaljer, ingredienser og fremgangsmåde for produktet ${params.product} i My Template.`,
      },
    ],
  }),
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();
  const {
    data: item,
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

  return (
    <section className="container mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl py-6 px-2 sm:px-4 md:px-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-app-primary mb-4 text-center md:text-left">
        {item?.title}
      </h2>
      <img
        src={item?.imageUrl}
        alt={item?.slug}
        itemProp="image"
        className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl mb-4 bg-app-background"
        fetchPriority="high"
        decoding="async"
      />
      <p className="text-app-text mb-4 text-base sm:text-lg">
        {item?.description}
      </p>
      <section className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4">
        <span className="bg-app-surface border border-app-secondary rounded px-3 py-1 text-app-secondary text-sm sm:text-base">
          Varighed: {item?.durationInMinutes} min
        </span>
        <span className="bg-app-surface border border-app-secondary rounded px-3 py-1 text-app-secondary text-sm sm:text-base">
          Antal: {item?.amount} stk
        </span>
        <span className="bg-app-surface border border-app-secondary rounded px-3 py-1 text-app-primary font-semibold text-sm sm:text-base">
          Pris: {item?.price},00 DKK
        </span>
      </section>
      <section className="mb-4">
        <h3 className="font-semibold text-app-accent mb-2 text-base sm:text-lg">
          Ingredienser
        </h3>
        <ul className="list-disc list-inside text-app-text text-sm sm:text-base">
          {item?.productIngredients.map((item, index) => (
            <li key={index}>
              {item.amount} {item.units.abbreviation} {item.ingredients.title}
            </li>
          ))}
        </ul>
      </section>
      <article className="prose prose-sm sm:prose-base max-w-none text-app-text">
        {item?.procedure}
      </article>
    </section>
  );
}
