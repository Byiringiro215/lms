"use client";

import React, { useMemo } from "react";
import { Role } from "@/types/roles";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorrowingTable } from "@/components/borrowing/BorrowingTable";
import { Borrowing } from "@/types/book";
import {
  BookOpen,
  Clock,
  AlertCircle,
  Search,
  Bell,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/fetch-utils";

export default function UserDashboardPage() {
  const { user, isLoading: isUserLoading } = useAuthStatus();

  const { data: borrowings = [], isLoading: isBorrowingsLoading } = useQuery<
    Borrowing[]
  >({
    queryKey: ["borrowings", user?.userId],
    queryFn: () =>
      fetchData<Borrowing[]>({ endpoint: `/borrowings/user/${user!.userId}` }),
    enabled: !!user?.userId,
    staleTime: 60 * 1000,
  });

  const handleReturnBook = (id: string) => {
    console.log(`Returning book with borrowing ID: ${id}`);
  };

  const {
    activeBorrowings,
    overdueBorrowings,
    returnedBorrowings,
    totalBorrowed,
  } = useMemo(() => {
    const active = borrowings.filter((b) => b.status === "active");
    const overdue = borrowings.filter(
      (b) => b.status === "overdue" || b.isOverdue
    );
    const returned = borrowings.filter((b) => b.status === "returned");
    return {
      activeBorrowings: active,
      overdueBorrowings: overdue,
      returnedBorrowings: returned,
      totalBorrowed: borrowings.length,
    };
  }, [borrowings]);

  type Notification = {
    id: string;
    type: "overdue" | "due_soon";
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  };

  const notifications: Notification[] = useMemo(() => {
    const now = new Date();
    const soonMs = 3 * 24 * 60 * 60 * 1000; // 3 days
    const items: Notification[] = [];
    for (const b of borrowings) {
      const due = new Date(b.dueDate);
      if (b.status === "overdue" || b.isOverdue) {
        items.push({
          id: b.id,
          type: "overdue",
          title: "Book Overdue",
          message: `${b.book.title} is overdue`,
          timestamp: b.dueDate,
          read: false,
        });
      } else if (
        b.status === "active" &&
        due.getTime() - now.getTime() <= soonMs &&
        due > now
      ) {
        items.push({
          id: b.id,
          type: "due_soon",
          title: "Book Due Soon",
          message: `${b.book.title} is due soon`,
          timestamp: b.dueDate,
          read: false,
        });
      }
    }
    return items.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [borrowings]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "due_soon":
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isUserLoading || !user) return null;

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col  lg:flex-row  lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's your library activity.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/books">
                <Search className="mr-2 h-4 w-4" />
                Browse Books
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Borrowed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeBorrowings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Books in your possession
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Items
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {overdueBorrowings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Books past due date
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrowed
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBorrowed}</div>
              <p className="text-xs text-muted-foreground">Books borrowed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notifications
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">
                Unread notifications
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Borrowings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Borrowings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BorrowingTable
                borrowings={activeBorrowings}
                onReturn={handleReturnBook}
                userRole={user.role as Role}
                showUserColumn={false}
              />
              {activeBorrowings.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No books currently borrowed
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      !notification.read ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notifications
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
