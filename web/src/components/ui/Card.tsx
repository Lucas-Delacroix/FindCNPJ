import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  highlight?: boolean;
  children: ReactNode;
}

export const Card = ({ title, highlight = false, children }: CardProps) => {
  const wrapperClass = highlight
    ? "border-brand/20 bg-gradient-to-br from-surface-lilac/40 to-surface"
    : "border-line-soft bg-surface";

  return (
    <section
      className={`rounded-card border ${wrapperClass} p-6 shadow-soft md:p-8`}
    >
      {title && (
        <header className="mb-5 flex items-center gap-3">
          {highlight && (
            <span className="inline-flex items-center gap-1 rounded-pill bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-dark">
              <SparkIcon />
              Enriquecido
            </span>
          )}
          <h2 className="text-base font-bold text-ink">{title}</h2>
        </header>
      )}
      {children}
    </section>
  );
};

const SparkIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 10 10"
    fill="currentColor"
    aria-hidden
  >
    <path d="M5 0l1.3 3.3L10 5l-3.7 1.7L5 10 3.7 6.7 0 5l3.7-1.7L5 0z" />
  </svg>
);
