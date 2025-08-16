// app/(public)/reset-password/ResetPasswordClient.tsx

"use client"; // Continua sendo um client component, o que é correto

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import  Input  from "@/components/Input";
import  Button  from "@/components/Button";
import { Alert } from "@/components/Alert";
import axios from "axios";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "A nova senha precisa ter pelo menos 6 caracteres."),
  confirmPassword: z.string().min(6, "Confirme sua nova senha."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// A ÚNICA MUDANÇA É O NOME DA FUNÇÃO ABAIXO
export default function ResetPasswordClient() { 
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: null as string | null });
  const [token, setToken] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setFormStatus({ loading: false, error: "Token de redefinição de senha ausente.", success: null });
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setFormStatus({ loading: false, error: "Token de redefinição de senha ausente.", success: null });
      return;
    }

    setFormStatus({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        token,
        password: data.password,
      });
      setFormStatus({ loading: false, error: null, success: res.data.message });
      reset();
      setTimeout(() => router.push('/login'), 5000);
    } catch (err) {
	  let errorMessage = "Ocorreu um erro ao redefinir sua senha.";
	  if(axios.isAxiosError(err) && err.response){
		  errorMessage = err.response.data?.error || "Ocorreu um erro ao redefinir sua senha.";
	  }else if (err instanceof Error) {
         errorMessage = err.message;
      }
      setFormStatus({ loading: false, error: errorMessage, success: null });
    }
  };

  // O JSX é EXATAMENTE O MESMO que você tinha
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Redefinir Senha</h2>

      {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
      {formStatus.success && <Alert type="success">{formStatus.success}</Alert>}

      {/* Condicional para o token foi mantida e funcionará perfeitamente */}
      {!token && !formStatus.error && (
        <Alert type="info">Validando token...</Alert>
      )}

      {token && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={formStatus.loading}>
            {formStatus.loading ? "Redefinindo..." : "Redefinir Senha"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Voltar para o Login
        </Link>
      </p>
    </div>
  );
}