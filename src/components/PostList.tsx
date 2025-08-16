'use client';
import { useEffect, useState } from "react";
import Card from "./Card"
import Button from "./Button";
import axios from "axios";

interface Post {
  id: number;
  caption: string;
  mediaThumbnailUrl: string;
  scheduleAt: string;
  status: string;
  postedAt?: string | null;
  instagramPostId?: string | null;
  shortcode?: string | null;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchListPost() {
      try {
            const res = await axios.get(
             `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/scheduled-posts`,
              { withCredentials: true }
			);
			setPosts(res.data.posts);
			setLoading(false);
		  } catch {
			  setLoading(false);
		  }
		}
		fetchListPost();
	  }, []);
	  

  if (loading) return <div>Carregando...</div>;
  if (posts.length === 0) return <div className="text-gray-500">Nenhum post agendado ou publicado ainda.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map(post => (
        <Card key={post.id} className="flex flex-col p-4">
          <img
            src={post.mediaThumbnailUrl}
            alt="Post"
            className="rounded-xl w-full h-40 object-cover mb-2 border"
          />
          <div className="text-xs text-gray-600 mb-1">
            {post.status === "posted" ? (
              <>Publicado em {new Date(post.postedAt || post.scheduleAt).toLocaleString()}</>
            ) : post.status === "scheduled" ? (
              <>Agendado para {new Date(post.scheduleAt).toLocaleString()}</>
            ) : (
              <span className="text-red-600">Falha ao publicar</span>
            )}
          </div>
          <div className="font-medium text-sm mb-1">{post.caption}</div>
          {post.status === "failed" && (
            <div className="text-xs text-red-600 mt-2">
              Houve um erro ao tentar publicar.
            </div>
          )}
        </Card>
      ))}
	   <Button
        href="/posts"
		variant="insta"
        //className="block mt-3 text-primary text-xs underline hover:text-indigo-800"
      >
        Ver todos posts
      </Button>
    </div>
  );
}
