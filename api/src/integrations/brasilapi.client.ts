import axios from "axios";
import { env } from "../config/env";
import { ExternalServiceError, NotFoundError } from "../errors/app-errors";
import {
  brasilApiCnpjResponseSchema,
  type BrasilApiCnpjResponse,
} from "../schemas/cnpj.schema";

const http = axios.create({
  baseURL: env.BRASILAPI_BASE_URL,
  timeout: 10_000,
});

export const brasilApiClient = {
  findCnpj: async (cnpj: string): Promise<BrasilApiCnpjResponse> => {
    try {
      const response = await http.get(`/cnpj/v1/${cnpj}`);
      return brasilApiCnpjResponseSchema.parse(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          throw new NotFoundError(
            `CNPJ ${cnpj} não encontrado na Receita Federal`
          );
        }
        throw new ExternalServiceError(
          "BrasilAPI indisponível ou retornou erro",
          { status: err.response?.status, code: err.code }
        );
      }
      throw err;
    }
  },
};
