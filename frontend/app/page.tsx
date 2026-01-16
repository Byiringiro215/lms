import Image from "next/image";
import { Login } from "~/components/login";
import backgroundLight from "@/public/assets/bg-login.jpg";
import backgroundDark from "@/public/assets/bg-login-dark.jpg";
import { GraduationCap } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | RCA",
};

export default function Home() {
  return (
    <div className="h-screen p-2">
      {/* Header - Logo */}
      <header className="absolute top-0 left-0 z-30 w-full">
        <div className="p-6 md:p-8 sm:text-white">
          <GraduationCap />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-full">
        {/* Background Image Section - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src={backgroundLight}
            alt="Background"
            className="object-cover dark:hidden"
            priority
            fill
          />
          <Image
            src={backgroundDark}
            alt="Background"
            className="object-cover hidden dark:block"
            priority
            fill
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 relative">
          {/* Form Content */}
          <div className="relative z-10 flex h-full items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">
              {/* Welcome Section */}
              <div className="text-center">
                <h1 className="text-lg mb-4 font-serif">Welcome to back!</h1>
                <p className="text-[#878787] text-sm mb-8">
                  New here or coming back? Choose how you want to continue
                </p>
              </div>

              {/* Sign In Options */}
              <div className="space-y-4">
                {/* Primary Sign In Option */}
                <div className="space-y-3">
                  <Suspense fallback={null}>
                    <Login />
                  </Suspense>
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="text-center absolute bottom-4 left-0 right-0">
                <p className="text-xs text-[#878787] leading-relaxed font-mono">
                  By signing in you agree to our Terms of service & Privacy
                  policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
