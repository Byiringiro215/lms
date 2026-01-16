import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { fetchData } from "~/lib/fetch-utils";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint to clear the JWT cookie
      await fetchData({ endpoint: "/auth/logout", method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API call success
      logout();
      queryClient.clear(); // Clear all queries in the cache
      router.push("/");
    }
  };

  return { handleLogout };
};
