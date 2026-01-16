"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticateToken } from "~/hooks/use-authenticate-token";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { getRedirectPathByRole } from "@/lib/auth-utils";
import { SubmitButton } from "./ui/submit-button";
import { BookOpen } from "lucide-react";

export function Login() {
  useAuthenticateToken();
  const { user, isAuthenticated, isLoading } = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to appropriate page based on role
    if (!isLoading && isAuthenticated && user) {
      const redirectPath = getRedirectPathByRole(user);
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router, isLoading]);

  return (
    <Link href={`/api/auth/login`}>
      <SubmitButton
        className="px-6 py-4 font-medium h-[40px] w-full"
        isSubmitting={false}
      >
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Continue with RCA MIS</span>
        </div>
      </SubmitButton>
    </Link>
  );
}
