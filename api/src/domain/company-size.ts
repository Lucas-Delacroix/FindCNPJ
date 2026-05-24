import type { SizeConfidence } from "../schemas/cnpj.schema";

export interface CompanySize {
  category: string;
  estimatedEmployeeRange: string;
  revenueBand: string | null;
  confidence: SizeConfidence;
  signals: string[];
}

export interface CompanySizeInputs {
  codigoPorte?: number | null;
  shareCapital: number;
  taxRegime?: string | null;
}

const LARGE_CAPITAL_THRESHOLD = 10_000_000;

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
  const signals: string[] = [];
  const regime = normalizeTaxRegime(inputs.taxRegime);

  if (regime === "Lucro Real") {
    signals.push("Regime tributário: Lucro Real");
    signals.push(
      "Lucro Real indica faturamento elevado (> R$ 78M/ano), mas headcount não é correlacionado diretamente"
    );
    return {
      category: "Provavelmente Grande Empresa",
      estimatedEmployeeRange: "Possivelmente 100 ou mais funcionários",
      revenueBand: "Acima de R$ 78 milhões/ano",
      confidence: "medium",
      signals,
    };
  }
  if (regime === "Lucro Presumido") {
    signals.push("Regime tributário: Lucro Presumido");
    signals.push(
      "Lucro Presumido cobre faixa ampla de faturamento (até R$ 78M/ano); headcount é apenas estimado"
    );
    return {
      category: "Provavelmente Médio Porte",
      estimatedEmployeeRange: "Possivelmente 50 a 99 funcionários",
      revenueBand: "Até R$ 78 milhões/ano",
      confidence: "medium",
      signals,
    };
  }
  if (regime === "Simples Nacional") {
    signals.push("Regime tributário: Simples Nacional");
    signals.push(
      "Simples Nacional tem teto legal de R$ 4,8M/ano, classificando como Pequena Empresa por definição"
    );
    return {
      category: "Pequena Empresa (Simples)",
      estimatedEmployeeRange: "1 a 49 funcionários",
      revenueBand: "Até R$ 4,8 milhões/ano",
      confidence: "high",
      signals,
    };
  }

  switch (inputs.codigoPorte) {
    case 1:
      signals.push("Porte registrado: Microempresa");
      return {
        category: "Microempresa",
        estimatedEmployeeRange: "1 a 9 funcionários",
        revenueBand: "Até R$ 360 mil/ano",
        confidence: "medium",
        signals,
      };
    case 3:
      signals.push("Porte registrado: Empresa de Pequeno Porte");
      return {
        category: "Empresa de Pequeno Porte",
        estimatedEmployeeRange: "10 a 49 funcionários",
        revenueBand: "R$ 360 mil a R$ 4,8 milhões/ano",
        confidence: "medium",
        signals,
      };
    case 5:
      signals.push("Porte registrado: Demais");
      if (inputs.shareCapital >= LARGE_CAPITAL_THRESHOLD) {
        signals.push("Capital social acima de R$ 10 milhões");
        return {
          category: "Grande Empresa",
          estimatedEmployeeRange: "100 ou mais funcionários",
          revenueBand: null,
          confidence: "medium",
          signals,
        };
      }
      return {
        category: "Empresa de Médio Porte",
        estimatedEmployeeRange: "50 a 99 funcionários",
        revenueBand: null,
        confidence: "medium",
        signals,
      };
    default:
      return {
        category: "Não classificada",
        estimatedEmployeeRange: "Não estimado",
        revenueBand: null,
        confidence: "low",
        signals: ["Sem porte registrado e sem regime tributário"],
      };
  }
};
