import { z } from "zod";

const qsaMatchSchema = z.object({
  name: z.string(),
  role: z.string(),
  since: z.string().nullable(),
});

const sizeConfidenceSchema = z.enum(["high", "medium", "low"]);

const cnaeRefSchema = z.object({
  code: z.string(),
  description: z.string(),
  segment: z.string(),
});

export const enrichedCompanySchema = z.object({
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
    cnae: cnaeRefSchema,
    secondaryActivities: z.array(cnaeRefSchema),
    size: z.object({
      code: z.string(),
      description: z.string(),
      category: z.string(),
      estimatedEmployeeRange: z.string(),
      revenueBand: z.string().nullable(),
      confidence: sizeConfidenceSchema,
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
});

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export type EnrichedCompany = z.infer<typeof enrichedCompanySchema>;
export type QsaMatch = z.infer<typeof qsaMatchSchema>;
export type SizeConfidence = z.infer<typeof sizeConfidenceSchema>;
export type ApiErrorBody = z.infer<typeof apiErrorSchema>;
