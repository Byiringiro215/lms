import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { apiBaseUrl } from "~/lib/constants";
import { useAuthStore } from "@/stores/use-auth-store";
import { getRedirectPathByRole } from "@/lib/auth-utils";
import { useQueryClient } from "@tanstack/react-query";
import { fetchData } from "~/lib/fetch-utils";

export const useAuthenticateToken = () => {
  const params = useSearchParams();
  const { push } = useRouter();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const MISToken = params.get("token");

  useEffect(() => {
    if (typeof MISToken == "string" && MISToken) {
      const authenticate = async () => {
        try {
          // Exchange the MIS token for a JWT token that will be set as a cookie
          const data = await fetchData<{ message: string; user: any }>({
            endpoint: `/auth/callback?token=${MISToken}`,
          });

          const user = data.user;

          setUser(user);

          // Prefetch the user profile data
          queryClient.prefetchQuery({
            queryKey: ["currentUser"],
            queryFn: async () => user,
          });

          const redirectPath = getRedirectPathByRole(user);
          push(redirectPath);
        } catch (error) {
          console.error("Authentication error:", error);
          push("/");
        }
      };

      authenticate();
    }
  }, [MISToken, push, setUser, queryClient]);
};
