"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { Role } from "@/types/roles";
import { getRedirectPathByRole } from "@/lib/auth-utils";
import { LoadingSpinner } from "./loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Role[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRoles = [],
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  ),
}: ProtectedRouteProps) {
  // TEMPORARILY BYPASSING AUTHENTICATION FOR DEVELOPMENT TESTING
  // Uncomment the lines below to re-enable authentication

  // const { user, isLoading, isAuthenticated, checkRoles } = useAuthStatus();
  // const router = useRouter();
  // const [showLoading, setShowLoading] = useState(false);

  // // Only show loading spinner after a delay to avoid flashes during quick navigations
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isLoading) {
  //       setShowLoading(true);
  //     }
  //   }, 500); // 500ms delay before showing spinner

  //   return () => clearTimeout(timer);
  // }, [isLoading]);

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push("/");
  //     return;
  //   }

  //   if (!isLoading && isAuthenticated && user && requiredRoles.length > 0) {
  //     const hasAccess = checkRoles(requiredRoles);

  //     if (!hasAccess) {
  //       const redirectPath = getRedirectPathByRole(user);
  //       router.push(redirectPath);
  //     }
  //   }
  // }, [isLoading, isAuthenticated, user, requiredRoles, checkRoles, router]);

  // if (isLoading && showLoading) {
  //   return fallback;
  // }

  // if (
  //   !isLoading &&
  //   isAuthenticated &&
  //   requiredRoles.length > 0 &&
  //   !checkRoles(requiredRoles)
  // ) {
  //   return null;
  // }

  // if (
  //   !isLoading &&
  //   isAuthenticated &&
  //   (requiredRoles.length === 0 || checkRoles(requiredRoles))
  // ) {
  //   return <>{children}</>;
  // }

  // return null;

  // TEMPORARY: Always render children for development testing
  return <>{children}</>;
}
