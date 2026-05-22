import type { EnrichedCompany } from "../../types/cnpj.types";

interface Props {
  data: EnrichedCompany;
}

export const CompanyHeader = ({ data }: Props) => {
  const { identification, status } = data;
  return (
    <div className="rounded-card border border-line-soft bg-surface p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            {identification.cnpj}
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tightest text-ink md:text-3xl">
            {identification.displayName}
          </h1>
          {identification.tradeName && (
            <p className="mt-2 text-xs text-ink-muted">
              <span className="uppercase tracking-wider">Razão social</span>{" "}
              <span className="text-ink-secondary">
                {identification.legalName}
              </span>
            </p>
          )}
        </div>
        <div
          className={`inline-flex shrink-0 items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider ${
            status.active ? "text-emerald-700" : "text-red-700"
          }`}
        >
          <span
            className={`relative flex h-2 w-2 ${
              status.active ? "" : ""
            }`}
            aria-hidden
          >
            {status.active && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                status.active ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
          </span>
          {status.description}
        </div>
      </div>
    </div>
  );
};
