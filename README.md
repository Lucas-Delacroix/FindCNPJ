# FindCNPJ

Aplicação que enriquece dados de leads a partir de um CNPJ.


## Sumário

- [Visão Geral](#visão-geral)
- [Acesso Público](#acesso-público)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Testes](#testes)
- [Endpoints da API](#endpoints-da-api)
- [Decisões de Projeto](#decisões-de-projeto)
- [Uso de IA](#uso-de-ia)
- [Tempo Gasto](#tempo-gasto)
- [Se Tivesse Mais Tempo](#se-tivesse-mais-tempo)

## Visão Geral

A aplicação recebe um CNPJ, consulta a [BrasilAPI](https://brasilapi.com.br/docs#tag/CNPJ) e devolve os dados da empresa em um formato estruturado e enriquecido, pensado para qualificação de leads.

## Acesso Público

A aplicação está hospedada no Render.

* Frontend: https://findcnpj-web.onrender.com
* API: https://findcnpj-api.onrender.com
* OpenAPI: https://findcnpj-api.onrender.com/docs
* Health: https://findcnpj-api.onrender.com/health

A primeira requisição depois de uns 15 minutos parada pode levar até 50 segundos. É o cold start do free tier do Render.

CNPJ de exemplo pra testar rápido: `00.000.000/0001-91` (Banco do Brasil).

## Arquitetura

Duas aplicações independentes em pastas irmãs:

```
findcnpj/
├── api/   → backend REST em Node.js + Express + TypeScript
└── web/   → frontend SPA em Vite + React + TypeScript
```

Cada uma tem o próprio `package.json` e ciclo de vida. A comunicação acontece via HTTP/JSON na fronteira `web → api`.

## Tecnologias

### Backend (`api/`)

- Node.js 18+
- Express 4
- TypeScript 5
- Zod (validação de input e de variáveis de ambiente)
- Axios (cliente HTTP)
- Pino + pino-pretty (logging estruturado)

### Frontend (`web/`)

- Vite + React 18
- TypeScript 5 (strict)
- TailwindCSS
- TanStack Query (data fetching)
- Zod (validação de formulário)
- Axios (cliente HTTP)

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Instalação

```bash
git clone <repo-url>
cd findcnpj

# Backend
cd api
npm install
cd ..

# Frontend
cd web
npm install
cd ..
```

## Variáveis de Ambiente

Copie os arquivos `.env.example` para `.env` em cada aplicação. Os valores padrão funcionam para desenvolvimento local.

### Backend (`api/.env`)

| Variável | Padrão | Descrição |
|---|---|---|
| `NODE_ENV` | `development` | Ambiente de execução |
| `PORT` | `3000` | Porta do servidor HTTP |
| `BRASILAPI_BASE_URL` | `https://brasilapi.com.br/api` | URL base da BrasilAPI |
| `LOG_LEVEL` | `info` | Nível mínimo de log (`fatal` ≤ `info` ≤ `trace`) |

### Frontend (`web/.env`)

| Variável | Padrão | Descrição |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000` | URL base do backend |

## Como Rodar Localmente

Backend e frontend rodam em terminais separados.

### Backend

```bash
cd api
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3000`. Verifique com:

```bash
curl http://localhost:3000/health
```

### Frontend

```bash
cd web
cp .env.example .env
npm run dev
```

A interface sobe em `http://localhost:5173` e consome o backend automaticamente.

## Testes

Smoke tests no backend cobrem validação de CNPJ e calibração de porte.

```bash
cd api
npm test
```

Rodam em menos de um segundo.

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/cnpj/:cnpj` | Busca e enriquece dados de um CNPJ (aceita `?contato=Nome` para identificar cargo) |

## Decisões de Projeto

**Backend e frontend em pastas separadas.** Em vez de Next.js fullstack, fui de `api/` em Express com `web/` em Vite. A fronteira cliente-servidor fica explícita e dá pra testar a API isoladamente. Vale o setup extra.

**Porte com `confidence`, não cravado.** Inicialmente cravava "100+ funcionários" pra empresa em Lucro Real, mas regime tributário correlaciona com faturamento, não com headcount, assim uma SaaS lucrativa de 30 pessoas entra em Lucro Real fácil. Posteriormente, rebaixei pra `medium`, mudei o rótulo pra "Provavelmente Grande Empresa" e exponho os `signals` que sustentam cada inferência. 

**Validação Zod do output da API no frontend.** Faz `safeParse` em runtime. Se a API regredir, o usuário vê erro claro em vez de tela em branco. Os tipos derivam do mesmo schema via `z.infer<>`, então não divergem.

**Smoke tests, não suite ampla.** Vitest no backend nas duas regras mais sensíveis a regressão silenciosa: aritmética dos dígitos verificadores do CNPJ e calibração da confidence de porte. CNAE mapper e matcher de QSA são percorríveis visualmente.

## Uso de IA

Usei IA ao longo do projeto para:

Entender o vocabulário do domínio. A BrasilAPI devolve campos com siglas e classificações da Receita Federal (`qualificacao_socio`, `codigo_porte`, `natureza_juridica`, `regime_tributario`). Usei a IA pra destrinchar o que cada termo significa na prática antes de mapear pro contrato da API.

Gerar boilerplate. Estruturas iniciais de schema Zod, formatadores, esqueleto dos testes. Em todos os casos li, ajustei e testei manualmente antes de commitar.

Não deleguei a arquitetura geral, a escolha de stack, a calibração final das heurísticas nem a priorização do escopo. As decisões finais foram minhas.

## Tempo Gasto

Algo em torno de 12 horas distribuídas em 3 dias, em blocos de uma a quatro horas focados.

* Setup inicial: 2h
* Backend e integração com BrasilAPI: 2h
* Frontend: 4h
* Enriquecimento e calibração de heurísticas: 1h
* Endurecimento depois da auditoria interna: 1h
* Documentação: 1h

## Se Tivesse Mais Tempo

* Expandir a suite de testes pra `partner-role-matcher`, `formatters` e integração no service com BrasilAPI mockada.
* Trocar o matcher de cargo no QSA. O atual normaliza acentos e usa substring.
* Cache por CNPJ com TTL. Dados da Receita mudam pouco.
* Rate limiting por IP. O limite hoje é global.
* CI no GitHub Actions rodando typecheck, testes e build a cada push.
* Métricas de latência e taxa de erro da BrasilAPI pra ter sinal em produção.
* Validação Zod do output no backend também. Hoje só o input está validado.
* Versionamento da API em `/v1/cnpj/...` pra permitir evolução sem quebrar clientes.
