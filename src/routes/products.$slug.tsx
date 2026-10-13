import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Download, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { categoryOf, leafSlugs, products, slugify, summary, type Block } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = products[params.slug];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product unavailable | Grow Control" }, { name: "robots", content: "noindex" }] };
    const d = summary(loaderData, 155);
    const meta = [
      { title: `${loaderData.title} | Grow Control Power Tech` },
      { name: "description", content: d },
      { property: "og:title", content: `${loaderData.title} | Grow Control` },
      { property: "og:description", content: d },
    ];
    if (loaderData.images[0]) meta.push({ property: "og:image", content: loaderData.images[0] }, { name: "twitter:image", content: loaderData.images[0] });
    return { meta };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-5xl font-bold uppercase">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block font-bold text-primary">Browse all products →</Link>
    </div>
  ),
  component: ProductPage,
});

function BlockView({ b }: { b: Block }) {
  if (b.t === "p") return <p className="leading-relaxed text-muted-foreground">{b.v}</p>;
  if (b.t === "h") return <h3 className="pt-4 text-2xl font-bold uppercase">{b.v}</h3>;
  if (b.t === "ul")
    return (
      <ul className="grid gap-2 sm:grid-cols-2">
        {b.v.map((i, k) => <li key={k} className="flex gap-3 border-l-2 border-primary bg-muted px-4 py-2.5 text-sm">{i}</li>)}
      </ul>
    );
  return (
    <div className="overflow-x-auto border">
      <table className="w-full text-sm">
        <tbody>
          {b.v.map((r, i) =>
            r.length === 1 ? (
              <tr key={i} className="bg-ink text-ink-foreground"><th colSpan={9} className="px-4 py-3 text-left font-display text-lg uppercase">{r[0]}</th></tr>
            ) : (
              <tr key={i} className="border-t even:bg-muted">
                {r.map((c, j) => <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-semibold" : "text-muted-foreground"}`}>{c}</td>)}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

const brochureName = (u: string) => decodeURIComponent(u.split("/").pop() ?? "Brochure").replace(/\.pdf$/i, "");

function ProductPage() {
  const p = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const cat = categoryOf(p.slug);
  const related = cat ? leafSlugs(cat).filter((s) => s !== p.slug && products[s]).slice(0, 4) : [];
  return (
    <>
      <PageHeader title={p.title} crumbs={[{ label: "Products", to: "/products" }, ...(cat ? [{ label: cat.label }] : [])]} />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="flex aspect-square items-center justify-center border bg-card p-8">
            {p.images[img] && <img src={p.images[img]} alt={p.title} className="max-h-full max-w-full object-contain" />}
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-3">
              {p.images.map((s, i) => (
                <button key={s} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} className={`aspect-square border bg-card p-2 ${i === img ? "border-primary" : ""}`}>
                  <img src={s} alt="" loading="lazy" className="size-full object-contain" />
                </button>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/contact" search={{ product: p.title }} className="inline-flex h-13 items-center justify-center gap-2 bg-primary text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-foreground">
              <MessageSquare className="size-4" /> Get a Quote
            </Link>
            {p.brochures.map((b) => (
              <a key={b} href={b} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-foreground px-4 py-2 text-center text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background">
                <Download className="size-4 shrink-0" /> <span className="truncate">Download {p.brochures.length > 1 ? brochureName(b) : "Brochure"}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          {p.blocks.map((b, i) => <BlockView key={i} b={b} />)}
        </div>
      </section>
      {related.length > 0 && cat && (
        <section className="bg-muted py-20">
          <div className="container-x">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-4xl font-bold uppercase">More in {cat.label}</h2>
              <Link to="/products" hash={slugify(cat.label)} className="font-bold text-primary">View category →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => <ProductCard key={s} product={products[s]} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
