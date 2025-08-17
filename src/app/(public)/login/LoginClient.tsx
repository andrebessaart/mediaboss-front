// app/(public)/login/LoginClient.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Alert } from "@/components/Alert";
import axios from "axios";
import { useUser } from '@/contexts/UserContext';

const loginFormSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

// ... (manter a função normalizeEmail)
const normalizeEmail = (email: string) => {
  if (!email || typeof email !== 'string') return email;
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  let localPart = parts[0];
  const domain = parts[1];
  if (domain.toLowerCase() === 'gmail.com' || domain.toLowerCase() === 'googlemail.com') {
    localPart = localPart.replace(/\./g, '');
    const plusIndex = localPart.indexOf('+');
    if (plusIndex !== -1) {
      localPart = localPart.substring(0, plusIndex);
    }
  }
  return `${localPart}@${domain.toLowerCase()}`;
};


export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: null as string | null });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { user, loading: userContextLoading, setUser } = useUser();

  // --- ADICIONADO: Estado para controlar a exibição do link de reenvio ---
  const [showResendLink, setShowResendLink] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);


  useEffect(() => {
    const status: string | null = searchParams.get('status');
    const message: string | null = searchParams.get('message');
    if (status && message) {
      if (status === 'success') {
        setFormStatus(prev => ({ ...prev, success: message, error: null }));
      } else if (status === 'error') {
        setFormStatus(prev => ({ ...prev, error: message, success: null }));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shouldRedirect) {
      timer = setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [shouldRedirect, router]);

  useEffect(() => {
    if (!userContextLoading && user && !shouldRedirect) {
      window.location.href = '/dashboard';
    }
  }, [user, userContextLoading, router, shouldRedirect]);

  const {
    register,
    handleSubmit,
    getValues, // <-- ADICIONADO para pegar o e-mail para o reenvio
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormStatus({ loading: true, error: null, success: null });
    setShowResendLink(false); // Reseta o link de reenvio a cada tentativa
    setResendStatus(null);
    try {
      const dataToSend = { ...data, email: normalizeEmail(data.email) };
      const response = await axios.post(`${apiUrl}/api/auth/login`, dataToSend, {
        withCredentials: true,
      });
      if (response.data.user) {
        setUser(response.data.user);
      }
      setFormStatus({ loading: false, error: null, success: "Login bem-sucedido!" });
      setShouldRedirect(true);
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao fazer login.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.error || "Ocorreu um erro ao fazer login.";
        // --- MODIFICADO: Verifica o erro específico de e-mail não verificado ---
        if (errorMessage === 'Por favor, confirme seu e-mail para continuar.') {
            setShowResendLink(true);
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setFormStatus({ loading: false, error: errorMessage, success: null });
    }
  };

  // --- ADICIONADO: Função para lidar com o reenvio do e-mail ---
  const handleResendVerification = async () => {
    const email = getValues("email");
    if (!email) {
        setResendStatus("Por favor, preencha o campo de e-mail primeiro.");
        return;
    }
    setResendLoading(true);
    setResendStatus(null);
    try {
        await axios.post(`${apiUrl}/api/auth/resend-verification`, { email: normalizeEmail(email) });
        setResendStatus("Um novo link de confirmação foi enviado para o seu e-mail.");
    } catch (error) {
        setResendStatus("Ocorreu um erro ao reenviar o e-mail. Tente novamente.");
    } finally {
        setResendLoading(false);
    }
  };


  if (!userContextLoading && user && !shouldRedirect) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar no MediaBoss</h2>
      {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
      {formStatus.success && <Alert type="success">{formStatus.success}</Alert>}
      
      {/* --- ADICIONADO: Mensagem de reenvio e link --- */}
      {showResendLink && (
        <div className="text-center text-sm text-gray-600 mb-4">
            <button onClick={handleResendVerification} disabled={resendLoading} className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer">
                {resendLoading ? 'Enviando...' : 'Reenviar e-mail de confirmação'}
            </button>
            {resendStatus && <p className="mt-2 text-green-700">{resendStatus}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <Input id="email" type="email" placeholder="seu.email@exemplo.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} className={errors.password ? "border-red-500" : ""} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={formStatus.loading}>
          {formStatus.loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Esqueceu sua senha?{' '}
        <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Recuperar Senha</Link>
      </p>
      <p className="mt-2 text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Criar Conta</Link>
      </p>
    </div>
  );
}
