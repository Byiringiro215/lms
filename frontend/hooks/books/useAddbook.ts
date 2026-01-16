import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { Book, BookFormData } from "~/types/book";
import { toast } from "sonner";

export const useAddBook = () => {
    const queryClient = useQueryClient();
    return useMutation<BookFormData, unknown, Book>({
        mutationFn: (newBook) => api.post('/books', newBook).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.books });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to add book");
        }
    });
}