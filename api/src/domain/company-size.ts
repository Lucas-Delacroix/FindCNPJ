import type { SizeConfidence } from "../schemas/cnpj.schema";

export interface CompanySize {
  category: string;
  estimatedEmployeeRange: string;
  revenueBand: string | null;
  confidence: SizeConfidence;
}

export interface CompanySizeInputs {
  codigoPorte?: number | null;
  shareCapital: number;
  taxRegime?: string | null;
}

export const normalizeTaxRegime = (
  regime: string | null | undefined
): "Lucro Real" | "Lucro Presumido" | "Simples Nacional" | null => {
  if (!regime) return null;
  const upper = regime.toUpperCase();
  if (upper.includes("LUCRO REAL")) return "Lucro Real";
  if (upper.includes("LUCRO PRESUMIDO")) return "Lucro Presumido";
  if (upper.includes("SIMPLES")) return "Simples Nacional";
  return null;
};

export const mapCompanySize = (inputs: CompanySizeInputs): CompanySize => {
  const regime = normalizeTaxRegime(inputs.taxRegime);

  if (regime === "Simples Nacional") {
    return {
      category: "Pequena Empresa (Simples)",
      estimatedEmployeeRange: "1 a 49 funcionários",
      revenueBand: "Até R$ 4,8 milhões/ano",
      confidence: "high",
    };
  }
  if (regime === "Lucro Real") {
    return {
      category: "Grande Empresa",
      estimatedEmployeeRange: "100 ou mais funcionários",
      revenueBand: "Acima de R$ 78 milhões/ano",
      confidence: "high",
    };
  }
  if (regime === "Lucro Presumido") {
    return {
      category: "Empresa de Médio Porte",
      estimatedEmployeeRange: "50 a 99 funcionários",
      revenueBand: "Até R$ 78 milhões/ano",
      confidence: "high",
    };
  }

  switch (inputs.codigoPorte) {
    case 1:
      return {
        category: "Microempresa",
        estimatedEmployeeRange: "1 a 9 funcionários",
        revenueBand: "Até R$ 360 mil/ano",
        confidence: "medium",
      };
    case 3:
      return {
        category: "Empresa de Pequeno Porte",
        estimatedEmployeeRange: "10 a 49 funcionários",
        revenueBand: "R$ 360 mil a R$ 4,8 milhões/ano",
        confidence: "medium",
      };
    case 5:
      return {
        category: "Empresa de Médio Porte",
        estimatedEmployeeRange: "50 a 99 funcionários",
        revenueBand: null,
        confidence: "medium",
      };
    default:
      return {
        category: "Não classificada",
        estimatedEmployeeRange: "Não estimado",
        revenueBand: null,
        confidence: "low",
      };
  }
};
