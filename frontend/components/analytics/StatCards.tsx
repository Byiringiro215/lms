import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, BookOpen, Users, AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: "books" | "borrowings" | "users" | "overdue";
  change?: number;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  change,
}: StatCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "books":
        return <Book className="h-4 w-4" />;
      case "borrowings":
        return <BookOpen className="h-4 w-4" />;
      case "users":
        return <Users className="h-4 w-4" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getIconClass = () => {
    switch (icon) {
      case "books":
        return "bg-blue-100 text-blue-800";
      case "borrowings":
        return "bg-green-100 text-green-800";
      case "users":
        return "bg-purple-100 text-purple-800";
      case "overdue":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-1 ${getIconClass()}`}>{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change !== undefined && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={change >= 0 ? "text-green-600" : "text-destructive"}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="ml-1 text-muted-foreground">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  totalBooks: number;
  totalBorrowings: number;
  totalUsers: number;
  totalOverdue: number;
  bookChange?: number;
  borrowingChange?: number;
  userChange?: number;
  overdueChange?: number;
}

export const StatCards = ({
  totalBooks,
  totalBorrowings,
  totalUsers,
  totalOverdue,
  bookChange,
  borrowingChange,
  userChange,
  overdueChange,
}: StatCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Books"
        value={totalBooks}
        description="Total books in library"
        icon="books"
        change={bookChange}
      />
      <StatCard
        title="Active Borrowings"
        value={totalBorrowings}
        description="Books currently borrowed"
        icon="borrowings"
        change={borrowingChange}
      />
      <StatCard
        title="Registered Users"
        value={totalUsers}
        description="Total registered users"
        icon="users"
        change={userChange}
      />
      <StatCard
        title="Overdue Items"
        value={totalOverdue}
        description="Books past due date"
        icon="overdue"
        change={overdueChange}
      />
    </div>
  );
};
