import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import {
  enrichedCompanySchema,
  type ApiErrorBody,
  type EnrichedCompany,
} from "../schemas/cnpj-response.schema";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
});

export interface FetchCnpjParams {
  cnpj: string;
  contato?: string;
}

export class CnpjApiError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.name = "CnpjApiError";
    this.code = code;
    this.status = status;
  }
}

const handleAxiosError = (err: AxiosError<ApiErrorBody>): never => {
  const body = err.response?.data;
  const status = err.response?.status ?? 0;

  if (body?.error) {
    throw new CnpjApiError(body.error.code, body.error.message, status);
  }

  if (err.code === "ECONNABORTED") {
    throw new CnpjApiError(
      "TIMEOUT",
      "A API demorou demais para responder. Tente novamente em instantes.",
      0
    );
  }

  if (err.code === "ERR_NETWORK" || !err.response) {
    throw new CnpjApiError(
      "NETWORK_ERROR",
      "Não foi possível conectar à API. Verifique sua conexão.",
      0
    );
  }

  throw new CnpjApiError(
    "UNEXPECTED_HTTP_ERROR",
    err.message || "Erro inesperado ao consultar a API.",
    status
  );
};

export const fetchCnpjEnrichment = async ({
  cnpj,
  contato,
}: FetchCnpjParams): Promise<EnrichedCompany> => {
  try {
    const digits = cnpj.replace(/\D/g, "");
    const params = contato ? { contato } : undefined;
    const { data } = await http.get<unknown>(`/cnpj/${digits}`, { params });

    const parsed = enrichedCompanySchema.safeParse(data);
    if (!parsed.success) {
      throw new CnpjApiError(
        "INVALID_RESPONSE",
        "A resposta da API não corresponde ao contrato esperado.",
        0
      );
    }
    return parsed.data;
  } catch (err) {
    if (err instanceof CnpjApiError) throw err;
    if (axios.isAxiosError(err)) return handleAxiosError(err as AxiosError<ApiErrorBody>);
    if (err instanceof ZodError) {
      throw new CnpjApiError(
        "INVALID_RESPONSE",
        "A resposta da API não corresponde ao contrato esperado.",
        0
      );
    }
    throw new CnpjApiError(
      "UNEXPECTED_ERROR",
      err instanceof Error ? err.message : "Erro inesperado.",
      0
    );
  }
};
