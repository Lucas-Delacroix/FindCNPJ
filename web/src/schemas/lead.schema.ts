import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().optional(),
  email: z
    .union([z.literal(""), z.string().email("E-mail inválido")])
    .optional(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  cnpj: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((digits) => digits.length === 14, "CNPJ deve ter 14 dígitos"),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormData = z.output<typeof leadFormSchema>;
