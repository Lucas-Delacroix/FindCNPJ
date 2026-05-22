import { brasilApiClient } from "../integrations/brasilapi.client";
import { ValidationError } from "../errors/app-errors";
import { isValidCnpj } from "../domain/cnpj-validator";
import { formatCnaeCode, mapCnaeToSegment } from "../domain/cnae-mapper";
import { mapCompanySize } from "../domain/company-size";
import { matchPartnerByName } from "../domain/partner-role-matcher";
import {
  calculateAgeInYears,
  formatCnpj,
  formatCurrencyBRL,
  formatFullAddress,
  formatPhone,
  formatZipCode,
  titleCase,
} from "../domain/formatters";
import type {
  BrasilApiCnpjResponse,
  EnrichedCompany,
} from "../schemas/cnpj.schema";

const enrich = (
  raw: BrasilApiCnpjResponse,
  contactName: string | undefined
): EnrichedCompany => {
  const legalName = titleCase(raw.razao_social);
  const tradeName = raw.nome_fantasia ? titleCase(raw.nome_fantasia) : null;

  const street = raw.logradouro
    ? titleCase(
        `${raw.descricao_tipo_de_logradouro ?? ""} ${raw.logradouro}`.trim()
      )
    : null;
  const district = raw.bairro ? titleCase(raw.bairro) : null;
  const city = raw.municipio ? titleCase(raw.municipio) : null;
  const complement = raw.complemento ? titleCase(raw.complemento) : null;
  const zipCode = formatZipCode(raw.cep);
  const shareCapital = raw.capital_social ?? 0;

  const companySize = mapCompanySize(raw.codigo_porte, shareCapital);

  return {
    identification: {
      cnpj: formatCnpj(raw.cnpj),
      legalName,
      tradeName,
      displayName: tradeName ?? legalName,
    },
    status: {
      description: titleCase(raw.descricao_situacao_cadastral),
      active: raw.descricao_situacao_cadastral.toUpperCase() === "ATIVA",
      since: raw.data_situacao_cadastral ?? null,
    },
    classification: {
      cnae: {
        code: formatCnaeCode(raw.cnae_fiscal),
        description: raw.cnae_fiscal_descricao,
        segment: mapCnaeToSegment(raw.cnae_fiscal),
      },
      size: {
        code:
          raw.codigo_porte !== null && raw.codigo_porte !== undefined
            ? String(raw.codigo_porte).padStart(2, "0")
            : "00",
        description: titleCase(raw.porte ?? ""),
        category: companySize.category,
        estimatedEmployeeRange: companySize.estimatedEmployeeRange,
      },
      legalNature: raw.natureza_juridica ?? "",
    },
    contact: {
      primaryPhone: formatPhone(raw.ddd_telefone_1),
      secondaryPhone: formatPhone(raw.ddd_telefone_2),
      leadMatch: contactName
        ? matchPartnerByName(contactName, raw.qsa)
        : null,
    },
    address: {
      full: formatFullAddress({
        street,
        number: raw.numero,
        complement,
        district,
        city,
        state: raw.uf,
        zipCode,
      }),
      street,
      number: raw.numero ?? null,
      complement,
      district,
      zipCode,
      city,
      state: raw.uf ?? null,
    },
    financial: {
      shareCapital,
      shareCapitalFormatted: formatCurrencyBRL(shareCapital),
      optsForSimples: raw.opcao_pelo_simples ?? false,
      optsForMei: raw.opcao_pelo_mei ?? false,
    },
    history: {
      openingDate: raw.data_inicio_atividade,
      ageInYears: calculateAgeInYears(raw.data_inicio_atividade),
    },
    partners: raw.qsa.map((p) => ({
      name: titleCase(p.nome_socio),
      role: p.qualificacao_socio ?? "Não informada",
      since: p.data_entrada_sociedade ?? null,
    })),
  };
};

export const cnpjService = {
  findAndEnrich: async (
    cnpjRaw: string,
    contactName?: string
  ): Promise<EnrichedCompany> => {
    const digits = cnpjRaw.replace(/\D/g, "");
    if (!isValidCnpj(digits)) {
      throw new ValidationError(
        "CNPJ inválido (dígitos verificadores não conferem)"
      );
    }
    const raw = await brasilApiClient.findCnpj(digits);
    return enrich(raw, contactName);
  },
};
