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
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-sun-glow opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-solar opacity-10 blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
