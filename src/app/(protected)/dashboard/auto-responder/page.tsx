"use client";

import { useRouter } from "next/navigation";
import InstagramMediaGrid from "@/components/InstagramMediaGrid";

// Ícone de seta para o botão voltar
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default function AutoResponderPage() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar ao Dashboard
          </button>
        </div>

        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gerenciador de Respostas Automáticas</h1>
          <p className="text-gray-500 mt-1">
            Selecione um post para configurar ou editar uma resposta automática para os comentários.
          </p>
        </div>

        <InstagramMediaGrid />
      </div>
    </div>
  );
}