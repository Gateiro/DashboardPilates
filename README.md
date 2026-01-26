# StudioPilatesDash 🧘‍♀️

Um dashboard moderno e intuitivo projetado para gerenciar um estúdio de Pilates. Esta aplicação fornece uma plataforma centralizada para administradores e instrutores lidarem com agendamentos, alunos, aulas, finanças e muito mais.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏁 Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [🔒 Credenciais de Login](#-credenciais-de-login)
- [🌱 Melhorias Futuras](#-melhorias-futuras)

---

## Sobre o Projeto

**StudioPilatesDash** é uma aplicação web construída com Next.js e TypeScript, projetada para otimizar as operações diárias de um estúdio de Pilates. Possui uma interface limpa e responsiva que funciona perfeitamente em todos os dispositivos. O projeto é estruturado com uma clara separação de responsabilidades, utilizando um tema personalizado para um estilo consistente e uma arquitetura de componentes modular.

O painel é protegido por uma página de login e fornece um conjunto abrangente de ferramentas após a autenticação.

---

## ✨ Funcionalidades

Com base na navegação da barra lateral e nos componentes, a aplicação inclui os seguintes módulos:

-   **🔐 Autenticação**: Página de login segura para usuários autorizados.
-   **📊 Dashboard**: Página inicial com uma visão geral das informações importantes, como os próximos alunos.
-   **🗓️ Agenda**: Gerencie e visualize os horários das aulas.
-   **👥 Gerenciamento de Alunos**: Um cadastro completo de todos os alunos.
-   **🤸‍♀️ Gerenciamento de Aulas**: Defina e organize os diferentes tipos de aulas disponíveis.
-   **💪 Biblioteca de Exercícios**: Um catálogo de exercícios de Pilates.
-   **⭐ Gerenciamento de Planos**: Crie e gerencie diferentes planos de assinatura para os alunos.
-   **💰 Módulo Financeiro**: Acompanhe pagamentos, receitas e outros dados financeiros.
-   **🔔 Notificações**: Um sistema de notificação em tempo real no cabeçalho.
-   **👤 Perfil do Usuário**: Um modal para os usuários visualizarem os detalhes de seu perfil.
-   **💬 Atendimento/Suporte**: Uma seção dedicada para suporte ao usuário.
-   **⚙️ Configurações**: Configure as definições da aplicação.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web modernas:

-   **Framework**: [Next.js](https://nextjs.org/) 13+ (com App Router)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Biblioteca UI**: [React](https://reactjs.org/)
-   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
-   **Ícones**: [Lucide React](https://lucide.dev/)
-   **Gerenciamento de Estado**: React Hooks (`useState`, `useEffect`)

---

## 🏁 Começando

Para obter uma cópia local e executá-la, siga estes passos simples.

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn/pnpm) instalados em sua máquina.

-   **npm**
    ```sh
    npm install npm@latest -g
    ```

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/VitorCyriaco/StudioPilatesDash.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```sh
    cd StudioPilatesDash
    ```
3.  **Instale os pacotes NPM:**
    ```sh
    npm install
    ```
4.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```
5.  Abra http://localhost:3000 no seu navegador para ver o resultado.

---

## 📂 Estrutura do Projeto

O projeto segue uma estrutura padrão do Next.js App Router com foco na modularidade dos componentes.

<pre>
StudioPilatesDash/
├── src/
│   ├── app/                 # Páginas e layouts do Next.js
│   │   ├── (auth)/          # Rotas de autenticação (ex: página de login)
│   │   │   └── page.tsx
│   │   ├── (dashboard)/     # Rotas protegidas após o login
│   │   │   ├── home/
│   │   │   ├── agenda/
│   │   │   └── ...
│   │   └── layout.tsx       # Layout raiz
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── LoginPage.tsx
│   │   ├── HomePage.tsx
│   │   └── modal/
│   │       ├── UserModal.tsx
│   │       └── NotificacoesModal.tsx
│   ├── theme/               # Configuração de tema e estilo
│   │   └── index.ts         # (contém o objeto de cores)
│   ├── types/               # Definições de tipos TypeScript
│   │   └── sidebar.ts
│   └── utils/               # Funções utilitárias e constantes
│       └── sidebar.ts       # (contém o array menuItems)
└── public/
    └── logo.png             # Arquivos estáticos
</pre>

---

## 🔧 Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Executa o aplicativo em modo de desenvolvimento.
-   `npm run build`: Compila o aplicativo para produção.
-   `npm run start`: Inicia um servidor de produção.
-   `npm run lint`: Executa o linter para verificar problemas de qualidade de código.

---

## 🔒 Credenciais de Login

Para fins de demonstração e teste, as credenciais de login estão atualmente fixadas no código (hardcoded) em `LoginPage.tsx`.

-   **Email**: `teste@exemplo.com`
-   **Senha**: `123`

---

## 🌱 Melhorias Futuras

Este projeto tem uma base sólida, mas há muitas oportunidades de melhoria:

-   **Integração com Backend**: Conectar a aplicação com supabase.
-   **Autenticação Completa**: Substituir o login fixo por uma solução de autenticação do supabase.
-   **Modo Escuro (Dark Mode)**: Implementar completamente um seletor de modo escuro usando as cores definidas no arquivo de tema.
