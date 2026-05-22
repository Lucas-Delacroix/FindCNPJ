import type { EnrichedCompany } from "../../types/cnpj.types";
import { Badge } from "../ui/Badge";

interface Props {
  data: EnrichedCompany;
}

export const CompanyHeader = ({ data }: Props) => {
  const { identification, status } = data;
  return (
    <div className="rounded-card border border-line-soft bg-surface p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {identification.displayName}
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">{identification.cnpj}</p>
          {identification.tradeName && (
            <p className="mt-1 text-xs text-ink-muted">
              Razão social: {identification.legalName}
            </p>
          )}
        </div>
        <Badge variant={status.active ? "success" : "danger"}>
          <span aria-hidden>●</span> {status.description}
        </Badge>
      </div>
    </div>
  );
};
