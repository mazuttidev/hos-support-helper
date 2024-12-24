import { TrelloCard, TrelloCommentsCard } from '@/types/trelloTypes';
import axios from 'axios';

// Configurações básicas da API do Trello
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_API_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

// Função para gerar os parâmetros padrão da API
const getAuthParams = () => ({
    key: API_KEY,
    token: TOKEN,
});

//https://api.trello.com/1/boards/{{boardId}}/cards?key={{yourKey}}&token={{yourToken}}
// 1. Buscar todos os cartões de um quadro
export const fetchCards = async (boardId: string): Promise<TrelloCard[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/boards/${boardId}/cards`, {
            params: getAuthParams(),
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os cartões:', error);
        throw error;
    }
};
//https://api.trello.com/1/cards/{{cardId}}/actions?filter=commentCard&key={{yourKey}}&token={{yourToken}}
// 2. Buscar todos os comentários de um cartão
export const fetchCommentsCards = async (cardId: string): Promise<TrelloCommentsCard[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/cards/${cardId}/actions`, {
            params:
            {
                filter: 'commentCard', 
                ...getAuthParams(),
            },
        });
        console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar os cartões:', error);
        throw error;
    }
};