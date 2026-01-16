"use client";

import React from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { StatCards } from "../../../components/analytics/StatCards";
import { TopBorrowedBooks } from "../../../components/analytics/TopBorrowedBooks";
import { BorrowingStats } from "../../../components/analytics/BorrowingStats";
import { OverdueItems } from "../../../components/analytics/OverdueItems";
import { BookAnalytics, OverdueItem } from "../../../types/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

// Mock user - would come from auth context in real implementation
const mockUser = {
  userId: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock data for top borrowed books
const mockTopBooks: BookAnalytics[] = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    borrowCount: 15,
    category: "Technology",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowCount: 12,
    category: "Fiction",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    borrowCount: 10,
    category: "Technology",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowCount: 8,
    category: "Fiction",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    borrowCount: 7,
    category: "Technology",
  },
];

// Mock data for borrowing stats
const mockBorrowingStats = [
  { name: "Jan", students: 20, teachers: 5 },
  { name: "Feb", students: 25, teachers: 8 },
  { name: "Mar", students: 30, teachers: 10 },
  { name: "Apr", students: 22, teachers: 7 },
  { name: "May", students: 28, teachers: 9 },
  { name: "Jun", students: 32, teachers: 11 },
];


export default function AnalyticsPage() {
  const handleSendReminder = (userId: string) => {
    // In a real app, this would be an API call
    console.log(`Sending reminder to user: ${userId}`);
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Library usage statistics and reports
            </p>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        <div className="grid gap-6 md:grid-cols-2">
          <TopBorrowedBooks books={mockTopBooks} />
          <BorrowingStats data={mockBorrowingStats} />
        </div>
      </div>
    </DashboardLayout>
  );
}
