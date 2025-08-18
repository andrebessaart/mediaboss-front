"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import { Textarea } from './Textarea';
import Button from './Button';
import { Alert } from './Alert';
import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';

// --- Ícones para a UI ---
const Icons = {
  upload: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
  close: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};


// --- Schema Zod ATUALIZADO ---
const manualPostSchema = z.object({
  caption: z.string().min(1, 'A legenda é obrigatória.'),
  scheduleAt: z.string().min(1, 'A data de agendamento é obrigatória.'),
  // Agora 'images' é um FileList e deve conter entre 1 e 10 arquivos.
  images: z.custom<FileList>()
    .refine(files => files && files.length > 0, "Pelo menos uma imagem é obrigatória.")
    .refine(files => files && files.length <= 10, "O máximo de imagens permitido é 10."),
});

type ManualPostFormData = z.infer<typeof manualPostSchema>;

const getFormattedDefaultDate = () => {
  const now = new Date();
  // Define o agendamento para 10 minutos no futuro para cumprir a regra da API
  now.setMinutes(now.getMinutes() + 10);

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
  // --- ADICIONADO: Estado para pré-visualização das imagens ---
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<ManualPostFormData>({
    resolver: zodResolver(manualPostSchema),
    defaultValues: {
      caption: '',
      scheduleAt: getFormattedDefaultDate(),
    }
  });
  
  const { updateUser } = useUser(); 

  // Observa as mudanças no campo de imagens para atualizar as pré-visualizações
  const imageFiles = watch('images');
  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const newPreviews = Array.from(imageFiles).map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      
      // Limpa as URLs de objeto quando o componente é desmontado para evitar vazamento de memória
      return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    } else {
      setImagePreviews([]);
    }
  }, [imageFiles]);


  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000); 
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = async (data: ManualPostFormData) => {
    setFormStatus({ loading: true, error: null });

    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('scheduleAt', new Date(data.scheduleAt).toISOString());
    
    // --- MODIFICADO: Adiciona todas as imagens ao FormData ---
    Array.from(data.images).forEach(imageFile => {
        formData.append('images', imageFile); // 'images' corresponde ao nome no backend
    });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/schedule`;
      await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      await updateUser();
      setSuccessMessage('Post agendado com sucesso!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      reset();
      setImagePreviews([]); // Limpa as pré-visualizações

    } catch (error) {
		let errorMessage = 'Falha ao agendar o post.';
	  if(axios.isAxiosError(error) && error.response){
	       errorMessage = error.response?.data?.error || 'Falha ao agendar o post.';
	  } else if(error instanceof Error) {
		  errorMessage = error.message;
	  }

      setFormStatus({ loading: false, error: errorMessage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setFormStatus(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:p-8">
       {successMessage && <Alert type="success">{successMessage}</Alert>}
       {formStatus.error && <Alert type="danger">{formStatus.error}</Alert>}
      
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

      {/* --- MODIFICADO: Seção de Upload de Imagens --- */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
          Imagens (1 para post único, 2 a 10 para carrossel)
        </label>
        <Controller
            name="images"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <Icons.upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="images-input"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Carregue os arquivos</span>
                      <input
                        id="images-input"
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple // Permite a seleção de múltiplos arquivos
                        className="sr-only"
                        onChange={(e) => onChange(e.target.files)} // Passa o FileList para o react-hook-form
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG até 8MB cada</p>
                </div>
              </div>
            )}
          />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
      </div>

      {/* --- ADICIONADO: Pré-visualização das Imagens Selecionadas --- */}
      {imagePreviews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Pré-visualização ({imagePreviews.length} {imagePreviews.length > 1 ? 'imagens' : 'imagem'}):
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {imagePreviews.length > 1 ? `Este post será publicado como um carrossel.` : `Este post será publicado como uma imagem única.`}
          </p>
        </div>
      )}


      <div>
        <label htmlFor="scheduleAt" className="block text-sm font-medium text-gray-700 mb-1">Agendar para</label>
        <Input id="scheduleAt" type="datetime-local" {...register('scheduleAt')} />
        {errors.scheduleAt?.message && <p className="text-red-500 text-sm mt-1">{String(errors.scheduleAt.message)}</p>}
      </div>

      <div className="flex justify-center md:justify-end">
        <Button type="submit" disabled={formStatus.loading}>
          {formStatus.loading ? 'Agendando...' : 'Agendar Post'}
        </Button>
      </div>
    </form>
  );
}
