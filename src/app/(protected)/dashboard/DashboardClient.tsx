// src/(protected)/dashboard/DashboardClient.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PostTable } from '@/components/PostTable';
import { useUser } from '@/contexts/UserContext';
import { Pagination } from '@/components/Pagination';
import InstagramStatus from '@/components/InstagramStatus';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Schedulepost } from '@/types/schedulepost'; 

// Definindo os tipos para o linter não reclamar do `any`
type PostStatus = 'posted' | 'scheduled' | 'pending_generation' | 'failed' | 'archived';
interface PostStatusUpdate {
  id: string;
  status: PostStatus;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

const Icons = {
  plus: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  sparkles: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 1.9-1.1-3-1.1 3L6 6l3 1.1-3 1.1.2 3.1 1.9-1.9 1.9 1.9-1.9-1.9L12 9l1.9-1.9-1.9 1.9.2-3.1-3-1.1 3-1.1Z"/><path d="M21 12.5.2 14.7l-1.1-3-1.1 3-1.9 1.9 3 1.1-3 1.1.2 3.1 1.9-1.9 1.9 1.9-1.9-1.9L21 18l1.9-1.9-1.9 1.9.2-3.1-3-1.1 3-1.1Z"/></svg>,
  search: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  refresh: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 13H6v-3m15.5 1h-3v3"/><path d="M21 12a9 9 0 0 0-9-9c-2.48 0-4.69 1.15-6.14 2.96"/><path d="M3 12a9 9 0 0 0 9 9c-2.48 0-4.69-1.15-6.14-2.96"/></svg>,
};

export default function DashboardClient() {
  const [posts, setPosts] = useState<Schedulepost[]>([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user, loading: loadingUser, updateUser } = useUser();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedStartDate = useDebounce(startDate, 500);
  const debouncedEndDate = useDebounce(endDate, 500);
  const debouncedStatusFilter = useDebounce(statusFilter, 500);
  const router = useRouter();

  const fetchPosts = useCallback(async (page: number, search: string, startDt: string, endDt: string, statusFlt: string, currentUserId: string) => {
    if (!currentUserId) {
      setLoadingPosts(false);
      return;
    }
    setLoadingPosts(true);
    try {
      const params: Record<string, number | string> = { page, search };
      if (startDt) params.startDate = startDt;
      if (endDt) params.endDate = endDt;
      if (statusFlt) params.status = statusFlt;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/scheduled-posts`, {
          params: params,
          withCredentials: true,
        }
      );
      setPosts(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      if (axios.isAxiosError(error) && error.response && (error.response.status === 401 || error.response.status === 403)) {
        setPosts([]);
        setPagination(null);
      }
    } finally {
      setLoadingPosts(false);
    }
  }, []);
  
  const fetchPostStatuses = useCallback(async () => {
    const postIds = posts.map(post => post.id);
    if (!user?.id || postIds.length === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/post-statuses`, {
          params: { ids: postIds.join(',') },
          withCredentials: true,
        }
      );
      const updatedStatuses: PostStatusUpdate[] = response.data.statuses;

      setPosts(currentPosts => {
        return currentPosts.map(post => {
          const updatedStatus = updatedStatuses.find(s => s.id === post.id);
          return updatedStatus ? { ...post, status: updatedStatus.status } : post;
        });
      });
    } catch (error) {
      console.error("Erro ao buscar status dos posts:", error);
    }
  }, [user, posts]);

  useEffect(() => {
    if (!loadingUser && user && user.id) {
      fetchPosts(currentPage, debouncedSearchTerm, debouncedStartDate, debouncedEndDate, debouncedStatusFilter, user.id);
    } else if (!loadingUser && !user) {
      setLoadingPosts(false);
      setPosts([]);
      setPagination(null);
    }
  }, [currentPage, debouncedSearchTerm, debouncedStartDate, debouncedEndDate, debouncedStatusFilter, fetchPosts, user, loadingUser]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (!loadingUser && user && user.id) {
      intervalId = setInterval(fetchPostStatuses, 30000); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loadingUser, user, fetchPostStatuses]);
  
  useEffect(() => {
    if (searchTerm !== '') { setCurrentPage(1); }
  }, [debouncedSearchTerm]); 

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedStartDate, debouncedEndDate, debouncedStatusFilter]);

  const handleCreatePostClick = (path: string) => {
     if (user && user.instagramConnected) {
      router.push(path);
     } else {
      setIsModalOpen(true);
     }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo(a), {loadingUser ? '...' : user?.name || 'Usuário'}!</h1>
          <p className="text-gray-500 mt-1">Aqui está um resumo da sua atividade recente.</p>
          <div className="flex space-x-4 mt-4">
            <Button onClick={() => handleCreatePostClick("/dashboard/ia/novo")} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center">
              <Icons.sparkles className="w-5 h-5 mr-2" />
              Criar com IA
            </Button>
            <Button onClick={() => handleCreatePostClick("/dashboard/novo-post")} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center">
              <Icons.plus className="w-5 h-5 mr-2" />
              Post Manual
            </Button>
          </div>
        </div>
        <div className="w-full md:w-auto md:min-w-[300px]">
          <InstagramStatus user={user} loadingUser={loadingUser} onDisconnectSuccess={updateUser}/>
        </div>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Seus Posts Agendados</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button
              type="button"
              onClick={() => {
                if (user && user.id) {
                    fetchPosts(currentPage, debouncedSearchTerm, debouncedStartDate, debouncedEndDate, debouncedStatusFilter, user.id);
                }
              }}
              className="h-10 w-10 flex items-center justify-center p-0 bg-white text-indigo-500 border border-transparent rounded-lg shadow-sm hover:bg-white hover:border-gray-600 transition-colors"
              title="Atualizar Tabela"
              disabled={loadingPosts}
            >
              <Icons.refresh className={`w-5 h-5 ${loadingPosts ? 'animate-spin' : ''}`} />
            </Button>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar por legenda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-grow items-center gap-2">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700">De:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
              />
            </div>
            <div className="flex flex-grow items-center gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700">Para:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
              />
            </div>

            <div className="flex flex-grow items-center gap-2">
              <label htmlFor="statusFilter" className="sr-only">Status</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
              >
                <option value="">Todos os Status</option>
                <option value="scheduled">Agendado</option>
                <option value="posted">Publicado</option>
                <option value="failed">Falhou</option>
                <option value="pending_generation">Gerando Mídia</option>
              </select>
            </div>
          </div>
        </div>
        {/* AQUI: Adicionamos um container com rolagem horizontal para a tabela */}
        <div className="overflow-x-auto w-full">
            {loadingPosts ? <p className="text-center py-8">Carregando posts...</p> : <PostTable posts={posts} />}
        </div>
        {pagination && <Pagination pagination={pagination} onPageChange={setCurrentPage} />}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Conecte seu Instagram">
        <p>Para criar ou agendar posts, você precisa conectar sua conta do Instagram ao MediaBoss.</p>
        <p className="mt-2">Vá para a seção de status do Instagram e conecte sua conta para começar a postar!</p>
        <div className="mt-4 flex justify-center">
          <Link href="/dashboard" passHref>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Ir para o Dashboard
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}
