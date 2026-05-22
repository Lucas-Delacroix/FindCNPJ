# FindCNPJ

Aplicação que enriquece dados de leads a partir de um CNPJ.


## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Endpoints da API](#endpoints-da-api)
- [Decisões de Projeto](#decisões-de-projeto)
- [Uso de IA](#uso-de-ia)
- [Tempo Gasto](#tempo-gasto)
- [Se Tivesse Mais Tempo](#se-tivesse-mais-tempo)

## Visão Geral

A aplicação recebe um CNPJ, consulta a [BrasilAPI](https://brasilapi.com.br/docs#tag/CNPJ) e devolve os dados da empresa em um formato estruturado e enriquecido — pensado para qualificação de leads (segmento da empresa a partir do CNAE, porte estimado a partir do capital social, cargo do contato a partir do quadro societário, etc.).

## Arquitetura

Duas aplicações independentes em pastas irmãs:

```
findcnpj/
├── api/   → backend REST em Node.js + Express + TypeScript
└── web/   → frontend SPA em Vite + React + TypeScript (próxima fase)
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

- (a definir na próxima fase)

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Instalação

```bash
git clone <repo-url>
cd findcnpj

cd api
npm install
```

## Variáveis de Ambiente

Copie `api/.env.example` para `api/.env` e ajuste se necessário. Os valores padrão funcionam para desenvolvimento local.

| Variável | Padrão | Descrição |
|---|---|---|
| `NODE_ENV` | `development` | Ambiente de execução |
| `PORT` | `3000` | Porta do servidor HTTP |
| `BRASILAPI_BASE_URL` | `https://brasilapi.com.br/api` | URL base da BrasilAPI |
| `LOG_LEVEL` | `info` | Nível mínimo de log (`fatal` ≤ `info` ≤ `trace`) |

## Como Rodar Localmente

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

Resposta esperada:

```json
{
  "status": "ok",
  "service": "findcnpj-api",
  "timestamp": "...",
  "uptime": 0.123
}
```

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/cnpj/:cnpj` | (em construção) busca e enriquece dados de um CNPJ |

## Decisões de Projeto

(a preencher ao final)

## Uso de IA

(a preencher ao final)

## Tempo Gasto

(a preencher ao final)

## Se Tivesse Mais Tempo

(a preencher ao final)
