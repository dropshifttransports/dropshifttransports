import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const pages = [
  {
    slug: "man-and-van",
    title: "Man and Van London | Book a Man with a Van | DropShift",
    h1: "Man and van London",
    eyebrow: "Man & van hire",
    desc: "Book a man and van in London and across the UK. Local man with a van, same-day options, two-man teams and instant quotes from East London.",
    img: "assets/hero-commercial.jpg",
    lede: "Need a man and van near you? DropShift provides local man and van hire from East London — same-day where possible, fully insured, with clear man and van prices on every quote.",
    body: [
      "Whether you search man and van near me, man with a van near me, or man and van UK, we cover Greater London and deliver nationwide.",
      "Book a man and van online with our free quote form, or call / WhatsApp for an instant removals quote. We offer man and van for furniture, small removals, van and driver hire, and man and van with two men when the job needs it.",
    ],
    bullets: [
      "Man and van London & East London",
      "Local man and van / man with a van",
      "Man and van same day by arrangement",
      "Man and van for furniture & small removals",
      "Man and van with two men available",
      "Man and van hire with transparent prices",
      "Instant quote — no obligation",
      "Fully insured removal company",
    ],
    faqs: [
      [
        "How do I book a man and van?",
        "Use the quote form on our site, call or WhatsApp +44 7353 086191. Share collection, delivery and what you are moving for a clear man and van price.",
      ],
      [
        "Do you offer same-day man and van?",
        "Same-day and urgent man and van jobs are available by arrangement across London when diaries allow.",
      ],
      [
        "Is there an hourly rate?",
        "Most jobs are quoted as a fixed price based on distance, load and crew. Ask for man and van hourly rate options if that suits your job better.",
      ],
    ],
    related: ["house-removals", "furniture-delivery", "two-man-delivery", "same-day-courier"],
  },
  {
    slug: "house-removals",
    title: "House Removals Near Me | London House Removal Quotes | DropShift",
    h1: "House removals",
    eyebrow: "Residential moves",
    desc: "House removals near me in London and the UK. Local removal company for flats, houses and small moves — house removal quotes online.",
    img: "assets/carry-boxes.jpg",
    lede: "Looking for a removal company near me or house removals near me? DropShift handles house and flat moves from East London with careful loading and nationwide reach.",
    body: [
      "From studio flats to family homes, we provide removal services near me that scale to your move — including student moves, storage collections and multi-item household transport.",
      "Get a house removal cost estimate in minutes: send details for an instant removals quote. We are a fully insured removal company with clear, competitive pricing.",
    ],
    bullets: [
      "House removals London & UK",
      "Flat, apartment and student moves",
      "Local removal company — East London based",
      "House removal quotes online",
      "Small removals and single-item jobs",
      "Fully insured removals",
      "Same-day removals by arrangement",
    ],
    faqs: [
      [
        "How much does a house removal cost?",
        "House removal cost depends on volume, floors, access and distance. Share your details for a tailored house removal quote — not a vague average.",
      ],
      [
        "Do you do small removals?",
        "Yes. Small removals, partial loads and single rooms are welcome alongside full house moves.",
      ],
    ],
    related: ["man-and-van", "furniture-delivery", "office-removals"],
  },
  {
    slug: "furniture-delivery",
    title: "Furniture Delivery Service London | Collection & Delivery | DropShift",
    h1: "Furniture delivery service",
    eyebrow: "Furniture transport",
    desc: "Furniture delivery service and furniture collection and delivery across London and the UK. Large item delivery, wardrobes, and furniture courier near me.",
    img: "assets/pack-bed.jpg",
    lede: "Professional furniture delivery service for retailers, landlords and homeowners — furniture collection and delivery with careful handling from East London.",
    body: [
      "Need a furniture courier near me, wardrobe collection and delivery, or large item delivery service? We move single pieces and full room loads with Luton van capacity.",
      "Ask about furniture delivery with assembly support on request, cheap sofa delivery options for straightforward jobs, and two man delivery when items are heavy or awkward.",
    ],
    bullets: [
      "Furniture collection and delivery",
      "Large item delivery service",
      "Furniture courier near me (London)",
      "Wardrobe collection and delivery",
      "Furniture delivery with assembly (by arrangement)",
      "Retail and showroom furniture runs",
      "Fully insured goods handling",
    ],
    faqs: [
      [
        "Can you collect and deliver the same day?",
        "Same-day furniture collection is available by arrangement when schedules allow across Greater London.",
      ],
      [
        "Do you deliver large items only?",
        "We handle single large items through to multi-piece furniture loads.",
      ],
    ],
    related: ["sofa-delivery", "two-man-delivery", "white-glove-delivery", "man-and-van"],
  },
  {
    slug: "sofa-delivery",
    title: "Sofa Collection and Delivery London | Cheap Sofa Delivery | DropShift",
    h1: "Sofa collection and delivery",
    eyebrow: "Sofas & seating",
    desc: "Sofa collection and delivery across London and the UK. Cheap sofa delivery, same-day sofa collection and careful two-man handling.",
    img: "assets/van-interior-pallets.jpg",
    lede: "Book sofa collection and delivery with a local team — from cheap sofa delivery for straightforward routes to careful two-man carries for tight stairwells.",
    body: [
      "Corner sofas, sofabeds and modular seating need the right van and crew. We collect from homes, retailers and storage, then deliver to your address across London and nationwide.",
      "Same-day furniture collection can be arranged for urgent sofa moves when diaries allow.",
    ],
    bullets: [
      "Sofa collection and delivery London",
      "Cheap sofa delivery quotes",
      "Same-day sofa collection by arrangement",
      "Two-man sofa handling",
      "Retailer and marketplace collections",
      "Nationwide sofa delivery UK",
    ],
    faqs: [
      [
        "Will you carry my sofa upstairs?",
        "Yes — we plan access, parking and stairs when you book. Two-man delivery is recommended for most sofas.",
      ],
    ],
    related: ["furniture-delivery", "two-man-delivery", "man-and-van"],
  },
  {
    slug: "two-man-delivery",
    title: "Two Man Delivery Service London | Two Man Delivery Prices | DropShift",
    h1: "Two man delivery service",
    eyebrow: "Two-person crew",
    desc: "Two man delivery service in London and the UK. Transparent two man delivery prices for furniture, appliances and awkward large items.",
    img: "assets/tail-lift-pallet.jpg",
    lede: "Heavy, bulky or fragile items need a proper two man delivery service — DropShift provides man and van with two men from East London.",
    body: [
      "Get clear two man delivery prices based on the item, access and distance. Ideal for sofas, wardrobes, gym kit, white goods and office furniture.",
      "Combine with white glove delivery when you need extra care at the door.",
    ],
    bullets: [
      "Two man delivery London & UK",
      "Man and van with two men",
      "Transparent two man delivery prices",
      "Large and awkward item handling",
      "Stairs and restricted-access jobs",
      "Fully insured crew",
    ],
    faqs: [
      [
        "When do I need two men?",
        "If the item needs lifting, stair carries, or safe positioning indoors, book a two man delivery rather than a single driver.",
      ],
    ],
    related: ["white-glove-delivery", "furniture-delivery", "sofa-delivery"],
  },
  {
    slug: "white-glove-delivery",
    title: "White Glove Delivery Service London | Careful Handling | DropShift",
    h1: "White glove delivery",
    eyebrow: "Careful handling",
    desc: "White glove delivery service in London — careful furniture and specialist item delivery with room-of-choice placement and fully insured handling.",
    img: "assets/van-load.jpg",
    lede: "White glove delivery for furniture, retail stock and specialist pieces that need more than kerbside drop-off.",
    body: [
      "We plan protection, carry routes and placement so items arrive undamaged. Ideal for high-value furniture, showroom pieces and sensitive commercial goods.",
      "Pair with two man delivery and our Luton van capacity for larger consignments.",
    ],
    bullets: [
      "White glove delivery London",
      "Room-of-choice placement by arrangement",
      "Protective wrapping where needed",
      "Furniture delivery with assembly (request)",
      "Fully insured handling",
      "Commercial and residential jobs",
    ],
    faqs: [
      [
        "Is white glove more expensive?",
        "It reflects extra time and care. Ask for a white glove quote alongside a standard delivery price.",
      ],
    ],
    related: ["two-man-delivery", "furniture-delivery", "specialist-transport"],
  },
  {
    slug: "same-day-courier",
    title: "Same Day Courier Service London | Same Day Removals | DropShift",
    h1: "Same day courier service",
    eyebrow: "Urgent & same day",
    desc: "Same day courier service and same day removals in London. Urgent man and van, same-day furniture collection and van delivery when diaries allow.",
    img: "assets/pallet-bay-load.jpg",
    lede: "Need it moved today? Our same day courier service covers urgent man and van jobs, same-day furniture collection and time-critical van delivery across London.",
    body: [
      "Same day removals and urgent collections are booked by phone or WhatsApp so we can confirm availability instantly.",
      "We also run next-day and scheduled jobs nationwide when same-day is not required.",
    ],
    bullets: [
      "Same day courier London",
      "Same day removals by arrangement",
      "Urgent man and van",
      "Same-day furniture collection",
      "Van delivery service",
      "Call / WhatsApp for instant availability",
    ],
    faqs: [
      [
        "Can you always do same day?",
        "Same-day depends on capacity and distance. Call early for the best chance across Greater London.",
      ],
    ],
    related: ["man-and-van", "pallet-delivery", "furniture-delivery"],
  },
  {
    slug: "office-removals",
    title: "Office Removals London | Office & IT Relocations | DropShift",
    h1: "Office removals",
    eyebrow: "Workplace moves",
    desc: "Office removals in London — desks, IT equipment, filing and full office relocations with a local man and van or larger Luton capacity.",
    img: "assets/pack-bed.jpg",
    lede: "Office removals and corporate relocations from East London — move desks, workstations, monitors and servers with minimal downtime.",
    body: [
      "We support single-room office clearances through to multi-floor corporate moves, including IT equipment transportation and branch transfers.",
      "Ask about evening or weekend slots when your team needs the office live the next morning.",
    ],
    bullets: [
      "Office removals London",
      "Corporate & IT relocations",
      "Desks, cabinets and workstations",
      "Computer and server transport",
      "Business branch moves",
      "Scheduled commercial collections",
    ],
    faqs: [
      [
        "Do you move IT equipment?",
        "Yes — computers, monitors, printers, networking gear and related office furniture.",
      ],
    ],
    related: ["man-and-van", "two-man-delivery", "specialist-transport"],
  },
  {
    slug: "pallet-delivery",
    title: "Pallet Delivery UK | Tail-Lift Luton Van | DropShift",
    h1: "Pallet delivery UK",
    eyebrow: "Pallet & commercial",
    desc: "Pallet delivery UK with tail-lift Luton vans. Warehouse transfers, palletised stock and commercial van delivery from East London nationwide.",
    img: "assets/tail-lift-pallet.jpg",
    lede: "Pallet delivery across the UK using Luton vans with tail lift and pallet truck — built for warehouses, retailers and e-commerce stock.",
    body: [
      "From single pallets to multi-drop commercial runs, we collect and deliver palletised goods with the right equipment on board.",
      "Ideal for distribution centre transfers, supplier collections and regular B2B logistics contracts.",
    ],
    bullets: [
      "Pallet delivery UK",
      "Tail-lift & pallet truck",
      "Warehouse-to-warehouse transfers",
      "Van delivery service for stock",
      "Multi-drop commercial deliveries",
      "Scheduled recurring runs",
    ],
    faqs: [
      [
        "Do you have a tail lift?",
        "Yes. Our Luton vans include a tail lift and pallet truck for palletised loads.",
      ],
    ],
    related: ["specialist-transport", "same-day-courier", "man-and-van"],
  },
  {
    slug: "specialist-transport",
    title: "Specialist Transport London | Specialist Commercial Deliveries | DropShift",
    h1: "Specialist transport",
    eyebrow: "Specialist jobs",
    desc: "Specialist transport and commercial deliveries in London — trade stands, showroom stock, awkward loads and tailored van logistics.",
    img: "assets/van-load.jpg",
    lede: "Specialist transport for non-standard commercial loads — exhibition kit, showroom fit-outs, trade equipment and awkward consignments.",
    body: [
      "Tell us about access, timing and handling needs. We plan the right crew, protection and route for specialist commercial deliveries across the UK.",
      "Combine with white glove delivery or two man delivery when the job demands extra care.",
    ],
    bullets: [
      "Specialist commercial deliveries",
      "Trade show & exhibition transport",
      "Showroom and retail fit-out moves",
      "Awkward and oversized items",
      "Tailored van logistics",
      "Nationwide specialist runs",
    ],
    faqs: [
      [
        "What counts as specialist transport?",
        "Anything outside a standard box or pallet move — unusual dimensions, timed site access, or high-care commercial goods.",
      ],
    ],
    related: ["white-glove-delivery", "pallet-delivery", "office-removals"],
  },
];

