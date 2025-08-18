"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from 'axios';
import Link from 'next/link';
import Input from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import Button from "@/components/Button";
import { Alert } from "@/components/Alert";
import Modal from "@/components/Modal";
import { useUser } from '@/contexts/UserContext';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// --- ATUALIZADO: Schema agora inclui numberOfSlides e mediaType como enum ---
const campaignFormSchema = z.object({
  topic: z.string().min(10, "O tema precisa ter pelo menos 10 caracteres."),
  mediaType: z.enum(['IMAGE', 'CAROUSEL']),
  timeOfDay: z.string().regex(/^\d{2}:\d{2}$/, "Use o formato HH:MM (ex: 09:30)."),
  selectedDates: z.array(z.date()).min(1, "Selecione pelo menos um dia."),
  numberOfSlides: z.number().min(2, "O carrossel deve ter no mínimo 2 slides.").max(10, "O carrossel pode ter no máximo 10 slides.").optional(),
}).refine(data => {
    // Se for carrossel, numberOfSlides é obrigatório
    if (data.mediaType === 'CAROUSEL') {
        return data.numberOfSlides !== undefined && data.numberOfSlides >= 2;
    }
    return true;
}, {
    message: "Informe o número de slides.",
    path: ["numberOfSlides"],
});


type CampaignFormData = z.infer<typeof campaignFormSchema>;

