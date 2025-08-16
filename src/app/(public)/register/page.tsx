// app/(public)/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import  Input  from "@/components/Input";
import  Button from "@/components/Button";
import { Alert } from "@/components/Alert"; // Assumindo que você tem um componente Alert

const registerFormSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: null as string | null });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setFormStatus({ loading: true, error: null, success: null });
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocorreu um erro ao registar.");
      }

      const result = await response.json();
      setFormStatus({ loading: false, error: null, success: result.message });
      reset(); // Limpa o formulário após o sucesso

      // IMPORTANTE: NÃO redireciona para o dashboard aqui.
      // Em vez disso, mostra uma mensagem de sucesso instruindo o usuário a verificar o e-mail.
      // O usuário será redirecionado para o login após a confirmação do e-mail.

    } catch (error) {
		let errorMessage = "Ocorreu um erro desconhecido ao registar.";
        
        if (error instanceof Error) {
            errorMessage = error.message;
        }
		
        setFormStatus({ loading: false, error: errorMessage, success: null });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Criar Conta no MediaBoss</h2>

        {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
        {formStatus.success && <Alert type="success">{formStatus.success}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={formStatus.loading}>
            {formStatus.loading ? "Registrando..." : "Registrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
