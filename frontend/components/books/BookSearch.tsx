import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface BookSearchProps {
  onSearch: (filters: SearchFilters) => void;
  categories: string[];
  authors: string[];
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  author: string;
  availability: string;
  sortBy: string;
}

const defaultFilters: SearchFilters = {
  searchTerm: "",
  category: "all",
  author: "all",
  availability: "all",
  sortBy: "title",
};

export const BookSearch: React.FC<BookSearchProps> = ({
  onSearch,
  categories,
  authors,
}) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onSearch(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "all" && value !== "" && value !== "title"
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Books
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, ISBN, or description..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={handleReset}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Select
                  value={filters.author}
                  onValueChange={(value) => handleFilterChange("author", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    {authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={filters.availability}
                  onValueChange={(value) =>
                    handleFilterChange("availability", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Books" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                    <SelectItem value="limited">Limited Copies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-by">Sort by:</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="publishedYear">
                      Published Year
                    </SelectItem>
                    <SelectItem value="availableCopies">
                      Available Copies
                    </SelectItem>
                    <SelectItem value="createdAt">Date Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {filters.category !== "all" && (
              <Badge variant="outline" className="text-xs">
                Category: {filters.category}
              </Badge>
            )}
            {filters.author !== "all" && (
              <Badge variant="outline" className="text-xs">
                Author: {filters.author}
              </Badge>
            )}
            {filters.availability !== "all" && (
              <Badge variant="outline" className="text-xs">
                {filters.availability === "available"
                  ? "Available"
                  : filters.availability === "unavailable"
                  ? "Unavailable"
                  : "Limited Copies"}
              </Badge>
            )}
            {filters.searchTerm && (
              <Badge variant="outline" className="text-xs">
                Search: "{filters.searchTerm}"
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
