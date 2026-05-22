import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["classification"];
}

export const ClassificationCard = ({ data }: Props) => {
  return (
    <Card title="Classificação" highlight>
      <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Segmento" value={data.cnae.segment} emphasized />
        <Field label="Porte" value={data.size.category} emphasized />
        <Field
          label="Funcionários (estimado)"
          value={data.size.estimatedEmployeeRange}
          emphasized
        />
        <Field label="Natureza jurídica" value={data.legalNature || "—"} />
        <Field
          label="CNAE"
          value={`${data.cnae.code} — ${data.cnae.description}`}
          className="md:col-span-2"
        />
      </dl>
    </Card>
  );
};

interface FieldProps {
  label: string;
  value: string;
  emphasized?: boolean;
  className?: string;
}

const Field = ({ label, value, emphasized, className = "" }: FieldProps) => (
  <div className={className}>
    <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
      {label}
    </dt>
    <dd
      className={`mt-1 text-sm text-ink ${emphasized ? "font-semibold" : ""}`}
    >
      {value}
    </dd>
  </div>
);
