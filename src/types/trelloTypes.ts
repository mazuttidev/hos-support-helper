/**
 * Representa um cartão do Trello.
 */
export interface TrelloCard {
    id: string;
    name: string;
    desc: string;
    clientName: string;
    requesterName: string;
    listName: string; // Nome da lista, representa o status que a solicitação está 
    dateLastEdited: string;
    dateCreated: string;
  }
  
/**
 * Representa os comentários de um cartão do Trello.
 */
export interface TrelloCommentsCard {
  id: string;
  idMemberCreator: string;
  data: {
    idCard: string;
    text: string;
    card: {
      id: string;
      name: string;
      idShort: number;
      shortLink: string;
    };
    board: {
      id: string;
      name: string;
      shortLink: string;
    };
    list: {
      id: string;
      name: string;
    };
  };
  type: string;
  date: string;
  memberCreator: {
    id: string;
    fullName: string;
    avatarUrl: string;
    username: string;
  };
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
  