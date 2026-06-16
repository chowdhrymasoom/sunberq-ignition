import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-14 sm:pt-44 sm:pb-20 bg-surface border-b border-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
