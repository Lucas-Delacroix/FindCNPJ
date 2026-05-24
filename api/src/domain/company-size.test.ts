import { describe, expect, it } from "vitest";
import { mapCompanySize } from "./company-size";

describe("mapCompanySize", () => {
  it("classifica Simples Nacional com alta confiança (teto legal de R$ 4,8M)", () => {
    const result = mapCompanySize({
      shareCapital: 100_000,
      taxRegime: "Simples Nacional",
    });
    expect(result.category).toBe("Pequena Empresa (Simples)");
    expect(result.confidence).toBe("high");
  });

  it("rebaixa confiança para 'medium' em Lucro Real (faturamento ≠ headcount)", () => {
    const result = mapCompanySize({
      shareCapital: 5_000_000,
      taxRegime: "LUCRO REAL",
    });
    expect(result.confidence).toBe("medium");
  });

  it("retorna 'Não classificada' com confiança baixa sem nenhum sinal", () => {
    const result = mapCompanySize({ shareCapital: 0 });
    expect(result.category).toBe("Não classificada");
    expect(result.confidence).toBe("low");
  });
});
