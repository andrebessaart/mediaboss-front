// app/(public)/verify-email/page.tsx

import { Suspense } from 'react';
import VerifyEmailClient from './VerifyEmailClient';
import { Alert } from '@/components/Alert';

// Criamos um Fallback que usa O MESMO LAYOUT para uma transição suave.
function LoadingFallback() {
  return (
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Verificação de E-mail</h2>
        <Alert type="info">
          Verificando seu e-mail... Por favor, aguarde.
        </Alert>
      </div>
  );
}

export default function VerifyEmailPage() {
  return (
    // O layout principal é mantido aqui no Componente de Servidor
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingFallback />}>
        <VerifyEmailClient />
      </Suspense>
    </div>
  );
}