export const formatCnpj = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return cnpj;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

export const formatPhone = (phone: string | null | undefined): string | null => {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

export const formatZipCode = (cep: string | null | undefined): string | null => {
  if (!cep) return null;
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return cep;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export const formatCurrencyBRL = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const titleCase = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/(^|\s)(\p{L})/gu, (_, prefix, char) => prefix + char.toUpperCase());
};

export const calculateAgeInYears = (isoDate: string): number => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 0;
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    years--;
  }
  return years;
};

export interface AddressParts {
  street?: string | null;
  number?: string | null;
  complement?: string | null;
  district?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
}

export const formatFullAddress = (parts: AddressParts): string => {
  const segments: string[] = [];

  if (parts.street) {
    segments.push(parts.number ? `${parts.street}, ${parts.number}` : parts.street);
  }
  if (parts.complement) segments.push(parts.complement);
  if (parts.district) segments.push(parts.district);
  if (parts.city && parts.state) {
    segments.push(`${parts.city}/${parts.state}`);
  } else if (parts.city) {
    segments.push(parts.city);
  } else if (parts.state) {
    segments.push(parts.state);
  }
  if (parts.zipCode) segments.push(`CEP ${parts.zipCode}`);

  return segments.join(", ");
};
