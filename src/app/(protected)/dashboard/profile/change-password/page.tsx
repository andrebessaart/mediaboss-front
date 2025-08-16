// app/(protected)/dashboard/profile/change-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importar useRouter
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Alert } from "@/components/Alert";
import axios from "axios";

// Ícone de seta para o botão voltar
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "A senha atual é obrigatória."),
  newPassword: z.string().min(6, "A nova senha precisa ter pelo menos 6 caracteres."),
  confirmNewPassword: z.string().min(6, "Confirme sua nova senha."),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As novas senhas não coincidem.",
  path: ["confirmNewPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: null as string | null });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter(); // Instanciar o router

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setFormStatus({ loading: true, error: null, success: null });
    try {
      const res = await axios.post(`${apiUrl}/api/user/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }, {
        withCredentials: true, // Importante para enviar os cookies de autenticação
      });
      
      setFormStatus({ loading: false, error: null, success: res.data.message });
      reset();

    } catch (err) {
	  let errorMessage = "Ocorreu um erro ao trocar a senha.";

	  if (axios.isAxiosError(err) && err.response) {
		// Agora o TypeScript sabe que 'err' é do tipo AxiosError
		// e permite o acesso a err.response.data de forma segura.
		errorMessage = err.response.data?.error || "Ocorreu um erro ao trocar a senha.";
	  } else if (err instanceof Error) {
		// Tratamento para erros genéricos
		errorMessage = err.message;
	  }

	  setFormStatus({ loading: false, error: errorMessage, success: null });
	}
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Trocar Senha</h2>

        {/* Botão Voltar Padronizado */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar
        </button>

        {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
        {formStatus.success && <Alert type="success">{formStatus.success}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              {...register("currentPassword")}
              className={errors.currentPassword ? "border-red-500" : ""}
            />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              {...register("newPassword")}
              className={errors.newPassword ? "border-red-500" : ""}
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <Input
              id="confirmNewPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmNewPassword")}
              className={errors.confirmNewPassword ? "border-red-500" : ""}
            />
            {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={formStatus.loading}>
            {formStatus.loading ? "Salvando..." : "Salvar Nova Senha"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/dashboard/profile" className="font-medium text-indigo-600 hover:text-indigo-500">
            Voltar para o Perfil
          </Link>
        </p>
      </div>
    </div>
  );
}
