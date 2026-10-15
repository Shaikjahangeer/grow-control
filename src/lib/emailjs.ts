// EmailJS public credentials (safe for browser use).
const SERVICE_ID = "service_i6k3m2g";
const TEMPLATE_ID = "template_7x2465b";
const PUBLIC_KEY = "aeBgUK_Lof8JmfYLT";

/** Sends a notification email. Empty fields are dropped so the template hides them. */
export async function sendFormEmail(params: Record<string, string | null | undefined>) {
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) if (v && String(v).trim()) clean[k] = String(v).trim();
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, template_params: clean }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}
