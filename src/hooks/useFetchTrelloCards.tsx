import { fetchCards } from "@/api/apiService";
import { TrelloCard } from "@/types";
import { useState, useEffect, useCallback } from "react";

const useFetchTrelloCards = () => {
  const [trelloCardData, setTrelloCardData] = useState<TrelloCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Função para buscar os dados (reutilizável no refetch)
  const refetchCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCards();
      setTrelloCardData(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca inicial quando o componente monta ou `boardId` muda
  useEffect(() => {
    refetchCards();
  }, [refetchCards]);

  return { trelloCardData, loading, error, refetchCards };
};

export default useFetchTrelloCards;
