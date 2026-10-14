import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { company, productTree, slugify, telHref } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products", mega: true },
  { to: "/applications", label: "Applications" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/careers", label: "Careers" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-ink-muted md:block">
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="size-3.5 text-primary" />Tarnaka, Hyderabad</span>
            <a href={`mailto:${company.emails[0]!}`} className="flex items-center gap-2 hover:text-ink-foreground"><Mail className="size-3.5 text-primary" />{company.emails[0]!}</a>
          </div>
          <div className="flex items-center gap-5"><a href={telHref(company.phones[0]!)} className="flex items-center gap-2 hover:text-ink-foreground"><Phone className="size-3.5 text-primary" />{company.phones[0]}</a><SocialLinks className="gap-1" itemClassName="size-7 border-transparent text-ink-muted" size="size-3.5" /></div>
        </div>
      </div>
      <div className="border-b bg-card/95 backdrop-blur">
        <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
          <Link to="/" className="shrink-0" aria-label="Grow Control home">
            <img src={company.logo} alt="Grow Control Power Tech" className="h-11 w-auto" />
          </Link>
          <nav className="hidden items-center lg:flex" aria-label="Main">
            {nav.map((n) =>
              "mega" in n ? (
                <div key={n.to} className="group relative">
                  <Link to={n.to} className="flex items-center gap-1 px-3 py-6 text-sm font-semibold text-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
                    {n.label}<ChevronDown className="size-3.5" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[56rem] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-5 border-t-2 border-primary bg-card p-7 shadow-card">
                      {productTree.map((c) => (
                        <Link key={c.label} to="/products" hash={slugify(c.label)} className="group/i">
                          <span className="block font-display text-lg font-semibold uppercase leading-tight text-foreground group-hover/i:text-primary">{c.label}</span>
                        </Link>
                      ))}
                      <Link to="/products" className="col-span-3 mt-1 border-t pt-4 text-sm font-semibold text-primary">View all products →</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className="px-3 py-6 text-sm font-semibold text-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden h-11 items-center bg-primary px-5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground sm:inline-flex">
              Get a Quote
            </Link>
            <button className="inline-flex size-11 items-center justify-center border lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="max-h-[75vh] overflow-y-auto border-t bg-card lg:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-3">
              {[...nav, { to: "/contact", label: "Contact Us" } as const].map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3.5 font-display text-xl font-semibold uppercase" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
                  {n.label}
                </Link>
              ))}
              <SocialLinks className="py-4" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
