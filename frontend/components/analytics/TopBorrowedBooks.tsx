import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookAnalytics } from "@/types/book";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopBorrowedBooksProps {
  books: BookAnalytics[];
  period?: "week" | "month" | "year";
}

export const TopBorrowedBooks = ({
  books,
  period = "month",
}: TopBorrowedBooksProps) => {
  const periodText = {
    week: "This Week",
    month: "This Month",
    year: "This Year",
  };

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, string> = {
      fiction: "bg-blue-100 text-blue-800",
      science: "bg-green-100 text-green-800",
      history: "bg-amber-100 text-amber-800",
      biography: "bg-purple-100 text-purple-800",
      technology: "bg-cyan-100 text-cyan-800",
      business: "bg-rose-100 text-rose-800",
    };

    const lowerCategory = category.toLowerCase();
    const badgeClass = categories[lowerCategory] || "bg-gray-100 text-gray-800";

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
      >
        {category}
      </span>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Borrowed Books</CardTitle>
        <CardDescription>
          Most popular books {periodText[period].toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Borrows</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{getCategoryBadge(book.category)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{book.borrowCount}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-muted-foreground"
                >
                  No borrowing data available for this period
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
