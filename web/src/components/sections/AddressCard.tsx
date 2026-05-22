import type { EnrichedCompany } from "../../types/cnpj.types";
import { Card } from "../ui/Card";

interface Props {
  data: EnrichedCompany["address"];
}

export const AddressCard = ({ data }: Props) => {
  return (
    <Card title="Endereço">
      <p className="text-sm text-slate-900">{data.full || "—"}</p>
    </Card>
  );
};
