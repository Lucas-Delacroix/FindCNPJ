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
      <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Capital social
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-slate-900">
            {financial.shareCapitalFormatted}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Abertura
          </dt>
          <dd className="mt-0.5 text-sm text-slate-900">
            {formatDate(history.openingDate)} ({history.ageInYears} anos)
          </dd>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          {financial.optsForSimples && (
            <Badge variant="info">Optante pelo Simples</Badge>
          )}
          {financial.optsForMei && <Badge variant="info">MEI</Badge>}
          {!financial.optsForSimples && !financial.optsForMei && (
            <span className="text-xs text-slate-500">
              Não optante por Simples/MEI
            </span>
          )}
        </div>
      </dl>
    </Card>
  );
};
