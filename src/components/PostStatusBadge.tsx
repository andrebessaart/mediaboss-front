// components/PostStatusBadge.tsx
import Link from "next/link";
import Image from "next/image";

import { Icons } from '@/components/Icons';

type PostStatus = 'posted' | 'scheduled' | 'pending_generation' | 'failed' | 'archived';

interface PostStatusBadgeProps {
    status: PostStatus;
}

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

export default PostStatusBadge;

