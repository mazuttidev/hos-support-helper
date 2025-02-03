import { Auth, FormNewComment, FormNewRequest, TrelloCard, TrelloCommentsCard, TrelloCommentsResponse } from '@/types';
import axios from 'axios';

// Configurações básicas da API do Trello
const apikey = localStorage.getItem("authToken");
const BASE_URL = import.meta.env.VITE_BASE_URL;



export const authenticateUser = async (username: string, password: string): Promise<Auth> => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username: username,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Buscar todos os cartões de um quadro
export const fetchCards = async (): Promise<TrelloCard[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/solicitacoes`, {
            headers: {
                'API_KEY': `${apikey}`
            }
        });

        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar os cartões:', error);
        throw error;
    }
};

// Buscar todos os comentários de um cartão
export const fetchCommentsCards = async (cardId: string): Promise<TrelloCommentsCard[]> => {
    try {
        const response = await axios.get<TrelloCommentsResponse>(`${BASE_URL}/chat/${cardId}`, {
            headers: {
                API_KEY: apikey,
            },
        });

        // Verificando se a resposta tem a estrutura esperada
        if (response.data.success && Array.isArray(response.data.data)) {
            return response.data.data; // Retorna os comentários formatados
        } else {
            throw new Error('Formato de resposta inválido');
        }
    } catch (error) {
        console.error('Erro ao buscar os comentários:', error);
        throw error;
    }
};


// Criar um novo cartão em uma lista
export const createCard = async (data: FormNewRequest) => {
    try {
        const formData = new FormData();

        // Adiciona os campos obrigatórios ao FormData
        formData.append("title", data.title);
        formData.append("costumer", data.costumer);
        formData.append("product", data.product);
        formData.append("productVersion", data.productVersion);
        formData.append("description", data.description);

        // Adiciona os campos opcionais, caso estejam presentes
        if (data.connectionType) {
            formData.append("connectionType", data.connectionType);
        }
        if (data.connectionData) {
            formData.append("connectionData", data.connectionData);
        }

        // Adiciona os arquivos, caso existam
        if (data.files && Array.isArray(data.files)) {
            data.files.forEach((file) => {
                formData.append("files", file);
            });
        }

        // Realiza a requisição POST
        const response = await axios.post(`${BASE_URL}/solicitacoes/nova-solicitacao`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                API_KEY: apikey,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar a solicitação:", error);
        throw error;
    }
};


export const createComment = async (cardId: string, data: FormNewComment): Promise<any> => {
    try {
        const formData = new FormData();

        // Adiciona o texto do comentário
        formData.append("text", data.text);
        formData.append("cardId", cardId);

        // Adiciona arquivos se existirem
        if (Array.isArray(data.files) && data.files.length > 0) {
            data.files.forEach(file => formData.append("files", file));
        }

        // Envia a requisição POST
        const response = await axios.post(`${BASE_URL}/chat/${cardId}/nova-mensagem`, formData, {
            headers: {
                API_KEY: apikey,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao criar o comentário:", error);
        throw error;
    }
};