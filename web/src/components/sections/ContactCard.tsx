import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  data: EnrichedCompany["contact"];
}

export const ContactCard = ({ data }: Props) => {
  return (
    <Card title="Contato" highlight={data.leadMatch !== null}>
      <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Telefone principal
          </dt>
          <dd className="mt-0.5 text-sm text-slate-900">
            {data.primaryPhone ?? "—"}
          </dd>
        </div>
        {data.secondaryPhone && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">
              Telefone secundário
            </dt>
            <dd className="mt-0.5 text-sm text-slate-900">
              {data.secondaryPhone}
            </dd>
          </div>
        )}
      </dl>

      {data.leadMatch && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs uppercase tracking-wide text-emerald-700">
            Cargo do contato no quadro societário
          </p>
          <p className="mt-1 text-base font-semibold text-emerald-900">
            {data.leadMatch.name}
          </p>
          <p className="text-sm text-emerald-800">
            {data.leadMatch.role}
            {data.leadMatch.since && ` · desde ${formatDate(data.leadMatch.since)}`}
          </p>
        </div>
      )}
    </Card>
  );
};
