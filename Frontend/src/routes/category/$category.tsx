import Card from "@/components/card";
import { Spinner } from "@/components/spinner";
import { createCategoryProductsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const Route = createFileRoute("/category/$category")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      slug: params.category,
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
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: category,
    isPending,
    isError,
    error,
    refetch,
  } = useSuspenseQuery(createCategoryProductsQueryOptions(slug));

  useEffect(() => {
    if (category.length < 9) {
      setCurrentPage(0);
    }
  }, [category]);

  /*
    https://www.npmjs.com/package/react-paginate
    code from react-paginate
  */
  const ITEMS_PER_PAGE = 9;
  const pageCount = Math.ceil(category.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = category.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

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
    <>
      {category.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-260px)] w-full">
          <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
            <p className="text-app-secondary mb-2 font-semibold text-center text-lg">
              Produkt ikke fundet
            </p>
            <p className="text-app-muted text-sm text-center">
              Der er ingen produkter i denne kategori endnu.
            </p>
          </div>
        </div>
      ) : isPending ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
          <Spinner />
        </div>
      ) : (
        <section className="flex flex-col items-center w-full px-2 sm:px-4 md:px-0">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-6xl mb-4">
            {currentItems.map((item) => (
              <li key={item.id}>
                <Card {...item} />
              </li>
            ))}
          </ul>
          {category.length > 9 && (
            <div className="flex justify-center my-8 w-full">
              <ReactPaginate
                breakLabel={"..."}
                nextLabel={"-›"}
                previousLabel={"‹-"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="flex flex-wrap gap-1 items-center select-none w-full justify-center"
                pageLinkClassName="px-2 py-1 rounded text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface hover:text-app-accent transition-colors"
                activeClassName="text-app-accent font-bold"
                previousLinkClassName="px-2 py-1 rounded text-app-secondary text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface transition-colors"
                nextLinkClassName="px-2 py-1 rounded text-app-secondary text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface transition-colors"
                breakLinkClassName="px-2 py-1 text-app-muted text-sm sm:text-base"
                disabledClassName="opacity-40"
                forcePage={currentPage}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
}