const label = Object.fromEntries(pages.map((p) => [p.slug, p.h1]));

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function pageHtml(p) {
  const url = `https://dropshift.co.uk/${p.slug}/`;
  const related = (p.related || [])
    .map((s) => {
      const t = label[s] || s;
      return `<li><a href="/${s}/">${esc(t)}</a></li>`;
    })
    .join("\n          ");
  const bullets = p.bullets.map((b) => `<li>${esc(b)}</li>`).join("");
  const faqs = p.faqs
    .map(
      ([q, a]) =>
        `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`
    )
    .join("\n        ");
  const faqSchema = p.faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  }));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: p.h1,
        description: p.desc,
        provider: { "@id": "https://dropshift.co.uk/#business" },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Greater London" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://dropshift.co.uk/",
          },
          { "@type": "ListItem", position: 2, name: p.h1, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: faqSchema },
    ],
  };

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0A2463">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="DropShift Transport">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:image" content="https://dropshift.co.uk/${p.img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-29N0M3VMT6"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-29N0M3VMT6');</script>
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body class="svc-page">
<header class="site-header is-solid">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="DropShift Transport home"><img src="/assets/logo.webp" alt="DropShift Transport" width="183" height="44"></a>
    <nav class="nav" aria-label="Main">
      <a href="/#services"><span class="roll"><span><i>Services</i><i>Services</i></span></span></a>
      <a href="/man-and-van/"><span class="roll"><span><i>Man &amp; van</i><i>Man &amp; van</i></span></span></a>
      <a href="/#faq"><span class="roll"><span><i>FAQ</i><i>FAQ</i></span></span></a>
      <a class="btn btn-accent" href="/#quote"><span class="roll"><span><i>Get a free quote</i><i>Get a free quote</i></span></span></a>
    </nav>
    <a class="header-phone" href="tel:+447353086191">+44 7353 086191</a>
  </div>
