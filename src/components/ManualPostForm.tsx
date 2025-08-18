"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import { Textarea } from './Textarea';
import Button from './Button';
import { Alert } from './Alert';
import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';
import { Reorder, motion } from 'framer-motion'; // Importa o Reorder do Framer Motion

// --- Ícones para a UI ---
const Icons = {
  upload: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
  close: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};

// --- Schema Zod ATUALIZADO para validar um array de Files ---
const manualPostSchema = z.object({
  caption: z.string().min(1, 'A legenda é obrigatória.'),
  scheduleAt: z.string().min(1, 'A data de agendamento é obrigatória.'),
  images: z.array(z.instanceof(File))
    .min(1, "Pelo menos uma imagem é obrigatória.")
    .max(10, "O máximo de imagens permitido é 10."),
});

type ManualPostFormData = z.infer<typeof manualPostSchema>;

const getFormattedDefaultDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function ManualPostForm() {
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // --- NOVO ESTADO: Gerencia os arquivos e suas pré-visualizações ---
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<ManualPostFormData>({
    resolver: zodResolver(manualPostSchema),
    defaultValues: {
      caption: '',
      scheduleAt: getFormattedDefaultDate(),
      images: [],
    }
  });
  
  const { updateUser } = useUser(); 

  // --- EFEITO PARA SINCRONIZAR O ESTADO COM REACT-HOOK-FORM ---
  useEffect(() => {
    // Informa ao react-hook-form sobre a lista de arquivos atual para validação
    setValue('images', imageFiles, { shouldValidate: true });

    // Gera as pré-visualizações
    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);

    // Limpa as URLs de objeto para evitar vazamento de memória
    return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
  }, [imageFiles, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      // Adiciona os novos arquivos aos existentes, respeitando o limite de 10
      setImageFiles(prevFiles => {
        const combined = [...prevFiles, ...newFiles];
        return combined.slice(0, 10); // Garante que não passe de 10
      });
    }
    // Limpa o valor do input para permitir a seleção do mesmo arquivo novamente
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data: ManualPostFormData) => {
    setFormStatus({ loading: true, error: null });

    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('scheduleAt', new Date(data.scheduleAt).toISOString());
    
    // Adiciona os arquivos do nosso estado gerenciado
    imageFiles.forEach(imageFile => {
        formData.append('images', imageFile);
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
      setImageFiles([]);

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagens (1 para post único, 2 a 10 para carrossel)
        </label>
        <div 
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:border-indigo-600 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <Icons.upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <p className="relative rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                <span>Clique para carregar</span>
              </p>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG até 8MB cada</p>
          </div>
        </div>
        <input
          id="images-input"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="sr-only"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
      </div>

      {imagePreviews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Pré-visualização ({imageFiles.length} / 10) - Arraste para reordenar
          </h3>
          {/* MELHORIA: Adicionado padding, fundo e borda para aumentar a área de drop */}
          <Reorder.Group 
            axis="x" 
            values={imageFiles} 
            onReorder={setImageFiles} 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-gray-100 rounded-lg border"
          >
            {imageFiles.map((file, index) => (
              <Reorder.Item key={file.name + index} value={file} className="relative aspect-square cursor-grab active:cursor-grabbing shadow-md">
                {/* CORREÇÃO: Renderiza a imagem apenas se a preview existir */}
                {imagePreviews[index] && (
                  <Image
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    fill
                    style={{objectFit: 'cover'}}
                    className="rounded-md"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/80 transition-colors z-10"
                  aria-label="Remover imagem"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-tr-md rounded-bl-md z-10">
                  {index + 1}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <p className="text-xs text-gray-500 mt-2">
            {imageFiles.length > 1 ? `Este post será publicado como um carrossel.` : `Este post será publicado como uma imagem única.`}
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
