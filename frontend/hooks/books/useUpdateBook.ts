import { useQueryClient, useMutation } from "@tanstack/react-query"
import { api } from "~/lib/axios"
import { queryKeys } from "~/lib/constants";
import { Book } from "~/types/book";
import { toast } from "sonner";

export const useUpdateBook = () => {
    const queryClient = useQueryClient();
    return useMutation<Book, unknown, Book>({
        mutationFn: (updatedBook) => api.patch(`/books/${updatedBook.id}`, updatedBook).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.books });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update book");
        }
    });
}
