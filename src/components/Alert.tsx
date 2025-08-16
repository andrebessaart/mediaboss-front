// components/Alert.tsx
import React from 'react';

// A interface de Props usa 'children' para permitir conteúdo flexível, como textos e links.
type Props = {
  type?: "success" | "danger" | "info" | "error";
  children: React.ReactNode;
};

const typeColor = {
  success: "bg-green-100 text-green-800 border-green-300",
  danger: "bg-red-100 text-red-700 border-red-300",
  error: "bg-red-100 text-red-700 border-red-300",
  info: "bg-blue-100 text-blue-700 border-blue-300",
};

export function Alert({ type = "info", children }: Props) {
  if (!children) {
    return null;
  }

  return (
    <div className={`p-4 rounded-lg border mb-4 text-sm ${typeColor[type]}`}>
      {children}
    </div>
  );
}
