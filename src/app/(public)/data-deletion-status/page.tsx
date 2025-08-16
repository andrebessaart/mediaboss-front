// src/app/(public)/data-deletion-status/page.tsx

import { Suspense } from 'react';
import DataDeletionStatusClient from './DataDeletionStatusClient';

// Componente de Fallback (esqueleto de carregamento)
function LoadingFallback() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-pulse">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200"></div>
      <div className="mt-3 sm:mt-5">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
      </div>
      <div className="mt-5 sm:mt-6 h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
}

export default function DataDeletionStatusPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingFallback />}>
        <DataDeletionStatusClient />
      </Suspense>
    </div>
  );
}