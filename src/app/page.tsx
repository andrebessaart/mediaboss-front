// src/app/page.tsx
"use client"; // Required for state and animations (Framer Motion, interactive FAQ)

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { FC, SVGProps } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Ícones Personalizados (SVG Inline para Performance e Estilo) ---
const Icon: FC<{ name: 'logo' | 'calendar' | 'sparkles' | 'chart' | 'infinity' | 'check' | 'arrowRight' | 'chevronDown' | 'wand' | 'menu' | 'close'; className?: string }> = ({ name, className }) => {
  // --- CORREÇÃO APLICADA AQUI ---
  // Removemos a anotação de tipo explícita "{ [key: string]: JSX.Element }"
  // e deixamos o TypeScript inferir o tipo do objeto 'icons'.
  const icons = {
    logo: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.94 6.94a2.12 2.12 0 0 1 0 3l-4.59 4.59a2.12 2.12 0 0 1-3 0L7.06 12.24a2.12 2.12 0 0 1 0-3L11.65 4.65a2.12 2.12 0 0 1 3 0l2.29 2.29zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M16 17v4m-2 2h4m5-16l-3-3m0 0l-3 3m3-3v12M9 3l-3 3m0 0l3 3m-3-3h12" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    infinity: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    arrowRight: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    chevronDown: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    ),
    wand: (
       <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    menu: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    close: (
       <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };
  return icons[name] || null;
};

// --- Componente do Mockup do Celular (SVG Detalhado) ---
const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    className="relative mx-auto" style={{ maxWidth: '360px' }}
  >
    <svg viewBox="0 0 360 740" className="w-full h-auto drop-shadow-2xl">
      {/* Phone Body */}
      <rect width="360" height="740" rx="40" fill="#1f2937" />
      <rect x="5" y="5" width="350" height="730" rx="35" fill="#111827" />
      {/* Screen */}
      <rect x="20" y="20" width="320" height="700" rx="20" fill="#f9fafb" />
      {/* Notch */}
      <rect x="130" y="20" width="100" height="25" rx="12.5" fill="#111827" />
      <rect x="145" y="27" width="15" height="3" rx="1.5" fill="#374151" />

      {/* Screen Content - A simplified representation of MediaBoss UI */}
      <g transform="translate(25, 50)">
        {/* Header */}
        <rect x="10" y="0" width="40" height="40" rx="20" fill="#e5e7eb" />
        <rect x="60" y="10" width="120" height="8" rx="4" fill="#d1d5db" />
        <rect x="60" y="25" width="80" height="8" rx="4" fill="#e5e7eb" />
        <circle cx="290" cy="20" r="12" fill="#4f46e5" />
        <path d="M287 20 l3 3 l6 -6" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Chart Section */}
        <rect x="10" y="60" width="290" height="150" rx="12" fill="white" />
        <rect x="25" y="75" width="100" height="8" rx="4" fill="#4f46e5" />
        <rect x="25" y="90" width="60" height="6" rx="3" fill="#a5b4fc" />
        <path d="M 40 180 C 80 140, 120 190, 160 160, 200 130, 240 170, 280 150" stroke="#4f46e5" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="280" cy="150" r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />

        {/* Scheduled Posts List */}
        <rect x="10" y="230" width="150" height="10" rx="5" fill="#374151" />

        {/* Post Card 1 */}
        <rect x="10" y="255" width="290" height="100" rx="12" fill="white" />
        <rect x="25" y="270" width="30" height="30" rx="15" fill="#e5e7eb" />
        <rect x="65" y="275" width="100" height="6" rx="3" fill="#6b7280" />
        <rect x="65" y="288" width="50" height="5" rx="2.5" fill="#9ca3af" />
        <rect x="25" y="310" width="260" height="8" rx="4" fill="#d1d5db" />
        <rect x="25" y="325" width="220" height="8" rx="4" fill="#e5e7eb" />

        {/* Post Card 2 */}
        <rect x="10" y="370" width="290" height="100" rx="12" fill="white" />
        <rect x="25" y="385" width="30" height="30" rx="15" fill="#e5e7eb" />
        <rect x="65" y="390" width="100" height="6" rx="3" fill="#6b7280" />
        <rect x="65" y="403" width="50" height="5" rx="2.5" fill="#9ca3af" />
        <rect x="25" y="425" width="260" height="8" rx="4" fill="#d1d5db" />
        <rect x="25" y="440" width="180" height="8" rx="4" fill="#e5e7eb" />
        
        {/* Post Card 3 */}
        <rect x="10" y="485" width="290" height="100" rx="12" fill="white" />
        <rect x="25" y="500" width="30" height="30" rx="15" fill="#e5e7eb" />
        <rect x="65" y="505" width="100" height="6" rx="3" fill="#6b7280" />
        <rect x="65" y="518" width="50" height="5" rx="2.5" fill="#9ca3af" />
        <rect x="25" y="540" width="260" height="8" rx="4" fill="#d1d5db" />
        <rect x="25" y="555" width="240" height="8" rx="4" fill="#e5e7eb" />
      </g>
    </svg>
  </motion.div>
);

