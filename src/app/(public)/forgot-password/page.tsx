// app/(public)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Alert } from "@/components/Alert";
import axios from "axios";

const forgotPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: null as string | null });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setFormStatus({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email: data.email });
      setFormStatus({ loading: false, error: null, success: res.data.message });
      reset();
    } catch (err) {
	   let errorMessage = "Ocorreu um erro ao solicitar a redefinição de senha.";
	  if (axios.isAxiosError(err) && err.response) {
		errorMessage = err.response?.data?.error || "Ocorreu um erro ao solicitar a redefinição de senha.";
	  } else if (err instanceof Error) {
		errorMessage = err.message;
	  }
      setFormStatus({ loading: false, error: errorMessage, success: null });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Esqueceu sua Senha?</h2>

        {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
        {formStatus.success && <Alert type="success">{formStatus.success}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={formStatus.loading}>
            {formStatus.loading ? "Enviando..." : "Enviar Link de Redefinição"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Lembrou da senha?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
