// src/components/PostDetailModal.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Textarea } from './Textarea';
import Button from './Button';
import { Alert } from './Alert';
import { Schedulepost } from '@/types/schedulepost';

// --- Ícones para a UI ---
type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  edit: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>,
  trash: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  close: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
};

interface PostDetailModalProps {
  post: Schedulepost | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void; // Função para recarregar a lista de posts
}

export default function PostDetailModal({ post, isOpen, onClose, onUpdate }: PostDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post?.caption || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (post) {
      setEditedCaption(post.caption);
      setIsEditing(false);
      setError(null);
    }
  }, [post]);

  if (!post) return null;

  const isEditable = post.status === 'scheduled' || post.status === 'pending_generation';

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/scheduled-posts/${post.id}`,
        { caption: editedCaption },
        { withCredentials: true }
      );
      onUpdate();
      onClose();
    } catch (err) {
      setError("Falha ao salvar as alterações. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/scheduled-posts/${post.id}`,
        { withCredentials: true }
      );
      onUpdate();
      setDeleteConfirmOpen(false);
      onClose();
    } catch (err) {
      setError("Falha ao excluir o post. Tente novamente.");
      console.error(err);
      setDeleteConfirmOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Postagem">
         <button 
			  onClick={onClose} 
			  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
			  aria-label="Fechar modal"
			>
			  <Icons.close className="w-6 h-6" />
        </button>
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          {error && <Alert type="danger">{error}</Alert>}
          <img
            src={post.mediaThumbnailUrl || 'https://placehold.co/400x400/e0e7ff/3730a3?text=Gerando...'}
            alt="Preview da postagem"
            className="w-full h-auto max-h-[200px] object-contain rounded-lg bg-gray-100"
          />
          <div>
            <label className="text-sm font-semibold text-gray-700">Legenda</label>
            {isEditing ? (
              <Textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="mt-1 w-full min-h-[150px]" // Aumentado um pouco para melhor edição
                disabled={isLoading}
              />
            ) : (
              <p className="mt-1 p-3 text-gray-800 bg-gray-50 rounded-md whitespace-pre-wrap border border-gray-200">{post.caption}</p>
            )}
          </div>
        </div>
        
        {/* Os botões agora ficam em um rodapé fixo, fora da área de rolagem */}
        {isEditable && (
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 mt-4 border-t">
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isLoading}>Cancelar</Button>
                <Button onClick={handleSaveChanges} disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="destructive" size="sm" onClick={() => setDeleteConfirmOpen(true)} disabled={isLoading}>
                  <Icons.trash className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
                <Button size="sm" onClick={() => setIsEditing(true)} disabled={isLoading}>
                  <Icons.edit className="w-4 h-4 mr-2" />
                  Editar Legenda
                </Button>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirmar Exclusão"
      >
        <p>Tem certeza de que deseja excluir esta postagem agendada?</p>
        <p className="font-semibold text-red-600 mt-2">Esta ação não pode ser desfeita.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteConfirmOpen(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDeletePost} disabled={isLoading}>
            {isLoading ? 'Excluindo...' : 'Sim, Excluir'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
