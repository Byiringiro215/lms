import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverdueItem } from "@/types/book";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Send } from "lucide-react";

interface OverdueItemsProps {
  items: OverdueItem[];
  onSendReminder?: (userId: string) => void;
}

export const OverdueItems = ({ items, onSendReminder }: OverdueItemsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Overdue Items</CardTitle>
        <CardDescription>Books that are past their due date</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.user.name}</TableCell>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>
                  {format(new Date(item.dueDate), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <span className="text-destructive font-medium">
                    {item.daysOverdue} {item.daysOverdue === 1 ? "day" : "days"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onSendReminder && onSendReminder(item.user.userId)
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-muted-foreground"
                >
                  No overdue items at the moment
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
