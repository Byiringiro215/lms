import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Book } from "@/types/book";
import { User } from "@/types/user";
import { Calendar, BookOpen } from "lucide-react";

interface BorrowDialogProps {
  book: Book | null;
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBorrow: (bookId: string, dueDate: string) => void;
  existingBorrowings?: string[]; // Array of book IDs already borrowed by user
  currentBorrowingsCount?: number; // Current number of active borrowings
}

export const BorrowDialog = ({
  book,
  user,
  open,
  onOpenChange,
  onBorrow,
  existingBorrowings = [],
  currentBorrowingsCount = 0,
}: BorrowDialogProps) => {
  const [dueDate, setDueDate] = useState("");
  const [isBorrowing, setIsBorrowing] = useState(false);

  // Check if user has already borrowed this book
  const hasAlreadyBorrowed = book
    ? existingBorrowings.includes(book.id)
    : false;

  // Check borrowing limits based on user role
  const isStudent = user?.role === "STUDENT";
  const maxBorrowings = isStudent ? 3 : Infinity; // 3 for students, unlimited for teachers
  const hasReachedLimit = isStudent && currentBorrowingsCount >= maxBorrowings;

  // Calculate minimum date (today + 1 day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split("T")[0];

  // Calculate maximum date (today + 30 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleBorrow = async () => {
    if (!book || !user || !dueDate) return;

    setIsBorrowing(true);
    try {
      await onBorrow(book.id, dueDate);
      setDueDate("");
      onOpenChange(false);
    } finally {
      setIsBorrowing(false);
    }
  };

  const handleClose = () => {
    setDueDate("");
    onOpenChange(false);
  };

  if (!book || !user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Borrow Book
          </DialogTitle>
          <DialogDescription>
            Select a return date for this book.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="book">Book</Label>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
              {book.title} by {book.author}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user">Borrower</Label>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
              {user.name} ({user.email})
            </div>
          </div>

          {hasAlreadyBorrowed && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ You have already borrowed this book. You cannot borrow it
                again.
              </p>
            </div>
          )}

          {hasReachedLimit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                ⚠️ You have reached your borrowing limit of {maxBorrowings}{" "}
                books. Please return some books before borrowing more.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dueDate">Return Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={minDateString}
              max={maxDateString}
              disabled={hasAlreadyBorrowed || hasReachedLimit}
            />
            <p className="text-xs text-muted-foreground">
              Please select a return date between {minDate.toLocaleDateString()}{" "}
              and {maxDate.toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Book Information</Label>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">ISBN:</span> {book.isbn}
              </div>
              <div>
                <span className="font-medium">Category:</span> {book.category}
              </div>
              <div>
                <span className="font-medium">Available Copies:</span>{" "}
                {book.availableCopies}
              </div>
              <div>
                <span className="font-medium">Total Copies:</span>{" "}
                {book.totalCopies}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isBorrowing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBorrow}
            disabled={
              isBorrowing || !dueDate || hasAlreadyBorrowed || hasReachedLimit
            }
            className="bg-green-600 hover:bg-green-700"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {isBorrowing ? "Borrowing..." : "Borrow Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
