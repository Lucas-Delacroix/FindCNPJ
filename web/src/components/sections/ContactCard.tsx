import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["contact"];
}

export const ContactCard = ({ data }: Props) => {
  return (
    <Card title="Contato" index="02">
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-ink-muted">
            Telefone principal
          </dt>
          <dd className="mt-1.5 font-mono text-sm text-ink">
            {data.primaryPhone ?? "—"}
          </dd>
        </div>
        {data.secondaryPhone && (
          <div>
            <dt className="text-xs font-medium text-ink-muted">
              Secundário
            </dt>
            <dd className="mt-1.5 font-mono text-sm text-ink">
              {data.secondaryPhone}
            </dd>
          </div>
        )}
      </dl>
    </Card>
  );
};
