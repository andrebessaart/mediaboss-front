// src/components/CardContent.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CardContent({ children, className = "", ...props }: Props) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
