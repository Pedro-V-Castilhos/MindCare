<div align="center">

# 🧠 MindCare

**Plataforma de gerenciamento de sessões terapêuticas e comunicação entre pacientes e psicólogos.**

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-15-69D3A7?logo=cypress&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)

</div>

---

## Índice

- [Visão Geral](#visão-geral)
- [Escopo](#escopo)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura e Estrutura](#arquitetura-e-estrutura)
- [Histórias de Usuário](#histórias-de-usuário)
- [Gestão Ágil](#gestão-ágil)
- [Cronograma de Sprints](#cronograma-de-sprints)
- [Planejamento e Interatividade](#planejamento-e-interatividade)

---

## Visão Geral

A **MindCare** é uma plataforma voltada ao gerenciamento de sessões de pacientes com psicólogos, bem como à comunicação entre ambas as partes. O sistema facilita o gerenciamento tanto para profissionais — oferecendo gestão de agendas, registro de sessões e comunicação privada — quanto para pacientes, proporcionando acesso direto aos seus terapeutas.

---

## Escopo

O sistema abrange as seguintes funcionalidades principais:

**Para Terapeutas:**

- Agendamento, cancelamento e remarcação de sessões
- Registro de anotações com diferentes graus de detalhes por sessão
- Gestão de documentos relacionados a cada sessão
- Acompanhamento do progresso de cada paciente
- Chat em tempo real com pacientes

**Para Pacientes:**

- Agendamento, cancelamento e remarcação de sessões
- Gestão de documentos e recibos para reembolso de plano de saúde
- Acompanhamento do progresso pessoal nas sessões
- Chat direto com seu(s) terapeuta(s)

---

## Tecnologias

| Camada       | Tecnologia                                      |
| ------------ | ----------------------------------------------- |
| Framework    | ReactJS 19                                      |
| Linguagem    | TypeScript 5.9                                  |
| Bundler      | Vite 7                                          |
| Estilização  | Tailwind CSS 4 · shadcn/ui · Base UI · Radix UI |
| Formulários  | React Hook Form                                 |
| Estado       | Zustand                                         |
| Gráficos     | Recharts                                        |
| Ícones       | Lucide React                                    |
| Backend/Auth | Supabase                                        |
| Testes E2E   | Cypress 15                                      |
| Linter       | ESLint 9                                        |
| Formatter    | Prettier                                        |
| Gerenciador  | pnpm                                            |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 9

---

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/Pedro-V-Castilhos/MindCare.git
cd MindCare

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

---

## Scripts Disponíveis

| Comando          | Descrição                                   |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Inicia o servidor de desenvolvimento (Vite) |
| `pnpm build`     | Compila TypeScript e gera build de produção |
| `pnpm preview`   | Pré-visualiza o build de produção           |
| `pnpm lint`      | Executa o ESLint no projeto                 |
| `pnpm format`    | Formata arquivos `.ts/.tsx` com Prettier    |
| `pnpm typecheck` | Verifica tipos sem emitir arquivos          |

---

## Arquitetura e Estrutura

```
MindCare/
├── public/                        # Arquivos estáticos
├── cypress/                       # Testes end-to-end (Cypress)
│   ├── e2e/                       # Specs de teste
│   ├── fixtures/                  # Dados de teste
│   └── support/                   # Comandos e configuração
├── src/
│   ├── app/                       # Componente raiz e rotas
│   │   ├── App.tsx
│   │   └── Router.tsx
│   ├── assets/                    # Imagens e recursos
│   ├── components/
│   │   ├── ui/                    # Componentes base (shadcn/ui)
│   │   ├── Card.tsx               # Card customizado
│   │   ├── Header.tsx             # Cabeçalho
│   │   ├── Text.tsx               # Componentes de tipografia
│   │   └── theme-provider.tsx
│   ├── features/
│   │   ├── auth/                  # Login e Cadastro
│   │   ├── pacient/               # Telas e componentes do paciente
│   │   │   ├── components/        # Layout e navegação
│   │   │   └── screens/           # Dashboard, Agendamentos, Documentos, Anotações, Progresso
│   │   └── therapist/             # Telas e componentes do terapeuta
│   │       ├── components/        # Layout e navegação
│   │       └── screens/           # Dashboard, Agendamentos, Documentos, Anotações, Progresso
│   ├── hooks/                     # Stores Zustand (sessão, usuários, agendamentos, etc.)
│   ├── lib/                       # Utilitários, cliente Supabase e bucket
│   ├── mocks/                     # Dados mock para desenvolvimento
│   ├── types/                     # Tipos TypeScript (usuário, sessão, documento, etc.)
│   ├── main.tsx                   # Ponto de entrada
│   └── index.css                  # Estilos globais (Tailwind)
├── index.html                     # HTML principal
├── cypress.config.ts              # Configuração do Cypress
├── vite.config.ts                 # Configuração do Vite
├── tsconfig.json                  # Configuração do TypeScript
├── eslint.config.js               # Configuração do ESLint
├── components.json                # Configuração do shadcn/ui
└── package.json
```

A arquitetura é modular e orientada a features, onde cada domínio (**auth**, **pacient**, **therapist**) possui suas próprias telas e componentes. O estado global é gerenciado com **Zustand**, formulários com **React Hook Form**, e a comunicação com o backend via **Supabase**.

---

## Histórias de Usuário

### Paciente

| História                                                                                                             | Critérios de Aceitação                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Como paciente, quero me cadastrar no sistema para acompanhar minha terapia e manter contato com meu(s) terapeuta(s). | Campos obrigatórios: nome, telefone, CPF, e-mail, senha. Opcional: endereço. Senha com mín. 8 caracteres (1 minúscula, 1 número, 1 especial). Senhas armazenadas com criptografia no Supabase. |
| Como paciente, quero agendar consultas com terapeutas para dar prosseguimento ao meu progresso.                      | —                                                                                                                                                                                              |
| Como paciente, quero acompanhar meu histórico de consultas para visualizar meu progresso pessoal.                    | —                                                                                                                                                                                              |

### Terapeuta

| História                                                                                                                             | Critérios de Aceitação                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Como terapeuta, quero me cadastrar no sistema para que pacientes tenham contato direto comigo.                                       | Campos obrigatórios: nome, telefone, CPF, e-mail, senha. Opcional: endereço. Mesmos critérios de senha e armazenamento do paciente. |
| Como terapeuta, quero manipular minha agenda e remarcar/cancelar sessões livremente para ter controle total em casos de imprevistos. | —                                                                                                                                   |
| Como terapeuta, quero realizar anotações por sessão para rever apontamentos e acompanhar o avanço do paciente.                       | —                                                                                                                                   |

---

## Gestão Ágil

### Estrutura da Equipe (Scrum)

| Papel                  | Responsabilidade                                   |
| ---------------------- | -------------------------------------------------- |
| **Product Owner (PO)** | Define prioridades e direções do projeto           |
| **Scrum Master (SM)**  | Aplica e adapta o processo à realidade da equipe   |
| **Desenvolvedor**      | Executa e desenvolve o projeto seguindo o processo |

### Processo

- **Sprints** de 2 semanas
- Backlog do produto mantido pelo PO e SM
- Planejamento no início de cada sprint
- Daily Standup para alinhamento diário
- Organização via **Kanban**
- Refinamento do backlog ao final de cada sprint

---

## Cronograma de Sprints

| Sprint | Período       | Objetivo                    | Entregáveis                                                                       |
| ------ | ------------- | --------------------------- | --------------------------------------------------------------------------------- |
| 1      | 20/11 – 03/12 | Setup e Autenticação        | Repositório, ambiente, modelagem de BD, aprovação de layout, documentação inicial |
| 2      | 04/12 – 17/12 | Autenticação e Agendamentos | Sistema de autenticação/cadastro, CRUD de sessões, validações                     |
| 3      | 18/12 – 31/12 | Notificações e Anotações    | Notificações de agendamento, anotações de sessão, status de sessão                |
| 4      | 01/01 – 14/01 | Documentos de Sessões       | Upload de documentos, controle de acesso, anotações detalhadas                    |
| 5      | 15/01 – 28/01 | Progresso do Paciente       | Dashboard de progresso, histórico de sessões, área do paciente                    |
| 6      | 29/01 – 11/02 | Chat em Tempo Real          | Chat, notificação de mensagens, histórico                                         |
| 7      | 12/02 – 25/02 | Emissão de Documentos       | Recibos de sessão, recibos de reembolso                                           |
| 8      | 26/02 – 16/03 | Revisões e Lançamento       | Correções gerais, revisão UX/UI, testes unitários, ambiente final                 |

### Milestones

1. **Setup e Autenticação** — Ambiente, modelagem inicial e definição visual
2. **CRUD de Sessões** — Agenda, cadastro e validação de sessões
3. **Comunicação e Anotações** — Notificações, anotações e status de atendimentos
4. **Documentos** — Upload e controle de acesso
5. **Progresso do Paciente** — Dashboards, histórico e área pessoal
6. **Chat em Tempo Real** — Interação síncrona e armazenamento de conversas
7. **Emissão de Documentos** — Geração de recibos e comprovantes
8. **Refinamento e Lançamento** — Correções gerais e testes unitários

---

## Planejamento e Interatividade

### Interações do Paciente

- Cadastro e login com validação de dados
- Agendamento, cancelamento e remarcação com feedback visual
- Histórico de sessões com filtros e dados organizados
- Progresso pessoal via gráficos e indicadores
- Envio e gerenciamento de documentos e recibos
- Chat em tempo real com terapeutas

### Interações do Terapeuta

- Cadastro e login com validação de credenciais
- Gerenciamento completo da agenda (horários e disponibilidade)
- Registro de anotações simples e detalhadas por sessão
- Upload de documentos com controle de acesso por paciente
- Chat em tempo real com pacientes

### Princípios de UX/UI

- Fluxos claros e lineares, minimizando cliques
- Feedback imediato (sucesso, erro, carregamento)
- Navegação consistente entre Web e Mobile
- Componentes reutilizáveis para unidade visual
- Responsividade e acessibilidade em diferentes tamanhos de tela

### Justificativa Técnica — React

| Benefício                     | Descrição                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| **Reutilização de lógica**    | Hooks e stores Zustand compartilhados entre features (validações, estado, Supabase)             |
| **Componentização**           | Componentes reutilizáveis (botões, inputs, cards, listas) com padronização visual via shadcn/ui |
| **Interações ricas**          | Modais, gráficos (Recharts), navegação fluida, formulários validados (React Hook Form)          |
| **Integração com backend**    | Compatibilidade nativa com Supabase, autenticação e sincronização em tempo real                 |
| **Desenvolvimento acelerado** | Ecossistema maduro com bibliotecas confiáveis, permitindo foco nas regras de negócio            |

---

<div align="center">

**MindCare** © 2025–2026 — Projeto de Bloco · Fundamentos do Desenvolvimento Front-End

</div>
