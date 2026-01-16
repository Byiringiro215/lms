import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Borrowing } from "@/types/book";
import { MoreHorizontal, RotateCcw, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ReturnDialog } from "./ReturnDialog";
import { ReminderDialog } from "./ReminderDialog";
import { Role } from "@/types/roles";

interface BorrowingTableProps {
  borrowings: Borrowing[];
  onReturn?: (id: string) => void;
  onSendReminder?: (id: string, message?: string) => void;
  userRole: Role;
  showUserColumn?: boolean;
}

export const BorrowingTable = ({
  borrowings,
  onReturn,
  onSendReminder,
  userRole,
  showUserColumn = true,
}: BorrowingTableProps) => {
  const [returnItem, setReturnItem] = useState<Borrowing | null>(null);
  const [reminderItem, setReminderItem] = useState<Borrowing | null>(null);

  const handleReturnClick = (borrowing: Borrowing) => {
    setReturnItem(borrowing);
  };

  const getStatusBadge = (status: string, isOverdue: boolean) => {
    if (status === "returned") {
      return <Badge variant="outline">Returned</Badge>;
    }
    if (isOverdue || status === "overdue") {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge variant="secondary">Active</Badge>;
  };

  const isAdmin = userRole === Role.ADMIN;

  return (
    <>
      <Table>
        <TableCaption>A list of all borrowings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            {showUserColumn && <TableHead>Borrowed By</TableHead>}
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowings.map((borrowing) => (
            <TableRow key={borrowing.id}>
              <TableCell className="font-medium">
                {borrowing.book.title}
              </TableCell>
              {showUserColumn && <TableCell>{borrowing.user.name}</TableCell>}
              <TableCell>
                {format(new Date(borrowing.borrowDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(borrowing.dueDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {getStatusBadge(borrowing.status, borrowing.isOverdue)}
              </TableCell>
              <TableCell className="text-right">
                {borrowing.status !== "returned" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {borrowing.status === "active" && (
                        <DropdownMenuItem
                          onClick={() => handleReturnClick(borrowing)}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Return Book
                        </DropdownMenuItem>
                      )}
                      {isAdmin && (
                        <>
                          {borrowing.isOverdue && (
                            <DropdownMenuItem
                              onClick={() => setReminderItem(borrowing)}
                            >
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {returnItem && (
        <ReturnDialog
          borrowing={returnItem}
          open={!!returnItem}
          onOpenChange={() => setReturnItem(null)}
          onReturn={(id) => {
            onReturn && onReturn(id);
            setReturnItem(null);
          }}
        />
      )}

      {reminderItem && (
        <ReminderDialog
          borrowing={reminderItem}
          open={!!reminderItem}
          onOpenChange={() => setReminderItem(null)}
          onSendReminder={(id, message) => {
            onSendReminder && onSendReminder(id, message);
            setReminderItem(null);
          }}
        />
      )}
    </>
  );
};
