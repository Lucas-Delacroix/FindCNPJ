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
        <p className="text-sm text-ink-muted">Nenhum sócio cadastrado.</p>
      </Card>
    );
  }

  return (
    <Card title={`Sócios (${partners.length})`}>
      <ul className="divide-y divide-line-soft">
        {partners.map((partner, idx) => (
          <li
            key={`${partner.name}-${idx}`}
            className="py-4 text-sm first:pt-0 last:pb-0"
          >
            <p className="font-semibold text-ink">{partner.name}</p>
            <p className="mt-0.5 text-xs text-ink-muted">
              {partner.role}
              {partner.since && ` · desde ${formatDate(partner.since)}`}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
};
