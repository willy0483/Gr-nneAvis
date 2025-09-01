import Card from "@/components/card";
import { Spinner } from "@/components/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { T_Product } from "@/lib/types";
import { createProductsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Products | My Template" },
      {
        name: "description",
        content:
          "Browse our collection of products. Find details, images, and more in My Template's product catalog.",
      },
    ],
  }),
});

function RouteComponent() {
  const { data, isPending, isError, refetch, error } = useSuspenseQuery(
    createProductsQueryOptions()
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("alphabetical");

  // sort data by users choice
  const sortedData = [...data];
  switch (sortBy) {
    case "alphabetical":
      sortedData.sort((a, b) => a.slug.localeCompare(b.slug));
      break;
    case "reverse-alphabetical":
      sortedData.sort((a, b) => b.slug.localeCompare(a.slug));
      break;
    case "price-low-high":
      sortedData.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      sortedData.sort((a, b) => b.price - a.price);
      break;
    case "favoritter":
      sortedData.sort((a, b) => b.numFavorites - a.numFavorites);
      break;
    default:
      break;
  }

  /*
    https://www.npmjs.com/package/react-paginate
    code from react-paginate
  */
  const ITEMS_PER_PAGE = 9;
  const pageCount = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = sortedData.slice(offset, offset + ITEMS_PER_PAGE);

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
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className=" container mx-auto">
      {isPending ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
          <Spinner />
        </div>
      ) : (
        <>
          <section className="flex justify-between items-center">
            <h2 className="text-2xl py-4">Products</h2>
            <div>
              <Select
                value={sortBy}
                onValueChange={(val) => {
                  setSortBy(val);
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="alphabetical">
                      Alfabetisk (A-Å)
                    </SelectItem>
                    <SelectItem value="reverse-alphabetical">
                      Alfabetisk (Å-A)
                    </SelectItem>
                    <SelectItem value="price-low-high">pris lav-høj</SelectItem>
                    <SelectItem value="price-high-low">pris høj-lav</SelectItem>
                    <SelectItem value="favoritter">Populære</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>
          <section className="grid grid-cols-1 py-4 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* only render the current item max 9 items at a time */}
            {currentItems?.map((product: T_Product) => (
              <Card key={product.id} {...product} />
            ))}
          </section>
          <div className="flex justify-center my-8">
            <ReactPaginate
              breakLabel={"..."}
              nextLabel={"-›"}
              previousLabel={"‹-"}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              containerClassName="flex gap-1 items-center select-none"
              pageLinkClassName="px-3 py-1 rounded hover:cursor-pointer hover:bg-app-surface hover:text-app-accent transition-colors"
              activeClassName="text-app-accent"
              previousLinkClassName="px-3 py-1 rounded text-app-secondary hover:cursor-pointer hover:bg-app-surface transition-colors"
              nextLinkClassName="px-3 py-1 rounded text-app-secondary hover:cursor-pointer hover:bg-app-surface transition-colors"
              breakLinkClassName="px-3 py-1 text-app-muted"
              disabledClassName="opacity-40"
              forcePage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
