import type { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

export const Hero = ({ children }: HeroProps) => {
  return (
    <section className="bg-lilac-fade">
      <div className="mx-auto max-w-container px-4 pt-14 pb-20 md:px-6 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
              <SparkIcon />
              Enriquecimento de leads
            </span>
            <h1 className="mt-6 font-display text-display-1 text-ink">
              Conheça melhor seus leads em{" "}
              <span className="text-brand">segundos</span>
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-secondary">
              A partir de um CNPJ, identifique segmento, porte, faixa de
              funcionários e o cargo do contato dentro do quadro societário.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink-secondary">
              <Bullet>CNAE → Segmento</Bullet>
              <Bullet>Porte estimado</Bullet>
              <Bullet>Cargo no QSA</Bullet>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

const SparkIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="currentColor"
    aria-hidden
  >
    <path d="M5 0l1.3 3.3L10 5l-3.7 1.7L5 10 3.7 6.7 0 5l3.7-1.7L5 0z" />
  </svg>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="h-1.5 w-1.5 rounded-pill bg-brand" />
    {children}
  </span>
);
