/**
 * Cloudflare Worker — DropShift quote form → Brevo email
 *
 * Deploy:
 *   1. Create Worker "dropshift-quote" in Cloudflare
 *   2. Secrets: BREVO_API_KEY, QUOTE_TO (contact@dropshift.co.uk)
 *   3. Route or workers.dev URL → set window.DROPSHIFT_QUOTE_API on the site
 *   4. Revoke any Brevo key that was ever embedded in frontend JS
 *   5. Add a Cloudflare rate-limiting rule on this route (e.g. 5 POSTs a minute per IP)
 */
const ALLOWED_ORIGINS = ["https://dropshift.co.uk", "https://www.dropshift.co.uk"];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "POST only" }, 405, origin);
    }
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "Forbidden" }, 403, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "Invalid JSON" }, 400, origin);
    }
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid JSON" }, 400, origin);
    }

    /* Honeypot: report success so bots don't retry, but send nothing */
    if (body.website) {
      return json({ ok: true }, 200, origin);
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 30);
    const from = clean(body.from, 200);
    const to = clean(body.to, 200);
    const digits = phone.replace(/\D/g, "").length;
    if (!name || !phone || !from || !to || digits < 10 || digits > 14) {
      return json({ error: "Missing required fields" }, 400, origin);
    }

    const leadSource = clean(body.leadSource, 40) || "website";
    const company = clean(body.company, 120);
    const service = clean(body.service, 120);
    const date = clean(body.date, 40);
    const freq = clean(body.freq, 60);
    const details = String(body.details || "").trim().slice(0, 3000);
    const internalQuote = clean(body.internalQuote, 1000);
    const toEmail = env.QUOTE_TO || "contact@dropshift.co.uk";
    const subject =
      (leadSource === "google-ads" ? "[ADS] " : "") +
      "New quote — " +
      name +
      " · " +
      from +
      " → " +
      to;

    const text = [
      "DROPSHIFT TRANSPORT — New quote",
      "Lead source: " + leadSource,
      "Name: " + name,
      "Phone: " + phone,
      company ? "Company: " + company : null,
      "Service: " + (service || "—"),
      "Collection: " + from,
      "Delivery: " + to,
      date ? "Date: " + date : null,
      freq ? "Frequency: " + freq : null,
      details ? "Details: " + details : null,
      internalQuote ? "INTERNAL: " + internalQuote : null,
    ]
      .filter(Boolean)
      .join("\n");

    const html =
      "<pre style=\"font-family:Arial,sans-serif;white-space:pre-wrap\">" +
      escapeHtml(text) +
      "</pre>";

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "DropShift Transport", email: toEmail },
        to: [{ email: toEmail }],
        replyTo: { email: toEmail, name: "DropShift Transport" },
        subject: subject,
        htmlContent: html,
        textContent: text,
        tags: leadSource === "google-ads" ? ["website-quote", "google-ads"] : ["website-quote"],
      }),
    });

    if (!res.ok) {
      /* Detail goes to the Worker logs, not the public response */
      console.error("Brevo error", res.status, (await res.text()).slice(0, 200));
      return json({ error: "Email failed" }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};

/* One line, length-capped: these values end up in the email subject */
function clean(value, max) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
