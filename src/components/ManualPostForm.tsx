"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import  Input  from './Input';
import { Textarea } from './Textarea';
import Button from './Button';
import { Alert } from './Alert';
import { useUser } from '@/contexts/UserContext'; 

const manualPostSchema = z.object({
  caption: z.string().min(1, 'A legenda é obrigatória.'),
  scheduleAt: z.string().min(1, 'A data de agendamento é obrigatória.'),
  image: z.any().refine(files => files?.length === 1, "A imagem é obrigatória."),
});

type ManualPostFormData = z.infer<typeof manualPostSchema>;

const getFormattedDefaultDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 1); 
  now.setHours(9, 0, 0, 0); 

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function ManualPostForm() {
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ManualPostFormData>({
    resolver: zodResolver(manualPostSchema),
    defaultValues: {
      caption: '',
      scheduleAt: getFormattedDefaultDate(), 
      image: undefined,
    }
  });
  
  const { updateUser } = useUser(); 

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

   const onSubmit = async (data: ManualPostFormData) => {
    setFormStatus({ loading: true, error: null });

    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('scheduleAt', new Date(data.scheduleAt).toISOString());
    formData.append('image', data.image[0]);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/schedule`;
      await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      await updateUser();

      setSuccessMessage('Post agendado com sucesso!');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // <-- ADICIONADO AQUI
      
      reset();

    } catch (error) {
		let errorMessage = 'Falha ao agendar o post.';
	  if(axios.isAxiosError(error) && error.response){
	       errorMessage = error.response?.data?.error || 'Falha ao agendar o post.';
	  } else if(error instanceof Error) {
		  errorMessage = error.message;
	  }

      setFormStatus({ loading: false, error: errorMessage });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // <-- E AQUI
    } finally {
      setFormStatus(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    // AQUI: Adicionado padding responsivo
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:p-8">
       {successMessage && <Alert type="success">{successMessage}</Alert>}
       {formStatus.error && <Alert type="error">{formStatus.error}</Alert>}
      
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">Legenda</label>
        <Textarea 
          id="caption" 
          {...register('caption')}
          placeholder="Ex: Dica do dia: Mantenha o foco em seus objetivos e celebre cada pequena vitória! ✨ #Motivação #Sucesso"
		  className={`min-h-[120px]`}
        />
        {errors.caption && <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
        <Input id="image" type="file" accept="image/png, image/jpeg" {...register('image')} />
        {errors.image?.message && <p className="text-red-500 text-sm mt-1">{String(errors.image.message)}</p>}
      </div>

      <div>
        <label htmlFor="scheduleAt" className="block text-sm font-medium text-gray-700 mb-1">Agendar para</label>
        <Input id="scheduleAt" type="datetime-local" {...register('scheduleAt')} />
        {errors.scheduleAt?.message && <p className="text-red-500 text-sm mt-1">{String(errors.scheduleAt.message)}</p>}
      </div>

      {/* AQUI: Botão centralizado em telas pequenas e à direita em telas maiores */}
      <div className="flex justify-center md:justify-end">
        <Button type="submit" disabled={formStatus.loading}>
          {formStatus.loading ? 'Agendando...' : 'Agendar Post'}
        </Button>
      </div>
    </form>
  );
}
