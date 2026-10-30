/**
 * Copy to ads-config.js on the server (or paste into index.html / get-a-quote)
 * AFTER you create Google Ads conversions and deploy the Cloudflare Worker.
 *
 * 1. Google Ads → Goals → Conversions → create:
 *    - Phone click (website)
 *    - WhatsApp click
 *    - Form submit / generate_lead
 * 2. Copy AW- ID and conversion labels below
 * 3. Deploy workers/quote-email.js, set BREVO_API_KEY secret, revoke old public key
 */
window.DROPSHIFT_GOOGLE_ADS_ID = "AW-XXXXXXXXX";
window.DROPSHIFT_ADS_CONV = {
  phone: "XXXXXXXXXXXXXXXXXX",
  whatsapp: "XXXXXXXXXXXXXXXXXX",
  form: "XXXXXXXXXXXXXXXXXX",
};
window.DROPSHIFT_QUOTE_API = "https://dropshift-quote.YOUR_SUBDOMAIN.workers.dev";
