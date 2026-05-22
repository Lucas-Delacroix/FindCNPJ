import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  partners: EnrichedCompany["partners"];
}

export const PartnersList = ({ partners }: Props) => {
  if (partners.length === 0) {
    return (
      <Card title="Sócios" index="05">
        <p className="text-sm text-ink-muted">Nenhum sócio cadastrado.</p>
      </Card>
    );
  }

  return (
    <Card title={`Sócios · ${partners.length}`} index="05">
      <ul className="divide-y divide-line-soft">
        {partners.map((partner, idx) => (
          <li
            key={`${partner.name}-${idx}`}
            className="grid grid-cols-[auto_1fr] gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span className="font-mono text-[11px] text-ink-muted pt-0.5">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-medium text-ink">{partner.name}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {partner.role}
                {partner.since && (
                  <>
                    {" "}
                    <span>·</span>{" "}
                    <span className="font-mono">
                      desde {formatDate(partner.since)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};
