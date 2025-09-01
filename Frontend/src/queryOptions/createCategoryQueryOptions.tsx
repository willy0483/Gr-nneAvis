import { api } from "@/lib/api";
import type { T_Category } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export const createCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });
};

const getCategories = async (): Promise<T_Category[]> => {
  return await api.get("categories");
};
