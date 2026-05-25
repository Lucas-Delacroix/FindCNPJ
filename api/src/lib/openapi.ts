import "./openapi-extend";
import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { env } from "../config/env";
import {
  cnpjPathSchema,
  cnpjQuerySchema,
  enrichedCompanySchema,
  errorResponseSchema,
} from "../schemas/cnpj.schema";

const registry = new OpenAPIRegistry();

registry.register("EnrichedCompany", enrichedCompanySchema);
registry.register("ErrorResponse", errorResponseSchema);

registry.registerPath({
  method: "get",
  path: "/health",
  summary: "Health check",
  description: "Verifica se a API está de pé e retorna uptime.",
  tags: ["System"],
  responses: {
    200: {
      description: "API saudável.",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("ok"),
            service: z.string(),
            timestamp: z.string(),
            uptime: z.number(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/cnpj/{cnpj}",
  summary: "Busca e enriquece um CNPJ",
  description:
    "Consulta a BrasilAPI (e ViaCEP para o código IBGE), aplica regras de domínio (CNAE → segmento, porte estimado com confidence, match de contato no QSA) e retorna um contrato organizado para qualificação de lead.",
  tags: ["CNPJ"],
  request: {
    params: cnpjPathSchema,
    query: cnpjQuerySchema,
  },
  responses: {
    200: {
      description: "Dados enriquecidos da empresa.",
      content: {
        "application/json": { schema: enrichedCompanySchema },
      },
    },
    400: {
      description: "CNPJ com formato inválido ou dígitos verificadores incorretos.",
      content: {
        "application/json": { schema: errorResponseSchema },
      },
    },
    404: {
      description: "CNPJ não encontrado na Receita Federal.",
      content: {
        "application/json": { schema: errorResponseSchema },
      },
    },
    429: {
      description: "Rate limit excedido.",
      content: {
        "application/json": { schema: errorResponseSchema },
      },
    },
    502: {
      description: "BrasilAPI indisponível ou retornou estrutura inesperada.",
      content: {
        "application/json": { schema: errorResponseSchema },
      },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

const buildServers = () => {
  const servers: Array<{ url: string; description: string }> = [];
  const publicUrl = env.PUBLIC_API_URL ?? env.RENDER_EXTERNAL_URL;
  if (publicUrl) {
    servers.push({ url: publicUrl, description: "Produção" });
  }
  servers.push({
    url: `http://localhost:${env.PORT}`,
    description: "Local",
  });
  return servers;
};

export const openapiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "FindCNPJ API",
    version: "0.1.0",
    description:
      "API que recebe um CNPJ, consulta a BrasilAPI e devolve dados enriquecidos para qualificação de leads.\n\nFonte: BrasilAPI (CNPJ) + ViaCEP (código IBGE).\nRegras de domínio: CNAE → segmento, porte estimado com confidence baseado em regime tributário, match de contato no QSA.",
    contact: {
      name: "FindCNPJ",
    },
    license: {
      name: "MIT",
    },
  },
  servers: buildServers(),
});
