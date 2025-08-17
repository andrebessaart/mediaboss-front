// src/app/(protected)/dashboard/select-instagram-account/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { Alert } from '@/components/Alert';
import Button from '@/components/Button';
import Image from 'next/image';

// --- Tipagem para a conta do Instagram ---
interface InstagramAccount {
  pageId: string;
  pageName: string;
  instagramId: string;
  instagramUsername: string;
  profilePictureUrl?: string;
}

// --- Ícone para a UI ---
const Icons = {
  instagram: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
};

export default function SelectInstagramAccountPage() {
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/available-accounts`,
          { withCredentials: true }
        );
        setAccounts(response.data.accounts);
      } catch (err) {
        console.error("Erro ao buscar contas:", err);
        setError("Não foi possível carregar as contas. Por favor, tente reconectar a partir do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSelectAccount = async (instagramId: string) => {
    setSelectedAccountId(instagramId); // Para mostrar o estado de loading no botão específico
    setError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/finalize-connection`,
        { instagramId },
        { withCredentials: true }
      );
      
      // Atualiza os dados do usuário no contexto global
      await updateUser();

      // Redireciona para o dashboard, que agora mostrará o status "Conectado"
      router.push('/dashboard');

    } catch (err) {
      console.error("Erro ao finalizar conexão:", err);
      setError("Ocorreu um erro ao selecionar a conta. Tente novamente.");
      setSelectedAccountId(null); // Limpa o estado de loading do botão
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-gray-600">
          <p>A carregar contas disponíveis...</p>
        </div>
      );
    }

    if (error) {
      return <Alert type="danger">{error}</Alert>;
    }

    if (accounts.length === 0) {
      return (
        <Alert type="info">
          Nenhuma conta do Instagram foi encontrada. Por favor, volte ao dashboard e tente conectar novamente.
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.instagramId}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Image
                src={account.profilePictureUrl || '/logo_mediaboss.png'}
                alt={`Foto de perfil de ${account.instagramUsername}`}
                width={48}
                height={48}
                className="rounded-full bg-gray-200"
              />
              <div>
                <p className="font-bold text-gray-800">@{account.instagramUsername}</p>
                <p className="text-sm text-gray-500">Página do Facebook: {account.pageName}</p>
              </div>
            </div>
            <Button
              onClick={() => handleSelectAccount(account.instagramId)}
              disabled={!!selectedAccountId}
              className="w-32"
            >
              {selectedAccountId === account.instagramId ? 'A conectar...' : 'Selecionar'}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <Icons.instagram className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Selecione a sua Conta do Instagram</h1>
            <p className="text-gray-600 mt-2">
              Encontrámos as seguintes contas de Instagram Business associadas. Escolha qual delas pretende gerir com o MediaBoss.
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
