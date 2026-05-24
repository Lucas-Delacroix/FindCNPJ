import type { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

export const Hero = ({ children }: HeroProps) => {
  return (
    <section className="bg-lilac-fade">
      <div className="mx-auto max-w-container px-4 pt-14 pb-20 md:px-6 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-12 lg:gap-20">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-xs font-medium text-ink-muted">
              <span className="text-brand">●</span> Consulta pública · Receita
              Federal
            </p>

            <h1 className="mt-6 font-display text-display-1 tracking-tightest text-ink">
              Conheça melhor seus leads em{" "}
              <span className="relative whitespace-nowrap">
                segundos
                <Underline />
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lead text-ink-secondary">
              A partir de um CNPJ, identifique segmento, porte, faixa de
              funcionários e o cargo do contato dentro do quadro societário.
            </p>
          </div>
          <div className="md:col-span-5">{children}</div>
        </div>
      </div>
    </section>
  );
};

const Underline = () => (
  <svg
    aria-hidden
    viewBox="0 0 220 14"
    preserveAspectRatio="none"
    className="absolute -bottom-2 left-0 h-2 w-full text-brand"
  >
    <path
      d="M2 10 C 40 2, 80 12, 120 6 S 200 2, 218 8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
