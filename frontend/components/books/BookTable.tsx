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
import { Book } from "@/types/book";
import { MoreHorizontal, Edit, Trash2, BookCopy } from "lucide-react";
import { BookDialog } from "./BookDialog";
import { BorrowDialog } from "../borrowing/BorrowDialog";
import { Role } from "@/types/roles";
import { User } from "@/types/user";

interface BookTableProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
  onBorrow?: (bookId: string) => void;
  userRole: Role;
  user?: User | null;
}

export const BookTable = ({
  books,
  onEdit,
  onDelete,
  onBorrow,
  userRole,
  user,
}: BookTableProps) => {
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [borrowBook, setBorrowBook] = useState<Book | null>(null);

  const handleEditClick = (book: Book) => {
    setEditBook(book);
  };

  const handleBorrowClick = (book: Book) => {
    setBorrowBook(book);
  };

  const getStatusBadge = (available: number, total: number) => {
    if (available === 0) {
      return <Badge variant="destructive">Unavailable</Badge>;
    }
    if (available < total) {
      return <Badge variant="outline">{available} Available</Badge>;
    }
    return <Badge variant="secondary">All Available</Badge>;
  };

  const canManageBooks = userRole === Role.ADMIN || userRole === Role.TEACHER;

  return (
    <>
      <Table>
        <TableCaption>A list of all books in the library.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>
                {getStatusBadge(book.availableCopies, book.totalCopies)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {book.availableCopies > 0 && (
                      <DropdownMenuItem onClick={() => handleBorrowClick(book)}>
                        <BookCopy className="mr-2 h-4 w-4" />
                        Borrow
                      </DropdownMenuItem>
                    )}
                    {canManageBooks && (
                      <>
                        <DropdownMenuItem onClick={() => handleEditClick(book)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete && onDelete(book.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editBook && (
        <BookDialog
          book={editBook}
          open={!!editBook}
          onOpenChange={() => setEditBook(null)}
          onSave={(updatedBook) => {
            onEdit && onEdit(updatedBook as Book);
            setEditBook(null);
          }}
        />
      )}

      {borrowBook && (
        <BorrowDialog
          book={borrowBook}
          user={user ?? null}
          open={!!borrowBook}
          onOpenChange={() => setBorrowBook(null)}
          onBorrow={(bookId) => {
            onBorrow && onBorrow(bookId);
            setBorrowBook(null);
          }}
        />
      )}
    </>
  );
};
