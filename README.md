# HOS SUPPORT HELPER

## Descrição

O **HOS SUPPORT HELPER** foi desenvolvido para facilitar a comunicação entre os demais setores e o setor de análise. O objetivo é ajudar na solução de problemas relacionados a banco de dados, integrações, produtos e outras demandas. Além disso, permite que o colaborador acompanhe as atualizações de forma mais organizada e eficiente. O HOS Support Helper é uma aplicação desenvolvida com React e TypeScript, utilizando o Vite como ferramenta de build e desenvolvimento. O projeto tem como objetivo fornecer uma interface eficiente e moderna para auxiliar no suporte ao HOS.

---

## Tecnologias Principais

- **Framework**: [Vite](https://vitejs.dev/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/docs/installation/vite)
- **Linguagem**: TypeScript
- **Bibliotecas**:
  - [Axios](https://axios-http.com/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [ReactMarkdown](#)
  - [RadixUi](https://www.radix-ui.com/)

---

## Motivação

Este projeto foi criado para melhorar a organização dos processos internos, otimizando a comunicação e proporcionando um ambiente mais colaborativo entre os setores.

---

### Pré-requisitos

Certifique-se de que as seguintes ferramentas estejam instaladas no seu sistema:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/mazuttidev/hos-support-helper.git
   cd hos-support-helper
   npm install
   npm run dev

Adicione sua API_KEY e API_TOKEN do Trello no arquivo .env. 

```plaintext
├── public/           # Arquivos estáticos (favicon, index.html)
├── src/
│   ├── api/                    # Serviços para integração com o Trello
│   │   └── trelloService.ts    # Comunicação com a API Backend
│   │   
│   ├── assets/                 # Arquivos estáticos do projeto [logo / imagens]
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── ui/                 # Componentes da lib ShadCn
│   │   ├── *.tsx               # Componentes da aplicação customizados 
│   │
│   ├── hooks/                  # Hooks personalizados
│   ├── context/                # Contexto global da aplicação [ Auth ]
│   ├── pages/                  # Páginas do projeto
│   ├── styles/                 # Estilos globais e variáveis
│   ├── utils/                  # Funções utilitárias
│   ├── types/                  # Tipagens
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── types/                  # Definições de tipos do projeto
│
├── .env                        # Variáveis de ambiente (chaves da API)
├── package.json                # Dependências do projeto
└── tsconfig.json               # Configurações do TypeScript
```

## FUNCIONALIDADES
Filtros: Permite refinar os dados exibidos.
Tabela: Lista dados de forma organizada.
Formulário: Facilita a entrada de novas informações.
Chat: Permite a comunicação entre duas ou mais pessoas. O chat é relativo a uma SOLICITAÇÃO e não a um usuário. É  possível vincular uma imagem na conversa
Visualizar Solicitação: É possível visualizar a solicitação realizada.

### LINKS ÚTEIS

- [API Trello](https://developer.atlassian.com/cloud/trello/)
- [Shadcn](https://ui.shadcn.com/ )
- [Vite](https://vite.dev/)
