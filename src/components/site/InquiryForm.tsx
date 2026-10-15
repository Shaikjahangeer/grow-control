import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendFormEmail } from "@/lib/emailjs";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter a valid phone number").max(30),
  city: z.string().trim().max(120).optional(),
  product: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Please enter a message").max(3000),
});

export const fieldCls =
  "w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

export function InquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(fd);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setState("sending");
    const v = parsed.data;
    const { error } = await supabase.from("inquiries").insert({
      name: v.name, email: v.email, phone: v.phone, city: v.city || null, product: v.product || null, message: v.message,
    });
    if (error) { setState("error"); return; }
    try {
      await sendFormEmail({ form_type: "Website Enquiry", name: v.name, email: v.email, phone: v.phone, city: v.city, product: v.product, message: v.message });
    } catch (err) { console.error(err); }
    setState("done");
    (e.target as HTMLFormElement).reset();
  }

  if (state === "done")
    return (
      <div className="flex flex-col items-start gap-3 border border-success/40 bg-card p-8" role="status">
        <CheckCircle2 className="size-10 text-success" />
        <h3 className="text-3xl font-bold uppercase">Thank you</h3>
        <p className="text-muted-foreground">Your enquiry has been received. Our team will get back to you shortly.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-semibold text-primary">Send another enquiry</button>
      </div>
    );

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div><label className="sr-only" htmlFor="name">Name</label><input id="name" name="name" placeholder="Your Name *" className={fieldCls} />{err("name")}</div>
      <div><label className="sr-only" htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="Your Email *" className={fieldCls} />{err("email")}</div>
      <div><label className="sr-only" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="Your Number *" className={fieldCls} />{err("phone")}</div>
      <div><label className="sr-only" htmlFor="city">City</label><input id="city" name="city" placeholder="City" className={fieldCls} /></div>
      <div className="sm:col-span-2"><label className="sr-only" htmlFor="product">Product</label><input id="product" name="product" defaultValue={defaultProduct} placeholder="Product of interest" className={fieldCls} /></div>
      <div className="sm:col-span-2"><label className="sr-only" htmlFor="message">Message</label><textarea id="message" name="message" rows={5} placeholder="Type your message *" className={fieldCls} />{err("message")}</div>
      {state === "error" && <p className="text-sm text-destructive sm:col-span-2">Something went wrong. Please try again or email info@growcontrol.in.</p>}
      <button disabled={state === "sending"} className="inline-flex h-13 items-center justify-center gap-2 bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
        {state === "sending" && <Loader2 className="size-4 animate-spin" />} Send Enquiry
      </button>
    </form>
  );
}
