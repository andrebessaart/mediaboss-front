// src/app/dashboard/novo-post/page.tsx
"use client"; // Necessário para usar o hook useRouter

import { useRouter } from "next/navigation"; // Importar o useRouter
import ManualPostForm from "@/components/ManualPostForm";
import Card from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import Link from "next/link";
import Button from "@/components/Button";

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.42 6.58 12 4l2.58 2.58M12 20l-2.58-2.58L12 20l2.58-2.58M4 12l2.58-2.58L4 12l2.58 2.58M20 12l-2.58 2.58L20 12l-2.58-2.58M16.9 9.1l.9-2.2.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z" />
  </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default function NovoPostPage() {
  const router = useRouter(); // Instanciar o router

  return (
      <div className="pt-24">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Botão Voltar Padronizado */}
          <Button
		    variant="ghost"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar para o Dashboard
          </Button>

          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full mb-4">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quer economizar tempo? Experimente o futuro!</h2>
            <p className="mb-6 max-w-2xl mx-auto text-indigo-100">
              Deixe nossa nova Inteligência Artificial criar campanhas de conteúdo completas para você.
            </p>
            <Link 
              href="/dashboard/ia/novo"
              className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Criar Campanha com IA
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Ou, crie um post manualmente</h1>
            <Card>
              <CardContent>
                <ManualPostForm />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
  );
}
