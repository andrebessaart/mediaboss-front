// src/app/(public)/data-deletion-status/DataDeletionStatusClient.tsx

"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function DataDeletionStatusClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  // Renderiza o conteúdo com base na presença do código de confirmação
  const renderContent = () => {
    if (code) {
      // Se um código foi fornecido, mostra uma mensagem de sucesso/confirmação
      return (
        <>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Solicitação Recebida
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Recebemos sua solicitação de exclusão de dados. Ela será processada em breve.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                Código de Confirmação: <span className="font-mono">{code}</span>
              </p>
            </div>
          </div>
        </>
      );
    }

    // Se nenhum código foi fornecido, mostra uma mensagem genérica
    return (
      <>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Info className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Página de Status
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Esta página é usada para confirmar o recebimento de solicitações de exclusão de dados de acordo com as políticas da Meta.
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      {renderContent()}
      <div className="mt-5 sm:mt-6">
        <Link href="/">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para a Página Inicial
          </button>
        </Link>
      </div>
    </div>
  );
}