import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  financial: EnrichedCompany["financial"];
  history: EnrichedCompany["history"];
}

export const FinancialCard = ({ financial, history }: Props) => {
  return (
    <Card title="Financeiro e histórico" index="04">
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
            Capital social
          </dt>
          <dd className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink">
            {financial.shareCapitalFormatted}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
            Abertura
          </dt>
          <dd className="mt-1.5 text-sm text-ink">
            <span className="font-mono">{formatDate(history.openingDate)}</span>
            <span className="ml-2 text-ink-muted">
              {history.ageInYears} anos
            </span>
          </dd>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          {financial.optsForSimples && <Tag>Optante pelo Simples</Tag>}
          {financial.optsForMei && <Tag>MEI</Tag>}
          {!financial.optsForSimples && !financial.optsForMei && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              Não optante por Simples / MEI
            </span>
          )}
        </div>
      </dl>
    </Card>
  );
};

const Tag = ({ children }: { children: string }) => (
  <span className="inline-flex items-center rounded-md border border-line bg-surface-subtle px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-secondary">
    {children}
  </span>
);
