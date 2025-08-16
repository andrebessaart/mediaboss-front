"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Helper para ícones - Em um projeto real, você pode usar uma biblioteca como lucide-react
// Para este exemplo, os SVGs estão inline para simplicidade.
type IconNames = "brain" | "sparkles" | "calendar" | "shield" | "chevronDown" | "video" | "infinity" | "lightbulb";
interface IconProps {
  name: IconNames;
  className: string;
}

const Icon = ({ name, className }: IconProps) => {
  const icons = {
    brain: <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.94.544M9.5 2A2.5 2.5 0 0 0 7 4.5v15a2.5 2.5 0 0 0 4.94.544M14.5 2A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-4.94.544M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.94.544M4.5 12H20M4.5 6H20M4.5 18H20" />,
    sparkles: <path d="M9.42 6.58 12 4l2.58 2.58M12 20l-2.58-2.58L12 20l2.58-2.58M4 12l2.58-2.58L4 12l2.58 2.58M20 12l-2.58 2.58L20 12l-2.58-2.58M16.9 9.1l.9-2.2.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z" />,
    calendar: <path d="M8 2v4m8-4v4M3 10h18M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    video: <><path d="m22 8-6 4 6 4V8Z"/><path d="M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/></>,
    infinity: <path d="M3.5 9.5c5.5-5.5 11.5 5.5 17 0M3.5 14.5c5.5 5.5 11.5-5.5 17 0"/>,
    lightbulb: <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7c0-2.2-1.8-4-4-4S10 4.8 10 7c0 2 .3 3.2 1.5 4.5.8.8 1.3 1.5 1.5 2.5M9 22h6"/>
  };
  return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>);
};

interface Feature {
  title: string;
  desc: string;
  icon: IconNames; // Agora o TypeScript espera um IconNames
}

// Dados para a página
const features: Feature[] = [
  {
    title: "Geração de Conteúdo com IA",
    desc: "Descreva sua ideia e nossa IA cria imagens, vídeos e legendas profissionais para o seu nicho em segundos.",
    icon: "brain"
  },
  {
    title: "Agendamento Inteligente",
    desc: "Programe posts únicos ou recorrentes. Defina a frequência (diária, semanal) e nós publicamos para você.",
    icon: "calendar"
  },
  {
    title: "Créditos Que Nunca Expiram",
    desc: "Pague uma vez e use quando quiser. Sem assinaturas, sem taxas escondidas. Seus créditos são vitalícios.",
    icon: "infinity"
  },
  {
    title: "Integração Oficial e Segura",
    desc: "Conecte sua conta via API oficial da Meta. Seus dados estão seguros, sua privacidade é garantida.",
    icon: "shield"
  },
];

const plans = [
  {
    name: "Essencial",
    credits: 50,
    price: "R$ 59,90",
    description: "Para quem está começando e quer testar o poder da automação com IA.",
    features: ["50 créditos", "Geração de Imagens", "Agendamento de Posts", "Suporte Padrão"],
    badge: null,
    highlight: false
  },
  {
    name: "Expert",
    credits: 200,
    price: "R$ 169,90",
    description: "Ideal para profissionais e social media que buscam crescimento acelerado.",
    features: ["200 créditos", "Geração de Imagens e Vídeos", "Posts Recorrentes", "Suporte Prioritário"],
    badge: "MAIS POPULAR",
    highlight: true
  },
  {
    name: "Agência",
    credits: 1000,
    price: "R$ 699,90",
    description: "Para agências e equipes com alto volume de conteúdo e múltiplos clientes.",
    features: ["1000 créditos", "Tudo do Expert", "Múltiplas Contas", "Dashboard de Equipe"],
    badge: null,
    highlight: false
  },
];

const faqs = [
    {
        q: "Como funciona a geração de conteúdo com IA?",
        a: "É simples! Você fornece um tema ou uma breve descrição. Nossa IA analisa seu pedido e gera sugestões de imagens, vídeos e legendas otimizadas para engajamento. Você pode aprovar, editar ou pedir novas versões antes de agendar."
    },
    {
        q: "O que são os posts recorrentes?",
        a: "É a função perfeita para manter a consistência. Você pode, por exemplo, pedir para a IA criar e postar uma 'dica do dia' toda manhã, ou um 'resumo da semana' toda sexta-feira. O sistema cuida de tudo automaticamente."
    },
    {
        q: "Posso gerar vídeos também?",
        a: "Sim! Nossos planos a partir do 'Expert' incluem a geração de vídeos curtos com IA, ideais para Reels e Stories. Você descreve a cena ou o conceito, e a IA cria o vídeo para você."
    },
    {
        q: "Os créditos realmente não expiram?",
        a: "Exato. Acreditamos em um modelo justo. Você compra um pacote de créditos e eles são seus para sempre, para usar no seu ritmo, sem a pressão de uma assinatura mensal."
    },
    {
        q: "É seguro conectar minha conta do Instagram?",
        a: "Totalmente seguro. Usamos a API oficial da Meta (empresa mãe do Facebook e Instagram). Nós nunca pedimos ou temos acesso à sua senha. A conexão é autorizada diretamente por você de forma segura."
    }
];

