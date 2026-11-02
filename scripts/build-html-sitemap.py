# -*- coding: utf-8 -*-
"""Build /site-map/ HTML index of every public URL + refresh XML sitemap."""
from pathlib import Path
from datetime import date
import secrets

today = date.today().isoformat()

GROUPS = [
    (
        "Core",
        [
            ("https://dropshift.co.uk/", "Home — DropShift Transport"),
            ("https://dropshift.co.uk/get-a-quote/", "Get a quote (Ads landing)"),
            ("https://dropshift.co.uk/pricing/", "Man and van prices"),
            ("https://dropshift.co.uk/near-me/", "Removals near me"),
            ("https://dropshift.co.uk/citations/", "UK directory citations"),
            ("https://dropshift.co.uk/google-listing/", "Google Business checklist"),
            ("https://dropshift.co.uk/site-map/", "HTML sitemap (all pages)"),
        ],
    ),
    (
        "Services",
        [
            ("https://dropshift.co.uk/man-and-van/", "Man and van London"),
            ("https://dropshift.co.uk/house-removals/", "House removals"),
            ("https://dropshift.co.uk/furniture-delivery/", "Furniture delivery"),
            ("https://dropshift.co.uk/sofa-delivery/", "Sofa collection and delivery"),
            ("https://dropshift.co.uk/two-man-delivery/", "Two man delivery"),
            ("https://dropshift.co.uk/white-glove-delivery/", "White glove delivery"),
            ("https://dropshift.co.uk/same-day-courier/", "Same day courier"),
            ("https://dropshift.co.uk/office-removals/", "Office removals"),
            ("https://dropshift.co.uk/pallet-delivery/", "Pallet delivery UK"),
            ("https://dropshift.co.uk/specialist-transport/", "Specialist transport"),
        ],
    ),
    (
        "East London areas",
        [
            ("https://dropshift.co.uk/areas/", "All areas"),
            ("https://dropshift.co.uk/areas/stratford/", "Stratford E15"),
            ("https://dropshift.co.uk/areas/canary-wharf/", "Canary Wharf E14"),
            ("https://dropshift.co.uk/areas/hackney/", "Hackney E8"),
            ("https://dropshift.co.uk/areas/ilford/", "Ilford IG1"),
            ("https://dropshift.co.uk/areas/walthamstow/", "Walthamstow E17"),
            ("https://dropshift.co.uk/areas/bow/", "Bow E3"),
            ("https://dropshift.co.uk/areas/romford/", "Romford"),
        ],
    ),
    (
        "Guides",
        [
            ("https://dropshift.co.uk/guides/", "Guides hub"),
            ("https://dropshift.co.uk/guides/book-man-and-van/", "How to book a man and van"),
            ("https://dropshift.co.uk/guides/house-removal-checklist/", "House removal checklist"),
            ("https://dropshift.co.uk/privacy.html", "Privacy policy"),
        ],
    ),
]

all_urls = [u for _, items in GROUPS for u, _ in items]

# XML sitemap
xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
pri_map = {
    "https://dropshift.co.uk/": "1.0",
    "https://dropshift.co.uk/get-a-quote/": "0.9",
    "https://dropshift.co.uk/man-and-van/": "0.9",
    "https://dropshift.co.uk/pricing/": "0.9",
    "https://dropshift.co.uk/near-me/": "0.9",
}
for loc in all_urls:
    pri = pri_map.get(loc, "0.75" if "/areas/" in loc or "/guides/" in loc else "0.8")
    if loc.endswith("privacy.html"):
        pri = "0.3"
    xml += [
        "  <url>",
        f"    <loc>{loc}</loc>",
        f"    <lastmod>{today}</lastmod>",
        "    <changefreq>weekly</changefreq>",
        f"    <priority>{pri}</priority>",
        "  </url>",
    ]
xml.append("</urlset>")
Path("sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")

# IndexNow key (stable if exists)
key_path = Path("indexnow-key.txt")
if key_path.exists():
    key = key_path.read_text(encoding="utf-8").strip()
else:
    key = secrets.token_hex(16)
    key_path.write_text(key + "\n", encoding="utf-8")
Path(f"{key}.txt").write_text(key, encoding="utf-8")

sections = []
for title, items in GROUPS:
    lis = "\n".join(f'          <li><a href="{u}">{lab}</a></li>' for u, lab in items)
    sections.append(f"      <h2 class=\"svc-faq-title\">{title}</h2>\n      <ul class=\"svc-list\">\n{lis}\n      </ul>")

