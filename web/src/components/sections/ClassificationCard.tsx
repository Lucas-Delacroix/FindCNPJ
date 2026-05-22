import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["classification"];
}

export const ClassificationCard = ({ data }: Props) => {
  return (
    <Card title="Classificação" index="01" highlight>
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          value={data.cnae.description}
          subline={data.cnae.code}
          className="md:col-span-2"
        />
      </dl>
    </Card>
  );
};

interface FieldProps {
  label: string;
  value: string;
  subline?: string;
  emphasized?: boolean;
  className?: string;
}

const Field = ({
  label,
  value,
  subline,
  emphasized,
  className = "",
}: FieldProps) => (
  <div className={className}>
    <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
      {label}
    </dt>
    <dd
      className={`mt-1.5 text-ink ${
        emphasized ? "text-base font-semibold" : "text-sm"
      }`}
    >
      {value}
    </dd>
    {subline && (
      <p className="mt-0.5 font-mono text-xs text-ink-muted">{subline}</p>
    )}
  </div>
);
