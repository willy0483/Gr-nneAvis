import { createCategoriesQueryOptions } from "@/queryOptions/createCategoryQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const Aside = () => {
  const { data } = useSuspenseQuery(createCategoriesQueryOptions());

  return (
    <aside className="w-full sm:w-48 md:w-56 lg:w-64 px-2 py-4 sm:py-0 sm:px-0 md:bg-transparent border-b sm:border-none">
      <h2 className="text-xl sm:text-2xl mb-2 sm:mb-4">Alle kategorier</h2>
      <ul className="flex flex-row sm:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-visible">
        {data.map((item) => (
          <Link
            key={item.id}
            to="/category/$category"
            params={{ category: item.slug }}
            className="[&.active]:font-bold px-2 py-1 rounded whitespace-nowrap"
          >
            <li>{item.name}</li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};
export default Aside;
