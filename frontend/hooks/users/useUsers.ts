import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import { queryKeys } from "~/lib/constants";
import { User } from "~/types/user";



export const useUsers=()=>{
return useQuery<User[]>({
        queryKey:queryKeys.users,
        queryFn:async()=>{
            const users=await api.get("/users").then(res=>res.data);
            return users;
        }
    })
}