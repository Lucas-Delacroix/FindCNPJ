export interface LeadMatch {
  name: string;
  role: string;
  since: string | null;
}

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
  classification: {
    cnae: {
      code: string;
      description: string;
      segment: string;
    };
    size: {
      code: string;
      description: string;
      category: string;
      estimatedEmployeeRange: string;
    };
    legalNature: string;
  };
  contact: {
    primaryPhone: string | null;
    secondaryPhone: string | null;
    leadMatch: LeadMatch | null;
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
  };
  financial: {
    shareCapital: number;
    shareCapitalFormatted: string;
    optsForSimples: boolean;
    optsForMei: boolean;
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
