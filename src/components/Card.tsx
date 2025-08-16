// components/Card.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div className={`rounded-2xl shadow-lg bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}
