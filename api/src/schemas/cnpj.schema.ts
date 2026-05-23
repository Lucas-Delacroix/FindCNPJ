import "../lib/openapi-extend";
import { z } from "zod";

export const cnpjPathSchema = z.object({
  cnpj: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((digits) => digits.length === 14, {
      message: "CNPJ must have 14 digits",
    })
    .openapi({
      description: "CNPJ com 14 dígitos (pontuação opcional).",
      example: "00000000000191",
    }),
});

export const cnpjQuerySchema = z.object({
  contato: z
    .string()
    .trim()
    .min(1)
    .optional()
    .openapi({
      description:
        "Nome do contato do lead. Quando informado, a API tenta identificar o cargo no QSA.",
      example: "Maria da Silva",
    }),
});

const qsaEntrySchema = z
  .object({
    nome_socio: z.string(),
    qualificacao_socio: z.string().nullable().optional(),
    codigo_qualificacao_socio: z.number().nullable().optional(),
    data_entrada_sociedade: z.string().nullable().optional(),
  })
  .passthrough();

const cnaeSecundarioSchema = z
  .object({
    codigo: z.number(),
    descricao: z.string(),
  })
  .passthrough();

const regimeTributarioSchema = z
  .object({
    ano: z.number(),
    forma_de_tributacao: z.string().nullable().optional(),
  })
  .passthrough();

export const brasilApiCnpjResponseSchema = z
  .object({
    cnpj: z.string(),
    razao_social: z.string(),
    nome_fantasia: z.string().nullable().optional(),
    descricao_situacao_cadastral: z.string(),
    data_situacao_cadastral: z.string().nullable().optional(),
    data_inicio_atividade: z.string(),
    cnae_fiscal: z.number(),
    cnae_fiscal_descricao: z.string(),
    cnaes_secundarios: z.array(cnaeSecundarioSchema).default([]),
    porte: z.string().nullable().optional(),
    codigo_porte: z.number().nullable().optional(),
    natureza_juridica: z.string().nullable().optional(),
    codigo_natureza_juridica: z.number().nullable().optional(),
    capital_social: z.number().nullable().optional(),
    opcao_pelo_simples: z.boolean().nullable().optional(),
    opcao_pelo_mei: z.boolean().nullable().optional(),
    regime_tributario: z.array(regimeTributarioSchema).default([]),
    identificador_matriz_filial: z.number().nullable().optional(),
    descricao_identificador_matriz_filial: z.string().nullable().optional(),
    ddd_telefone_1: z.string().nullable().optional(),
    ddd_telefone_2: z.string().nullable().optional(),
    descricao_tipo_de_logradouro: z.string().nullable().optional(),
    logradouro: z.string().nullable().optional(),
    numero: z.string().nullable().optional(),
    complemento: z.string().nullable().optional(),
    bairro: z.string().nullable().optional(),
    cep: z.string().nullable().optional(),
    municipio: z.string().nullable().optional(),
    uf: z.string().nullable().optional(),
    qsa: z.array(qsaEntrySchema).default([]),
  })
  .passthrough();

export type BrasilApiCnpjResponse = z.infer<typeof brasilApiCnpjResponseSchema>;
export type QsaEntry = BrasilApiCnpjResponse["qsa"][number];

const qsaMatchSchema = z
  .object({
    name: z.string(),
    role: z.string(),
    since: z.string().nullable(),
  })
  .openapi("QsaMatch", {
    description:
      "Sócio ou administrador do QSA cujo nome bateu com o contato informado. Não representa cargo profissional — apenas posição formal no quadro societário registrado na Receita Federal.",
  });

export const enrichedCompanySchema = z
  .object({
    identification: z.object({
      cnpj: z.string(),
      legalName: z.string(),
      tradeName: z.string().nullable(),
      displayName: z.string(),
    }),
    status: z.object({
      description: z.string(),
      active: z.boolean(),
      since: z.string().nullable(),
    }),
    establishment: z.object({
      type: z.enum(["Matriz", "Filial", "Não informado"]),
      code: z.number().nullable(),
    }),
    classification: z.object({
      cnae: z.object({
        code: z.string(),
        description: z.string(),
        segment: z.string(),
      }),
      secondaryActivities: z.array(
        z.object({
          code: z.string(),
          description: z.string(),
          segment: z.string(),
        })
      ),
      size: z.object({
        code: z.string(),
        description: z.string(),
        category: z.string(),
        estimatedEmployeeRange: z.string(),
        revenueBand: z.string().nullable(),
        confidence: z.enum(["high", "medium", "low"]),
        signals: z.array(z.string()),
      }),
      legalNature: z.string(),
    }),
    qsaMatch: qsaMatchSchema.nullable(),
    contact: z.object({
      primaryPhone: z.string().nullable(),
      secondaryPhone: z.string().nullable(),
    }),
    address: z.object({
      full: z.string(),
      street: z.string().nullable(),
      number: z.string().nullable(),
      complement: z.string().nullable(),
      district: z.string().nullable(),
      zipCode: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      ibgeCode: z.string().nullable(),
    }),
    financial: z.object({
      shareCapital: z.number(),
      shareCapitalFormatted: z.string(),
      optsForSimples: z.boolean(),
      optsForMei: z.boolean(),
      taxRegime: z
        .object({
          latest: z.string(),
          year: z.number(),
        })
        .nullable(),
    }),
    history: z.object({
      openingDate: z.string(),
      ageInYears: z.number(),
    }),
    partners: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        since: z.string().nullable(),
      })
    ),
  })
  .openapi("EnrichedCompany", {
    description:
      "Empresa enriquecida: identificação, classificação (CNAE → segmento), porte estimado com confidence, identificação do contato no QSA (qsaMatch), endereço com IBGE e quadro societário completo.",
  });

export type EnrichedCompany = z.infer<typeof enrichedCompanySchema>;
export type QsaMatch = z.infer<typeof qsaMatchSchema>;
export type SizeConfidence = EnrichedCompany["classification"]["size"]["confidence"];

export const errorResponseSchema = z
  .object({
    error: z.object({
      code: z.string(),
      message: z.string(),
      details: z.unknown().optional(),
    }),
  })
  .openapi("ErrorResponse", {
    description: "Formato padronizado de erro retornado pela API.",
  });
