import type { ReactNode } from "react";
import type { EnrichedCompany } from "../types/cnpj.types";
import { CompanyHeader } from "./sections/CompanyHeader";
import { QsaMatch } from "./sections/QsaMatch";
import { ClassificationCard } from "./sections/ClassificationCard";
import { ContactCard } from "./sections/ContactCard";
import { AddressCard } from "./sections/AddressCard";
import { FinancialCard } from "./sections/FinancialCard";
import { PartnersList } from "./sections/PartnersList";

interface Props {
  data: EnrichedCompany;
  contactName: string;
}

export const EnrichmentResult = ({ data, contactName }: Props) => {
  return (
    <div className="space-y-4">
      <Reveal delay={0}>
        <CompanyHeader data={data} />
      </Reveal>
      <Reveal delay={60}>
        <QsaMatch contactName={contactName} qsaMatch={data.qsaMatch} />
      </Reveal>
      <Reveal delay={120}>
        <ClassificationCard data={data.classification} />
      </Reveal>
      <Reveal delay={180}>
        <ContactCard data={data.contact} />
      </Reveal>
      <Reveal delay={240}>
        <AddressCard data={data.address} />
      </Reveal>
      <Reveal delay={300}>
        <FinancialCard financial={data.financial} history={data.history} />
      </Reveal>
      <Reveal delay={360}>
        <PartnersList partners={data.partners} />
      </Reveal>
    </div>
  );
};

interface RevealProps {
  delay: number;
  children: ReactNode;
}

const Reveal = ({ delay, children }: RevealProps) => (
  <div
    className="animate-fade-up opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);
