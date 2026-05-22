import type { LeadMatch, QsaEntry } from "../schemas/cnpj.schema";
import { titleCase } from "./formatters";

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .trim();

export const matchPartnerByName = (
  contactName: string,
  partners: QsaEntry[]
): LeadMatch | null => {
  if (!contactName || partners.length === 0) return null;

  const target = normalize(contactName);

  let found = partners.find((p) => normalize(p.nome_socio) === target);

  if (!found) {
    found = partners.find((p) => {
      const partnerName = normalize(p.nome_socio);
      return partnerName.includes(target) || target.includes(partnerName);
    });
  }

  if (!found) return null;

  return {
    name: titleCase(found.nome_socio),
    role: found.qualificacao_socio ?? "Não informada",
    since: found.data_entrada_sociedade ?? null,
  };
};
