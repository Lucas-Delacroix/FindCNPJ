import type {
  EnrichedCompany,
  SizeConfidence,
} from "../../types/cnpj.types";
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
        <Field
          label="Faturamento estimado"
          value={data.size.revenueBand ?? "—"}
        />
        <Field
          label="Natureza jurídica"
          value={data.legalNature || "—"}
          className="md:col-span-2"
        />
        <Field
          label="CNAE principal"
          value={data.cnae.description}
          subline={data.cnae.code}
          className="md:col-span-2"
        />
      </dl>

      <ConfidenceBlock
        confidence={data.size.confidence}
        signals={data.size.signals}
      />

      {data.secondaryActivities.length > 0 && (
        <SecondaryActivities items={data.secondaryActivities} />
      )}
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

const CONFIDENCE_LABEL: Record<SizeConfidence, string> = {
  high: "Confiança alta",
  medium: "Confiança média",
  low: "Confiança baixa",
};

const CONFIDENCE_CLASSES: Record<SizeConfidence, string> = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-line bg-surface-subtle text-ink-muted",
};

const ConfidenceBlock = ({
  confidence,
  signals,
}: {
  confidence: SizeConfidence;
  signals: string[];
}) => (
  <div className="mt-6 border-t border-line-soft pt-5">
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${CONFIDENCE_CLASSES[confidence]}`}
      >
        {CONFIDENCE_LABEL[confidence]}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
        Como estimamos
      </span>
    </div>
    <ul className="mt-3 space-y-1.5">
      {signals.map((signal, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2 text-sm text-ink-secondary"
        >
          <span className="mt-2 inline-block h-1 w-1 rounded-full bg-brand" />
          <span>{signal}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SecondaryActivities = ({
  items,
}: {
  items: EnrichedCompany["classification"]["secondaryActivities"];
}) => (
  <div className="mt-6 border-t border-line-soft pt-5">
    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted">
      Atividades complementares · {items.length}
    </p>
    <ul className="mt-3 space-y-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="grid grid-cols-[auto_1fr] gap-3 text-sm"
        >
          <span className="font-mono text-xs text-ink-muted">{item.code}</span>
          <div>
            <p className="text-ink">{item.description}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              {item.segment}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