interface FaqItemProps {
  faq: {
    q: string;
    a: string;
  };
}
// Componente para o Acordeão do FAQ
const FaqItem = ({ faq }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div layout className="border-b border-gray-200 pb-4">
            <motion.button
                layout
                className="w-full flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-lg text-gray-800">{faq.q}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon name="chevronDown" className="w-5 h-5 text-indigo-500" />
                </motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600 pr-8"
                    >
                        {faq.a}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ✨ NOVO COMPONENTE: Gerador de Ideias com Gemini API ✨

interface Idea {
    title: string;
    description: string;
}

const IdeaGenerator = () => {
    const [topic, setTopic] = useState("");
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateIdeas = async () => {
        if (!topic) {
            setError('Por favor, insira um tópico.');
            return;
        }
        setLoading(true);
        setError(null);
        setIdeas([]);

        const prompt = `Gere 5 ideias de posts para Instagram sobre o tópico "${topic}". Para cada ideia, forneça um título curto e uma breve descrição de uma frase.`;
        
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        ideas: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    title: { type: "STRING", description: "O título do post." },
                                    description: { type: "STRING", description: "Uma breve descrição do post." }
                                },
                                required: ["title", "description"]
                            }
                        }
                    },
                    required: ["ideas"]
                }
            }
        };

        try {
            // A API Key será injetada automaticamente pelo ambiente de execução
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
                setIdeas(parsedJson.ideas || []);
            } else {
                throw new Error("Resposta da API em formato inesperado.");
            }

        } catch (e) {
            console.error(e);
            setError("Não foi possível gerar as ideias. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="test-ia" className="py-20 px-6 md:px-12 bg-indigo-50">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    Sem ideias? <span className="text-indigo-600">Deixe nossa IA ajudar.</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Experimente nosso gerador de ideias. Diga seu nicho e veja a mágica acontecer.
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ex: 'finanças para autônomos'"
                        className="flex-grow px-5 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                    />
                    <button
                        onClick={handleGenerateIdeas}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Gerando...
                            </>
                        ) : (
                            <>✨ Gerar Ideias com IA</>
                        )}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <div className="mt-8 space-y-4">
                    <AnimatePresence>
                        {ideas.map((idea, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                            >
                                <h3 className="font-bold text-lg text-indigo-700">{idea.title}</h3>
                                <p className="text-gray-600">{idea.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-sm fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <Icon name="sparkles" className="text-indigo-600 w-8 h-8"/>
          <span className="font-extrabold text-2xl text-indigo-600 tracking-tight">AI MediaBoss</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Funcionalidades</Link>
          <Link href="#test-ia" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Teste a IA</Link>
          <Link href="#plans" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Planos</Link>
          <Link href="#faq" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Dúvidas</Link>
          <Link href="#plans" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:scale-105 transition-all">Começar Agora</Link>
        </nav>
        <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 px-6 md:px-12 pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
         <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200/50 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
         <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-blue-200/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="flex-1 space-y-6 max-w-2xl z-10 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-black text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Crie e Agende Conteúdo com <span className="text-indigo-600">Inteligência Artificial.</span> Recupere seu Tempo.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Deixe nossa IA criar <b className="text-gray-700">imagens e legendas únicas</b>, agendar e postar no Instagram para você. Foque no seu negócio, nós cuidamos do seu conteúdo.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Link href="#plans" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all text-lg">Quero Automatizar Meu Perfil</Link>
            <Link href="#features" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-md hover:bg-gray-100 hover:scale-105 transition-all border border-gray-200">Ver Funcionalidades</Link>
          </motion.div>
        </div>
        <motion.div
          className="flex-1 flex justify-center items-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <div className="relative w-[320px] h-[580px] md:w-[350px] md:h-[640px] bg-gray-800 rounded-[40px] shadow-2xl border-4 border-gray-900 p-4">
            <div className="w-full h-full bg-white rounded-[24px] overflow-hidden">
                <img
                    src="https://placehold.co/400x800/7c3aed/ffffff?text=AI+MediaBoss\nPost+Criado!&font=raleway"
                    alt="Mockup do aplicativo AI MediaBoss mostrando um post criado por IA"
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Como Funciona */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Tudo em <span className="text-indigo-600">3 Passos Simples</span></h2>
            <p className="mt-4 text-lg text-gray-600">Transforme uma ideia em um post publicado em menos de 2 minutos.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-4 border-indigo-200">
                    <span className="text-3xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-800">Descreva sua Ideia</h3>
                <p className="mt-2 text-gray-600">Diga à nossa IA sobre o que você quer postar. &quot;Ex: Uma dica sobre marketing digital para pequenas empresas.&quot; </p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-4 border-indigo-200">
                    <span className="text-3xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-800">A IA Cria o Conteúdo</h3>
                <p className="mt-2 text-gray-600">Em segundos, receba uma imagem ou vídeo com uma legenda cativante. Edite o que quiser ou aprove.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-4 border-indigo-200">
                    <span className="text-3xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-800">Agende e Publique</h3>
                <p className="mt-2 text-gray-600">Escolha a data e hora, ou defina uma recorrência. O sistema posta para você, de forma 100% automática. </p>
            </div>
        </div>
      </section>

      {/* ✨ NOVA SEÇÃO COM GEMINI API ✨ */}
      <IdeaGenerator />

      {/* Funcionalidades */}
      <section id="features" className="py-20 px-6 md:px-12 bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Uma Plataforma <span className="text-indigo-600">Completa</span> para seu Conteúdo</h2>
            <p className="mt-4 text-lg text-gray-600">Ferramentas poderosas para você economizar tempo e focar no que realmente importa: seu negócio.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                <Icon name={f.icon} className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mt-5 text-gray-800">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Planos */}
      <section id="plans" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Planos Flexíveis, <span className="text-indigo-600">Sem Assinatura</span></h2>
            <p className="mt-4 text-lg text-gray-600">Escolha o pacote de créditos ideal para você. Pague uma vez, use para sempre.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              className={`bg-white border rounded-2xl p-8 shadow-lg flex flex-col relative ${
                p.highlight ? "border-indigo-500 scale-105 z-10 shadow-indigo-200" : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-bold py-1 px-4 rounded-full text-sm shadow-lg">{p.badge}</div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{p.name}</h3>
                <p className="text-gray-500 h-12">{p.description}</p>
                <div className="my-6">
                    <span className="text-5xl font-extrabold text-gray-900">{p.credits}</span>
                    <span className="text-xl font-semibold text-gray-500"> créditos</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                {p.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                        <span>{feat}</span>
                    </li>
                ))}
              </ul>
              <div className="text-center mt-auto">
                <span className="text-3xl text-indigo-600 font-bold">{p.price}</span>
                <p className="text-sm text-gray-500 mb-6">Pagamento único</p>
                <button className={`w-full py-3 rounded-lg font-semibold shadow transition-transform hover:scale-105 ${p.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'}`}>Comprar Agora</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Milhares de Criadores <span className="text-indigo-600">Já Confiam</span> na Gente</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Depoimento 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                    <img src="https://placehold.co/100x100/e0e7ff/3730a3?text=AC" alt="Foto de Ana Costa" className="w-16 h-16 rounded-full"/>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Ana Costa</h4>
                        <p className="text-sm text-gray-500">Social Media</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-600 italic">O AI MediaBoss mudou meu jogo. A geração de ideias e legendas com IA é surreal. E o melhor: os créditos vitalícios me deram a paz de não ter mais uma assinatura mensal pesando no bolso. </p>
            </div>
            {/* Depoimento 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                    <img src="https://placehold.co/100x100/ede9fe/4338ca?text=RL" alt="Foto de Ricardo Lima" className="w-16 h-16 rounded-full"/>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Ricardo Lima</h4>
                        <p className="text-sm text-gray-500">Dono de E-commerce</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-600 italic">Eu não tenho tempo para criar conteúdo. Agendei 30 posts em uma tarde, tudo com imagens feitas na hora pela IA. Conectei o Instagram e agora só acompanho os resultados. Fantástico! </p>
            </div>
            {/* Depoimento 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                    <img src="https://placehold.co/100x100/dbeafe/1e40af?text=MF" alt="Foto de Mariana Ferreira" className="w-16 h-16 rounded-full"/>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Mariana Ferreira</h4>
                        <p className="text-sm text-gray-500">Influenciadora Digital</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-600 italic">A função de posts recorrentes é genial. Programei uma &quot;frase motivacional&quot; para todo dia às 8h e não preciso mais me preocupar com isso. Minha audiência ama a consistência!</p>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 md:px-12 bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Ainda tem <span className="text-indigo-600">Dúvidas?</span></h2>
            <p className="mt-4 text-lg text-gray-600">Respostas para as perguntas mais comuns sobre nossa plataforma.</p>
        </div>
        <div className="mt-16 max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
            ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full bg-gray-800 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
                <span className="font-extrabold text-2xl text-white tracking-tight">AI MediaBoss</span>
                <p className="text-gray-400 mt-2">Automatizando o sucesso do seu conteúdo.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center">
                <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                <Link href="/termos" className="hover:text-white transition-colors">Termos de Serviço</Link>
                <Link href="mailto:contato@aimediaboss.com" className="hover:text-white transition-colors">Contato</Link>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AI MediaBoss. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
