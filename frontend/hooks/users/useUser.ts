import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { User } from "~/types/user";

export const useUser = (id: string) => {
    return useQuery<User>({
        queryKey: queryKeys.user(id),
        queryFn: () => api.get(`/users/${id}`).then(res => res.data),
        enabled: !!id,
    });
}