"use client";

import React from "react";
import StatCard from "~/src/components/StartCard";
import { CardData } from "~/src/placeholder_data/data";
import CheckoutStatistics from "~/src/components/DashboardChart";
import OverduesHistory from "~/src/components/OverduesHistory";
import RecentCheckOuts from "~/src/components/RecentCheckOuts";
import TopBooks from "~/src/components/TopBooks";
import { Role } from "@/types/roles";
import { ProtectedRoute } from "@/components/protected-route";

const page = () => {
  return (
    <ProtectedRoute requiredRoles={[Role.ADMIN]}>
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          {CardData.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
        <div className="flex  gap-4">
          <div className="w-full">
            <CheckoutStatistics />
          </div>
          <div className="w-full">
            <OverduesHistory />
          </div>
        </div>
        <div className="flex gap-4">
          <RecentCheckOuts />
          <TopBooks />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
