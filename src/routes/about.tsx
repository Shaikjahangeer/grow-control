import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/site/PageHeader";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Grow Control Power Tech" },
      { name: "description", content: "Over two decades of indigenous power electronics for Defense, Nuclear Science, Space Science, Research and Industry." },
      { property: "og:title", content: "About Grow Control Power Tech" },
      { property: "og:description", content: "Innovating power electronics for defense & research since our founding by Shri G. Rajesham." },
    ],
  }),
  component: About,
});

const ew = ["Airborne Power Supplies", "Directed Energy Weapons", "High-Power Microwave (HPM) Systems", "Marx Generators", "Pulsed Power Sources", "Magnetron Modulators", "Klystron Modulators", "Plasma Power Supplies", "Laser Power Supplies"];
const delivered = ["Pulsed Power Systems", "RADAR Power Supplies & Modulators", "High Voltage Power Supplies", "LASER Power Supplies", "Plasma Power Supplies", "Traveling Wave Tube (TWT) Modulators", "Solid-State High Voltage Switches", "High Power Inverters", "Power Converters (AC to AC, AC to DC, DC to AC and DC to DC)"];
const standards = ["MIL-STD-416F", "MIL-STD-810G", "MIL-STD-704E", "MIL-STD-1275D", "CE"];

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((i) => <li key={i} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{i}</li>)}
    </ul>
  );
}

function About() {
  return (
    <>
      <PageHeader title="About Us" eyebrow="Innovating Power Electronics for Defense & Research" crumbs={[{ label: "About Us" }]} />
      <section className="container-x grid gap-14 py-24 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="About Grow Control" title="A trusted Indian leader in power electronics" />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>GROW CONTROL is a leading Indian company renowned for its expertise in power electronics technology. With a rich history spanning over two decades, GROW CONTROL has established itself as a trusted and innovative leader in the industry.</p>
            <p>With core competency in Power Electronics, GROW CONTROL serves cutting edge solutions to a diverse range of sectors, including Defense, Nuclear Science, Space Science, Research, and General Industry on a global scale.</p>
            <p>GROW CONTROL takes pride in its commitment to developing and deploying indigenous power electronics solutions. This approach promotes self-reliance and ensures that our products are tailored to the specific needs and conditions of the Indian market.</p>
            <p>Our extensive expertise, combined with state-of-the-art infrastructure, enables us to meet stringent defense production requirements, reinforcing our position as a trusted partner for critical applications.</p>
          </div>
        </div>
        <img src={asset("images/about-image.png")} alt="Grow Control facility" loading="lazy" className="w-full self-center object-contain" />
      </section>

      <section className="bg-muted py-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="border bg-card p-8 md:p-10">
            <h3 className="mb-2 text-3xl font-bold uppercase">Electronic Warfare development</h3>
            <p className="mb-6 text-sm text-muted-foreground">GROW CONTROL is actively engaged in developing power electronics solutions for Electronic Warfare Systems, including:</p>
            <List items={ew} />
          </div>
          <div className="border bg-card p-8 md:p-10">
            <h3 className="mb-2 text-3xl font-bold uppercase">Proven track record</h3>
            <p className="mb-6 text-sm text-muted-foreground">GROW CONTROL has successfully developed and delivered:</p>
            <List items={delivered} />
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-ink-foreground">
        <div className="container-x">
          <p className="eyebrow mb-4">Standards compliance</p>
          <h2 className="max-w-3xl text-4xl font-bold uppercase md:text-5xl">From concept to final product — built to military standards</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {standards.map((s) => <span key={s} className="border border-ink-border px-5 py-3 font-display text-xl font-semibold">{s}</span>)}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow mb-4">Our Founder</p>
          <h2 className="text-5xl font-bold uppercase">Shri. G. Rajesham</h2>
          <p className="mt-2 font-display text-2xl text-primary">1963 – 2016</p>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>GROW CONTROL was founded by Shri G. Rajesham, who also served as the first Managing Director. He graduated in Electronics & Electrical Engineering from Osmania University, Hyderabad, and gained valuable experience during his tenure as a Scientist at the Bhabha Atomic Research Centre (BARC), Mumbai.</p>
          <p>With over two decades of research experience in developing specialized power supply solutions, he was instrumental in shaping the organization's strategic focus and its expertise in advanced power electronics.</p>
          <p>He founded GROW CONTROL as a one-man venture and expanded it to employ over 100 professionals by the end of 2015. Shri G. Rajesham is one of the pioneers in introducing IGBT (Insulated Gate Bipolar Transistor) technology in India, using custom-designed gate drive cards developed in-house.</p>
          <p>He established the company with a clear vision to provide indigenous power electronics solutions tailored to the needs of research and defense organizations in India.</p>
          <Link to="/contact" className="mt-4 inline-flex h-12 items-center bg-primary px-6 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-foreground">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