body_sections = "\n\n".join(sections)
html = f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sitemap | All DropShift Pages</title>
<meta name="description" content="HTML sitemap of every DropShift Transport page — services, East London areas, pricing, guides and citations — for Google indexing and visitors.">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0A2463">
<link rel="canonical" href="https://dropshift.co.uk/site-map/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="DropShift Transport">
<meta property="og:url" content="https://dropshift.co.uk/site-map/">
<meta property="og:title" content="Sitemap | All DropShift Pages">
<meta property="og:description" content="Complete list of DropShift Transport URLs for indexing.">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-29N0M3VMT6"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-29N0M3VMT6');</script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DropShift Transport site map",
  "url": "https://dropshift.co.uk/site-map/",
  "numberOfItems": {len(all_urls)},
  "itemListElement": [
    {", ".join(f'{{"@type":"ListItem","position":{i+1},"url":"{u}","name":"{lab}"}}' for i,(u,lab) in enumerate([x for g in GROUPS for x in g[1]]))}
  ]
}}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css?v=20261102b">
</head>
<body class="svc-page">
<header class="site-header is-solid">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="DropShift Transport home"><img src="/assets/logo.webp" alt="DropShift Transport" width="183" height="44"></a>
    <nav class="nav" id="nav" aria-label="Main">
      <a href="/man-and-van/"><span class="roll"><span><i>Man &amp; van</i><i>Man &amp; van</i></span></span></a>
      <a class="btn btn-accent" href="/#quote"><span class="roll"><span><i>Get a quote</i><i>Get a quote</i></span></span></a>
    </nav>
    <a class="header-phone" href="tel:+447353086191">+44 7353 086191</a>
  </div>
</header>
<main>
  <section class="svc-hero">
    <div class="svc-hero-media" aria-hidden="true">
      <picture>
        <source srcset="/assets/hero-commercial.webp" type="image/webp">
        <img src="/assets/hero-commercial.jpg" alt="" width="1024" height="682" fetchpriority="high">
      </picture>
    </div>
    <div class="wrap svc-hero-copy">
      <p class="eyebrow">Indexation</p>
      <p class="svc-brand">DropShift Transport</p>
      <h1>All pages (HTML sitemap)</h1>
      <p class="lede">{len(all_urls)} public URLs — also listed in <a href="/sitemap.xml">/sitemap.xml</a>. Submit that XML in Google Search Console → Sitemaps.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap" style="max-width:820px">
{body_sections}
      <h2 class="svc-faq-title" style="margin-top:28px">Index in Google (do once)</h2>
      <ol class="svc-list" style="list-style:decimal;padding-left:1.25rem">
        <li>Open <a href="https://search.google.com/search-console" target="_blank" rel="noopener">Google Search Console</a> for dropshift.co.uk</li>
        <li>Sitemaps → add <code>https://dropshift.co.uk/sitemap.xml</code> → Submit</li>
        <li>URL Inspection → paste homepage → Request indexing</li>
        <li>Repeat Request indexing for /man-and-van/, /pricing/, /near-me/, /areas/stratford/, /citations/</li>
      </ol>
    </div>
  </section>
</main>
<footer class="site-footer svc-footer">
  <div class="wrap footer-inner">
    <div class="foot-bottom">
      <span>© 2026 DropShift Transport</span>
      <a href="/">Home</a>
      <a href="/sitemap.xml">XML sitemap</a>
    </div>
  </div>
</footer>
<script src="/assets/site.js?v=20261102b" defer></script>
</body>
</html>
"""
Path("site-map").mkdir(exist_ok=True)
Path("site-map/index.html").write_text(html, encoding="utf-8")

# llms.txt for GEO
llms = f"""# DropShift Transport
> East London man and van, house removals, furniture delivery, pallet delivery UK and same-day courier.

Website: https://dropshift.co.uk/
Phone: +44 7353 086191
Email: contact@dropshift.co.uk
Google: https://maps.app.goo.gl/Linfy1WMstcky7GT8
Brand name: DropShift Transport

## Guide prices
- Luton van · 1 mover: from £48/hour
- Luton van · 2 movers: from £68/hour
- Minimum booking: from £85

## Luton van (approx)
- 4.0 m × 2.0 m × 2.2 m (14–18 m³), tail lift + pallet truck

## Insurance
- Goods in Transit: £10,000 to £50,000
- Public Liability: £1 million to £5 million

## Coverage
Stratford E15, Canary Wharf E14, Hackney E8, Ilford IG1, Walthamstow E17, Bow E3, Greater London, nationwide UK.

## Key pages
{chr(10).join('- ' + u for u in all_urls)}

## XML sitemap
https://dropshift.co.uk/sitemap.xml
"""
Path("llms.txt").write_text(llms, encoding="utf-8")

# IndexNow payload helper
Path("scripts/indexnow-urls.json").write_text(
    __import__("json").dumps(
        {
            "host": "dropshift.co.uk",
            "key": key,
            "keyLocation": f"https://dropshift.co.uk/{key}.txt",
            "urlList": all_urls + ["https://dropshift.co.uk/site-map/", "https://dropshift.co.uk/llms.txt"],
        },
        indent=2,
    )
    + "\n",
    encoding="utf-8",
)
print("html sitemap", len(all_urls), "indexnow key", key[:8] + "…")