</header>

<main>
  <section class="svc-hero">
    <div class="svc-hero-media" aria-hidden="true">
      <img src="/${p.img}" alt="" width="1024" height="682" fetchpriority="high">
    </div>
    <div class="wrap svc-hero-copy">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <p class="svc-brand">DropShift Transport</p>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.lede)}</p>
      <div class="hero-actions">
        <a class="btn btn-accent" href="/#quote">Get an instant quote</a>
        <a class="btn btn-ghost" href="https://wa.me/447353086191" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap svc-grid">
      <div class="svc-prose">
        ${p.body.map((para) => `<p>${esc(para)}</p>`).join("\n        ")}
        <ul class="svc-list">${bullets}</ul>
        <div class="hero-actions" style="margin-top:28px">
          <a class="btn btn-accent" href="/#quote">Book online — free quote</a>
          <a class="btn btn-ghost" href="tel:+447353086191">Call +44 7353 086191</a>
        </div>
      </div>
      <aside class="svc-aside">
        <div class="svc-aside-card">
          <h2>Why book DropShift</h2>
          <ul>
            <li>East London based · Nationwide UK</li>
            <li>Luton van with tail lift</li>
            <li>Fully insured removal company</li>
            <li>Same-day options by arrangement</li>
            <li>Clear prices — instant quote</li>
          </ul>
          <a class="btn btn-accent" href="/#quote" style="width:100%;margin-top:18px">Request a quote</a>
        </div>
        <div class="svc-aside-card">
          <h2>Related services</h2>
          <ul>
          ${related}
          </ul>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section-light">
    <div class="wrap">
      <p class="eyebrow">FAQ</p>
      <h2 class="svc-faq-title">Common questions</h2>
      <div class="faq" style="margin-top:24px">
        ${faqs}
      </div>
    </div>
  </section>
