import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-lab.jpg";
import { SectionTitle } from "@/components/site/PageHeader";
import { applicationIcons, applicationTree, asset, clientLogos, featuredCategories, slugify } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grow Control Power Tech | Power Electronics for Defense" },
      { name: "description", content: "Research-driven design and development of advanced power electronics for the Army, Air Force, Navy and defense research organizations." },
      { property: "og:title", content: "Grow Control Power Tech | Power Electronics for Defense" },
      { property: "og:description", content: "Mission-critical power supplies, converters and modulators engineered in Hyderabad, India." },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "20+", l: "Years of expertise" },
  { v: "100+", l: "Professionals" },
  { v: "30+", l: "Experienced engineers" },
  { v: "59", l: "Products" },
];

function Index() {
  const apps = applicationTree.filter((a) => applicationIcons[a.label]);
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Power electronics cabinets in the Grow Control lab" className="absolute inset-0 size-full object-cover" width={1920} height={1088} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x relative flex min-h-[78vh] flex-col justify-center py-24">
          <p className="eyebrow mb-6 animate-rise">Welcome to Grow Control Power Tech</p>
          <h1 className="max-w-4xl animate-rise text-6xl font-bold uppercase md:text-8xl">
            Pioneering power electronics for the <span className="text-primary">defense sector</span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg text-ink-muted">
            Mission-critical systems for the Army, Air Force, Navy and defense research organizations — from initial concept to final product.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="inline-flex h-14 items-center gap-2 bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-ink-foreground hover:text-ink">
              Explore Products <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="inline-flex h-14 items-center border border-ink-foreground/40 px-8 text-sm font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
              Enquiry Now
            </Link>
          </div>
        </div>
        <div className="relative border-t border-ink-border bg-ink/80">
          <div className="container-x grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="border-ink-border py-7 md:border-l md:pl-8 first:md:border-l-0 first:md:pl-0">
                <div className="font-display text-5xl font-bold text-primary">{s.v}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div className="relative">
          <img src={asset("img/home-image.jpg")} alt="Grow Control engineering" loading="lazy" className="w-full clip-corner object-cover" />
          <div className="absolute -bottom-6 -right-2 bg-primary px-7 py-5 text-primary-foreground md:-right-6">
            <div className="font-display text-4xl font-bold">Since 2000s</div>
            <div className="text-xs font-semibold uppercase tracking-widest">Indigenous technology</div>
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="About Grow Control" title="Turning complex challenges into reliable power" />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p><strong className="text-foreground">GROW CONTROL</strong> is a research-driven leader in the design and development of advanced power electronics solutions tailored for defense applications. With over two decades of expertise, we specialize in creating mission-critical systems for the Army, Air Force, Navy, and defense research organizations.</p>
            <p>Our dedicated team of over 100 professionals, including more than 30 experienced engineers, offers end-to-end services — from initial concept development to the final product — ensuring the highest standards of performance and reliability.</p>
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-bold uppercase tracking-wider text-primary hover:gap-3 transition-all">More about us <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Our Product Categories" title="Engineered for mission-critical duty" />
            <Link to="/products" className="inline-flex h-12 items-center border border-foreground px-6 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background">All products</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((c, i) => (
              <Link key={c.slug} to="/products/$slug" params={{ slug: c.slug }} className="group relative block aspect-[4/5] overflow-hidden bg-ink">
                <img src={c.img} alt={c.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-bottom-overlay" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-ink-foreground">
                  <div>
                    <div className="mb-2 font-display text-sm font-semibold text-primary">0{i + 1}</div>
                    <h3 className="text-3xl font-bold uppercase">{c.title}</h3>
                  </div>
                  <span className="flex size-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform group-hover:rotate-45"><ArrowUpRight className="size-5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-x relative">
          <SectionTitle eyebrow="Our Applications" title={<span className="text-ink-foreground">Where our power goes to work</span>} />
          <div className="mt-12 grid gap-px bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((a) => (
              <Link key={a.label} to="/applications" hash={slugify(a.label)} className="group flex flex-col gap-6 bg-ink p-8 transition-colors hover:bg-ink-2">
                <img src={applicationIcons[a.label]} alt="" loading="lazy" className="size-14 object-contain" />
                <h3 className="text-2xl font-semibold uppercase group-hover:text-primary">{a.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x mb-10"><SectionTitle eyebrow="Trusted By" title="Our clients & partners" center /></div>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...clientLogos, ...clientLogos].map((src, i) => (
              <img key={i} src={src} alt="Client logo" loading="lazy" className="h-16 w-auto object-contain grayscale transition hover:grayscale-0" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
