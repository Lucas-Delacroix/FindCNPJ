import type { EnrichedCompany } from "../types/cnpj.types";
import { CompanyHeader } from "./sections/CompanyHeader";
import { ClassificationCard } from "./sections/ClassificationCard";
import { ContactCard } from "./sections/ContactCard";
import { AddressCard } from "./sections/AddressCard";
import { FinancialCard } from "./sections/FinancialCard";
import { PartnersList } from "./sections/PartnersList";

interface Props {
  data: EnrichedCompany;
}

export const EnrichmentResult = ({ data }: Props) => {
  return (
    <div className="space-y-4">
      <CompanyHeader data={data} />
      <ClassificationCard data={data.classification} />
      <ContactCard data={data.contact} />
      <AddressCard data={data.address} />
      <FinancialCard financial={data.financial} history={data.history} />
      <PartnersList partners={data.partners} />
    </div>
  );
};
