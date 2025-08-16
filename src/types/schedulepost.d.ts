// src/types/schedulepost.d.ts

// Tipagem para os possíveis status do post (agora incluindo 'archived')
export type PostStatus = 'posted' | 'scheduled' | 'pending_generation' | 'failed' | 'archived';

export type Schedulepost = {
    id: string;
    mediaUrls: string[];
    scheduleAt: string;
    // CORREÇÃO: Corrigido o erro de digitação de 'createAt' para 'createdAt'
    createdAt: string; 
    caption: string;
    status: PostStatus;
	  shortcode: string;
	  mediaThumbnailUrl: string;
};