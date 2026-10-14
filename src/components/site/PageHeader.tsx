import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import hero from "@/assets/hero-lab.jpg";

export function PageHeader({ title, eyebrow, crumbs = [], children }: { title: string; eyebrow?: string; crumbs?: { label: string; to?: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <img src={hero} alt="" className="absolute inset-0 size-full object-cover opacity-40" width={1920} height={1088} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative py-20 md:py-28">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-muted">
          <Link to="/" className="hover:text-primary">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-primary">/</span>
              {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span className="text-ink-foreground">{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="max-w-4xl text-5xl font-bold uppercase md:text-7xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro, center }: { eyebrow: string; title: ReactNode; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-4xl font-bold uppercase md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}
