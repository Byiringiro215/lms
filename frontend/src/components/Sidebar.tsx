"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2x2,
  Users,
  BookOpen,
  ShieldQuestionMark,
  LogOut,
  UserCircle,
  BarChart3,
  FileText,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";
import { useLogout } from "@/hooks/use-logout";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { Role } from "@/types/roles";

const adminLinks = [
  {
    name: "Dashboard",
    icon: <Grid2x2 className="w-5 h-5" />,
    href: "/admin/dashboard",
  },
  {
    name: "Books",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/admin/books",
  },
  {
    name: "Borrowings",
    icon: <ShieldQuestionMark className="w-5 h-5" />,
    href: "/admin/borrowings",
  },
  {
    name: "Users",
    icon: <Users className="w-5 h-5" />,
    href: "/admin/users",
  },
  {
    name: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/admin/analytics",
  },
  {
    name: "Reports",
    icon: <FileText className="w-5 h-5" />,
    href: "/admin/reports",
  },
  {
    name: "Profile",
    icon: <UserCircle className="w-5 h-5" />,
    href: "/admin/profile",
  },
  {
    name: "Help",
    icon: <HelpCircle className="w-5 h-5" />,
    href: "/admin/help",
  },
];

const userLinks = [
  {
    name: "Dashboard",
    icon: <Grid2x2 className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    name: "Books",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/books",
  },
  {
    name: "Borrowings",
    icon: <ShieldQuestionMark className="w-5 h-5" />,
    href: "/borrowings",
  },
  {
    name: "Profile",
    icon: <UserCircle className="w-5 h-5" />,
    href: "/profile",
  },
  {
    name: "Help",
    icon: <HelpCircle className="w-5 h-5" />,
    href: "/help",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { handleLogout } = useLogout();
  const { user } = useAuthStatus();

  // Determine if user is admin based on pathname or user role
  const isAdmin = pathname.startsWith("/admin") || user?.role === Role.ADMIN;
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="group fixed top-0 left-0 z-20 h-screen bg-white flex flex-col border-r border-gray-200 overflow-y-auto overflow-x-visible w-16 hover:w-64 transition-[width] duration-300">
      {/* Header */}
      <div className="flex items-center py-4 border-b border-gray-200 px-4 group-hover:gap-3 group-hover:px-6 transition-[gap,padding] duration-300">
        
        <BookOpen className="w-7 h-7 text-gray-700 flex-shrink-0" />
        <span className="text-lg font-semibold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          RCA Library
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col py-4">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={clsx(
              "group/link relative flex items-center py-2.5 rounded-xl transition-colors duration-150 px-4 group-hover:gap-3 group-hover:px-6",
              pathname === link.href
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span className="grid place-items-center w-8 h-8">
              {link.icon}
            </span>
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {link.name}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 rounded-full bg-white text-gray-800 text-xs px-3 py-1.5 border border-gray-200 opacity-0 translate-x-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 whitespace-nowrap shadow-lg z-50 transition-all duration-200"
            >
              {link.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="mb-3 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-xs text-gray-500 mb-1">Logged in as</p>
          <p className="text-sm font-medium text-gray-700 truncate">
            {user?.email || "user@example.com"}
          </p>
        </div>
        <div
          className="relative flex items-center rounded-lg cursor-pointer transition-colors duration-150 py-3 px-4 group-hover:gap-3 group-hover:px-6"
          onClick={handleLogout}
          role="button"
          tabIndex={0}
          aria-label="Logout"
          onKeyDown={(e) => e.key === "Enter" && handleLogout()}
        >
          <span className="grid place-items-center w-8 h-8 text-gray-600">
            <LogOut className="w-5 h-5" />
          </span>
          <span className="text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Logout
          </span>
      
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
