"use client";

import React, { useState } from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { BookTable } from "../../../components/books/BookTable";
import { BookDialog } from "../../../components/books/BookDialog";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Book, BookFormData } from "../../../types/book";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
} from "lucide-react";

// Mock admin user
const mockAdminUser = {
  userId: "admin1",
  name: "Sarah Johnson",
  email: "sarah.johnson@rca.edu",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock books data
const mockBooks: Book[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    description: "A handbook of agile software craftsmanship",
    publishedYear: 2008,
    totalCopies: 5,
    availableCopies: 3,
    category: "Technology",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    isbn: "9780201633610",
    description: "Elements of Reusable Object-Oriented Software",
    publishedYear: 1994,
    totalCopies: 3,
    availableCopies: 1,
    category: "Technology",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "9780201616224",
    description: "Your journey to mastery",
    publishedYear: 1999,
    totalCopies: 4,
    availableCopies: 2,
    category: "Technology",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    description: "A novel about racial inequality in the American South",
    publishedYear: 1960,
    totalCopies: 10,
    availableCopies: 7,
    category: "Fiction",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    description: "A dystopian social science fiction novel",
    publishedYear: 1949,
    totalCopies: 8,
    availableCopies: 5,
    category: "Fiction",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(books.map((book) => book.category))),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (book: Book | BookFormData) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      availableCopies:
        (book as Book).availableCopies ??
        (book as BookFormData).totalCopies ??
        1,
    };
    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = (updatedBook: Book | BookFormData) => {
    setBooks(
      books.map((book) =>
        book.id === (updatedBook as Book).id
          ? {
              ...book,
              ...updatedBook,
              id: book.id,
              createdAt: book.createdAt,
              updatedAt: new Date().toISOString(),
            }
          : book
      )
    );
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== bookId));
    }
  };

  const handleExportBooks = () => {
    const csvContent = [
      [
        "Title",
        "Author",
        "ISBN",
        "Category",
        "Total Copies",
        "Available Copies",
        "Published Year",
      ],
      ...filteredBooks.map((book) => [
        book.title,
        book.author,
        book.isbn,
        book.category,
        book.totalCopies.toString(),
        book.availableCopies.toString(),
        book.publishedYear?.toString() ?? "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "books.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Books Management
            </h1>
            <p className="text-muted-foreground">
              Manage your library's book collection
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportBooks} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{books.length}</div>
              <p className="text-xs text-muted-foreground">
                Books in collection
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {books.reduce((sum, book) => sum + book.availableCopies, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Copies available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {books.reduce(
                  (sum, book) =>
                    sum + (book.totalCopies - book.availableCopies),
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">Copies borrowed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Array.from(new Set(books.map((book) => book.category))).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Different categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search books by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Books ({filteredBooks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-medium">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {book.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ISBN: {book.isbn} • {book.publishedYear ?? "N/A"}
                        </p>
                      </div>
                      <Badge variant="outline">{book.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {book.availableCopies}/{book.totalCopies} available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {book.totalCopies - book.availableCopies} borrowed
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditBook(book)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredBooks.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No books found</p>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Book
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Book Dialog */}
      {isAddDialogOpen && (
        <BookDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddBook}
        />
      )}

      {/* Edit Book Dialog */}
      {editingBook && (
        <BookDialog
          open={!!editingBook}
          onOpenChange={(open) => !open && setEditingBook(null)}
          onSave={handleUpdateBook}
          book={editingBook}
        />
      )}
    </DashboardLayout>
  );
}
