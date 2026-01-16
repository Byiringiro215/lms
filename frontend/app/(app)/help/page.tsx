"use client";

import React from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  HelpCircle,
  BookOpen,
  User,
  Clock,
  Search,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// Mock user
const mockUser = {
  userId: "user1",
  name: "John Doe",
  email: "john.doe@rca.edu",
  role: Role.STUDENT,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function HelpPage() {
  const userFeatures = [
    {
      title: "Browse Books",
      description: "Search and explore the library collection",
      icon: BookOpen,
      link: "/books",
      features: [
        "Search books by title, author, or ISBN",
        "Filter books by category or availability",
        "View book details and descriptions",
        "Check book availability status",
        "Add books to your reading list",
      ],
    },
    {
      title: "Borrow Books",
      description: "Borrow and return books from the library",
      icon: Clock,
      link: "/borrowings",
      features: [
        "Request books for borrowing",
        "View your current borrowings",
        "Check due dates and renewals",
        "Return books on time",
        "Track borrowing history",
      ],
    },
    {
      title: "Profile Management",
      description: "Manage your account and preferences",
      icon: User,
      link: "/profile",
      features: [
        "Update personal information",
        "Change password and settings",
        "View borrowing history",
        "Manage reading preferences",
        "Update contact information",
      ],
    },
    {
      title: "Dashboard",
      description: "Overview of your library activity",
      icon: BookOpen,
      link: "/dashboard",
      features: [
        "View current borrowings",
        "Check overdue items",
        "See recent activity",
        "Quick access to popular books",
        "Library announcements",
      ],
    },
  ];

  const quickActions = [
    {
      title: "Search Books",
      description: "Find books in the library",
      icon: Search,
      link: "/books",
      color: "bg-blue-500",
    },
    {
      title: "My Borrowings",
      description: "View your borrowed books",
      icon: BookOpen,
      link: "/borrowings",
      color: "bg-green-500",
    },
    {
      title: "Due Soon",
      description: "Check books due soon",
      icon: Calendar,
      link: "/borrowings",
      color: "bg-orange-500",
    },
    {
      title: "My Profile",
      description: "Update your information",
      icon: User,
      link: "/profile",
      color: "bg-purple-500",
    },
  ];

  const contactInfo = [
    {
      title: "Email Support",
      description: "support@rca.edu",
      icon: Mail,
      action: "mailto:support@rca.edu",
    },
    {
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      icon: Phone,
      action: "tel:+15551234567",
    },
    {
      title: "Live Chat",
      description: "Available 9 AM - 5 PM",
      icon: MessageCircle,
      action: "#",
    },
  ];

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
            <p className="text-muted-foreground">
              Get help with using the library management system
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            User Access
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Library Features Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {userFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-l-4 border-l-blue-500"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-4" variant="outline">
                      <Link href={feature.link}>Go to {feature.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {contactInfo.map((contact) => (
                <Card
                  key={contact.title}
                  className="border-l-4 border-l-green-500"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <contact.icon className="h-5 w-5 text-green-600" />
                      <div>
                        <h3 className="font-medium text-sm">{contact.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="mt-3"
                      size="sm"
                      variant="outline"
                    >
                      <Link href={contact.action}>Contact</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I borrow a book?</h3>
                <p className="text-sm text-muted-foreground">
                  Go to the Books page, search for the book you want, and click
                  the "Borrow" button. You'll receive a confirmation and the
                  book will be added to your borrowings.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I return a book?</h3>
                <p className="text-sm text-muted-foreground">
                  Visit the Borrowings page, find the book you want to return,
                  and click the "Return" button. The book will be marked as
                  returned and available for others.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Can I renew a book?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can renew books from the Borrowings page. Click the
                  "Renew" button next to the book. Note that renewals are
                  subject to availability and library policies.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">
                  What happens if I return a book late?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Late returns may result in fines. Check the Borrowings page
                  for any overdue items and return them as soon as possible to
                  avoid additional charges.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  How do I update my profile information?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Go to the Profile page to update your personal information,
                  contact details, and preferences. Changes are saved
                  automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
