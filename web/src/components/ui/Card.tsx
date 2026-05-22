import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  highlight?: boolean;
  children: ReactNode;
}

export const Card = ({ title, highlight = false, children }: CardProps) => {
  const borderClass = highlight
    ? "border-emerald-300 ring-1 ring-emerald-100"
    : "border-slate-200";

  return (
    <section
      className={`rounded-xl border bg-white p-6 shadow-sm ${borderClass}`}
    >
      {title && (
        <header className="mb-4 flex items-center gap-2">
          {highlight && (
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Enriquecido
            </span>
          )}
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        </header>
      )}
      {children}
    </section>
  );
};
