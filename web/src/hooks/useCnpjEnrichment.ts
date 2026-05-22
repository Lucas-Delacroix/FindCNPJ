import { useQuery } from "@tanstack/react-query";
import { fetchCnpjEnrichment } from "../lib/api";
import type { EnrichedCompany } from "../types/cnpj.types";

interface UseCnpjEnrichmentParams {
  cnpj: string;
  contato: string;
  enabled: boolean;
}

export const useCnpjEnrichment = ({
  cnpj,
  contato,
  enabled,
}: UseCnpjEnrichmentParams) => {
  return useQuery<EnrichedCompany, Error>({
    queryKey: ["cnpj", cnpj, contato],
    queryFn: () => fetchCnpjEnrichment({ cnpj, contato }),
    enabled: enabled && cnpj.length === 14,
  });
};
