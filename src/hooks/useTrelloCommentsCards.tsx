import { fetchCommentsCards } from '@/api/apiService';
import { useState, useEffect, useCallback } from 'react';

const useTrelloCommentsCards = (cardId: string) => {
  const [trelloCommentsData, setTrelloCardData] = useState<any[]>([]); 
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [errorComments, setErrorComments] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchCommentsCards(cardId);
      console.log("Dados recebidos:", data);

      // Verificando se os dados retornados têm a estrutura esperada
      if (Array.isArray(data)) {
        const formattedData = data.map((comment: any) => ({
          userId: comment.userId,
          name: comment.name,
          desc: comment.desc,
          date: comment.date,
          isCreatedByChat: comment?.isCreatedByChat || 0,
        }));

        setTrelloCardData(formattedData);
      } else {
        throw new Error('Dados inválidos recebidos');
      }

      setLoadingComments(false);
    } catch (err) {
      setErrorComments(err as Error);
      setLoadingComments(false);
    }
  }, [cardId]);

  // Carregar os dados sempre que o cardId mudar
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, [fetchData, cardId]);

  // Função para forçar a atualização dos comentários manualmente
  const refetchComments = () => {
    setLoadingComments(true);
    fetchData();
  };

  return { trelloCommentsData, loadingComments, errorComments, refetchComments };
};

export default useTrelloCommentsCards;