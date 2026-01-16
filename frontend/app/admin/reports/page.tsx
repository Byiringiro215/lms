"use client";

import React, { useState } from "react";
import { Role } from "../../../types/roles";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Download,
  FileText,
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

// Mock user - would come from auth context in real implementation
const mockUser = {
  userId: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: Role.ADMIN,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: "borrowing" | "overdue" | "user" | "book" | "fine";
  dateRange: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  downloadUrl?: string;
}

// Mock reports data
const mockReports: ReportData[] = [
  {
    id: "1",
    title: "Monthly Borrowing Report",
    description: "All borrowing activities for January 2024",
    type: "borrowing",
    dateRange: "Jan 1 - Jan 31, 2024",
    status: "completed",
    createdAt: new Date().toISOString(),
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Overdue Books Report",
    description: "Current overdue books and fines",
    type: "overdue",
    dateRange: "Current",
    status: "completed",
    createdAt: new Date().toISOString(),
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "User Activity Report",
    description: "User borrowing patterns and statistics",
    type: "user",
    dateRange: "Last 30 days",
    status: "processing",
    createdAt: new Date().toISOString(),
  },
];

const reportTypes = [
  { value: "borrowing", label: "Borrowing Report", icon: BookOpen },
  { value: "overdue", label: "Overdue Report", icon: AlertCircle },
  { value: "user", label: "User Activity", icon: Users },
  { value: "book", label: "Book Inventory", icon: FileText },
  { value: "fine", label: "Fines Report", icon: TrendingUp },
];

const dateRanges = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
  { value: "year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>(mockReports);
  const [selectedReportType, setSelectedReportType] = useState("borrowing");
  const [selectedDateRange, setSelectedDateRange] = useState("month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      const newReport: ReportData = {
        id: `report-${Date.now()}`,
        title: `${
          reportTypes.find((t) => t.value === selectedReportType)?.label
        }`,
        description: `Report for ${
          selectedDateRange === "custom"
            ? `${customStartDate} to ${customEndDate}`
            : dateRanges.find((d) => d.value === selectedDateRange)?.label
        }`,
        type: selectedReportType as any,
        dateRange:
          selectedDateRange === "custom"
            ? `${customStartDate} to ${customEndDate}`
            : dateRanges.find((d) => d.value === selectedDateRange)?.label ||
              "",
        status: "completed",
        createdAt: new Date().toISOString(),
        downloadUrl: "#",
      };

      setReports([newReport, ...reports]);
      setIsGenerating(false);
      toast.success("Report generated successfully!");
    }, 2000);
  };

  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would trigger a download
    toast.success("Report download started");
  };

  const getStatusBadge = (status: ReportData["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            Processing
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
    }
  };

  const getReportTypeIcon = (type: ReportData["type"]) => {
    const reportType = reportTypes.find((t) => t.value === type);
    const IconComponent = reportType?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download library reports
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select
                      value={selectedReportType}
                      onValueChange={setSelectedReportType}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select
                      value={selectedDateRange}
                      onValueChange={setSelectedDateRange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedDateRange === "custom" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full md:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {report.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getReportTypeIcon(report.type)}
                            {
                              reportTypes.find((t) => t.value === report.type)
                                ?.label
                            }
                          </div>
                        </TableCell>
                        <TableCell>{report.dateRange}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {report.status === "completed" &&
                            report.downloadUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(report.id)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
