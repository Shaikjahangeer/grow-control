import { createFileRoute } from "@tanstack/react-router";
import { Check, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { news } from "@/lib/site";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News Update | Grow Control Power Tech" },
      { name: "description", content: "Latest milestones: Klystron Modulator for the IAF via BEL, DRDO DEW trials, LRGB trials and more." },
      { property: "og:title", content: "News Update | Grow Control Power Tech" },
      { property: "og:description", content: "Milestones in indigenous defense power electronics." },
    ],
  }),
  component: News,
});

function News() {
  return (
    <>
      <PageHeader title="News Update" crumbs={[{ label: "News" }]} />
      <div className="container-x space-y-10 py-20">
        {news.map((n, i) => (
          <article key={n.title} className="grid overflow-hidden border bg-card lg:grid-cols-2">
            <img src={n.img} alt={n.title} loading="lazy" className={`size-full max-h-[480px] object-cover ${i % 2 ? "lg:order-2" : ""}`} />
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold uppercase md:text-4xl">{n.title}</h2>
              <div className="mt-5 space-y-4 text-muted-foreground">{n.body.map((b) => <p key={b}>{b}</p>)}</div>
              {n.highlights.length > 0 && (
                <ul className="mt-6 space-y-2">{n.highlights.map((h) => <li key={h} className="flex gap-3 text-sm"><Check className="size-4 text-primary" />{h}</li>)}</ul>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                {n.links.map((l) => (
                  <a key={l} href={l} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-foreground hover:text-background">
                    Read source <ExternalLink className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
