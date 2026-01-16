import { useQueryClient, useMutation } from "@tanstack/react-query"
import { api } from "~/lib/axios"
import { queryKeys } from "~/lib/constants";
import { toast } from "sonner";

export const useDeleteBook = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, string>({
        mutationFn: (id) => api.delete(`/books/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.books });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete book");
        }
    });
}