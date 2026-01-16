"use client";

import React, { useMemo } from "react";
import { BorrowingTable } from "@/components/borrowing/BorrowingTable";
import { Borrowing } from "@/types/book";
import { Role } from "@/types/roles";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/lib/fetch-utils";

export default function UserBorrowingsPage() {
  const { user, isLoading: isUserLoading } = useAuthStatus();

  const { data: borrowings = [] } = useQuery<Borrowing[]>({
    queryKey: ["borrowings", user?.userId],
    queryFn: () =>
      fetchData<Borrowing[]>({ endpoint: `/borrowings/user/${user!.userId}` }),
    enabled: !!user?.userId,
    staleTime: 60 * 1000,
  });

  const activeBorrowings = useMemo(
    () => borrowings.filter((b) => b.status === "active"),
    [borrowings]
  );
  const returnedBorrowings = useMemo(
    () => borrowings.filter((b) => b.status === "returned"),
    [borrowings]
  );
  const overdueBorrowings = useMemo(
    () => borrowings.filter((b) => b.status === "overdue" || b.isOverdue),
    [borrowings]
  );

  const handleReturnBook = async (borrowingId: string) => {
    await fetchData({
      endpoint: `/borrowings/return/${borrowingId}`,
      method: "POST",
    });
    // React Query invalidation could be added if using queryClient
    window.location.reload();
  };

  const totalBorrowed = borrowings.length;
  const currentlyBorrowed = activeBorrowings.length;
  const overdueCount = overdueBorrowings.length;

  if (isUserLoading || !user) return null;

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Borrowings</h1>
          <p className="text-muted-foreground">
            View and manage your book borrowings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrowed
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBorrowed}</div>
              <p className="text-xs text-muted-foreground">
                Books borrowed all time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Borrowed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {currentlyBorrowed}
              </div>
              <p className="text-xs text-muted-foreground">
                Books in your possession
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {overdueCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Books past due date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Alert */}
        {overdueCount > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                Overdue Items ({overdueCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdueBorrowings.map((borrowing) => (
                  <div
                    key={borrowing.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {borrowing.book.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(borrowing.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Overdue</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleReturnBook(borrowing.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Return Book
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Borrowings Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowing History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">
                  Active ({activeBorrowings.length})
                </TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue ({overdueBorrowings.length})
                </TabsTrigger>
                <TabsTrigger value="returned">
                  Returned ({returnedBorrowings.length})
                </TabsTrigger>
                <TabsTrigger value="all">All ({borrowings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-4">
                {activeBorrowings.length > 0 ? (
                  <BorrowingTable
                    borrowings={activeBorrowings}
                    onReturn={handleReturnBook}
                    userRole={user.role as Role}
                    showUserColumn={false}
                  />
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No active borrowings
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="overdue" className="mt-4">
                {overdueBorrowings.length > 0 ? (
                  <BorrowingTable
                    borrowings={overdueBorrowings}
                    onReturn={handleReturnBook}
                    userRole={user.role as Role}
                    showUserColumn={false}
                  />
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">No overdue books</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="returned" className="mt-4">
                {returnedBorrowings.length > 0 ? (
                  <BorrowingTable
                    borrowings={returnedBorrowings}
                    onReturn={handleReturnBook}
                    userRole={user.role as Role}
                    showUserColumn={false}
                  />
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No returned books yet
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-4">
                <BorrowingTable
                  borrowings={borrowings}
                  onReturn={handleReturnBook}
                  userRole={user.role as Role}
                  showUserColumn={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
