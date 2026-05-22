import { z } from "zod";

export const cnpjPathSchema = z.object({
  cnpj: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((digits) => digits.length === 14, {
      message: "CNPJ must have 14 digits",
    }),
});

export const cnpjQuerySchema = z.object({
  contato: z.string().trim().min(1).optional(),
});

const qsaEntrySchema = z
  .object({
    nome_socio: z.string(),
    qualificacao_socio: z.string().nullable().optional(),
    codigo_qualificacao_socio: z.number().nullable().optional(),
    data_entrada_sociedade: z.string().nullable().optional(),
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
    porte: z.string().nullable().optional(),
    codigo_porte: z.number().nullable().optional(),
    natureza_juridica: z.string().nullable().optional(),
    capital_social: z.number().nullable().optional(),
    opcao_pelo_simples: z.boolean().nullable().optional(),
    opcao_pelo_mei: z.boolean().nullable().optional(),
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

export interface LeadMatch {
  name: string;
  role: string;
  since: string | null;
}

export interface EnrichedCompany {
  identification: {
    cnpj: string;
    legalName: string;
    tradeName: string | null;
    displayName: string;
  };
  status: {
    description: string;
    active: boolean;
    since: string | null;
  };
  classification: {
    cnae: {
      code: string;
      description: string;
      segment: string;
    };
    size: {
      code: string;
      description: string;
      category: string;
      estimatedEmployeeRange: string;
    };
    legalNature: string;
  };
  contact: {
    primaryPhone: string | null;
    secondaryPhone: string | null;
    leadMatch: LeadMatch | null;
  };
  address: {
    full: string;
    street: string | null;
    number: string | null;
    complement: string | null;
    district: string | null;
    zipCode: string | null;
    city: string | null;
    state: string | null;
  };
  financial: {
    shareCapital: number;
    shareCapitalFormatted: string;
    optsForSimples: boolean;
    optsForMei: boolean;
  };
  history: {
    openingDate: string;
    ageInYears: number;
  };
  partners: Array<{
    name: string;
    role: string;
    since: string | null;
  }>;
}
