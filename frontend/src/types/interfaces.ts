import { Role } from "@/types/roles";

export interface Links {
  name: string;
  icon: React.ReactNode;
  href: string;
  roles?: Role[];
}

export interface StatCardProps {
  title: string;
  value: number | string;
  percentage: number;
}

export interface CheckoutProps {
  ID: string;
  ISBN: string;
  Title: string;
  Author: string;
  Member: string;
  IssuedDate: string;
  ReturnDate: string;
}

export interface TopBooksProps {
  Title: string;
  Author: string;
  status: "available" | "borrowed" | "overdue";
}

export interface MemberProps {
  MemberID: string;
  RegisterID: string;
  Member: string;
  Email: string;
}

export interface CheckoutBookProps {
  MemberID: string;
  Member: string;
  Title: string;
  Author: string;
  BorrowedDate: string;
  ReturnedDate: string;
  status: "returned" | "pending";
}

export interface BookProps {
  ID: string;
  ISBN: string;
  Name: string;
  Category: string;
  Language: string;
  Status: "available" | "borrowed" | "lost";
}
