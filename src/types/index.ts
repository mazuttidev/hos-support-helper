/**
 * Login para a aplicação backend
 */
export interface Auth {
  apiKey: string,
  user: {
    username: string,
    name: string,
    email: string
  }
}
/**
 * Representa um cartão do Trello.
 */
export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  status: string;
  clientName: string;
  requesterName: string;
  listName: string; // Nome da lista, representa o status que a solicitação está 
  dateLastEdited: string;
  dateCreated: string;
}
/**
 * Representa um novo card do Trello.
 */
export interface FormNewRequest {
  title: string;
  costumer: string;
  product: string;
  productVersion: string;
  description: string;
  connectionType: string;
  connectionData: string;
  files: File[] | null;
  [key: string]: any;
}

/**
 * Representa os comentários de um cartão do Trello.
 */
export interface TrelloCommentsCard {
  userId: string;
  name: string;
  desc: string;
  date: string;
}

export interface FormNewComment {
  text: string;    // Texto do comentário
  files?: File[];  // Lista de arquivos (opcional)
}

export interface TrelloCommentsResponse {
  success: boolean;
  data: TrelloCommentsCard[];
}

/**
 * Representa uma lista do Trello.
 */
export interface TrelloList {
  id: string;
  name: string;
  idBoard: string; // ID do quadro ao qual a lista pertence
  cards?: TrelloCard[]; // Cartões dentro da lista
}

/**
 * Representa um quadro do Trello.
 */
export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  lists: TrelloList[]; // Listas dentro do quadro
}

/**
 * Representa um membro do Trello.
 */
export interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string; // URL do avatar do membro
}

/**
 * Representa um rótulo (label) do Trello.
 */
export interface TrelloLabel {
  id: string;
  name: string;
  color: string; // Cor do rótulo
}

/**
 * Representa os parâmetros de autenticação usados nas requisições.
 */
export interface AuthParams {
  key: string;
  token: string;
}

export interface ComboboxProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}