// app/(public)/login/page.tsx

import { Suspense } from 'react';
import LoginClient from './LoginClient';
import Link from 'next/link';

// Criamos um Fallback que usa O MESMO LAYOUT da página final
// para não haver quebra de design durante o carregamento.
function LoadingFallback() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-pulse">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar no MediaBoss</h2>
      <div className="space-y-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
      </div>
       <div className="mt-6 text-center text-sm text-gray-600 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
       <div className="mt-2 text-center text-sm text-gray-600 h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    // O layout principal da tela é mantido aqui
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingFallback />}>
        <LoginClient />
      </Suspense>
    </div>
  );
}