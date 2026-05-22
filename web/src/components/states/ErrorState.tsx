import { CnpjApiError } from "../../lib/api";

interface ErrorStateProps {
  error: Error;
}

interface ErrorContent {
  title: string;
  description: string;
}

const contentFor = (error: Error): ErrorContent => {
  if (error instanceof CnpjApiError) {
    switch (error.code) {
      case "VALIDATION_ERROR":
        return {
          title: "CNPJ inválido",
          description: error.message,
        };
      case "NOT_FOUND":
        return {
          title: "CNPJ não encontrado",
          description: "Não há registro deste CNPJ na Receita Federal.",
        };
      case "EXTERNAL_SERVICE_ERROR":
        return {
          title: "Fonte de dados indisponível",
          description:
            "A BrasilAPI não respondeu. Tente novamente em alguns instantes.",
        };
      case "NETWORK_ERROR":
        return {
          title: "Erro de conexão",
          description:
            "Não foi possível alcançar a API. Verifique se o backend está rodando em http://localhost:3000.",
        };
      default:
        return { title: "Erro", description: error.message };
    }
  }
  return { title: "Erro inesperado", description: error.message };
};

export const ErrorState = ({ error }: ErrorStateProps) => {
  const { title, description } = contentFor(error);
  return (
    <div className="rounded-card border border-red-200 bg-red-50/60 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-red-100 text-red-700">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 8v5m0 3.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-red-900">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{description}</p>
        </div>
      </div>
    </div>
  );
};
