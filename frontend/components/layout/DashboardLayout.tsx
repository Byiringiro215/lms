import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "@/types/roles";
import { User as UserType } from "@/types/user";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";
import Sidebar from "@/src/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
}

export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const { handleLogout } = useLogout();
  const isAdmin = user.role === Role.ADMIN;
  const isTeacher = user.role === Role.TEACHER;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop only */}
      <div className="hidden lg:block peer">
        <Sidebar />
      </div>

      {/* Mobile navbar */}
      <div className="flex flex-col w-full lg:ml-16 lg:peer-hover:ml-64 transition-[margin] duration-300">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>RCA Library</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
