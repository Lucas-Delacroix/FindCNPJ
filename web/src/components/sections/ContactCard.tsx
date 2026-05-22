import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  data: EnrichedCompany["contact"];
}

export const ContactCard = ({ data }: Props) => {
  return (
    <Card title="Contato" highlight={data.leadMatch !== null}>
      <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            Telefone principal
          </dt>
          <dd className="mt-1 text-sm text-ink">{data.primaryPhone ?? "—"}</dd>
        </div>
        {data.secondaryPhone && (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Telefone secundário
            </dt>
            <dd className="mt-1 text-sm text-ink">{data.secondaryPhone}</dd>
          </div>
        )}
      </dl>

      {data.leadMatch && (
        <div className="mt-6 rounded-2xl border border-brand/20 bg-gradient-to-br from-surface-lilac to-surface p-5 md:p-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-dark">
            Cargo do contato no quadro societário
          </p>
          <p className="mt-2 font-display text-lg font-bold text-ink">
            {data.leadMatch.name}
          </p>
          <p className="mt-1 text-sm text-ink-secondary">
            {data.leadMatch.role}
            {data.leadMatch.since &&
              ` · desde ${formatDate(data.leadMatch.since)}`}
          </p>
        </div>
      )}
    </Card>
  );
};
