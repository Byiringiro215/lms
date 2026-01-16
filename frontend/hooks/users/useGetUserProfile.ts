import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { User } from "~/types/user";

export const useGetUserProfile=()=>{
    return useQuery<User>({
        queryKey:queryKeys.userProfile,
        queryFn:async()=>{
            const user=await api.get("/users/profile").then(res=>res.data);
            return user;
        }
    })
}