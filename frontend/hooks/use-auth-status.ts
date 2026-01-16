import { useAuthStore } from "@/stores/use-auth-store";
import { Role } from "@/types/roles";
import { hasRequiredRole } from "@/lib/auth-utils";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "~/types/user";
import { fetchData } from "~/lib/fetch-utils";

export const useAuthStatus = () => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () => fetchData<User>({ endpoint: "/users/profile" }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { isAuthenticated, setUser } = useAuthStore();

  const checkRole = (requiredRole: Role): boolean => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  const checkRoles = (requiredRoles: Role[]): boolean => {
    if (!user) return false;
    return hasRequiredRole(user, requiredRoles);
  };

  const isAdmin = (): boolean => checkRole(Role.ADMIN);
  const isStudent = (): boolean => checkRole(Role.STUDENT);
  const isTeacher = (): boolean => checkRole(Role.TEACHER);

  // Sync the TanStack Query state with Zustand store
  useEffect(() => {
    if (user && !isAuthenticated) {
      setUser(user);
    }
  }, [user, isAuthenticated, setUser]);

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: isAuthenticated && !!user,
    isAdmin,
    isStudent,
    isTeacher,
    checkRole,
    checkRoles,
    refetch,
  };
};
