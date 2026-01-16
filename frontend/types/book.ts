import { User } from "./user";

export type BookStatus = "available" | "borrowed" | "overdue";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  publishedYear?: number;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
  category: string;
};

export type BookFormData = Omit<
  Book,
  "id" | "createdAt" | "updatedAt" | "availableCopies"
> & {
  availableCopies?: number;
};

export type Borrowing = {
  id: string;
  user: User;
  book: Book;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "overdue" | "returned";
  isOverdue: boolean;
  createdAt: string;
};

export type BorrowingFormData = {
  userId: string;
  bookId: string;
  dueDate: string;
};

export type BookAnalytics = {
  title: string;
  author: string;
  borrowCount: number;
  category: string;
};

export type OverdueItem = {
  id: string;
  user: User;
  book: Book;
  borrowDate: string;
  dueDate: string;
  daysOverdue: number;
};
