"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BookTable } from "@/components/books/BookTable";
import { BorrowDialog } from "@/components/borrowing/BorrowDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/types/book";
import { Role } from "@/types/roles";

import { BookOpen, Search, Filter, Heart } from "lucide-react";
import { set } from "date-fns";
import { fetchData } from "~/lib/fetch-utils";
import { useAuthStatus } from "@/hooks/use-auth-status";

// Mock data - would be fetched from API in real implementation
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Technology",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Technology",
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "9780201616224",
    description: "From Journeyman to Master",
    publishedYear: 1999,
    totalCopies: 4,
    availableCopies: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Technology",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Fiction",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Fiction",
  },
  {
    id: "6",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    description: "A story of the fabulously wealthy Jay Gatsby",
    publishedYear: 1925,
    totalCopies: 6,
    availableCopies: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "Fiction",
  },
];

export default function UserBooksPage() {
  const [books, setBooks] = useState<Book[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  const { user, isLoading } = useAuthStatus();

  // Mock user's current borrowings (to check if they've already borrowed a book)
  const mockUserBorrowings = ["1", "3"]; // Book IDs that the user has already borrowed
  const currentBorrowingsCount = mockUserBorrowings.length; // Current number of active borrowings

  const categories = books
    ? ["all", ...Array.from(new Set(books!.map((book) => book.category)))]
    : ["all"];

  const filteredBooks = (books ?? []).filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBorrowBook = (bookId: string, dueDate: string) => {
    // TODO: Integrate with backend borrowing endpoint
    setBooks(
      books!.map((book) =>
        book.id === bookId
          ? { ...book, availableCopies: Math.max(0, book.availableCopies - 1) }
          : book
      )
    );
  };

  const handleBorrowClick = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowDialogOpen(true);
  };

  const handleToggleFavorite = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const availableBooks = (books ?? []).filter(
    (book) => book.availableCopies > 0
  );
  const totalBooks = books?.length ?? 0;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await fetchData<Book[]>({ endpoint: "/books" });
      setBooks(data);
    } catch (e) {
      // fallback to mock if API fails
      setBooks(mockBooks);
    }
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Browse Books</h1>
            <p className="text-muted-foreground">Find your next great read</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
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
                {availableBooks.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Books you can borrow
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {favorites.length}
              </div>
              <p className="text-xs text-muted-foreground">Your saved books</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
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

        {/* Books Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Books ({filteredBooks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {book.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ISBN: {book.isbn} • {book.publishedYear}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleFavorite(book.id)}
                      className={`${
                        favorites.includes(book.id)
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(book.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{book.category}</Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {book.availableCopies}/{book.totalCopies} available
                      </p>
                      {book.availableCopies > 0 ? (
                        mockUserBorrowings.includes(book.id) ? (
                          <Badge variant="secondary" className="mt-1">
                            Already Borrowed
                          </Badge>
                        ) : user?.role === "STUDENT" &&
                          currentBorrowingsCount >= 3 ? (
                          <Badge variant="destructive" className="mt-1">
                            Limit Reached
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleBorrowClick(book)}
                            className="mt-1"
                          >
                            <BookOpen className="mr-1 h-3 w-3" />
                            Borrow
                          </Button>
                        )
                      ) : (
                        <Badge variant="secondary" className="mt-1">
                          Unavailable
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No books found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Borrow Dialog */}
        {selectedBook && (
          <BorrowDialog
            book={selectedBook}
            user={user ?? null}
            open={isBorrowDialogOpen}
            onOpenChange={setIsBorrowDialogOpen}
            onBorrow={handleBorrowBook}
            existingBorrowings={mockUserBorrowings}
            currentBorrowingsCount={currentBorrowingsCount}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
