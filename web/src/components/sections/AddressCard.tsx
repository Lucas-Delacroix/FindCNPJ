import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["address"];
}

export const AddressCard = ({ data }: Props) => {
  return (
    <Card title="Endereço" index="03">
      <p className="break-words text-sm leading-relaxed text-ink-secondary">
        {data.full || "—"}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 break-words font-mono text-xs text-ink-muted">
        {data.zipCode && <span>CEP {data.zipCode}</span>}
        {data.ibgeCode && <span>IBGE {data.ibgeCode}</span>}
      </div>
    </Card>
  );
};