</main>

<footer class="site-footer svc-footer">
  <div class="wrap footer-inner">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/"><img src="/assets/logo.webp" alt="DropShift Transport" width="183" height="44"></a>
        <p class="foot-brand-blurb">Man and van London, house removals, furniture delivery and pallet logistics.</p>
      </div>
      <div>
        <h4>Popular searches</h4>
        <ul>
          <li><a href="/man-and-van/">Man and van London</a></li>
          <li><a href="/house-removals/">House removals</a></li>
          <li><a href="/furniture-delivery/">Furniture delivery</a></li>
          <li><a href="/pallet-delivery/">Pallet delivery UK</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+447353086191">+44 7353 086191</a></li>
          <li><a href="https://wa.me/447353086191" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="mailto:contact@dropshift.co.uk">contact@dropshift.co.uk</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 DropShift Transport</span>
      <a href="/">Home</a>
      <a href="/privacy.html">Privacy</a>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

for (const p of pages) {
  const dir = path.join(root, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(p));
  console.log("wrote", p.slug);
}

const sitemapUrls = [
  { loc: "https://dropshift.co.uk/", pri: "1.0" },
  ...pages.map((p) => ({ loc: `https://dropshift.co.uk/${p.slug}/`, pri: "0.8" })),
  { loc: "https://dropshift.co.uk/privacy.html", pri: "0.3" },
];
const today = "2026-10-24";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.pri}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
console.log("sitemap ok", pages.length, "pages");
