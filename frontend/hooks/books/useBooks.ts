import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { Book } from "~/types/book";

export const useBooks = () => {
    return useQuery<Book[]>({
        queryKey: queryKeys.books,
        queryFn: async () => {
            const { data } = await api.get('/books');
            return data;
        },
    });
}

