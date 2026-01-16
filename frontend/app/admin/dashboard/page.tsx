"use client";

import React from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { StatCards } from "../../../components/analytics/StatCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BorrowingTable } from "../../../components/borrowing/BorrowingTable";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Borrowing } from "../../../types/book";
import {
  BookOpen,
  Clock,
  AlertCircle,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Plus,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";

// Mock admin user
const mockAdminUser = {
  userId: "admin1",
  name: "Sarah Johnson",
  email: "sarah.johnson@rca.edu",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock data for recent borrowings
const mockRecentBorrowings: Borrowing[] = [
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: "Technology",
    },
    borrowDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: "Technology",
    },
    borrowDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    isOverdue: false,
    createdAt: new Date().toISOString(),
  },
];

// Mock overdue items
const mockOverdueItems = [
  {
    id: "1",
    userName: "Bob Johnson",
    userEmail: "bob@example.com",
    bookTitle: "The Pragmatic Programmer",
    daysOverdue: 5,
    fine: 5.0,
  },
  {
    id: "2",
    userName: "Alice Williams",
    userEmail: "alice@example.com",
    bookTitle: "Design Patterns",
    daysOverdue: 3,
    fine: 3.0,
  },
];

// Mock recent activities
const mockRecentActivities = [
  {
    id: "1",
    type: "book_added",
    title: "New book added",
    description: "Clean Code by Robert C. Martin",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: "Sarah Johnson",
  },
  {
    id: "2",
    type: "user_registered",
    title: "New user registered",
    description: "Jane Smith (Teacher)",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    user: "System",
  },
  {
    id: "3",
    type: "book_returned",
    title: "Book returned",
    description: "To Kill a Mockingbird by John Doe",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    user: "John Doe",
  },
];

export default function AdminDashboardPage() {
  const handleReturnBook = (id: string) => {
    console.log(`Returning book with borrowing ID: ${id}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "book_added":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "user_registered":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "book_returned":
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {mockAdminUser.name}! Here's what's happening in
              your library today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/books">
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Statistics */}
        <StatCards
          totalBooks={150}
          totalBorrowings={42}
          totalUsers={87}
          totalOverdue={8}
          bookChange={5}
          borrowingChange={12}
          userChange={8}
          overdueChange={-15}
        />

        {/* Quick Actions Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/books">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Manage Books</h3>
                    <p className="text-sm text-muted-foreground">
                      Add, edit, or remove books
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/users">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium">Manage Users</h3>
                    <p className="text-sm text-muted-foreground">
                      User accounts and roles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/reports">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Generate Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Analytics and insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Borrowings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Borrowings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BorrowingTable
                borrowings={mockRecentBorrowings}
                onReturn={handleReturnBook}
                userRole={mockAdminUser.role}
                showUserColumn={true}
              />
            </CardContent>
          </Card>

          {/* Overdue Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Overdue Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOverdueItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {item.userName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{item.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.bookTitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">
                        {item.daysOverdue} days
                      </Badge>
                    </div>
                  </div>
                ))}
                {mockOverdueItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No overdue items
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Connected and healthy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
