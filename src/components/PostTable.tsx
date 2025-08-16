// src/components/PostTable.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Icons, IconProps } from './Icons';
import { Schedulepost } from '@/types/schedulepost';

// Tipagem para os possíveis status do post
type PostStatus = 'posted' | 'scheduled' | 'pending_generation' | 'failed' | 'archived';

// Interface para as props do PostStatusBadge
interface PostStatusBadgeProps {
  status: PostStatus;
}

// Sub-componente para o status do post
const PostStatusBadge = ({ status }: PostStatusBadgeProps) => {
  const statusStyles = {
    posted: { icon: <Icons.checkCircle className="w-4 h-4" />, text: 'Publicado', color: 'text-green-700 bg-green-100' },
    scheduled: { icon: <Icons.clock className="w-4 h-4" />, text: 'Agendado', color: 'text-blue-700 bg-blue-100' },
    pending_generation: { icon: <Icons.loader className="w-4 h-4 animate-spin" />, text: 'Gerando Mídia', color: 'text-yellow-700 bg-yellow-100' },
    failed: { icon: <Icons.alertCircle className="w-4 h-4" />, text: 'Falhou', color: 'text-red-700 bg-red-100' },
	archived: { icon: <Icons.checkCircle className="w-4 h-4" />, text: 'Arquivado', color: 'text-gray-700 bg-gray-100' },
  };
  const style = statusStyles[status] || statusStyles.scheduled;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.color}`}>
      {style.icon}
      <span className="ml-1.5">{style.text}</span>
    </span>
  );
};

// Interface para as props do componente PostTable
interface PostTableProps {
  posts: Schedulepost[];
}

export const PostTable = ({ posts }: PostTableProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">Nenhum post encontrado.</p>
        <p className="text-sm text-gray-400 mt-1">Crie sua primeira campanha com IA para começar!</p>
      </div>
    );
  }
  
  return (
    // AQUI: A div que envolvia a tabela foi removida.
    // Agora a tabela é o elemento principal e a rolagem funcionará.
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mídia</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legenda</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Agendada</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {posts.map(post => (
          <tr key={post.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <img src={post.mediaThumbnailUrl || 'https://placehold.co/100x100/e0e7ff/3730a3?text=Gerando...'} alt="Preview" className="w-12 h-12 rounded-md object-cover bg-gray-100" />
            </td>
            <td className="px-6 py-4">
              <p className="text-sm text-gray-800 truncate max-w-sm">{post.caption}</p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(post.scheduleAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <PostStatusBadge status={post.status} /><br />
				  {post.status === 'posted' && (
					<a
							href={`https://www.instagram.com/p/${post.shortcode}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-indigo-600 hover:text-indigo-800"
						>
							No Instagram
						</a>
				)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
