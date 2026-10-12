import { Link } from "@tanstack/react-router";
import { company, productTree, slugify, telHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="border-b border-ink-border">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-4xl font-bold uppercase text-ink-foreground md:text-5xl">
            Have a power electronics requirement? <span className="text-primary">Let's talk.</span>
          </h2>
          <Link to="/contact" className="inline-flex h-13 items-center bg-primary px-7 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-ink-foreground hover:text-ink">
            Get a Quote
          </Link>
        </div>
      </div>
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block bg-card p-3"><img src={company.logo} alt="Grow Control" className="h-10 w-auto" loading="lazy" /></div>
          <p className="mt-5 text-sm leading-relaxed">
            Research-driven design and development of advanced power electronics solutions for defense, research and industry.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {company.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="border border-ink-border px-3 py-1.5 text-xs font-semibold text-ink-foreground transition-colors hover:border-primary hover:text-primary">
                {s.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-lg font-semibold uppercase text-ink-foreground">Useful Links</h3>
          <ul className="space-y-2.5 text-sm">
            {([["/about", "About Us"], ["/products", "Products"], ["/applications", "Applications"], ["/gallery", "Gallery"], ["/news", "News Update"], ["/careers", "Careers"], ["/contact", "Contact Us"]] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-primary">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-lg font-semibold uppercase text-ink-foreground">Our Products</h3>
          <ul className="space-y-2.5 text-sm">
            {productTree.slice(0, 7).map((c) => (
              <li key={c.label}><Link to="/products" hash={slugify(c.label)} className="hover:text-primary">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="mb-5 text-lg font-semibold uppercase text-ink-foreground">Reach Us</h3>
          <p className="font-semibold text-ink-foreground">Registered Office</p>
          <p className="mb-3">{company.registered}</p>
          <p className="font-semibold text-ink-foreground">Factory</p>
          <p className="mb-3">{company.factory}</p>
          {company.phones.map((p) => <a key={p} href={telHref(p)} className="block hover:text-primary">{p}</a>)}
          {company.emails.map((e) => <a key={e} href={`mailto:${e}`} className="block hover:text-primary">{e}</a>)}
        </div>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-x py-5 text-xs">© {new Date().getFullYear()} {company.name}. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
