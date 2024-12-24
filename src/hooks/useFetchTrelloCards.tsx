import { fetchCards } from '@/api/trelloService';
import { TrelloCard } from '@/types/trelloTypes';
import { useState, useEffect } from 'react';


const useFetchTrelloCards = (boardId: string) => {
  const [trelloCardData, setTrelloCardData] = useState<TrelloCard[]>([]); // Tipando o estado
  const [loading, setLoading] = useState<boolean>(true); // Tipando o estado de loading
  const [error, setError] = useState<Error | null>(null); // Tipando o estado de erro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCards(boardId); // Chama a função de serviço
        setTrelloCardData(data); // Atualiza o estado com os dados
        setLoading(false); // Define o estado de carregamento como false
      } catch (err) {
        setError(err as Error); // Atualiza o estado de erro
        setLoading(false); // Define o estado de carregamento como false
      }
    };

    fetchData();

    return () => {
      // Limpeza ou cancelamento de requisição se necessário
    };
  }, [boardId]);

  return { trelloCardData, loading, error }; // Retorna os dados, carregamento e erro
};

export default useFetchTrelloCards;
