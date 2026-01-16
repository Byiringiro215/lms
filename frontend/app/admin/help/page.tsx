"use client";

import React from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  HelpCircle,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  FileText,
  DollarSign,
  Package,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

// Mock admin user
const mockAdminUser = {
  userId: "admin1",
  name: "Sarah Johnson",
  email: "sarah.johnson@rca.edu",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function AdminHelpPage() {
  const adminFeatures = [
    {
      title: "Books Management",
      description: "Add, edit, and delete books from the library collection",
      icon: BookOpen,
      link: "/books",
      features: [
        "Add new books with complete details",
        "Edit existing book information",
        "Delete books from the collection",
        "Search and filter books",
        "Export book data to CSV",
      ],
    },
    {
      title: "User Management",
      description: "Manage library users, roles, and permissions",
      icon: Users,
      link: "/users",
      features: [
        "View all registered users",
        "Add new users to the system",
        "Edit user information and roles",
        "Manage user permissions",
        "Deactivate user accounts",
      ],
    },
    {
      title: "Borrowings Management",
      description: "Track and manage all book borrowings",
      icon: BookOpen,
      link: "/borrowings",
      features: [
        "View all active borrowings",
        "Mark books as returned",
        "Track overdue items",
        "Generate borrowing reports",
        "Export borrowing data",
      ],
    },
    {
      title: "Analytics & Reports",
      description: "Access comprehensive library analytics and reports",
      icon: BarChart3,
      link: "/analytics",
      features: [
        "View library usage statistics",
        "Generate custom reports",
        "Track popular books",
        "Monitor overdue trends",
        "Export analytics data",
      ],
    },
  ];

  const quickActions = [
    {
      title: "Add New Book",
      description: "Quickly add a new book to the library",
      icon: BookOpen,
      link: "/books",
      color: "bg-blue-500",
    },
    {
      title: "View Overdue Items",
      description: "Check for overdue books and fines",
      icon: DollarSign,
      link: "/borrowings",
      color: "bg-red-500",
    },
    {
      title: "Generate Report",
      description: "Create a new analytics report",
      icon: FileText,
      link: "/reports",
      color: "bg-green-500",
    },
    {
      title: "Manage Users",
      description: "Add or edit user accounts",
      icon: Users,
      link: "/users",
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
    <DashboardLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Help Center
            </h1>
            <p className="text-muted-foreground">
              Get help with library management tasks and features
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Admin Access
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
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

        {/* Admin Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Admin Features Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {adminFeatures.map((feature) => (
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
                <h3 className="font-medium mb-2">How do I add a new book?</h3>
                <p className="text-sm text-muted-foreground">
                  Go to the Books Management page and click the "Add Book"
                  button. Fill in all required fields including title, author,
                  ISBN, and number of copies.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">
                  How do I mark a book as returned?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to the Borrowings page, find the borrowing record,
                  and click the "Mark as Returned" button. This will update the
                  book's availability status.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I generate reports?</h3>
                <p className="text-sm text-muted-foreground">
                  Visit the Reports page to access various report templates.
                  Select the type of report you need and configure the date
                  range and filters.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">
                  How do I manage user accounts?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the Users page to view all registered users. You can add
                  new users, edit existing information, and manage user roles
                  and permissions.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  How do I handle overdue fines?
                </h3>
                <p className="text-sm text-muted-foreground">
                  The Fines Management page allows you to view overdue items,
                  calculate fines, and process payments. You can also generate
                  fine reports for accounting purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