// --- Componente FAQ (Frequently Asked Questions) ---
const FaqItem: FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b-2 border-gray-200 py-4 cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <Icon name="chevronDown" className="h-6 w-6 text-gray-500" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- A Página Principal ---
export default function LandingPageV3() {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Open the first FAQ by default
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on link click
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const navLinks = [
      { name: 'Funcionalidades', href: '#features' },
      { name: 'Planos', href: '#plans' },
      { name: 'FAQ', href: '#faq' },
  ];

  const features = [
    {
      name: 'Agendamento Inteligente',
      description: 'Planeje e agende posts com antecedência. Nossa plataforma garante que seu conteúdo seja publicado nos melhores horários para máximo alcance.',
      icon: 'calendar' as const,
    },
    {
      name: 'Conteúdo Gerado por IA',
      description: 'Supere o bloqueio criativo. Gere legendas, ideias e até mesmo roteiros completos com o poder da nossa inteligência artificial integrada.',
      icon: 'sparkles' as const,
    },
    {
      name: 'Análise de Desempenho',
      description: 'Transforme dados em decisões. Acompanhe métricas de engajamento, crescimento de seguidores e performance de posts em um dashboard claro.',
      icon: 'chart' as const,
    },
    {
      name: 'Campanhas Recorrentes',
      description: 'Automatize a consistência. Crie campanhas que publicam conteúdo novo e único sobre um mesmo tema, mantendo seu público engajado.',
      icon: 'infinity' as const,
    },
  ];

  const plans = [
    {
      name: 'Essencial',
      price: 'R$ 59',
      frequency: '/mês',
      description: 'Para freelancers e criadores de conteúdo que estão começando.',
      features: ['50 Créditos de IA /mês', 'Geração de Imagem com IA', 'Agendamento Ilimitado', 'Posts Recorrentes'],
      cta: 'Começar no Essencial',
      popular: false,
    },
    {
      name: 'Profissional',
      price: 'R$ 169',
      frequency: '/mês',
      description: 'Para negócios em crescimento e agências que precisam de mais poder.',
      features: ['200 Créditos de IA /mês', 'Geração de Imagem com IA', 'Campanhas Recorrentes', 'Posts Recorrentes', 'Suporte Prioritário'],
      cta: 'Escolher Profissional',
      popular: true,
    },
    {
      name: 'Agência',
      price: 'R$ 199',
      frequency: '/mês',
      description: 'A solução completa para agências e grandes equipes.',
      features: ['400 Créditos de IA /mês', 'Contas Sociais Ilimitadas', 'Todas as funcionalidades Pro', 'API de acesso (em breve)', 'Gerente de Conta Dedicado'],
      cta: 'Contratar Agência',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Quais redes sociais são suportadas pelo MediaBoss?',
      answer: 'Atualmente, o MediaBoss tem integração completa com o Instagram. Estamos trabalhando ativamente para adicionar suporte ao Facebook, TikTok e LinkedIn em breve.',
    },
    {
      question: 'Como funciona a geração de conteúdo por IA?',
      answer: 'Você fornece um tema, um tom de voz e algumas palavras-chave. Nossa IA analisa esses dados e gera legendas, hashtags e ideias de conteúdo originais e otimizadas para engajamento.',
    },
    {
      question: 'Preciso ter conhecimento técnico para usar a plataforma?',
      answer: 'Absolutamente não! O MediaBoss foi projetado com uma interface intuitiva e amigável. Se você sabe usar redes sociais, saberá usar nossa plataforma com facilidade.',
    },
    {
      question: 'Existe um período de teste?',
      answer: 'Sim! Ao se cadastrar, você recebe créditos gratuitos para testar todas as funcionalidades da plataforma, incluindo o agendamento de posts e a geração de conteúdo por IA.',
    },
  ];

  return (
    <div className="bg-white text-gray-700 font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
              <Image 
				  src="/logo_mediaboss.png"
				  alt="MediaBoss Logo" 
				  width={142} 
				  height={142} 
				/>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="font-medium text-gray-600 hover:text-indigo-600 transition-colors">{link.name}</a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link href="/login" className="group flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                <span>Entrar</span>
                <Icon name="arrowRight" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
            >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white p-8 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-12">
                        <span className="font-bold text-2xl text-gray-800">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                            <Icon name="close" className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-6">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="font-semibold text-2xl text-gray-700 hover:text-indigo-600 transition-colors">{link.name}</a>
                        ))}
                        <hr className="my-4" />
                        <Link href="/login" className="group flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                            <span>Entrar</span>
                            <Icon name="arrowRight" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </nav>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            >
              Seu Assistente de Conteúdo,
              <span className="block text-indigo-600">Alimentado por Magia.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
            >
              Transforme uma única ideia em um mês de posts criativos e agendados. O MediaBoss é o seu social media, criador e estrategista, tudo em um só lugar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="mt-10"
            >
              <Link href="/login" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Liberte sua Criatividade
              </Link>
            </motion.div>
          </div>
          <div className="mt-16">
            <PhoneMockup />
          </div>
        </section>

        {/* Magic Flow Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">De uma Ideia à Magia de um Mês de Conteúdo</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Veja como nosso assistente de IA coloca suas redes sociais no piloto automático.
              </p>
            </div>
            <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
                {/* Step 1: Idea */}
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col items-center text-center w-64">
                    <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-4 border-white shadow-lg">
                        <Icon name="sparkles" className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">1. Sua Ideia</h3>
                    <p className="mt-2 text-gray-600">Diga ao MediaBoss sobre o que você quer falar. Um produto, um tema, uma promoção.</p>
                </motion.div>

                {/* Arrow for large screens */}
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="hidden lg:block mx-8">
                    <Icon name="arrowRight" className="h-12 w-12 text-gray-300" />
                </motion.div>
                 {/* Arrow for small screens */}
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:hidden my-4">
                    <Icon name="chevronDown" className="h-12 w-12 text-gray-300" />
                </motion.div>

                {/* Step 2: Magic */}
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col items-center text-center w-64">
                    <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full border-4 border-white shadow-lg">
                        <Icon name="wand" className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">2. A Mágica Acontece</h3>
                    <p className="mt-2 text-gray-600">Nossa IA cria legendas, encontra as melhores hashtags e prepara os criativos para você.</p>
                </motion.div>

                {/* Arrow for large screens */}
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} className="hidden lg:block mx-8">
                    <Icon name="arrowRight" className="h-12 w-12 text-gray-300" />
                </motion.div>
                 {/* Arrow for small screens */}
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} className="lg:hidden my-4">
                    <Icon name="chevronDown" className="h-12 w-12 text-gray-300" />
                </motion.div>

                {/* Step 3: Automation */}
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9 }} className="flex flex-col items-center text-center w-64">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full border-4 border-white shadow-lg">
                        <Icon name="calendar" className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">3. Piloto Automático</h3>
                    <p className="mt-2 text-gray-600">Aprovou? O MediaBoss agenda e publica tudo nos melhores horários, de forma pontual ou recorrente.</p>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Tudo que Você Precisa para Dominar</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Ferramentas poderosas e intuitivas para transformar sua estratégia de conteúdo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.name} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-indigo-100 text-indigo-600 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                    <Icon name={feature.icon} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Planos Criados para o seu Sucesso</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Escolha o plano perfeito para sua necessidade e comece a crescer hoje mesmo.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
              {plans.map((plan, i) => (
                <motion.div 
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative border rounded-2xl p-8 flex flex-col h-full ${plan.popular ? 'border-indigo-500 border-2' : 'border-gray-200'}`}
                >
                  {plan.popular && (
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 -translate-y-1/2 w-full flex justify-center"
                    >
                      <span className="bg-indigo-500 text-white text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">Mais Popular</span>
                    </motion.div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-lg font-medium text-gray-500">{plan.frequency}</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Icon name="check" className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/login" className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition-colors ${plan.popular ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Perguntas Frequentes</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Respostas para as dúvidas mais comuns sobre nossa plataforma.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-white">
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Pronto para transformar sua presença online?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Junte-se a milhares de criadores que já estão economizando tempo e alcançando mais pessoas com o MediaBoss.
            </p>
            <div className="mt-10">
              <Link href="/login" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Criar Minha Conta Gratuita
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 py-10 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Icon name="logo" className="h-7 w-7 text-indigo-500" />
            <span className="font-bold text-xl text-white">MediaBoss</span>
          </Link>
          <div className="flex justify-center gap-6 my-6">
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
            <Link href="mailto:contato@mediaboss.com.br" className="hover:text-white transition-colors">Contato</Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} AI MediaBoss | Andre Bessa - CNPJ 16.868.023/0001-52. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
