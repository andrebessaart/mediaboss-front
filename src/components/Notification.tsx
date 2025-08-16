// components/Notification.tsx
import { useState, useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "danger" | "info";
  duration?: number;
};

export default function Notification({ message, type = "info", duration = 4000 }: Props) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [duration]);
  if (!show) return null;
  const color =
    type === "success"
      ? "bg-green-600"
      : type === "danger"
      ? "bg-red-600"
      : "bg-primary";
  return (
    <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-white shadow-lg ${color}`}>
      {message}
    </div>
  );
}
