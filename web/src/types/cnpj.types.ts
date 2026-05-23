export interface QsaMatch {
  name: string;
  role: string;
  since: string | null;
}

export type SizeConfidence = "high" | "medium" | "low";

export interface EnrichedCompany {
  identification: {
    cnpj: string;
    legalName: string;
    tradeName: string | null;
    displayName: string;
  };
  status: {
    description: string;
    active: boolean;
    since: string | null;
  };
  establishment: {
    type: "Matriz" | "Filial" | "Não informado";
    code: number | null;
  };
  classification: {
    cnae: {
      code: string;
      description: string;
      segment: string;
    };
    secondaryActivities: Array<{
      code: string;
      description: string;
      segment: string;
    }>;
    size: {
      code: string;
      description: string;
      category: string;
      estimatedEmployeeRange: string;
      revenueBand: string | null;
      confidence: SizeConfidence;
      signals: string[];
    };
    legalNature: string;
  };
  qsaMatch: QsaMatch | null;
  contact: {
    primaryPhone: string | null;
    secondaryPhone: string | null;
  };
  address: {
    full: string;
    street: string | null;
    number: string | null;
    complement: string | null;
    district: string | null;
    zipCode: string | null;
    city: string | null;
    state: string | null;
    ibgeCode: string | null;
  };
  financial: {
    shareCapital: number;
    shareCapitalFormatted: string;
    optsForSimples: boolean;
    optsForMei: boolean;
    taxRegime: {
      latest: string;
      year: number;
    } | null;
  };
  history: {
    openingDate: string;
    ageInYears: number;
  };
  partners: Array<{
    name: string;
    role: string;
    since: string | null;
  }>;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
