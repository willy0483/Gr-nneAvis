import { queryOptions } from "@tanstack/react-query";
import type { T_Product, T_ProductDetails } from "@/lib/types";
import { api } from "@/lib/api";

export const createCategoryProductsQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["products", slug],
    queryFn: () => getCategoryProducts(slug),
    staleTime: 1000 * 60 * 10,
  });
};
export const createProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 10,
  });
};

export const createProductDetailsQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["productDetails", slug],
    queryFn: () => getProductDetails(slug),
    staleTime: 1000 * 60 * 10,
  });
};

const getCategoryProducts = async (slug: string): Promise<T_Product[]> => {
  return await api.get(`products/category/${slug}`);
};

const getProducts = async (): Promise<T_Product[]> => {
  return await api.get(`products`);
};

const getProductDetails = async (slug: string): Promise<T_ProductDetails> => {
  return await api.get("products", slug);
};
