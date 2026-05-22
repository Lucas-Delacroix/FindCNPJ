import axios, { AxiosError } from "axios";
import type { ApiErrorBody, EnrichedCompany } from "../types/cnpj.types";

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

export const fetchCnpjEnrichment = async ({
  cnpj,
  contato,
}: FetchCnpjParams): Promise<EnrichedCompany> => {
  try {
    const digits = cnpj.replace(/\D/g, "");
    const params = contato ? { contato } : undefined;
    const { data } = await http.get<EnrichedCompany>(`/cnpj/${digits}`, {
      params,
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<ApiErrorBody>;
      const body = axiosErr.response?.data;
      const status = axiosErr.response?.status ?? 0;
      if (body?.error) {
        throw new CnpjApiError(body.error.code, body.error.message, status);
      }
      throw new CnpjApiError(
        "NETWORK_ERROR",
        "Não foi possível conectar à API.",
        status
      );
    }
    throw err;
  }
};
