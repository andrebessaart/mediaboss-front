// src/components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from '@/types/user';

// --- Ícones para a UI ---
type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  sparkles: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 1.9-1.1-3-1.1 3L6 6l3 1.1-3 1.1.2 3.1 1.9-1.9 1.9 1.9-1.9-1.9L12 9l1.9-1.9-1.9 1.9L12 3Z"/><path d="M21 12.5.2 14.7l-1.1-3-1.1 3-1.9 1.9 3 1.1-3 1.1.2 3.1 1.9-1.9 1.9 1.9-1.9-1.9L21 18l1.9-1.9-1.9 1.9.2-3.1-3-1.1 3-1.1Z"/></svg>,
  creditCard: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
  logOut: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  userIcon: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  menu: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  close: (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};

type navBarObj = {
	user: User,
	loading: boolean
}

export default function Navbar({ user, loading }: navBarObj) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // --- Lógica de atualização de créditos existente ---
  const [highlightCredits, setHighlightCredits] = useState(false);
  const prevCreditsRef = useRef<number | null | undefined>(user?.credits);

  useEffect(() => {
    const prevCredits = prevCreditsRef.current;
    const currentCredits = user?.credits;

    if (prevCredits !== undefined && prevCredits !== null && currentCredits !== undefined && currentCredits !== null && prevCredits !== currentCredits) {
      setHighlightCredits(true);
      const timer = setTimeout(() => {
        setHighlightCredits(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user?.credits]);

  useEffect(() => {
    prevCreditsRef.current = user?.credits;
  });

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef]);

  const renderUserAvatar = () => {
    if (loading) {
      return <div className="bg-gray-200 h-10 w-10 rounded-full animate-pulse"></div>;
    }

    if (user) {
      return (
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20"
              >
                <Link href="/dashboard/profile" passHref>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Icons.userIcon className="w-4 h-4 mr-2" />
                    Meu Perfil
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <Icons.logOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Login</Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image 
				  src="/logo_mediaboss.png"
				  alt="MediaBoss Logo" 
				  width={132}
				  height={132}
				/>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            {loading && (
              <div className="bg-gray-200 h-6 w-24 rounded-md animate-pulse"></div>
            )}
            {!loading && user && (
               <motion.div
                className="font-bold text-sm px-4 py-2 rounded-full flex items-center"
                animate={{
                  backgroundColor: highlightCredits ? '#C7D2FE' : '#E0E7FF',
                  scale: highlightCredits ? 1.1 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Icons.creditCard className="w-5 h-5 mr-2 text-indigo-700" />
                <span className="text-indigo-700">Créditos: {user.credits ?? 0}</span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 mr-6">
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Dashboard</Link>
              {/* NOVO LINK ADICIONADO ABAIXO */}
              <Link href="/dashboard/auto-responder" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Respostas Automáticas</Link>
              <Link href="/dashboard/planos" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Planos</Link>
            </nav>
            
            {renderUserAvatar()}

            <div className="md:hidden ml-4" ref={mobileMenuRef}>
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                {isMobileMenuOpen ? <Icons.close className="w-6 h-6" /> : <Icons.menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="pt-2 pb-4 space-y-2 border-t border-gray-200">
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Dashboard</Link>
                {/* NOVO LINK ADICIONADO ABAIXO */}
                <Link href="/dashboard/auto-responder" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Respostas Automáticas</Link>
                <Link href="/dashboard/planos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Planos</Link>
                {!loading && user && (
                    <div className="px-3 py-2">
                        <motion.div
                            className="font-bold text-sm px-4 py-2 rounded-full flex items-center justify-center"
                            animate={{
                                backgroundColor: highlightCredits ? '#C7D2FE' : '#E0E7FF',
                                scale: highlightCredits ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Icons.creditCard className="w-5 h-5 mr-2 text-indigo-700" />
                            <span className="text-indigo-700">Créditos: {user.credits ?? 0}</span>
                        </motion.div>
                    </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}