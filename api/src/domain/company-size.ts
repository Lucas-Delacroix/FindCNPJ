export interface CompanySize {
  category: string;
  estimatedEmployeeRange: string;
}

const LARGE_CAPITAL_THRESHOLD = 10_000_000;

export const mapCompanySize = (
  codigoPorte: number | null | undefined,
  shareCapital: number
): CompanySize => {
  switch (codigoPorte) {
    case 1:
      return {
        category: "Microempresa",
        estimatedEmployeeRange: "1 a 9 funcionários",
      };
    case 3:
      return {
        category: "Empresa de Pequeno Porte",
        estimatedEmployeeRange: "10 a 49 funcionários",
      };
    case 5:
      if (shareCapital >= LARGE_CAPITAL_THRESHOLD) {
        return {
          category: "Grande Empresa",
          estimatedEmployeeRange: "100 ou mais funcionários",
        };
      }
      return {
        category: "Empresa de Médio Porte",
        estimatedEmployeeRange: "50 a 99 funcionários",
      };
    default:
      return {
        category: "Não classificada",
        estimatedEmployeeRange: "Não estimado",
      };
  }
};
