import { api } from "@/lib/api";
import type { T_Comment } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export const createCommentsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    staleTime: 1000 * 60 * 10,
  });
};

const getComments = async (id: number): Promise<T_Comment[]> => {
  return await api.get("comments", undefined, id);
};
