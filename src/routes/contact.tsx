import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { InquiryForm } from "@/components/site/InquiryForm";
import { SocialLinks } from "@/components/site/SocialLinks";
import { company, telHref } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ product: z.string().max(200).optional() }),
  head: () => ({
    meta: [
      { title: "Contact Us | Grow Control Power Tech" },
      { name: "description", content: "Get a quote from Grow Control Power Tech, Tarnaka & IDA Nacharam, Hyderabad. Call +91 8019898939 or email info@growcontrol.in." },
      { property: "og:title", content: "Contact Grow Control Power Tech" },
      { property: "og:description", content: "Send an enquiry or request a quote." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { product } = Route.useSearch();
  return (
    <>
      <PageHeader title="Contact Us" eyebrow="Get a Quote" crumbs={[{ label: "Contact" }]} />
      <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <div className="border bg-card p-7">
            <MapPin className="mb-4 size-7 text-primary" />
            <h2 className="mb-3 text-2xl font-bold uppercase">Address</h2>
            <p className="text-sm font-semibold">Registered Office</p>
            <p className="mb-4 text-sm text-muted-foreground">{company.registered}</p>
            <p className="text-sm font-semibold">Factory Address</p>
            <p className="text-sm text-muted-foreground">{company.factory}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border bg-card p-7">
              <Phone className="mb-4 size-7 text-primary" />
              <h2 className="mb-3 text-2xl font-bold uppercase">Phone</h2>
              {company.phones.map((p) => <a key={p} href={telHref(p)} className="block text-sm hover:text-primary">{p}</a>)}
            </div>
            <div className="border bg-card p-7">
              <Mail className="mb-4 size-7 text-primary" />
              <h2 className="mb-3 text-2xl font-bold uppercase">Email</h2>
              {company.emails.map((e) => <a key={e} href={`mailto:${e}`} className="block text-sm hover:text-primary">{e}</a>)}
            </div>
          </div>
          <div className="border bg-card p-7">
            <h2 className="mb-4 text-2xl font-bold uppercase">Follow Us</h2>
            <SocialLinks size="size-5" itemClassName="size-11" />
          </div>
        </div>
        <div className="border-t-4 border-primary bg-card p-8 shadow-card md:p-10">
          <p className="eyebrow mb-3">Enquiry</p>
          <h2 className="mb-8 text-4xl font-bold uppercase">Send us a message</h2>
          <InquiryForm key={product} defaultProduct={product ?? ""} />
        </div>
      </div>
    </>
  );
}
