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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { User, Mail, Shield, Calendar, UserCircle } from "lucide-react";

// Mock admin user data
const mockAdminUser = {
  userId: "admin1",
  name: "Sarah Johnson",
  email: "sarah.johnson@rca.edu",
  role: Role.ADMIN,
  createdAt: new Date("2023-01-15").toISOString(),
  updatedAt: new Date().toISOString(),
  phone: "+1 (555) 123-4567",
  department: "Library Management",
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

export default function AdminProfilePage() {
  return (
    <DashboardLayout user={mockAdminUser}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account information
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="h-6 w-6" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32 border-4 border-gray-100">
                      <AvatarFallback className="text-3xl">
                        <UserCircle className="h-20 w-20" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">
                        {mockAdminUser.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {mockAdminUser.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input id="name" value={mockAdminUser.name} disabled />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={mockAdminUser.email}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status */}
          <div>
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Shield className="h-6 w-6" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Role</p>
                        <p className="text-sm text-muted-foreground">
                          Administrator
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">{mockAdminUser.role}</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Status</p>
                        <p className="text-sm text-muted-foreground">
                          Active Account
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
