// app/(protected)/layout.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar'; // Importa a Navbar
import Footer from '@/components/Footer'; // Importa o Footer
import { User } from '@/types/user';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e o usuário não estiver autenticado, redireciona para o login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Não renderiza nada se não estiver autenticado e já terminou de carregar (redirecionamento já ocorreu)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} loading={loading} /> {/* Passa user e loading para a Navbar */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
