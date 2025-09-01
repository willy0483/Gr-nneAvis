import { queryOptions } from "@tanstack/react-query";
import type { T_Product, T_ProductDetails } from "@/lib/types";
import { api } from "@/lib/api";

export const createProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 10,
  });
};

export const createProductDetailsQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["products", slug],
    queryFn: () => getProductDetails(slug),
  });
};

const getProducts = async (): Promise<T_Product[]> => {
  return await api.get("products");
};

const getProductDetails = async (slug: string): Promise<T_ProductDetails> => {
  return await api.get("products", slug);
};
