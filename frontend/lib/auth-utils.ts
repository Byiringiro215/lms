import { Role } from "@/types/roles";
import { User } from "@/types/user";

/**
 * Get the appropriate redirect path based on user role
 */
export const getRedirectPathByRole = (user: User | null): string => {
  if (!user) return "/";

  switch (user.role) {
    case Role.ADMIN:
      return "/dashboard";
    case Role.STUDENT:
      return "/books";
    case Role.TEACHER:
      return "/books";
    default:
      return "/";
  }
};

/**
 * Check if user has required role
 */
export const hasRequiredRole = (
  user: User | null,
  requiredRoles: Role[]
): boolean => {
  if (!user || !requiredRoles.length) return false;
  return requiredRoles.includes(user.role);
};
