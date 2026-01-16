import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Borrowing } from "@/types/book";
import { format, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ReturnDialogProps {
  borrowing: Borrowing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReturn: (id: string) => void;
}

export const ReturnDialog = ({
  borrowing,
  open,
  onOpenChange,
  onReturn,
}: ReturnDialogProps) => {
  const dueDate = new Date(borrowing.dueDate);
  const today = new Date();
  const daysLate = differenceInDays(today, dueDate);
  const isOverdue = borrowing.isOverdue || daysLate > 0;

  const handleReturn = () => {
    onReturn(borrowing.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Return Book</DialogTitle>
          <DialogDescription>
            You are returning: <strong>{borrowing.book.title}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Borrowing Details:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Book:</div>
              <div className="font-medium">{borrowing.book.title}</div>
              <div>Author:</div>
              <div className="font-medium">{borrowing.book.author}</div>
              <div>Borrowed On:</div>
              <div className="font-medium">
                {format(new Date(borrowing.borrowDate), "MMM d, yyyy")}
              </div>
              <div>Due Date:</div>
              <div className="font-medium">
                {format(new Date(borrowing.dueDate), "MMM d, yyyy")}
              </div>
              <div>Status:</div>
              <div>
                {isOverdue ? (
                  <Badge variant="destructive">
                    {daysLate} {daysLate === 1 ? "day" : "days"} overdue
                  </Badge>
                ) : (
                  <Badge variant="secondary">On time</Badge>
                )}
              </div>
            </div>
          </div>
          {isOverdue && (
            <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <p className="text-sm font-medium text-destructive">
                This book is overdue. Please check with the librarian for any
                applicable fees.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReturn}>Confirm Return</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
