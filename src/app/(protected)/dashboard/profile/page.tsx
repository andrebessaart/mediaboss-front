// app/(protected)/dashboard/profile/page.tsx
"use client";

import { useUser } from '@/contexts/UserContext';
import { Alert } from '@/components/Alert';
import Button from '@/components/Button';
import { format } from 'date-fns'; // Para formatar datas
import { ptBR } from 'date-fns/locale'; 
import Link from 'next/link'; 
import { useRouter } from "next/navigation";

// Ícone de seta para o botão voltar
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter(); // Instanciar o router

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 p-4">
        <div className="text-center text-gray-600">Carregando dados do perfil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 p-4">
        <Alert type="danger">Você precisa estar logado para ver esta página.</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8"> {/* Espaçamento entre as seções */}
        {/* Botão Voltar Padronizado */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Meu Perfil</h1>

        {/* Informações do Usuário */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{user.name || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">E-mail</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Créditos Atuais</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">{user.credits ?? 0}</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/dashboard/profile/change-password" passHref>
              <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Trocar Senha
              </Button>
            </Link>
          </div>
        </section>

        {/* Histórico de Compras de Crédito */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Compras de Crédito</h2>
          {user.creditTransactions && user.creditTransactions.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200"> {/* Adicionado rounded-lg, shadow-sm e border */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transação</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.creditTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.description || 'Compra de Créditos'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: transaction.currency || 'BRL' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 break-all">{transaction.transactionId || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Nenhuma compra de crédito encontrada ainda.</p>
              <p className="text-sm">Parece que você ainda não tem histórico de transações. <Link href="/dashboard/planos" className="text-indigo-600 hover:underline">Compre créditos</Link> para começar a criar conteúdo incrível com IA!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
