/**
 * DropShift quote → Brevo transactional email
 * Secret: BREVO_API_KEY (wrangler secret put BREVO_API_KEY)
 */

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

function corsHeaders(origin, allowed) {
  const ok =
    !allowed ||
    origin === allowed ||
    origin === "http://localhost:61533" ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(origin || "");
  return {
    "Access-Control-Allow-Origin": ok ? origin || allowed : allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(s) {
  return esc(s).replace(/\n/g, "<br>");
}

function buildQuoteEmail(fields) {
  const {
    name,
    phone,
    company,
    service,
    from,
    to,
    date,
    freq,
    details,
  } = fields;

  const wa = "https://wa.me/447353086191?text=" + encodeURIComponent("Hi DropShift — following up on quote from " + name);
  const tel = "tel:+447353086191";
  const phoneHref = "tel:" + encodeURIComponent(phone.replace(/\s/g, ""));
  const when = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const detailBlock = details
    ? `<tr>
        <td style="padding:0 28px 24px">
          <div style="background:#F7F9FD;border:1px solid #C5D4EE;border-radius:6px;padding:16px 18px">
            <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#4A5874;font-weight:700;margin-bottom:8px">Job details</div>
            <div style="font-size:15px;line-height:1.55;color:#0F1B33">${nl2br(details)}</div>
          </div>
        </td>
      </tr>`
    : "";

  const metaRow = (label, value) =>
    value
      ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #E8EFFA;width:38%;font-size:13px;color:#4A5874;vertical-align:top">${esc(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E8EFFA;font-size:15px;color:#0F1B33;font-weight:700;vertical-align:top">${esc(value)}</td>
        </tr>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New quote request</title>
</head>
<body style="margin:0;padding:0;background:#E8EFFA;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">
    New quote from ${esc(name)} — ${esc(from)} → ${esc(to)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8EFFA;padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #C5D4EE">

          <!-- Brand bar -->
          <tr>
            <td style="background:#070F24;padding:22px 28px;border-bottom:3px solid #F6B21B">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:800;letter-spacing:.04em;color:#ffffff;line-height:1">DROPSHIFT</div>
                    <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#F6B21B;margin-top:4px;font-weight:700">Transport</div>
                  </td>
                  <td align="right" style="vertical-align:middle">
                    <div style="display:inline-block;background:rgba(246,178,27,.15);border:1px solid rgba(246,178,27,.45);color:#F6B21B;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 10px;border-radius:2px">New quote</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:28px 28px 8px">
              <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#1659D6;font-weight:700;margin-bottom:8px">Website enquiry</div>
              <div style="font-size:26px;line-height:1.15;font-weight:800;color:#0A2463;margin:0">Quote request received</div>
              <div style="font-size:14px;color:#4A5874;margin-top:10px">Submitted ${esc(when)} (London)</div>
            </td>
          </tr>

          <!-- Route strip -->
          <tr>
            <td style="padding:18px 28px 8px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0A1638,#0E2F7A);border-radius:4px">
                <tr>
                  <td style="padding:18px 20px;width:44%;vertical-align:top">
                    <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9EB0D0;font-weight:700;margin-bottom:6px">Collection</div>
                    <div style="font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">${esc(from)}</div>
                  </td>
                  <td align="center" style="vertical-align:middle;width:12%;color:#F6B21B;font-size:22px;font-weight:700">→</td>
                  <td style="padding:18px 20px;width:44%;vertical-align:top">
                    <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9EB0D0;font-weight:700;margin-bottom:6px">Delivery</div>
                    <div style="font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">${esc(to)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer + job meta -->
          <tr>
            <td style="padding:20px 28px 8px">
              <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#4A5874;font-weight:700;margin-bottom:4px">Customer &amp; job</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${metaRow("Name", name)}
                ${metaRow("Phone", phone)}
                ${metaRow("Company", company)}
                ${metaRow("Service", service)}
                ${metaRow("Preferred date", date)}
                ${metaRow("Frequency", freq)}
              </table>
            </td>
          </tr>

          ${detailBlock}

          <!-- CTAs -->
          <tr>
            <td style="padding:8px 28px 28px" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 6px 8px">
                    <a href="${esc(phoneHref)}" style="display:inline-block;background:#1659D6;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;padding:14px 22px;border-radius:4px">Call customer</a>
                  </td>
                  <td style="padding:0 6px 8px">
                    <a href="${esc(tel)}" style="display:inline-block;background:#070F24;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;padding:14px 22px;border-radius:4px">Our line</a>
                  </td>
                  <td style="padding:0 6px 8px">
                    <a href="${esc(wa)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;padding:14px 22px;border-radius:4px">WhatsApp</a>
                  </td>
                </tr>
              </table>
              <div style="font-size:13px;color:#4A5874;margin-top:6px">Customer phone: <a href="${esc(phoneHref)}" style="color:#1659D6;font-weight:700;text-decoration:none">${esc(phone)}</a></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#070F24;padding:20px 28px;border-top:3px solid #F6B21B">
              <div style="font-size:13px;font-weight:700;color:#ffffff">DropShift Transport</div>
              <div style="font-size:12px;color:#9EB0D0;margin-top:6px;line-height:1.5">
                Hartmann Rd, London E16 2PX · Nationwide UK<br>
                <a href="https://dropshift.co.uk" style="color:#F6B21B;text-decoration:none">dropshift.co.uk</a>
                &nbsp;·&nbsp;
                <a href="tel:+447353086191" style="color:#9EB0D0;text-decoration:none">+44 7353 086191</a>
              </div>
            </td>
          </tr>

        </table>
        <div style="font-size:11px;color:#7A8AA8;margin-top:14px;max-width:600px">
          Sent automatically from the DropShift website quote form.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "DROPSHIFT TRANSPORT — New quote request",
    `Submitted: ${when} (London)`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    company ? `Company: ${company}` : null,
    `Service: ${service || "—"}`,
    `Collection: ${from}`,
    `Delivery: ${to}`,
    date ? `Date: ${date}` : null,
    `Frequency: ${freq || "—"}`,
    details ? `Details: ${details}` : null,
    "",
    "Call customer: " + phone,
    "WhatsApp: https://wa.me/447353086191",
    "Hartmann Rd, London E16 2PX · dropshift.co.uk",
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }

    if (!env.BREVO_API_KEY) {
      return json({ error: "Email not configured" }, 500, headers);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, headers);
    }

    if (data.website) {
      return json({ ok: true }, 200, headers);
    }

    const name = (data.name || "").trim();
    const phone = (data.phone || "").trim();
    const from = (data.from || "").trim();
    const to = (data.to || "").trim();
    const company = (data.company || "").trim();
    const service = (data.service || "").trim();
    const date = (data.date || "").trim();
    const freq = (data.freq || "").trim();
    const details = (data.details || "").trim();

    if (!name || !phone || !from || !to) {
      return json({ error: "Missing required fields" }, 400, headers);
    }

    if (
      name.length > 120 ||
      phone.length > 40 ||
      from.length > 200 ||
      to.length > 400 ||
      details.length > 4000
    ) {
      return json({ error: "Field too long" }, 400, headers);
    }

    const fields = { name, phone, company, service, from, to, date, freq, details };
    const { html, text } = buildQuoteEmail(fields);
    const subject = `New quote — ${name}${company ? " / " + company : ""} · ${from} → ${to}`;

    const payload = {
      sender: {
        name: env.FROM_NAME || "DropShift Transport",
        email: env.FROM_EMAIL,
      },
      to: [{ email: env.TO_EMAIL }],
      replyTo: { email: env.TO_EMAIL, name: "DropShift Transport" },
      subject,
      textContent: text,
      htmlContent: html,
      tags: ["website-quote"],
    };

    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Brevo error", res.status, errText);
      return json({ error: "Could not send email" }, 502, headers);
    }

    return json({ ok: true }, 200, headers);
  },
};
