# DropShift quote API (Cloudflare Worker + Brevo)

Receives quote form POSTs and emails `TO_EMAIL` via Brevo.

## One-time deploy

```bash
cd workers/quote
npm i -g wrangler
wrangler login
wrangler secret put BREVO_API_KEY
# paste your Brevo API key when prompted (not in chat / git)

wrangler deploy
```

## Cloudflare route

Workers & Pages → `dropshift-quote` → Settings → Domains & Routes → Add route:

- `dropshift.co.uk/api/quote*`
- Zone: `dropshift.co.uk`

Defaults: from + to = `contact@dropshift.co.uk` (Brevo-verified sender).
Edit `wrangler.toml` `[vars]` if you change addresses.

## Test

```bash
curl -X POST https://dropshift.co.uk/api/quote \
  -H "Content-Type: application/json" \
  -H "Origin: https://dropshift.co.uk" \
  -d '{"name":"Test","phone":"+447700900000","from":"E16","to":"M1","service":"Commercial"}'
```
