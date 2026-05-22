import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["address"];
}

export const AddressCard = ({ data }: Props) => {
  return (
    <Card title="Endereço" index="03">
      <p className="text-sm leading-relaxed text-ink-secondary">
        {data.full || "—"}
      </p>
      {data.zipCode && (
        <p className="mt-3 font-mono text-xs text-ink-muted">
          CEP {data.zipCode}
        </p>
      )}
    </Card>
  );
};
