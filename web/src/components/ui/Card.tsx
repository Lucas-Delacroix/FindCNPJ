import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  index?: string;
  highlight?: boolean;
  children: ReactNode;
}

export const Card = ({
  title,
  index,
  highlight = false,
  children,
}: CardProps) => {
  const wrapperClass = highlight
    ? "border-line-soft before:absolute before:left-0 before:top-8 before:bottom-8 before:w-[3px] before:rounded-r-full before:bg-brand"
    : "border-line-soft";

  return (
    <section
      className={`relative overflow-hidden rounded-card border bg-surface p-6 shadow-soft md:p-8 ${wrapperClass}`}
    >
      {title && (
        <header className="mb-5 flex items-baseline gap-3">
          {index && (
            <span
              className={`font-mono text-xs font-medium ${
                highlight ? "text-brand" : "text-ink-muted"
              }`}
            >
              {index}
            </span>
          )}
          <h2 className="font-display text-base font-bold tracking-tight text-ink">
            {title}
          </h2>
        </header>
      )}
      {children}
    </section>
  );
};
