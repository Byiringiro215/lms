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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Borrowing } from "@/types/book";
import { MessageSquare, Send } from "lucide-react";

interface ReminderDialogProps {
  borrowing: Borrowing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendReminder: (borrowingId: string, message?: string) => void;
}

export const ReminderDialog = ({
  borrowing,
  open,
  onOpenChange,
  onSendReminder,
}: ReminderDialogProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!borrowing) return;

    setIsSending(true);
    try {
      await onSendReminder(borrowing.id, message);
      setMessage("");
      onOpenChange(false);
    } finally {
      setIsSending(false);
    }
  };

  const defaultMessage = borrowing
    ? `Dear ${borrowing.user.name},

This is a reminder that the book "${borrowing.book.title}" by ${
        borrowing.book.author
      } was due on ${new Date(borrowing.dueDate).toLocaleDateString()}.

Please return this book as soon as possible to avoid any late fees or restrictions on your library account.

Thank you for your cooperation.

Best regards,
Library Management System`
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Reminder
          </DialogTitle>
          <DialogDescription>
            Send a reminder to {borrowing?.user.name} about the overdue book.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
              {borrowing?.user.name} ({borrowing?.user.email})
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book">Overdue Book</Label>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
              {borrowing?.book.title} by {borrowing?.book.author}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
              {borrowing
                ? new Date(borrowing.dueDate).toLocaleDateString()
                : ""}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your reminder message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage(defaultMessage)}
              >
                Use Default Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("")}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isSending || !borrowing}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSending ? "Sending..." : "Send Reminder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
