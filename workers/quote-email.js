/**
 * Cloudflare Worker — DropShift quote form → Brevo email
 *
 * Deploy:
 *   1. Create Worker "dropshift-quote" in Cloudflare
 *   2. Secrets: BREVO_API_KEY, QUOTE_TO (contact@dropshift.co.uk)
 *   3. Route or workers.dev URL → set window.DROPSHIFT_QUOTE_API on the site
 *   4. Revoke any Brevo key that was ever embedded in frontend JS
 */
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors() });
    }
    if (request.method !== "POST") {
      return json({ error: "POST only" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "Invalid JSON" }, 400);
    }

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const from = String(body.from || "").trim();
    const to = String(body.to || "").trim();
    if (!name || !phone || !from || !to) {
      return json({ error: "Missing required fields" }, 400);
    }

    const leadSource = String(body.leadSource || "website");
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
      body.company ? "Company: " + body.company : null,
      "Service: " + (body.service || "—"),
      "Collection: " + from,
      "Delivery: " + to,
      body.date ? "Date: " + body.date : null,
      body.details ? "Details: " + body.details : null,
      body.internalQuote ? "INTERNAL: " + body.internalQuote : null,
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
      const errText = await res.text();
      return json({ error: "Email failed", detail: errText.slice(0, 200) }, 502);
    }

    return json({ ok: true });
  },
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...cors() },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
