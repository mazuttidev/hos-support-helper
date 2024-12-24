# HOS SUPPORT HELPER

## Descrição

O **HOS SUPPORT HELPER** foi desenvolvido para facilitar a comunicação entre o setor de suporte e o setor de análise. O objetivo é ajudar na solução de problemas relacionados a banco de dados, integrações, produtos e outras demandas. Além disso, permite que o suporte acompanhe as atualizações de forma mais organizada e eficiente.

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

---

## Motivação

Este projeto foi criado para melhorar a organização dos processos internos, otimizando a comunicação e proporcionando um ambiente mais colaborativo entre os setores.

---

## Configuração e Instalação

### Pré-requisitos

Certifique-se de que as seguintes ferramentas estejam instaladas no seu sistema:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/hos-support-helper.git
   cd hos-support-helper
   npm install

Adicione sua API Key e Token do Trello no arquivo .env. 


├── public/                     # Arquivos estáticos (favicon, index.html)
├── src/
│   ├── api/                    # Serviços para integração com o Trello
│   │   └── trelloService.ts    # Comunicação com a API do Trello
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Filters/            # Componentes de filtro
│   │   ├── Totals/             # Totalizadores
│   │   ├── Table/              # Tabela de listagem de dados
│   │   ├── Form/               # Formulário para entrada de dados
│   │   └── Shared/             # Componentes compartilhados (Botões, Inputs)
│   │
│   ├── hooks/                  # Hooks personalizados
│   ├── pages/                  # Páginas do projeto
│   ├── styles/                 # Estilos globais e variáveis
│   ├── utils/                  # Funções utilitárias
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── types/                  # Definições de tipos do projeto
│
├── .env                        # Variáveis de ambiente (chaves da API)
├── package.json                # Dependências do projeto
└── tsconfig.json               # Configurações do TypeScript

## FUNCIONALIDADES
Filtros: Permite refinar os dados exibidos.
Totalizadores: Exibe resumos e contagens importantes.
Tabela: Lista dados de forma organizada.
Formulário: Facilita a entrada de novas informações.

### LINKS ÚTEIS

- [API Trello](https://developer.atlassian.com/cloud/trello/)
- [Shadcn](https://ui.shadcn.com/ )
- [Vite](https://vite.dev/)