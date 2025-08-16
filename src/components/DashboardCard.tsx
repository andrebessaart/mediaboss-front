// components/DashboardCard.tsx
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function DashboardCard({ title, children, className = "" }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow p-6 ${className}`}>
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      {children}
    </div>
  );
}
