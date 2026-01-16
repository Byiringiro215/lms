"use client";

import { ReactNode } from "react";
import { useAuthStatus } from "@/hooks/use-auth-status";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useAuthStatus();

  return <>{children}</>;
}
