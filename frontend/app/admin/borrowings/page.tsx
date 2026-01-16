"use client";

import React, { useState } from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { BorrowingTable } from "../../../components/borrowing/BorrowingTable";
import { SuccessDialog } from "../../../components/borrowing/SuccessDialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Borrowing } from "../../../types/book";
import {
  BookOpen,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

// Mock admin user
const mockAdminUser = {
  userId: "admin1",
  name: "Sarah Johnson",
  email: "sarah.johnson@rca.edu",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock borrowings data
const mockBorrowings: Borrowing[] = [
  {
    id: "1",
    user: {
      userId: "user1",
      name: "John Doe",
      email: "john@example.com",
      role: Role.STUDENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    book: {
      id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      description: "A handbook of agile software craftsmanship",
      publishedYear: 2008,
      totalCopies: 5,
      availableCopies: 3,
      category: "Technology",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    borrowDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    isOverdue: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    user: {
      userId: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: Role.TEACHER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    book: {
      id: "2",
      title: "Design Patterns",
      author: "Erich Gamma et al.",
      isbn: "9780201633610",
      description: "Elements of Reusable Object-Oriented Software",
      publishedYear: 1994,
      totalCopies: 3,
      availableCopies: 1,
      category: "Technology",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    borrowDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    isOverdue: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    user: {
      userId: "user3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: Role.STUDENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    book: {
      id: "3",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      isbn: "9780201616224",
      description: "Your journey to mastery",
      publishedYear: 1999,
      totalCopies: 4,
      availableCopies: 2,
      category: "Technology",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    borrowDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    returnDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    status: "returned",
    isOverdue: false,
    createdAt: new Date().toISOString(),
  },
];

export default function AdminBorrowingsPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>(mockBorrowings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [successDialog, setSuccessDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: "", message: "" });

  const filteredBorrowings = borrowings.filter((borrowing) => {
    const matchesSearch =
      borrowing.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrowing.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrowing.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrowing.book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || borrowing.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleConfirmReturn = (borrowingId: string) => {
    const borrowing = borrowings.find((b) => b.id === borrowingId);
    setBorrowings(
      borrowings.map((borrowing) =>
        borrowing.id === borrowingId
          ? {
              ...borrowing,
              status: "returned",
              returnDate: new Date().toISOString(),
              isOverdue: false,
            }
          : borrowing
      )
    );

    if (borrowing) {
      setSuccessDialog({
        open: true,
        title: "Return Confirmed",
        message: `Book "${borrowing.book.title}" has been successfully marked as returned.`,
      });
    }
  };

  const handleSendReminder = (borrowingId: string, message?: string) => {
    const borrowing = borrowings.find((b) => b.id === borrowingId);
    if (borrowing) {
      // In a real app, this would send an email/notification
      // You could integrate with a notification service here
      setSuccessDialog({
        open: true,
        title: "Reminder Sent",
        message: `Reminder has been sent to ${borrowing.user.name} for the book "${borrowing.book.title}".`,
      });
    }
  };

  const handleExportBorrowings = () => {
    const csvContent = [
      [
        "User",
        "Email",
        "Book",
        "Author",
        "Borrow Date",
        "Due Date",
        "Status",
        "Overdue",
      ],
      ...filteredBorrowings.map((borrowing) => [
        borrowing.user.name,
        borrowing.user.email,
        borrowing.book.title,
        borrowing.book.author,
        new Date(borrowing.borrowDate).toLocaleDateString(),
        new Date(borrowing.dueDate).toLocaleDateString(),
        borrowing.status,
        borrowing.isOverdue ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "borrowings.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeBorrowings = borrowings.filter((b) => b.status === "active");
  const overdueBorrowings = borrowings.filter((b) => b.isOverdue);
  const returnedBorrowings = borrowings.filter((b) => b.status === "returned");

  return (
    <DashboardLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Borrowings Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all book borrowings
            </p>
          </div>
          <Button onClick={handleExportBorrowings} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrowings
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{borrowings.length}</div>
              <p className="text-xs text-muted-foreground">
                All time borrowings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {activeBorrowings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently borrowed
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
                {overdueBorrowings.length}
              </div>
              <p className="text-xs text-muted-foreground">Past due date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returned</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {returnedBorrowings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully returned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by user name, email, book title, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrowings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowings ({filteredBorrowings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <BorrowingTable
              borrowings={filteredBorrowings}
              onReturn={handleConfirmReturn}
              onSendReminder={handleSendReminder}
              userRole={mockAdminUser.role}
              showUserColumn={true}
            />
            {filteredBorrowings.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No borrowings found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overdue Alerts */}
        {overdueBorrowings.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                Overdue Items ({overdueBorrowings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdueBorrowings.slice(0, 5).map((borrowing) => (
                  <div
                    key={borrowing.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {borrowing.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {borrowing.book.title} - Due:{" "}
                        {new Date(borrowing.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleConfirmReturn(borrowing.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Mark Returned
                    </Button>
                  </div>
                ))}
                {overdueBorrowings.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    And {overdueBorrowings.length - 5} more overdue items...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <SuccessDialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog((prev) => ({ ...prev, open }))}
        title={successDialog.title}
        message={successDialog.message}
      />
    </DashboardLayout>
  );
}
