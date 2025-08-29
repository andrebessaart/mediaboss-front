// ==========================================================================================
// ARQUIVO COMPLETO: src/app/page.tsx
// Esta é a versão final e completa, com a correção do erro de build JSX.
// Todos os placeholders foram substituídos pelo código funcional.
// ==========================================================================================
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ==========================================================================================
// PARTE 1: DEFINIÇÃO DOS COMPONENTES AUXILIARES
// ==========================================================================================

// --- Componente de Ícones (Adicionado Instagram e Robô ATUALIZADO) ---
const Icon: FC<{ name: 'logo' | 'calendar' | 'sparkles' | 'chart' | 'check' | 'arrowRight' | 'chevronDown' | 'wand' | 'menu' | 'close' | 'chat' | 'users' | 'play' | 'zap' | 'instagram' | 'robot'; className?: string }> = ({ name, className }) => {
    const icons = {
        logo: (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.94 6.94a2.12 2.12 0 0 1 0 3l-4.59 4.59a2.12 2.12 0 0 1-3 0L7.06 12.24a2.12 2.12 0 0 1 0-3L11.65 4.65a2.12 2.12 0 0 1 3 0l2.29 2.29zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
        calendar: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 100-6 3 3 0 000 6z" /></svg>),
        sparkles: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M16 17v4m-2 2h4m5-16l-3-3m0 0l-3 3m3-3v12M9 3l-3 3m0 0l3 3m-3-3h12" /></svg>),
        chart: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>),
        check: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>),
        arrowRight: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>),
        chevronDown: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>),
        wand: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>),
        menu: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>),
        close: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>),
        chat: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>),
        users: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
        play: (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>),
        zap: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
        instagram: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>),
        robot: (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="5" y="5" width="14" height="14" rx="2" /><circle cx="9.5" cy="11" r="1.5" fill="currentColor" stroke="none" /><circle cx="14.5" cy="11" r="1.5" fill="currentColor" stroke="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 15h6" /></svg>),
    };
    return icons[name] || null;
};

// --- Componente FloatingComment (ATUALIZADO) ---
const FloatingComment: FC<{ text: string; delay: number; isAI?: boolean }> = ({ text, delay, isAI = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], y: -500 }}
        transition={{ duration: 12, delay, repeat: Infinity, ease: "linear" }}
        className={`flex items-center gap-2 p-3 rounded-lg shadow-xl text-sm ${isAI ? 'bg-indigo-100 text-indigo-800' : 'bg-white'}`}
    >
        {isAI && <Icon name="robot" className="h-5 w-5 flex-shrink-0 text-indigo-500" />}
        <span>{text}</span>
    </motion.div>
);

