import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { applicationIcons, applicationTree, leafSlugs, products, slugify } from "@/lib/site";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications | Grow Control Power Tech" },
      { name: "description", content: "Radar, plasma, pulse power, capacitor charging, battery chargers, frequency converters, laser power supplies, electromagnetic forming and induction heating." },
      { property: "og:title", content: "Applications | Grow Control Power Tech" },
      { property: "og:description", content: "The applications our power electronics serve." },
    ],
  }),
  component: Applications,
});

function Applications() {
  return (
    <>
      <PageHeader title="Applications" eyebrow="Where our solutions are used" crumbs={[{ label: "Applications" }]} />
      <div className="container-x space-y-6 py-20">
        {applicationTree.map((a, i) => {
          const slugs = leafSlugs(a).filter((s) => products[s]);
          return (
            <section key={a.label} id={slugify(a.label)} className="grid scroll-mt-32 gap-8 border bg-card p-8 md:grid-cols-[320px_1fr] md:p-10">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  {applicationIcons[a.label] ? <img src={applicationIcons[a.label]} alt="" loading="lazy" className="size-12 object-contain" /> : <span className="font-display text-3xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>}
                </div>
                <h2 className="text-3xl font-bold uppercase">{a.label}</h2>
              </div>
              <ul className="grid content-start gap-2 sm:grid-cols-2">
                {slugs.map((s) => (
                  <li key={s}>
                    <Link to="/products/$slug" params={{ slug: s }} className="group flex items-center justify-between gap-3 border-b py-3 text-sm font-semibold hover:text-primary">
                      {products[s].title}<ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
