import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { Book } from "~/types/book";


export const useBook = (id: string) => {
    return useQuery<Book>({
        queryKey: queryKeys.book(id),
        queryFn: () => api.get(`/books/${id}`).then(res => res.data),
        enabled: !!id,
    });
}