"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Alert } from "./Alert";
import AutoResponderModal from "./AutoResponderModal";

// Tipagem para a mídia do Instagram
interface InstagramMedia {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  hasAutoResponder: boolean;
}

// Ícone do robô para o indicador de automação
const RobotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);


export default function InstagramMediaGrid() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<InstagramMedia | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/media`,
        { withCredentials: true }
      );
      setMedia(response.data.media);
    } catch (err) {
      console.error("Erro ao buscar mídias do Instagram:", err);
      setError("Não foi possível carregar seus posts do Instagram. Verifique se sua conta está conectada corretamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpdate = () => {
    // Fecha o modal e atualiza a lista de mídias para refletir o novo estado
    setSelectedPost(null);
    fetchMedia();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <Alert type="danger">{error}</Alert>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square cursor-pointer group"
            onClick={() => setSelectedPost(item)}
          >
            <Image
              src={item.thumbnail_url || item.media_url}
              alt={item.caption || "Post do Instagram"}
              fill
              style={{objectFit: "cover"}}
              className="rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-center p-2">Configurar</span>
            </div>
            {item.hasAutoResponder && (
              <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
                <RobotIcon className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <AutoResponderModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onUpdate={handleUpdate}
      />
    </>
  );
}