import { fetchCommentsCards } from '@/api/trelloService';
import { TrelloCommentsCard } from '@/types/trelloTypes';
import { useState, useEffect } from 'react';


const useTrelloCommentsCards = (cardId: string, ) => {
  const [trelloCommentsData, setTrelloCardData] = useState<TrelloCommentsCard[]>([]); // Tipando o estado
  const [loadingComments, setLoadingComments] = useState<boolean>(true); // Tipando o estado de loading
  const [errorComments, setErrorComments] = useState<Error | null>(null); // Tipando o estado de erro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommentsCards(cardId); // Chama a função de serviço
        setTrelloCardData(data); // Atualiza o estado com os dados
        setLoadingComments(false); // Define o estado de carregamento como false
      } catch (err) {
        setErrorComments(err as Error); // Atualiza o estado de erro
        setLoadingComments(false); // Define o estado de carregamento como false
      }
    };

    fetchData();

    return () => {
      // Limpeza ou cancelamento de requisição se necessário
    };
  }, [cardId]);

  return { trelloCommentsData, loadingComments, errorComments }; // Retorna os dados, carregamento e erro
};

export default useTrelloCommentsCards;
 
