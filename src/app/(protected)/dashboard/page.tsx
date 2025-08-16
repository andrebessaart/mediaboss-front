// src/(protected)/dashboard/page.tsx

import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

// Um componente de "esqueleto" para o fallback do Suspense.
// Isso melhora a percepção de velocidade do usuário.
function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div className="flex-grow">
          <div className="h-9 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="flex space-x-4 mt-4">
            <div className="h-10 bg-gray-300 rounded-lg w-36"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-36"></div>
          </div>
        </div>
        <div className="w-full md:w-auto md:min-w-[300px]">
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      {/* Tabela Skeleton */}
      <div>
        <div className="h-7 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

// A PÁGINA AGORA É UM COMPONENTE DE SERVIDOR PURO
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient />
    </Suspense>
  );
}