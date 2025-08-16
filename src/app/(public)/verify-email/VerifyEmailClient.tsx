// app/(public)/verify-email/VerifyEmailClient.tsx

"use client"; // Correto, pois este componente precisa ser interativo

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/Alert";
import Link from "next/link";
import axios from "axios";

// A ÚNICA ALTERAÇÃO É AQUI, NO NOME DA FUNÇÃO
export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de verificação não encontrado.');
      setTimeout(() => router.push('/login'), 5000);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/auth/confirm-email?token=${token}`);
        setStatus('success');
        setMessage(res.data.message || 'E-mail confirmado com sucesso!');
      } catch (err) {
        setStatus('error');
        let errorMessage = 'Ocorreu um erro ao verificar seu e-mail.';
        if (axios.isAxiosError(err) && err.response) {
          errorMessage = err.response.data?.error || 'Ocorreu um erro ao verificar seu e-mail.';
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setMessage(errorMessage);
      } finally {
        setTimeout(() => router.push('/login'), 5000);
      }
    };

    verifyEmail();
  }, [searchParams, router, apiUrl]);

  // SEU JSX E ESTILOS SÃO MANTIDOS EXATAMENTE IGUAIS
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Verificação de E-mail</h2>

      {status === 'loading' && (
        <Alert type="info">
          Verificando seu e-mail... Por favor, aguarde.
        </Alert>
      )}

      {status === 'success' && message && (
        <>
          <svg className="checkmark mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <style jsx>{`
            .checkmark {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              display: block;
              stroke-width: 2;
              stroke: #4CAF50;
              stroke-miterlimit: 10;
              animation: scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
              stroke-dasharray: 166;
              stroke-dashoffset: 166;
              stroke-width: 2;
              stroke-miterlimit: 10;
              stroke: #4CAF50;
              fill: none;
              animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
              transform-origin: 50% 50%;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              stroke: #4CAF50;
              animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
            }
            @keyframes stroke {
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes scale {
              0%, 100% {
                transform: none;
              }
              50% {
                transform: scale3d(1.1, 1.1, 1);
              }
            }
          `}</style>
          <Alert type="success">
            {message}
            <p className="mt-2 text-sm">Você será redirecionado para a página de login em breve.</p>
            <Link href="/login" className="text-sm text-indigo-600 hover:underline mt-1 block">
              Ou clique aqui para ir agora.
            </Link>
          </Alert>
        </>
      )}

      {status === 'error' && message && (
        <Alert type="danger">
          {message}
          <p className="mt-2 text-sm">Você será redirecionado para a página de login em breve.</p>
          <Link href="/login" className="text-sm text-indigo-600 hover:underline mt-1 block">
            Ou clique aqui para ir agora.
          </Link>
        </Alert>
      )}
    </div>
  );
}