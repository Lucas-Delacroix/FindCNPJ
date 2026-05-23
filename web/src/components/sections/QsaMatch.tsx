import type { QsaMatch as QsaMatchData } from "../../types/cnpj.types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/format";

interface Props {
  contactName: string;
  qsaMatch: QsaMatchData | null;
}

export const QsaMatch = ({ contactName, qsaMatch }: Props) => {
  const trimmedName = contactName.trim();
  const contactProvided = trimmedName.length > 0;

  if (qsaMatch) {
    return (
      <Card title="Contato no quadro societário" highlight>
        <div className="space-y-4">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
            Decisor formal identificado
          </p>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              {qsaMatch.name}
            </h3>
            <p className="mt-1.5 text-sm text-ink-secondary">
              {qsaMatch.role}
              {qsaMatch.since && (
                <>
                  {" "}
                  <span className="text-ink-muted">·</span>{" "}
                  <span className="font-mono text-xs text-ink-muted">
                    desde {formatDate(qsaMatch.since)}
                  </span>
                </>
              )}
            </p>
          </div>
          <p className="border-t border-line-soft pt-4 text-xs leading-relaxed text-ink-muted">
            O nome informado corresponde a um sócio ou administrador registrado
            na Receita Federal. Sinaliza decisor formal — alta prioridade para
            qualificação comercial.
          </p>
        </div>
      </Card>
    );
  }

  if (contactProvided) {
    return (
      <Card title="Contato no quadro societário">
        <div className="space-y-2">
          <p className="text-sm text-ink">
            <span className="font-medium">"{trimmedName}"</span> não foi
            identificado no QSA da empresa.
          </p>
          <p className="text-xs leading-relaxed text-ink-muted">
            O QSA da Receita Federal lista apenas sócios e administradores
            formais. Contatos comerciais, gerentes ou colaboradores em geral não
            aparecem aqui. Consulte o quadro societário completo abaixo para
            conferir manualmente.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Contato no quadro societário">
      <div className="space-y-2">
        <p className="text-sm text-ink">
          Nome do contato não informado.
        </p>
        <p className="text-xs leading-relaxed text-ink-muted">
          Para tentar identificar o contato no quadro societário da empresa,
          preencha o campo <span className="font-medium">Nome do contato</span>{" "}
          no formulário e refaça a consulta. O cruzamento só identifica sócios e
          administradores formais.
        </p>
      </div>
    </Card>
  );
};
