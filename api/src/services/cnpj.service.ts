import { brasilApiClient } from "../integrations/brasilapi.client";
import { viaCepClient, type CepInfo } from "../integrations/viacep.client";
import { ValidationError } from "../errors/app-errors";
import { isValidCnpj } from "../domain/cnpj-validator";
import { formatCnaeCode, mapCnaeToSegment } from "../domain/cnae-mapper";
import {
  mapCompanySize,
  normalizeTaxRegime,
} from "../domain/company-size";
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

const pickLatestTaxRegime = (
  regimes: BrasilApiCnpjResponse["regime_tributario"]
) => {
  if (!regimes || regimes.length === 0) return null;
  const sorted = [...regimes].sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0));
  const latest = sorted[0];
  if (!latest || !latest.forma_de_tributacao) return null;
  const normalized = normalizeTaxRegime(latest.forma_de_tributacao);
  if (!normalized) return null;
  return { latest: normalized, year: latest.ano };
};

const mapEstablishment = (
  code: number | null | undefined,
  description: string | null | undefined
): EnrichedCompany["establishment"] => {
  if (code === 1) return { type: "Matriz", code };
  if (code === 2) return { type: "Filial", code };
  if (description) {
    const upper = description.toUpperCase();
    if (upper.includes("MATRIZ")) return { type: "Matriz", code: code ?? null };
    if (upper.includes("FILIAL")) return { type: "Filial", code: code ?? null };
  }
  return { type: "Não informado", code: code ?? null };
};

const enrich = (
  raw: BrasilApiCnpjResponse,
  contactName: string | undefined,
  cepInfo: CepInfo | null
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

  const taxRegime = pickLatestTaxRegime(raw.regime_tributario);

  const companySize = mapCompanySize({
    codigoPorte: raw.codigo_porte,
    shareCapital,
    taxRegime: taxRegime?.latest,
  });

  const secondaryActivities = raw.cnaes_secundarios.map((c) => ({
    code: formatCnaeCode(c.codigo),
    description: c.descricao,
    segment: mapCnaeToSegment(c.codigo),
  }));

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
    establishment: mapEstablishment(
      raw.identificador_matriz_filial,
      raw.descricao_identificador_matriz_filial
    ),
    classification: {
      cnae: {
        code: formatCnaeCode(raw.cnae_fiscal),
        description: raw.cnae_fiscal_descricao,
        segment: mapCnaeToSegment(raw.cnae_fiscal),
      },
      secondaryActivities,
      size: {
        code:
          raw.codigo_porte !== null && raw.codigo_porte !== undefined
            ? String(raw.codigo_porte).padStart(2, "0")
            : "00",
        description: titleCase(raw.porte ?? ""),
        category: companySize.category,
        estimatedEmployeeRange: companySize.estimatedEmployeeRange,
        revenueBand: companySize.revenueBand,
        confidence: companySize.confidence,
        signals: companySize.signals,
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
      ibgeCode: cepInfo?.ibgeCode ?? null,
    },
    financial: {
      shareCapital,
      shareCapitalFormatted: formatCurrencyBRL(shareCapital),
      optsForSimples: raw.opcao_pelo_simples ?? false,
      optsForMei: raw.opcao_pelo_mei ?? false,
      taxRegime,
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
    const cepInfo = await viaCepClient.findByCep(raw.cep);
    return enrich(raw, contactName, cepInfo);
  },
};
