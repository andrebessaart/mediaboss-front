// src/contexts/UserContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types/user';

// Defina a interface para uma transação de crédito
interface CreditTransaction {
  id: string;
  amount: number;
  value: number;
  currency: string;
  transactionId?: string;
  description?: string;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (options?: { setLoading: boolean }) => Promise<User | null>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  updateUser: () => Promise.resolve(null),
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback(async (options = { setLoading: true }) => {
    if (typeof window === 'undefined') {
      return null;
    }
    
    // AQUI: Apenas define o loading global se for solicitado
    // Por padrão, a primeira carga (useEffect) definirá o loading.
    // As chamadas subsequentes (como após criar um post) não o farão.
    if (options.setLoading) {
        setLoading(true);
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        { withCredentials: true }
      );
      
      const fetchedUser = response.data.user || response.data;
      if (fetchedUser) {
        setUser(fetchedUser);
        return fetchedUser;
      } else {
        setUser(null);
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
         // Silencia o erro de "não autorizado"
      } else {
        console.error("UserContext: Ocorreu um erro ao buscar o utilizador.", error);
      }
      setUser(null);
      return null;
    } finally {
      // AQUI: Garante que o loading global seja desativado se foi ativado
      if (options.setLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Na primeira carga, queremos o comportamento de loading
      updateUser({ setLoading: true });
    } else {
      setLoading(false);
    }
  }, [updateUser]);

  // AQUI: Modificamos a chamada para passar a opção de não setar o loading
  const updateUserWithoutLoading = useCallback(() => {
    return updateUser({ setLoading: false });
  }, [updateUser]);

  return (
    <UserContext.Provider value={{ user, loading, setUser, updateUser: updateUserWithoutLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