// --- Componente FeatureSpotlight (Completo) ---
const FeatureSpotlight: FC<{ chip: string; title: string; description: string; videoSrc: string; reverse?: boolean; }> = ({ chip, title, description, videoSrc, reverse = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ duration: 0.7, ease: "easeOut" }} className={`container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
            <div className={`lg:order-${reverse ? 2 : 1}`}>
                <motion.div variants={variants}>
                    <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-4 py-1 rounded-full mb-4">{chip}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{title}</h2>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">{description}</p>
                </motion.div>
            </div>
            <div className={`lg:order-${reverse ? 1 : 2}`}>
                <motion.div variants={variants} transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }} className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden aspect-[9/16] max-w-sm mx-auto border-4 border-gray-200">
                    <video className="w-full h-full object-cover" src={videoSrc} autoPlay loop muted playsInline />
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- Componente FAQ (Completo) ---
const FaqItem: FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b-2 border-gray-200 py-4 cursor-pointer" onClick={onClick}>
        <div className="flex justify-between items-center"><h3 className="font-semibold text-lg text-gray-800">{question}</h3><motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><Icon name="chevronDown" className="h-6 w-6 text-gray-500" /></motion.div></div>
        <AnimatePresence>{isOpen && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden"><p className="pt-4 text-gray-600 leading-relaxed">{answer}</p></motion.div>)}</AnimatePresence>
    </div>
);

// ==========================================================================================
// PARTE 2: O COMPONENTE PRINCIPAL DA PÁGINA
// ==========================================================================================
export default function LandingPageFinalRefined() {
    // --- State e Lógica ---
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    
    // --- Conteúdo da Página (COPY REFINADA) ---
    const navLinks = [{ name: 'Ferramentas', href: '#features' }, { name: 'Como Funciona', href: '#how-it-works' }, { name: 'Planos', href: '#plans' }, { name: 'FAQ', href: '#faq' },];
    const contentFlowSteps = [{ icon: 'sparkles' as const, title: '1. Dê o Assunto', description: 'Informe o tema e deixe nossa IA criar um roteiro mágico para seu Instagram.' }, { icon: 'wand' as const, title: '2. A Mágica Acontece', description: 'Transformamos o roteiro em posts, carrosséis e visuais impactantes em segundos.' }, { icon: 'calendar' as const, title: '3. Ative o Piloto Automático', description: 'Agende tudo e deixe o MediaBoss publicar nos melhores horários para você.' },];
    const engagementFlowSteps = [{ icon: 'chat' as const, title: '1. Defina Gatilhos', description: 'Escolha palavras-chave em comentários e DMs que ativam a automação.' }, { icon: 'zap' as const, title: '2. Crie a Resposta Mágica', description: 'Nossa IA ajuda a criar respostas personalizadas que soam 100% humanas.' }, { icon: 'instagram' as const, title: '3. Domine o Instagram 24/7', description: 'Relaxe enquanto o MediaBoss responde, qualifica leads e encanta seus seguidores.' },];
    const plans = [{ name: 'Essencial', price: 'R$ 59', frequency: '/mês', description: 'Para freelancers e criadores que estão começando.', features: ['50 Créditos de IA /mês', 'Geração de Imagem com IA', 'Agendamento Ilimitado', 'Posts Recorrentes'], cta: 'Começar no Essencial', popular: false,}, { name: 'Profissional', price: 'R$ 169', frequency: '/mês', description: 'Para negócios e agências que precisam de mais poder.', features: ['200 Créditos de IA /mês', 'Geração de Imagem com IA', 'Campanhas Recorrentes', 'Respostas Automáticas', 'Suporte Prioritário'], cta: 'Escolher Profissional', popular: true,}, { name: 'Agência', price: 'R$ 199', frequency: '/mês', description: 'A solução completa para agências e grandes equipes.', features: ['400 Créditos de IA /mês', 'Contas Sociais Ilimitadas', 'Todas as funcionalidades Pro', 'API de acesso (em breve)', 'Gerente de Conta Dedicado'], cta: 'Contratar Agência', popular: false,},];
    const faqs = [{ question: 'O MediaBoss funciona apenas para Instagram?', answer: 'Nossa especialidade e integração mais profunda é com o Instagram, oferecendo automação completa de conteúdo e engajamento. Estamos trabalhando para expandir para outras redes em breve.' }, { question: 'Como funciona o sistema de créditos?', answer: 'É simples: pague apenas pelo que usar. Cada ação da IA, como gerar uma imagem ou uma legenda, consome créditos. Isso lhe dá total controle sobre seus gastos, sem taxas surpresa.' }, { question: 'Posso agendar meus próprios posts ou só usar a IA?', answer: 'Você tem total flexibilidade! Use o MediaBoss como uma poderosa ferramenta de agendamento para seus conteúdos manuais (imagens, vídeos, carrosséis) ou ative a "magia" e deixe nossa IA criar e publicar campanhas recorrentes para você a partir de um único tema.' }, { question: 'Existe um período de teste gratuito?', answer: 'Sim! Ao se cadastrar, você recebe créditos gratuitos para testar todas as funcionalidades mágicas da plataforma, sem precisar de cartão de crédito.' },];

    // --- Estrutura JSX da Página ---
    return (
        <div className="bg-white text-gray-700 font-sans">
            <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo_mediaboss.png" alt="MediaBoss Logo" width={142} height={142} />
                    </Link>
                    <nav className="hidden lg:flex items-center gap-8">{navLinks.map(link => (<a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="font-medium text-gray-600 hover:text-indigo-600 transition-colors">{link.name}</a>))}</nav>
                    <div className="hidden lg:block"><Link href="/login" className="group flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"><span>Entrar</span><Icon name="arrowRight" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></Link></div>
                    <div className="lg:hidden"><button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100"><Icon name="menu" className="h-6 w-6" /></button></div>
                </div>
            </header>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-bold text-2xl text-gray-800">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100"><Icon name="close" className="h-6 w-6" /></button>
                            </div>
                            <nav className="flex flex-col gap-6">
                                {navLinks.map(link => (<a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="font-semibold text-2xl text-gray-700 hover:text-indigo-600 transition-colors">{link.name}</a>))}
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
                <section className="relative pt-24 md:pt-32 pb-24 md:pb-32 bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <div className="relative h-full w-full">
                            {/* Conversation Lane 1 */}
                            <div className="absolute bottom-0 left-[10%] w-72">
                                <FloatingComment text="Qual o valor?" delay={0} />
                                <FloatingComment text="Obrigado! Respondemos sua DM com os detalhes." delay={2} isAI={true} />
                            </div>
                            
                            {/* Conversation Lane 2 */}
                            <div className="absolute bottom-0 left-[45%] w-72">
                                <FloatingComment text="Amei o post! 😍" delay={3} />
                                <FloatingComment text="Que legal! Ficamos felizes que gostou 😊" delay={5} isAI={true} />
                            </div>

                            {/* Conversation Lane 3 */}
                            <div className="absolute bottom-0 right-[10%] w-72">
                                <FloatingComment text="Funciona em Portugal?" delay={1.5} />
                                <FloatingComment text="Sim! Funciona em qualquer lugar do mundo." delay={3.5} isAI={true} />
                            </div>
                        </div>
                    </div>
                    <div className="container relative z-10 mx-auto px-6 text-center">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                            Seu Instagram, no Piloto Automático.
                            <span className="block text-indigo-600">Com um toque de Mágica.</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                            A IA do MediaBoss cria, agenda e responde por você. Transforme seu Instagram em uma máquina de engajamento que trabalha 24/7.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }} className="mt-10">
                            <Link href="/login" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                                Experimentar a Mágica (Grátis)
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <section id="features" className="py-16">
                    <FeatureSpotlight chip="Criação de Conteúdo para Instagram" title="Agende seus posts ou deixe a IA criar por você." description="Use nossa plataforma para agendar manualmente suas fotos, carrosséis e vídeos. Ou, ative a magia: dê um único assunto e nossa IA cria posts recorrentes com criativos e legendas únicas, para sempre." 
                        videoSrc="/videos/feature-content-creation.mp4"
                    />
                    <FeatureSpotlight chip="Automação de Engajamento 24/7" title="Responda todos no Instagram, até enquanto dorme." description="Configure o piloto automático para responder comentários e DMs com base em palavras-chave. Nossa IA entende a intenção e responde de forma humana, nutrindo leads e encantando seguidores." 
                        videoSrc="/videos/feature-engagement-automation.mp4"
                        reverse={true} 
                    />
                </section>

                <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">A Mágica em 3 Passos</h2><p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Veja como é simples colocar seu Instagram no piloto automático.</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-24">{contentFlowSteps.map((step, i) => (<motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}><div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mx-auto shadow-lg"><Icon name={step.icon} className="h-10 w-10 text-indigo-600" /></div><h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3><p className="mt-2 text-gray-600">{step.description}</p></motion.div>))}</div>
                        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Engajamento Mágico</h2><p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Configure uma vez e deixe a mágica acontecer.</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">{engagementFlowSteps.map((step, i) => (<motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}><div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mx-auto shadow-lg"><Icon name={step.icon} className="h-10 w-10 text-purple-600" /></div><h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3><p className="mt-2 text-gray-600">{step.description}</p></motion.div>))}</div>
                    </div>
                </section>

                <section id="plans" className="py-20 md:py-28 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Pague Apenas pelo que Usar</h2><p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Nosso sistema de créditos te dá total controle. Sem taxas mensais fixas, sem surpresas.</p></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">{plans.map((plan, i) => (<motion.div key={plan.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className={`relative border rounded-2xl p-8 flex flex-col h-full ${plan.popular ? 'border-indigo-500 border-2' : 'border-gray-200'}`}>{plan.popular && (<motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 -translate-y-1/2 w-full flex justify-center"><span className="bg-indigo-500 text-white text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">Mais Popular</span></motion.div>)}<h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3><p className="mt-2 text-gray-600">{plan.description}</p><div className="mt-6"><span className="text-5xl font-extrabold text-gray-900">{plan.price}</span><span className="text-lg font-medium text-gray-500">{plan.frequency}</span></div><ul className="mt-8 space-y-4 text-gray-600 flex-grow">{plan.features.map((feature) => (<li key={feature} className="flex items-start"><Icon name="check" className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" /><span>{feature}</span></li>))}</ul><div className="mt-8"><Link href="/login" className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition-colors ${plan.popular ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>{plan.cta}</Link></div></motion.div>))}</div>
                    </div>
                </section>

                <section id="faq" className="py-20 md:py-28 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Sua Dúvida, Respondida</h2><p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Tudo o que você precisa saber para começar a usar a magia.</p></div>
                        <div className="max-w-3xl mx-auto">{faqs.map((faq, i) => (<FaqItem key={i} question={faq.question} answer={faq.answer} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />))}</div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="container mx-auto px-6 py-20 text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Pronto para transformar sua presença online?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Junte-se a milhares de criadores que já estão economizando tempo e alcançando mais pessoas com o MediaBoss.</p>
                        <div className="mt-10">
                            <Link href="/login" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                                Criar Minha Conta Gratuita
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-400">
                <div className="container mx-auto px-6 py-10 text-center">
                    <div className="flex justify-center gap-6 my-6"><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link><Link href="/termos" className="hover:text-white transition-colors">Termos</Link><Link href="mailto:contato@mediaboss.com.br" className="hover:text-white transition-colors">Contato</Link></div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} AI MediaBoss | Andre Bessa - CNPJ 16.868.023/0001-52. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
