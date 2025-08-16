// components/Input.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = "", ...props }: Props) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm text-text font-medium">{label}</label>
      )}
      <input
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
