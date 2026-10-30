/**
 * Copy into index.html / get-a-quote AFTER Google Ads conversions exist.
 *
 * 1. Google Ads → Goals → Conversions → create phone / WhatsApp / form labels
 * 2. Paste AW- ID and labels below
 * 3. Quotes already send via Brevo (site.js). If the key was rotated, set:
 *    window.DROPSHIFT_BREVO_KEY = "xkeysib-…";
 */
window.DROPSHIFT_GOOGLE_ADS_ID = "AW-XXXXXXXXX";
window.DROPSHIFT_ADS_CONV = {
  phone: "XXXXXXXXXXXXXXXXXX",
  whatsapp: "XXXXXXXXXXXXXXXXXX",
  form: "XXXXXXXXXXXXXXXXXX",
};
