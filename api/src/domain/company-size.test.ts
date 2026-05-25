import { describe, expect, it } from "vitest";
import { mapCompanySize } from "./company-size";

describe("mapCompanySize", () => {
  it("classifica Simples Nacional como Pequena Empresa com alta confiança", () => {
    const result = mapCompanySize({
      shareCapital: 100_000,
      taxRegime: "Simples Nacional",
    });
    expect(result.category).toBe("Pequena Empresa (Simples)");
    expect(result.confidence).toBe("high");
  });

  it("classifica Lucro Real como Grande Empresa com confiança média", () => {
    const result = mapCompanySize({
      shareCapital: 5_000_000,
      taxRegime: "LUCRO REAL",
    });
    expect(result.category).toBe("Grande Empresa");
    expect(result.confidence).toBe("medium");
  });

  it("retorna 'Não classificada' com confiança baixa sem nenhum sinal", () => {
    const result = mapCompanySize({ shareCapital: 0 });
    expect(result.category).toBe("Não classificada");
    expect(result.confidence).toBe("low");
  });
});
