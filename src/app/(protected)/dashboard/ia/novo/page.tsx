// src/app/dashboard/ia/novo/page.tsx
"use client"; // Necessário para usar o hook useRouter

import { useRouter } from "next/navigation"; // Importar o useRouter
import AiPostForm from "@/components/AiPostForm";

// Ícone de seta para o botão voltar
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default function NovaCampanhaAiPage() {
  const router = useRouter(); // Instanciar o router

  return (
      <div className="pt-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Botão Voltar Padronizado */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar
          </button>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">Criar Nova Campanha com IA</h1>
            <p className="text-gray-500 mt-1">
              Descreva sua ideia e deixe nossa inteligência artificial criar um roteiro de conteúdo para você.
            </p>
          </div>
          <AiPostForm />
        </div>
      </div>
  );
}
