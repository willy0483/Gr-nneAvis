import Donations from "@/components/donations";
import { Spinner } from "@/components/spinner";
import { createCategoriesQueryOptions } from "@/queryOptions/createCategoryQueryOptions";
import { createProductsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  pendingComponent: () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
      <Spinner />
    </div>
  ),
});

function Index() {
  const [
    {
      data: product,
      isError: productIsError,
      error: productError,
      refetch: productRefetch,
    },
    {
      data: categories,
      isError: categoriesIsError,
      error: categoriesError,
      refetch: categoriesRefetch,
    },
  ] = useSuspenseQueries({
    queries: [createProductsQueryOptions(), createCategoriesQueryOptions()],
  });

  // Shuffle
  let i = product.length,
    j,
    temp;

  while (--i > 0) {
    j = Math.floor(Math.random() * i);
    temp = product[j];
    product[j] = product[i];
    product[i] = temp;
  }

  if (productIsError || categoriesIsError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-red-500 mb-2 font-semibold text-center">
            Something went wrong.
          </p>
          <p className="text-app-secondary text-sm mb-4 text-center break-words">
            Error: {productError?.message || categoriesError?.message}
          </p>
          <button
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => {
              if (productIsError) {
                productRefetch();
              } else {
                categoriesRefetch();
              }
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section className=" min-h-[calc(100vh-160px)] container mx-auto mb-6">
      <h2 className="text-[18px]">Udvalgte Produkter</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-2">
        {product.slice(0, 6).map(({ id, name, image, slug }) => (
          <Link
            to="/category/product/$product"
            params={{ product: slug }}
            key={id}
          >
            <figure className="relative h-48 w-full overflow-hidden shadow border flex flex-col justify-end group">
              <img
                src={image}
                alt={slug}
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                style={{ aspectRatio: "1/1" }}
              />
              <figcaption className="absolute bottom-0 left-0 w-full bg-app-accent/75 text-white text-center py-2 px-1 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="truncate" title={name}>
                  {name}
                </p>
              </figcaption>
            </figure>
          </Link>
        ))}
      </section>
      <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />
      <section>
        <figure className="relative h-[240px] w-full overflow-hidden">
          <img
            src="/images/banners/banner_image1.jpg"
            alt="banner image forst"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <figcaption className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Den Grønne Avis
            </h2>
            <article className="max-w-xl">
              <p className="text-lg md:text-xl font-medium drop-shadow">
                Vi går forest i kampen om klimaet ved at give 2 kr. til
                klima-venlige formål, hver gang du handler brugt på Den Grønne
                Avis
              </p>
            </article>
          </figcaption>
        </figure>
      </section>
      <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />

      <section>
        <h2 className="text-[18px]">Udvalgte Produkter</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-2">
          {categories.slice(0, 6).map(({ id, name, slug }) => (
            <Link to="/category/$category" params={{ category: slug }} key={id}>
              <figure className="relative h-48 w-full overflow-hidden shadow border flex flex-col justify-end">
                <img
                  src={`/images/kategorier/${slug}.jpg`}
                  alt={slug}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  style={{ aspectRatio: "1/1" }}
                />
                <figcaption className="absolute top-0 left-0 w-full bg-app-accent/75 text-white text-center py-2 px-1 transition-opacity z-10">
                  <p className="truncate" title={name}>
                    {name}
                  </p>
                </figcaption>
              </figure>
            </Link>
          ))}
        </section>
        <hr className="py-[2px] bg-app-primary my-10 container mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Donations theme="klimant" />
          <Donations theme="jorden" />
        </div>
      </section>
    </section>
  );
}
