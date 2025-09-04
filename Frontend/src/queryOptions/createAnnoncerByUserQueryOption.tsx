import { api } from "@/lib/api";
import type { T_Annoncer } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export const createAnnoncerByUserQueryOption = (id: number) => {
  return queryOptions({
    queryKey: ["annoncer", id],
    queryFn: () => getAnnoncerByUser(id),
    staleTime: 1000 * 60 * 10,
  });
};

const getAnnoncerByUser = async (id: number): Promise<T_Annoncer[]> => {
  return await api.get(`products/user/${id}`);
};
