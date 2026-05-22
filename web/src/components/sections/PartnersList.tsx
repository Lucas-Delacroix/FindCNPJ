import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  partners: EnrichedCompany["partners"];
}

export const PartnersList = ({ partners }: Props) => {
  if (partners.length === 0) {
    return (
      <Card title="Sócios">
        <p className="text-sm text-slate-500">Nenhum sócio cadastrado.</p>
      </Card>
    );
  }

  return (
    <Card title={`Sócios (${partners.length})`}>
      <ul className="divide-y divide-slate-100">
        {partners.map((partner, idx) => (
          <li
            key={`${partner.name}-${idx}`}
            className="py-3 text-sm first:pt-0 last:pb-0"
          >
            <p className="font-medium text-slate-900">{partner.name}</p>
            <p className="text-xs text-slate-500">
              {partner.role}
              {partner.since && ` · desde ${formatDate(partner.since)}`}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
};