export default function AiPostForm() {
  const [formStatus, setFormStatus] = useState<{loading: boolean, error: string | null}>({ loading: false, error: null});
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const { user, loading: loadingUser, updateUser } = useUser();
  const [successMessage, setSuccessMessage] = useState<React.ReactNode | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      mediaType: 'IMAGE',
      timeOfDay: '09:00',
      selectedDates: [],
      numberOfSlides: 5,
    }
  });

  // Observa as mudanças nos campos para lógica dinâmica
  const selectedDates = watch('selectedDates');
  const mediaType = watch('mediaType');
  const numberOfSlides = watch('numberOfSlides');

  // --- LÓGICA DE CÁLCULO DE CRÉDITOS ATUALIZADA ---
  const creditsNeeded = mediaType === 'CAROUSEL' ? 1 : selectedDates?.length || 0;

  useEffect(() => {
    if (!loadingUser && user && (user.credits ?? 0) < creditsNeeded) {
        setIsCreditsModalOpen(true);
    } else {
        setIsCreditsModalOpen(false);
    }
  }, [creditsNeeded, user, loadingUser]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = async (data: CampaignFormData) => {
    if (!user || loadingUser) return;
    
    setFormStatus({ loading: true, error: null });

    const [hours, minutes] = data.timeOfDay.split(':').map(Number);

    const scheduleDatesUTC = data.selectedDates.map(date => {
      const scheduledDate = new Date(date);
      scheduledDate.setHours(hours, minutes, 0, 0);
      return scheduledDate.toISOString();
    });

    const filteredScheduleDates = scheduleDatesUTC.filter(dateStr => new Date(dateStr) > new Date());

    if (filteredScheduleDates.length === 0) {
      setFormStatus({ loading: false, error: "A data selecionada já passou."});
      return;
    }

    // --- CORREÇÃO: Lógica de cálculo e validação robusta ---
    const numPosts = data.mediaType === 'CAROUSEL' 
        ? data.numberOfSlides || 0 // Fallback para 0 se undefined
        : filteredScheduleDates.length;

    if (numPosts <= 0) {
        setFormStatus({ loading: false, error: "O número de posts ou slides deve ser maior que zero."});
        return;
    }

    const payload = {
      topic: data.topic,
      mediaType: data.mediaType,
      scheduleDates: filteredScheduleDates,
      numberOfPosts: numPosts,
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/ai/create-campaign`;
      await axios.post(apiUrl, payload, { withCredentials: true });
      
      await updateUser();

      setSuccessMessage(
        <>
          Campanha criada com sucesso! A IA já está trabalhando. Você pode ver seus posts sendo preparados na{' '}
          <Link href="/dashboard" className="font-bold underline hover:text-green-900">
            página inicial do seu dashboard
          </Link>.
        </>
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      reset({
        topic: '',
        mediaType: 'IMAGE',
        timeOfDay: '09:00',
        selectedDates: [],
        numberOfSlides: 5,
      });
      
    } catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message || "Erro retornado pelo servidor.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setFormStatus({ loading: false, error: errorMessage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
        setFormStatus({ loading: false, error: null });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-4 md:p-8 rounded-lg shadow-md">
        {successMessage && <Alert type="success">{successMessage}</Alert>}
        {formStatus.error && <Alert type="error">{formStatus.error}</Alert>}

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Tema da Campanha
          </label>
          <Textarea
            id="topic"
            placeholder="Ex: Dicas semanais de produtividade para quem trabalha em casa, com um tom inspirador."
            {...register("topic")}
            className={`min-h-[120px] ${errors.topic ? "border-red-500" : ""}`}
          />
          {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* SEÇÃO DE CALENDÁRIO E HORÁRIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mediaType === 'CAROUSEL' ? 'Data para Postar o Carrossel' : 'Datas para Postar as Imagens'}
            </label>
            <Controller
              name="selectedDates"
              control={control}
              render={({ field }) => (
                <DayPicker
                  // --- LÓGICA DE SELEÇÃO ÚNICA OU MÚLTIPLA ---
                  mode={mediaType === 'CAROUSEL' ? 'single' : 'multiple'}
                  selected={mediaType === 'CAROUSEL' ? field.value[0] : field.value}
                  onSelect={(date) => {
                    if (mediaType === 'CAROUSEL') {
                      // Para seleção única, o DayPicker retorna Date | undefined
                      setValue('selectedDates', date ? [date] : [], { shouldValidate: true });
                    } else {
                      // Para seleção múltipla, retorna Date[] | undefined
                      field.onChange(date || []);
                    }
                  }}
                  className="mx-auto"
                  classNames={{
                    day_selected: "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white",
                    day_today: "font-bold text-indigo-600",
                  }}
                />
              )}
            />
            {errors.selectedDates && <p className="text-red-500 text-sm mt-2 text-center">{errors.selectedDates.message}</p>}
          </div>
          <div>
            <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700 mb-1">
              Horário da Postagem
            </label>
            <Input
              id="timeOfDay"
              type="time"
              {...register("timeOfDay")}
              className={errors.timeOfDay ? "border-red-500" : ""}
            />
            {errors.timeOfDay && <p className="text-red-500 text-sm mt-1">{errors.timeOfDay.message}</p>}
          </div>
        </div>

        <div className="text-center font-semibold text-gray-700">
          {mediaType === 'CAROUSEL' ? `1 post de carrossel | Créditos a serem gastos: 1` : `Datas Selecionadas: ${creditsNeeded} | Créditos a serem gastos: ${creditsNeeded}`}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Mídia
                </label>
                <select
                    id="mediaType"
                    {...register("mediaType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="IMAGE">Imagem Única</option>
                    <option value="CAROUSEL">Carrossel</option>
                    <option value="VIDEO" disabled>Vídeo (em breve)</option>
                </select>
            </div>
            {/* --- CAMPO CONDICIONAL PARA NÚMERO DE SLIDES --- */}
            {mediaType === 'CAROUSEL' && (
                <div>
                    <label htmlFor="numberOfSlides" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Slides (2-10)
                    </label>
                    <Input
                        id="numberOfSlides"
                        type="number"
                        min="2"
                        max="10"
                        {...register("numberOfSlides", { valueAsNumber: true })}
                        className={errors.numberOfSlides ? "border-red-500" : ""}
                    />
                    {errors.numberOfSlides && <p className="text-red-500 text-sm mt-1">{errors.numberOfSlides.message}</p>}
                </div>
            )}
        </div>

        <div className="flex justify-center md:justify-end pt-4">
          <Button
            type="submit"
            disabled={formStatus.loading || loadingUser || (user?.credits ?? 0) < creditsNeeded}
          >
            {formStatus.loading ? "Criando Campanha..." : "✨ Criar Campanha com IA"}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        title="Créditos Insuficientes"
      >
        <p className="mb-4 text-red-600 font-semibold">
          Você não tem créditos suficientes para criar esta campanha.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          São necessários {creditsNeeded} créditos, mas você tem apenas {user?.credits ?? 0}.
        </p>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            onClick={() => setIsCreditsModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Fechar
          </button>
          <Link href="/dashboard/planos">
            <Button className="w-full sm:w-auto">
              Comprar mais créditos
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  );
}
