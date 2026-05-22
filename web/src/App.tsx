import { useState } from "react";
import { LeadForm } from "./components/LeadForm";
import { EnrichmentResult } from "./components/EnrichmentResult";
import { LoadingState } from "./components/states/LoadingState";
import { ErrorState } from "./components/states/ErrorState";
import { useCnpjEnrichment } from "./hooks/useCnpjEnrichment";
import type { LeadFormData } from "./schemas/lead.schema";

function App() {
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  const { data, isLoading, isError, error } = useCnpjEnrichment({
    cnpj: submittedLead?.cnpj ?? "",
    contato: submittedLead?.name ?? "",
    enabled: submittedLead !== null,
  });

  const renderResult = () => {
    if (isLoading) return <LoadingState />;
    if (isError && error) return <ErrorState error={error} />;
    if (data) return <EnrichmentResult data={data} />;
    return null;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">FindCNPJ</h1>
        <p className="mt-1 text-sm text-slate-600">
          Enriqueça leads com dados estratégicos da Receita Federal
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Dados do lead
        </h2>
        <LeadForm onSubmit={setSubmittedLead} isLoading={isLoading} />
      </section>

      {submittedLead && <div className="mt-6">{renderResult()}</div>}
    </div>
  );
}

export default App;
