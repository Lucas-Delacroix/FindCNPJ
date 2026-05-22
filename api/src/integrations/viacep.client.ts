import axios from "axios";
import { logger } from "../lib/logger";

interface ViaCepResponse {
  cep?: string;
  ibge?: string;
  erro?: boolean;
}

export interface CepInfo {
  ibgeCode: string;
}

const http = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 5_000,
});

export const viaCepClient = {
  findByCep: async (cep: string | null | undefined): Promise<CepInfo | null> => {
    if (!cep) return null;
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return null;

    try {
      const { data } = await http.get<ViaCepResponse>(`/${digits}/json/`);
      if (data.erro || !data.ibge) return null;
      return { ibgeCode: data.ibge };
    } catch (err) {
      logger.warn(
        { err: err instanceof Error ? err.message : err, cep: digits },
        "ViaCEP lookup failed; degrading gracefully"
      );
      return null;
    }
  },
};
