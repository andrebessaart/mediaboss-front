// src/components/Layout.tsx
'use client';

import { UserProvider } from "@/contexts/UserContext";
import React from 'react'; // Importar React

// Este componente agora é apenas um wrapper para o UserProvider.
// Ele NÃO renderiza Navbar ou Footer.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
