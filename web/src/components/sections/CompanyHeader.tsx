import type { EnrichedCompany } from "../../types/cnpj.types";
import { Badge } from "../ui/Badge";

interface Props {
  data: EnrichedCompany;
}

export const CompanyHeader = ({ data }: Props) => {
  const { identification, status } = data;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {identification.displayName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{identification.cnpj}</p>
          {identification.tradeName && (
            <p className="mt-1 text-xs text-slate-400">
              Razão social: {identification.legalName}
            </p>
          )}
        </div>
        <Badge variant={status.active ? "success" : "danger"}>
          ● {status.description}
        </Badge>
      </div>
    </div>
  );
};
