import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  data: EnrichedCompany["contact"];
}

export const ContactCard = ({ data }: Props) => {
  const hasMatch = data.leadMatch !== null;
  return (
    <Card title="Contato" index="02" highlight={hasMatch}>
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
            Telefone principal
          </dt>
          <dd className="mt-1.5 font-mono text-sm text-ink">
            {data.primaryPhone ?? "—"}
          </dd>
        </div>
        {data.secondaryPhone && (
          <div>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
              Secundário
            </dt>
            <dd className="mt-1.5 font-mono text-sm text-ink">
              {data.secondaryPhone}
            </dd>
          </div>
        )}
      </dl>

      {data.leadMatch && (
        <div className="mt-6 grid grid-cols-[auto_1fr] items-start gap-4 border-t border-line-soft pt-6">
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brand">
            Cargo no QSA →
          </div>
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">
              {data.leadMatch.name}
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              {data.leadMatch.role}
              {data.leadMatch.since && (
                <>
                  {" "}
                  <span className="text-ink-muted">·</span>{" "}
                  <span className="font-mono text-xs text-ink-muted">
                    desde {formatDate(data.leadMatch.since)}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
