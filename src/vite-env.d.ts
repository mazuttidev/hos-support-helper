/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TRELLO_API_KEY: string; // Sua chave de API
    readonly VITE_TRELLO_API_TOKEN: string; // URL da API
    readonly VITE_TRELLO_BOARD_ID: string; // BOARD ID
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}