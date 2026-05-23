import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
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
    if (data)
      return (
        <EnrichmentResult
          data={data}
          contactName={submittedLead?.name ?? ""}
        />
      );
    return null;
  };

  return (
    <div className="min-h-full bg-surface">
      <Header />
      <main>
        <Hero>
          <div className="rounded-card-lg border border-line-soft bg-surface p-6 shadow-card md:p-8">
            <h3 className="mb-5 font-display text-display-3 text-ink">
              Dados do lead
            </h3>
            <LeadForm onSubmit={setSubmittedLead} isLoading={isLoading} />
          </div>
        </Hero>

        {submittedLead && (
          <section className="bg-surface-subtle">
            <div className="mx-auto max-w-container px-4 py-16 md:px-6 md:py-20">
              <div className="mx-auto max-w-3xl">{renderResult()}</div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-container px-4 py-8 text-xs text-ink-muted md:px-6">
          FindCNPJ · Dados públicos da Receita Federal via BrasilAPI
        </div>
      </footer>
    </div>
  );
}

export default App;
