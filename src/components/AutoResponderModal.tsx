"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Modal from "./Modal";
import Button from "./Button";
import { Alert } from "./Alert";
import { Textarea } from "./Textarea";
import Input from "./Input";

// Tipagem para a mídia do Instagram
interface InstagramMedia {
  id: string;
  media_url: string;
  caption?: string;
}

// Schema de validação com Zod
const autoResponderSchema = z.object({
  isActive: z.boolean(),
  triggerType: z.enum(['ANY_COMMENT', 'KEYWORD']),
  keywords: z.array(z.string()),
  responses: z.array(z.string()),
  dmText: z.string().optional(),
});

type AutoResponderFormData = z.infer<typeof autoResponderSchema>;

export default function AutoResponderModal({ isOpen, onClose, post, onUpdate }: { isOpen: boolean, onClose: () => void, post: InstagramMedia | null, onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [responseInput, setResponseInput] = useState("");

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<AutoResponderFormData>({
    resolver: zodResolver(autoResponderSchema),
    defaultValues: {
      isActive: true,
      triggerType: 'ANY_COMMENT',
      keywords: [],
      responses: [],
      dmText: '',
    },
  });

  const triggerType = watch('triggerType');
  const keywords = watch('keywords');
  const responses = watch('responses');

  const fetchConfig = useCallback(async () => {
    if (post) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/posts/${post.id}/auto-responder`,
          { withCredentials: true }
        );
        reset(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          reset(); // Reseta para o padrão se não houver config
        } else {
          setError("Erro ao carregar configuração.");
        }
      } finally {
        setLoading(false);
      }
    }
  }, [post, reset]);

  useEffect(() => {
    if (isOpen) {
      fetchConfig();
    }
  }, [isOpen, fetchConfig]);

  const onSubmit = async (data: AutoResponderFormData) => {
    if (!post) return;
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/posts/${post.id}/auto-responder`,
        data,
        { withCredentials: true }
      );
      onUpdate();
    } catch (err) {
      setError("Falha ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!post) return;
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instagram/posts/${post.id}/auto-responder`,
        { withCredentials: true }
      );
      onUpdate();
    } catch (err) {
      setError("Falha ao remover. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const addKeyword = () => {
    if (keywordInput && !keywords.includes(keywordInput)) {
      setValue('keywords', [...keywords, keywordInput]);
      setKeywordInput("");
    }
  };
  
  const addResponse = () => {
    if (responseInput && !responses.includes(responseInput)) {
      setValue('responses', [...responses, responseInput]);
      setResponseInput("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurar Resposta Automática">
      {loading ? <p>Carregando...</p> : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <Alert type="danger">{error}</Alert>}
          
          <div className="flex items-center justify-between">
            <label htmlFor="isActive" className="font-medium text-gray-700">Ativar Automação</label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <button type="button" onClick={() => field.onChange(!field.value)} className={`${field.value ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}>
                  <span className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
                </button>
              )}
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Gatilho</label>
            <div className="mt-2 flex gap-4">
               <label className="flex items-center">
                <input type="radio" {...register("triggerType")} value="ANY_COMMENT" className="h-4 w-4 text-indigo-600 border-gray-300"/>
                <span className="ml-2 text-sm text-gray-700">Qualquer comentário</span>
              </label>
              <label className="flex items-center">
                <input type="radio" {...register("triggerType")} value="KEYWORD" className="h-4 w-4 text-indigo-600 border-gray-300"/>
                <span className="ml-2 text-sm text-gray-700">Palavras-chave</span>
              </label>
            </div>
          </div>
          
          {triggerType === 'KEYWORD' && (
            <div>
              <label htmlFor="keywords" className="font-medium text-gray-700">Palavras-chave</label>
              <div className="flex gap-2 mt-1">
                <Input id="keywords" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} placeholder="Digite e adicione"/>
                <Button type="button" onClick={addKeyword}>Adicionar</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map(kw => (
                  <span key={kw} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                    {kw}
                    <button type="button" onClick={() => setValue('keywords', keywords.filter(k => k !== kw))} className="ml-1.5 text-gray-500 hover:text-gray-800">&times;</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="responses" className="font-medium text-gray-700">Respostas no Comentário (aleatórias)</label>
            <div className="flex gap-2 mt-1">
              <Input id="responses" value={responseInput} onChange={(e) => setResponseInput(e.target.value)} placeholder="Digite e adicione"/>
              <Button type="button" onClick={addResponse}>Adicionar</Button>
            </div>
            <div className="space-y-2 mt-2">
              {responses.map((res, i) => (
                <div key={i} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <p className="text-sm text-gray-700">{res}</p>
                  <button type="button" onClick={() => setValue('responses', responses.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700">&times;</button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="dmText" className="font-medium text-gray-700">Mensagem Direta (DM)</label>
            <Textarea id="dmText" {...register("dmText")} placeholder="Opcional: envie uma DM com um link ou agradecimento."/>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>Excluir</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}