import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatDate } from "../../lib/format";

interface Props {
  financial: EnrichedCompany["financial"];
  history: EnrichedCompany["history"];
}

export const FinancialCard = ({ financial, history }: Props) => {
  return (
    <Card title="Financeiro e histórico">
      <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            Capital social
          </dt>
          <dd className="mt-1 text-sm font-semibold text-ink">
            {financial.shareCapitalFormatted}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            Abertura
          </dt>
          <dd className="mt-1 text-sm text-ink">
            {formatDate(history.openingDate)} ({history.ageInYears} anos)
          </dd>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          {financial.optsForSimples && (
            <Badge variant="info">Optante pelo Simples</Badge>
          )}
          {financial.optsForMei && <Badge variant="info">MEI</Badge>}
          {!financial.optsForSimples && !financial.optsForMei && (
            <span className="text-xs text-ink-muted">
              Não optante por Simples/MEI
            </span>
          )}
        </div>
      </dl>
    </Card>
  );
};
