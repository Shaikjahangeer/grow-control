import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { productTree, products, slugify, type TreeNode } from "@/lib/site";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products | Grow Control Power Tech" },
      { name: "description", content: "High voltage power supplies, AC/DC converters, pulse power supplies, induction heating systems and more — MIL grade and industrial grade." },
      { property: "og:title", content: "Products | Grow Control Power Tech" },
      { property: "og:description", content: "Explore all Grow Control power electronics product categories." },
    ],
  }),
  component: ProductsPage,
});

function Grid({ nodes }: { nodes: TreeNode[] }) {
  const leaves = nodes.filter((n) => n.slug && products[n.slug]);
  const groups = nodes.filter((n) => n.children.length > 0);
  const seen = new Set<string>();
  return (
    <div className="space-y-10">
      {leaves.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaves.filter((n) => !seen.has(n.slug!) && seen.add(n.slug!)).map((n) => <ProductCard key={n.slug} product={products[n.slug!]} label={n.label} />)}
        </div>
      )}
      {groups.map((g) => (
        <div key={g.label}>
          <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold uppercase text-muted-foreground"><span className="h-0.5 w-6 bg-primary" />{g.label}</h3>
          <Grid nodes={g.children} />
        </div>
      ))}
    </div>
  );
}

function ProductsPage() {
  return (
    <>
      <PageHeader title="Our Products" eyebrow="MIL Grade & Industrial Grade" crumbs={[{ label: "Products" }]} />
      <div className="container-x grid gap-12 py-20 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-32 border bg-card p-5" aria-label="Product categories">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</p>
            {productTree.map((c) => (
              <a key={c.label} href={`#${slugify(c.label)}`} className="block border-b py-2.5 text-sm font-semibold last:border-0 hover:text-primary">{c.label}</a>
            ))}
          </nav>
        </aside>
        <div className="space-y-20">
          {productTree.map((c) => (
            <section key={c.label} id={slugify(c.label)} className="scroll-mt-32">
              <h2 className="mb-8 border-b pb-4 text-4xl font-bold uppercase">{c.label}</h2>
              <Grid nodes={c.children.length ? c.children : [c]} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
