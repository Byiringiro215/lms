import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { User } from "~/types/user";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<User, unknown, User>({
        mutationFn: (updatedUser: User) => api.put(`/users/${updatedUser.userId}`, updatedUser).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users })
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update user");
        }
    })
}