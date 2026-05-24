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
          <dt className="text-xs font-medium text-ink-muted">
            Capital social
          </dt>
          <dd className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink">
            {financial.shareCapitalFormatted}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink-muted">
            Abertura
          </dt>
          <dd className="mt-1.5 text-sm text-ink">
            <span className="font-mono">{formatDate(history.openingDate)}</span>
            <span className="ml-2 text-ink-muted">
              {history.ageInYears} anos
            </span>
          </dd>
        </div>

        {financial.taxRegime && (
          <div className="md:col-span-2">
            <dt className="text-xs font-medium text-ink-muted">
              Regime tributário
            </dt>
            <dd className="mt-1.5 flex items-baseline gap-2">
              <span className="text-base font-semibold text-ink">
                {financial.taxRegime.latest}
              </span>
              <span className="font-mono text-xs text-ink-muted">
                referência {financial.taxRegime.year}
              </span>
            </dd>
          </div>
        )}

        <div className="flex flex-wrap gap-2 md:col-span-2">
          {financial.optsForSimples && <Tag>Optante pelo Simples</Tag>}
          {financial.optsForMei && <Tag>MEI</Tag>}
          {!financial.optsForSimples && !financial.optsForMei && (
            <span className="text-xs text-ink-muted">
              Não optante por Simples / MEI
            </span>
          )}
        </div>
      </dl>
    </Card>
  );
};

const Tag = ({ children }: { children: string }) => (
  <span className="inline-flex items-center rounded-md border border-line bg-surface-subtle px-2.5 py-1 text-[11px] font-medium text-ink-secondary">
    {children}
  </span>
);
