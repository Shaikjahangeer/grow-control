import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { gallery } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Grow Control Power Tech" },
      { name: "description", content: "Photo gallery of Grow Control power supplies, converters, modulators and induction heating systems." },
      { property: "og:title", content: "Gallery | Grow Control Power Tech" },
      { property: "og:description", content: "See our power electronics products." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const cur = open !== null ? gallery[open] : null;
  return (
    <>
      <PageHeader title="Our Gallery" crumbs={[{ label: "Gallery" }]} />
      <div className="container-x grid gap-5 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g, i) => (
          <button key={g.src} onClick={() => setOpen(i)} className="group border bg-card text-left transition-colors hover:border-primary hover:shadow-card">
            <div className="flex aspect-square items-center justify-center overflow-hidden p-5">
              <img src={g.src} alt={g.title || "Grow Control product"} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
            {g.title && <p className="border-t px-4 py-3 font-display text-lg font-semibold uppercase">{g.title}</p>}
          </button>
        ))}
      </div>
      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.title} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-5 top-5 text-ink-foreground"><X className="size-8" /></button>
          <figure className="max-w-4xl bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={cur.title} className="max-h-[75vh] w-auto object-contain" />
            {cur.title && <figcaption className="mt-3 font-display text-xl uppercase">{cur.title}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
