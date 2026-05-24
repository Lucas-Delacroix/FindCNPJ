import { describe, expect, it } from "vitest";
import { isValidCnpj } from "./cnpj-validator";

describe("isValidCnpj", () => {
  it("aceita CNPJ válido nos formatos com e sem pontuação", () => {
    expect(isValidCnpj("00000000000191")).toBe(true);
    expect(isValidCnpj("00.000.000/0001-91")).toBe(true);
  });

  it("rejeita CNPJ com dígito verificador inválido", () => {
    expect(isValidCnpj("00000000000192")).toBe(false);
  });

  it("rejeita CNPJ com todos os dígitos iguais (caso suspeito)", () => {
    expect(isValidCnpj("11111111111111")).toBe(false);
  });
});
