// src/components/InstagramStatus.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import Modal from "./Modal";
import { User } from '@/types/user';

type IconProps = React.SVGProps<SVGSVGElement>;
// Ícones para a UI
const Icons = {
  instagram: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  checkCircle: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  alertCircle: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
};

type objInstagramStatus = {
    user: User | null;
    loadingUser: boolean;
	onDisconnectSuccess: () => void;
}

// NOVO: Recebe user e loadingUser como props
export default function InstagramStatus({ user, loadingUser, onDisconnectSuccess }:objInstagramStatus) {
  const [actionLoading, setActionLoading] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const message = params.get('message');

    if (status === 'error' && message) {
      setErrorMessage(decodeURIComponent(message));
      setIsErrorModalOpen(true);
      // Limpa os parâmetros da URL para que o modal não reapareça
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  const handleConnect = async () => {
    setActionLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/api/instagram/connect`,
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Erro ao iniciar conexão com Instagram:", err);
      setActionLoading(false);
    }
  };
  
  const confirmDisconnect = () => {
    setIsDisconnectModalOpen(true);
  };

  const executeDisconnect = async () => {
    setIsDisconnectModalOpen(false);
    setActionLoading(true);
    try {
      await axios.post(`${apiUrl}/api/instagram/disconnect`, {}, { withCredentials: true });
      // NOTA: O UserContext na DashboardPage (pai) será responsável por refetchUser
      // após a desconexão, para que o estado do usuário seja atualizado globalmente.
      // Aqui, apenas limpamos o estado local se necessário, mas o UserContext é a fonte da verdade.
      // Se o UserContext expuser setUser, poderíamos chamar setUser(null) aqui para uma atualização mais rápida.
      // Por simplicidade, vamos confiar no refetch do UserContext que a DashboardPage ou o Layout farão.
	  onDisconnectSuccess();
    } catch (err) {
      console.error("Erro ao desconectar Instagram:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const renderStatus = () => {
    if (loadingUser) { // Usa a prop loadingUser
      return <p className="text-sm text-gray-500">Verificando conexão...</p>;
    }

    // Verifica se o token expirou (se houver um token e data de expiração)
    const isTokenExpired = user?.instagramTokenExpiry 
      ? new Date(user.instagramTokenExpiry) <= new Date() 
      : false;

    // Se não há usuário, ou Instagram não conectado, ou token expirado
    if (!user || !user.instagramConnected || isTokenExpired) {
      return (
        <div className="text-center">
          <div className="mx-auto bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
            <Icons.alertCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="font-semibold text-gray-800">Instagram Desconectado</p>
          <p className="text-xs text-gray-500 mb-4">
            {isTokenExpired ? "Sua conexão com o Instagram expirou." : "Conecte sua conta para começar a postar."}
          </p>
          <Button onClick={handleConnect} disabled={actionLoading} variant="insta" size="sm">
            Conectar Agora
          </Button>
        </div>
      );
    }

    // Se conectado
    return (
      <div className="text-center">
        <div className="mx-auto bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Icons.checkCircle className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-semibold text-gray-800">Instagram Conectado</p>
        <p className="text-xs text-gray-500 mb-4">ID: {user.instagramId}</p>
        <Button onClick={confirmDisconnect} disabled={actionLoading} variant="destructive" size="sm">
          Desconectar
        </Button>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Icons.instagram className="text-gray-400" />
        Status da Conexão
      </h3>
      {renderStatus()}
       {/* NOVO: Modal de Erro para a conexão */}
		  <Modal
			isOpen={isErrorModalOpen}
			onClose={() => setIsErrorModalOpen(false)}
			title="Erro na Conexão com o Instagram"
		  >
			<p className="mb-4 text-red-600 font-semibold">{errorMessage}</p>
			<p className="mb-2">
			  Para que o MediaBoss funcione, sua conta do Instagram deve ser do tipo
			  **Comercial** ou **Criador** e estar conectada a uma Página do Facebook.
			</p>
			<p className="mb-4 text-sm text-gray-600">
			  Você pode seguir as instruções oficiais da Meta para resolver o problema:
			</p>
			<ul className="list-disc list-inside text-sm text-gray-600">
			  <li>
				<a href="https://help.instagram.com/502981923235522?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600">
				  Mudar seu perfil do Instagram para uma conta profissional
				</a>
			  </li>
			  <li>
				<a href="https://help.instagram.com/570895513091465?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600">
				  Conectar uma conta do Instagram a uma Página do Facebook
				</a>
			  </li>
			</ul>
			<div className="mt-6 flex justify-end">
			  <button
				onClick={() => setIsErrorModalOpen(false)}
				className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
			  >
				Fechar
			  </button>
			</div>
		  </Modal>

      {/* ... (Modal de Desconexão existente) */}
      <Modal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        title="Atenção: Desconectar Instagram"
      >
        <p className="mb-4">
          Ao desconectar sua conta do Instagram, **todas as publicações agendadas e pendentes de publicação serão perdidas** e os créditos utilizados para gerá-las **não serão reembolsados**.
        </p>
        <p className="font-semibold">Tem certeza que deseja continuar?</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsDisconnectModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <Button onClick={executeDisconnect} variant="destructive">
            Sim, Desconectar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
