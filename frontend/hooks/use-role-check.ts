import { useAuthStatus } from "./use-auth-status";
import { Role } from "@/types/roles";

export function useRoleCheck() {
  const { user, isLoading, isAuthenticated, checkRole, checkRoles } =
    useAuthStatus();

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin: () => checkRole(Role.ADMIN),
    isStudent: () => checkRole(Role.STUDENT),
    isTeacher: () => checkRole(Role.TEACHER),
    hasRole: (role: Role) => checkRole(role),
    hasAnyRole: (roles: Role[]) => checkRoles(roles),
    hasAllRoles: (roles: Role[]) => {
      if (!user || isLoading || !isAuthenticated) return false;
      return roles.every((role) => user.role === role);
    },
  };
}
