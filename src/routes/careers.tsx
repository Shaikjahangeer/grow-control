import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { fieldCls } from "@/components/site/InquiryForm";
import { supabase } from "@/integrations/supabase/client";
import { sendFormEmail } from "@/lib/emailjs";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Grow Control Power Tech" },
      { name: "description", content: "Join Grow Control Power Tech. Submit your bio data for EEE, ECE, Mechanical and IT roles in Hyderabad." },
      { property: "og:title", content: "Careers at Grow Control Power Tech" },
      { property: "og:description", content: "Submit your bio data to join our engineering team." },
    ],
  }),
  component: Careers,
});

const req = (m: string) => z.string().trim().min(1, m);
const schema = z.object({
  full_name: req("Required").max(120),
  father_name: req("Required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Valid number required").max(30),
  dob: req("Required").max(20),
  gender: req("Please select"),
  address: req("Required").max(500),
  qualification: req("Required").max(200),
  department: z.string().max(20).optional(),
  referred: z.string().max(50).optional(),
  employment: z.string().max(30).optional(),
  applied_before: z.string().max(5).optional(),
  message: req("Required").max(3000),
});

const sel = (name: string, label: string, opts: string[]) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
    <select id={name} name={name} defaultValue="" className={fieldCls}>
      <option value="">Select</option>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

function Careers() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({}); setState("sending");
    const v = r.data;
    const { error } = await supabase.from("career_applications").insert({
      ...v, department: v.department || null, referred: v.referred || null, employment: v.employment || null, applied_before: v.applied_before || null,
    });
    if (error) { setState("error"); return; }
    const { full_name, ...rest } = v;
    try {
      await sendFormEmail({ form_type: "Careers Application", name: full_name, ...rest });
    } catch (err) { console.error(err); }
    setState("done");
  }

  const input = (name: string, ph: string, type = "text") => (
    <div>
      <label htmlFor={name} className="sr-only">{ph}</label>
      <input id={name} name={name} type={type} placeholder={ph} className={fieldCls} />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader title="Careers" eyebrow="Bio Data Form" crumbs={[{ label: "Careers" }]} />
      <div className="container-x max-w-4xl py-20">
        {state === "done" ? (
          <div className="flex flex-col items-start gap-3 border bg-card p-10" role="status">
            <CheckCircle2 className="size-10 text-success" />
            <h2 className="text-4xl font-bold uppercase">Application received</h2>
            <p className="text-muted-foreground">Thank you for your interest in Grow Control. Our team will review your details.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-4 border-t-4 border-primary bg-card p-8 shadow-card sm:grid-cols-2 md:p-10">
            <h2 className="mb-2 text-4xl font-bold uppercase sm:col-span-2">Submit your details</h2>
            {input("full_name", "Full Name *")}
            {input("father_name", "Father's Name *")}
            {input("email", "Your Email *", "email")}
            {input("phone", "Your Number *", "tel")}
            {input("dob", "Date of Birth (DD-MM-YYYY) *")}
            <div>
              {sel("gender", "Gender *", ["Male", "Female", "Others"])}
              {errors["gender"] && <p className="mt-1 text-xs text-destructive">{errors["gender"]}</p>}
            </div>
            {input("address", "Address *")}
            {input("qualification", "Qualification *")}
            {sel("department", "Department", ["EEE", "ECE", "MECH", "IT"])}
            {sel("referred", "How were you referred to us?", ["Walk-in", "Referral", "Social Media", "Others"])}
            {sel("employment", "Current Employment Status", ["Employed", "Unemployed", "Intern", "Self-employed"])}
            {sel("applied_before", "Have you applied here before?", ["Yes", "No"])}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Type your message *" className={fieldCls} />
              {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
            </div>
            {state === "error" && <p className="text-sm text-destructive sm:col-span-2">Something went wrong. Please try again.</p>}
            <button disabled={state === "sending"} className="inline-flex h-13 items-center gap-2 justify-self-start bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-foreground disabled:opacity-60">
              {state === "sending" && <Loader2 className="size-4 animate-spin" />} Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
}
