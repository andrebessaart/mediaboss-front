// app/(public)/reset-password/page.tsx

import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';
import Link from 'next/link';

// Criamos um Fallback que usa O MESMO LAYOUT da página final
// para não haver quebra de design durante o carregamento.
function LoadingFallback() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Redefinir Senha</h2>
      <p className="text-center text-gray-600">Carregando...</p>
      <div className="space-y-4 mt-4">
         {/* Skeleton loader para os inputs */}
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse mt-4"></div>
      </div>
       <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Voltar para o Login
          </Link>
        </p>
    </div>
  );
}


export default function ResetPasswordPage() {
  return (
    // O layout principal da tela é mantido aqui
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordClient />
      </Suspense>
    </div>
  );
}