export const isValidCnpj = (cnpj: string): boolean => {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weightsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calc = (slice: string, weights: number[]): number => {
    const sum = slice
      .split("")
      .reduce((acc, char, idx) => acc + Number(char) * (weights[idx] ?? 0), 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const firstCheck = calc(digits.slice(0, 12), weightsFirst);
  if (firstCheck !== Number(digits[12])) return false;

  const secondCheck = calc(digits.slice(0, 13), weightsSecond);
  return secondCheck === Number(digits[13]);
};
