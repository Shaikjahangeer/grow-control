import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/site";

export function ProductCard({ product, label }: { product: Product; label?: string }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card"
    >
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted p-6">
        {product.images[0] && (
          <img src={product.images[0]} alt={product.title} loading="lazy" className="max-h-full max-w-full object-contain" />
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-3 border-t p-5">
        <h3 className="font-display text-xl font-semibold uppercase leading-tight">{label ?? product.title}</h3>
        <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}
