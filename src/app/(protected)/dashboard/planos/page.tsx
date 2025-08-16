// app/(protected)/dashboard/planos/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { Alert } from '@/components/Alert';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Confetti from 'react-confetti';

// Defina a interface para o seu objeto de Plano
interface Plan {
  id: string;
  name: string;
  priceCents: number;
  features: { text: string }[];
  stripePriceId?: string;
  credits?: number;
}

// Ícones para os planos
const Icons = {
  check: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
};

export default function PlanosPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [paymentMessageType, setPaymentMessageType] = useState<'success' | 'danger' | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const processedPaymentRef = useRef(false);

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Efeito para buscar os planos
  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get(`${apiUrl}/api/plan/get-plans`, {
          withCredentials: true,
        });
        
        const processedPlans = response.data.plans.map((plan: Plan) => ({
          ...plan,
          features: typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features,
        }));
        setPlans(processedPlans);
      } catch (err) {
        console.error("Erro ao buscar planos:", err);
        setError("Não foi possível carregar os planos. Tente novamente mais tarde.");
      } finally {
        setLoadingPlans(false);
      }
    }
    fetchPlans();
  }, [apiUrl]);

  // Efeito para lidar com o status do pagamento na URL
  useEffect(() => {
    if (!user) {
      return;
    }

    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentStatus && !processedPaymentRef.current) {
      processedPaymentRef.current = true;
      router.replace('/dashboard/planos', { scroll: false });

      if (paymentStatus === 'success') {
        setPaymentMessage("Pagamento realizado com sucesso! Seus créditos foram adicionados.");
        setPaymentMessageType('success');
        setIsPaymentModalOpen(true);
        setShowConfetti(true);
      } else if (paymentStatus === 'cancelled') {
        setPaymentMessage("Pagamento cancelado. Nenhuma cobrança foi feita.");
        setPaymentMessageType('danger');
        setIsPaymentModalOpen(true);
        setShowConfetti(false);
      }
    }
  }, [searchParams, router, user]);

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setShowConfetti(false);
  };

  const handleChoosePlan = async (plan: Plan) => {
    if (!user) {
      setError("Você precisa estar logado para comprar um plano.");
      return;
    }
    if (!plan.stripePriceId) {
      setError("Este plano não está configurado para compra.");
      return;
    }

    setLoadingCheckout(plan.id);
    setError(null);

    try {
      const response = await axios.post(
        `${apiUrl}/api/payment/create-checkout-session`,
        { planId: plan.id, userId: user.id },
        { withCredentials: true }
      );
      window.location.href = response.data.checkoutUrl;
    } catch (err) {
	 let errorMessage = "Ocorreu um erro ao iniciar a compra. Tente novamente.";
  
	  if (axios.isAxiosError(err) && err.response) {
		// Agora o TypeScript sabe que 'err' é do tipo AxiosError
		// e podemos acessar 'err.response' e 'err.response.data' com segurança
		console.error("Erro do Axios ao iniciar checkout da Stripe:", err.response.data?.error || err.response.data || err.response);
		errorMessage = err.response.data?.error || "Ocorreu um erro ao iniciar a compra. Tente novamente.";
	  } else if (err instanceof Error) {
		  // Tratamento para erros genéricos
		  console.error("Erro genérico:", err);
		  errorMessage = err.message;
	  }
    } finally {
      setLoadingCheckout(null);
    }
  };

  // Condição de carregamento
  if (loadingPlans || !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white p-4">
        <p className="text-gray-600">A carregar...</p>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white p-4">
        <Alert type="danger">{error}</Alert>
      </div>
    );
  }

  // Página principal
  return (
    <div className="min-h-[70vh] bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Escolha o seu Plano</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isHighlighted = index === Math.floor(plans.length / 2);
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border hover:border-indigo-500 transition-all duration-300 ${isHighlighted ? 'border-indigo-500 scale-105' : 'border-transparent'}`}
              >
                {isHighlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">MAIS POPULAR</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
                <p className="text-4xl font-extrabold text-indigo-600 mb-6">
                  R${(plan.priceCents / 100).toFixed(2).replace('.', ',')}
                </p>
                <ul className="text-gray-600 space-y-2 mb-8 text-left w-full">
                  {plan.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Icons.check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      {feature.text}
                    </li>
                  ))}
                  {plan.credits && (
                    <li className="flex items-center font-semibold text-gray-800">
                      <Icons.check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      {plan.credits} Créditos de Postagem
                    </li>
                  )}
                </ul>
                <Button
                  onClick={() => handleChoosePlan(plan)}
                  disabled={loadingCheckout === plan.id || !user || !plan.stripePriceId}
                  className="w-full"
                  variant="insta"
                >
                  {loadingCheckout === plan.id ? 'A processar...' : 'Comprar Agora'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        title={paymentMessageType === 'success' ? "Pagamento Concluído!" : "Status do Pagamento"}
      > 
        <p className={`text-lg text-center mb-4 ${paymentMessageType === 'success' ? 'text-green-700' : 'text-red-700'}`}>
          {paymentMessage}
        </p>
        {/* O botão customizado foi removido para evitar duplicação. O Modal usará seu botão padrão que já chama a função onClose. */}
      </Modal>
	   {showConfetti && typeof window !== 'undefined' && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
			style={{ zIndex: 9999 }}
            run={showConfetti}
          />
        )}
    </div>
  );
}
