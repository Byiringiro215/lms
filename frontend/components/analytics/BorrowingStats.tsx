import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BorrowingStatsData {
  name: string;
  students: number;
  teachers: number;
}

interface BorrowingStatsProps {
  data: BorrowingStatsData[];
  period?: "week" | "month" | "year";
}

export const BorrowingStats = ({
  data,
  period = "month",
}: BorrowingStatsProps) => {
  const periodText = {
    week: "This Week",
    month: "This Month",
    year: "This Year",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Borrowing Activity</CardTitle>
        <CardDescription>
          Borrowing trends by user type {periodText[period].toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="students"
                name="Students"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="teachers"
                name="Teachers"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No borrowing data available for this period
          </div>
        )}
      </CardContent>
    </Card>
  );
};
