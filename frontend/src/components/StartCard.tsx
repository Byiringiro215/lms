import React from "react";
import clsx from "clsx";
import { StatCardProps } from "@/src/types/interfaces";


const StatCard= ({ title, value, percentage }: StatCardProps ) => {
  const isPositive = percentage >= 0;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm flex flex-col gap-1">
      <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span
          className={clsx(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {isPositive ? `+${percentage}%` : `${percentage}%`}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
