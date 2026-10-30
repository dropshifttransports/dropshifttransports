import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const today = "2026-10-24";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function shell({ title, desc, url, img, schema, body, brandLine }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0A2463">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="DropShift Transport">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://dropshift.co.uk/${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
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
    <nav class="nav" id="nav" aria-label="Main">
      <a href="/man-and-van/"><span class="roll"><span><i>Man &amp; van</i><i>Man &amp; van</i></span></span></a>
      <a href="/pricing/"><span class="roll"><span><i>Pricing</i><i>Pricing</i></span></span></a>
      <a href="/#quote"><span class="roll"><span><i>Quote</i><i>Quote</i></span></span></a>
      <a class="btn btn-accent" href="/#quote"><span class="roll"><span><i>Get a free quote</i><i>Get a free quote</i></span></span></a>
    </nav>
    <a class="header-phone" href="tel:+447353086191">+44 7353 086191</a>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
</header>
<main>
${body}
</main>
<footer class="site-footer svc-footer">
  <div class="wrap footer-inner">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/"><img src="/assets/logo.webp" alt="DropShift Transport" width="183" height="44"></a>
        <p class="foot-brand-blurb">${esc(brandLine || "Man and van London, house removals and furniture delivery from East London.")}</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/man-and-van/">Man and van</a></li>
          <li><a href="/house-removals/">House removals</a></li>
          <li><a href="/furniture-delivery/">Furniture delivery</a></li>
          <li><a href="/pricing/">Pricing guide</a></li>
        </ul>
      </div>
      <div>
        <h4>Areas</h4>
        <ul>
          <li><a href="/areas/hackney/">Hackney</a></li>
          <li><a href="/areas/stratford/">Stratford</a></li>
          <li><a href="/areas/ilford/">Ilford</a></li>
          <li><a href="/areas/canary-wharf/">Canary Wharf</a></li>
          <li><a href="/areas/">All areas</a></li>
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
      <a href="/guides/">Guides</a>
      <a href="/privacy.html">Privacy</a>
    </div>
  </div>
</footer>
<script src="/assets/site.js?v=20261031f" defer></script>
</body>
</html>
`;
}

function hero({ eyebrow, h1, lede, img }) {
  return `  <section class="svc-hero">
    <div class="svc-hero-media" aria-hidden="true">
      <img src="/${img}" alt="" width="1024" height="682" fetchpriority="high">
    </div>
    <div class="wrap svc-hero-copy">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <p class="svc-brand">DropShift Transport</p>
      <h1>${esc(h1)}</h1>
      <p class="lede">${esc(lede)}</p>
      <div class="hero-actions">
        <a class="btn btn-accent" href="/#quote">Get an instant quote</a>
        <a class="btn btn-ghost" href="https://wa.me/447353086191" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </section>`;
}

const areas = [
  {
    slug: "hackney",
    name: "Hackney",
    nearby: "Dalston, Homerton, Clapton, London Fields and Shoreditch",
    notes: "Tight streets and limited parking are common — we plan loading bays and two-man carries where needed.",
  },
  {
    slug: "stratford",
    name: "Stratford",
    nearby: "Westfield, Olympic Park, Maryland and Forest Gate",
    notes: "Ideal for flat moves, furniture deliveries and same-day courier runs around Newham.",
  },
  {
    slug: "ilford",
    name: "Ilford",
    nearby: "Seven Kings, Goodmayes, Barkingside and Redbridge",
    notes: "Popular for house removals, sofa delivery and local man and van hire across Redbridge.",
  },
  {
    slug: "canary-wharf",
    name: "Canary Wharf",
    nearby: "Isle of Dogs, Poplar, Limehouse and Tower Hamlets",
    notes: "Office removals, IT moves and timed building access are a regular part of our East London work.",
  },
  {
    slug: "walthamstow",
    name: "Walthamstow",
    nearby: "Leyton, Leytonstone, Chingford and Waltham Forest",
    notes: "House and flat moves, student clearances and furniture collection from local sellers.",
  },
  {
    slug: "romford",
    name: "Romford",
    nearby: "Hornchurch, Upminster, Dagenham and Havering",
    notes: "Luton van capacity for larger house moves and palletised commercial loads out toward Essex.",
  },
];

const urls = [
  { loc: "https://dropshift.co.uk/", pri: "1.0" },
  { loc: "https://dropshift.co.uk/man-and-van/", pri: "0.9" },
  { loc: "https://dropshift.co.uk/house-removals/", pri: "0.85" },
  { loc: "https://dropshift.co.uk/furniture-delivery/", pri: "0.85" },
  { loc: "https://dropshift.co.uk/sofa-delivery/", pri: "0.8" },
  { loc: "https://dropshift.co.uk/two-man-delivery/", pri: "0.8" },
  { loc: "https://dropshift.co.uk/white-glove-delivery/", pri: "0.75" },
  { loc: "https://dropshift.co.uk/same-day-courier/", pri: "0.8" },
  { loc: "https://dropshift.co.uk/office-removals/", pri: "0.8" },
  { loc: "https://dropshift.co.uk/pallet-delivery/", pri: "0.8" },
  { loc: "https://dropshift.co.uk/specialist-transport/", pri: "0.75" },
  { loc: "https://dropshift.co.uk/pricing/", pri: "0.9" },
  { loc: "https://dropshift.co.uk/areas/", pri: "0.85" },
  { loc: "https://dropshift.co.uk/guides/", pri: "0.7" },
  { loc: "https://dropshift.co.uk/guides/book-man-and-van/", pri: "0.7" },
  { loc: "https://dropshift.co.uk/guides/house-removal-checklist/", pri: "0.7" },
  { loc: "https://dropshift.co.uk/privacy.html", pri: "0.3" },
];

// --- Area index ---
{
  const url = "https://dropshift.co.uk/areas/";
  const list = areas
    .map(
      (a) =>
        `<li><a href="/areas/${a.slug}/"><strong>Man and van ${esc(a.name)}</strong><span>${esc(a.nearby)}</span></a></li>`
    )
    .join("\n          ");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Man and van areas — East London",
    url,
    isPartOf: { "@id": "https://dropshift.co.uk/#website" },
    about: { "@id": "https://dropshift.co.uk/#business" },
  };
  const body = `${hero({
    eyebrow: "Coverage",
    h1: "Man and van near you — East London areas",
    lede: "Local man and van hire across East London boroughs, with nationwide delivery when you need it.",
    img: "assets/hero-commercial.jpg",
  })}
  <section class="section">
    <div class="wrap">
      <p class="lede" style="max-width:54ch;margin-bottom:28px">Searching man and van near me in East London? Pick your area for local details, or <a href="/#quote">get an instant quote</a> for any UK collection and delivery.</p>
      <ul class="area-index">
          ${list}
      </ul>
    </div>
  </section>`;
  fs.mkdirSync(path.join(root, "areas"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "areas", "index.html"),
    shell({
      title: "Man and Van Near Me | East London Areas | DropShift",
      desc: "Man and van near me in East London — Hackney, Stratford, Ilford, Canary Wharf, Walthamstow, Romford and nationwide UK.",
      url,
      img: "assets/hero-commercial.jpg",
      schema,
      body,
    })
  );
  console.log("wrote areas/");
}

// --- Area pages ---
for (const a of areas) {
  const url = `https://dropshift.co.uk/areas/${a.slug}/`;
  const title = `Man and Van ${a.name} | Local Hire & Removals | DropShift`;
  const desc = `Man and van ${a.name} and nearby ${a.nearby}. Local removals, furniture delivery and same-day options from East London.`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Man and van ${a.name}`,
        description: desc,
        provider: { "@id": "https://dropshift.co.uk/#business" },
        areaServed: { "@type": "City", name: `${a.name}, London` },
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://dropshift.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Areas", item: "https://dropshift.co.uk/areas/" },
          { "@type": "ListItem", position: 3, name: a.name, item: url },
        ],
      },
    ],
  };
  const other = areas
    .filter((x) => x.slug !== a.slug)
    .slice(0, 4)
    .map((x) => `<li><a href="/areas/${x.slug}/">${esc(x.name)}</a></li>`)
    .join("");
  const body = `${hero({
    eyebrow: `Man & van · ${a.name}`,
    h1: `Man and van ${a.name}`,
    lede: `Local man and van hire in ${a.name} — covering ${a.nearby}. Fully insured, clear prices, instant quotes.`,
    img: "assets/hero-commercial.jpg",
  })}
  <section class="section">
    <div class="wrap svc-grid">
      <div class="svc-prose">
        <p>Looking for a man and van near me in ${esc(a.name)}? DropShift is East London based and regularly works across ${esc(a.name)} and ${esc(a.nearby)}.</p>
        <p>${esc(a.notes)}</p>
        <p>Book house removals, furniture collection and delivery, sofa moves, office clearances or same-day courier work. Nationwide drop-offs from ${esc(a.name)} are available too.</p>
        <ul class="svc-list">
          <li>Man and van ${esc(a.name)}</li>
          <li>House &amp; flat removals</li>
          <li>Furniture &amp; sofa delivery</li>
          <li>Two-man teams available</li>
          <li>Same-day by arrangement</li>
          <li>Fully insured</li>
        </ul>
        <div class="hero-actions" style="margin-top:28px">
          <a class="btn btn-accent" href="/#quote">Quote for ${esc(a.name)}</a>
          <a class="btn btn-ghost" href="/man-and-van/">Man and van London</a>
        </div>
      </div>
      <aside class="svc-aside">
        <div class="svc-aside-card">
          <h2>Nearby areas</h2>
          <ul>${other}<li><a href="/areas/">All East London areas</a></li></ul>
        </div>
        <div class="svc-aside-card">
          <h2>Related</h2>
          <ul>
            <li><a href="/house-removals/">House removals</a></li>
            <li><a href="/furniture-delivery/">Furniture delivery</a></li>
            <li><a href="/pricing/">Pricing guide</a></li>
            <li><a href="/same-day-courier/">Same day courier</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>`;
  const dir = path.join(root, "areas", a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    shell({ title, desc, url, img: "assets/hero-commercial.jpg", schema, body, brandLine: `Man and van ${a.name} · East London · Nationwide` })
  );
  urls.push({ loc: url, pri: "0.75" });
  console.log("wrote areas/" + a.slug);
}

// --- Pricing ---
{
  const url = "https://dropshift.co.uk/pricing/";
  const title = "Man and Van Prices | House Removal Cost Guide | DropShift";
  const desc =
    "Man and van prices and house removal cost guide for London. What affects your quote — distance, load, stairs, two-man teams and same-day work.";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url,
        description: desc,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a man and van cost in London?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Man and van prices depend on distance, volume, access (stairs, parking), crew size and whether you need same-day. We quote a clear fixed price once we know the job — not a vague average.",
            },
          },
          {
            "@type": "Question",
            name: "How is house removal cost calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "House removal cost reflects rooms/volume, floors, packing help needed, and mileage between addresses. Share details for a tailored house removal quote.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer an hourly rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most jobs are fixed-price. Hourly man and van rates can be discussed for open-ended local work — ask when you enquire.",
            },
          },
        ],
      },
    ],
  };
  const body = `${hero({
    eyebrow: "Pricing",
    h1: "Man and van prices & removal costs",
    lede: "Transparent quotes for London and UK jobs. Tell us the load and route — we send a clear price, not guesswork.",
    img: "assets/van-load.jpg",
  })}
  <section class="section">
    <div class="wrap svc-grid">
      <div class="svc-prose">
        <p>Searching cheap man and van, man and van prices or house removal cost? Every job is different, so we price on your actual collection, delivery and load — then confirm before you book.</p>
        <h2 class="svc-faq-title" style="margin-top:12px">What affects your quote</h2>
        <ul class="svc-list">
          <li>Distance between collection and delivery</li>
          <li>Volume / number of items (or rooms for house moves)</li>
          <li>Stairs, lifts and parking / loading access</li>
          <li>One driver vs two man delivery</li>
          <li>Tail-lift / pallet needs</li>
          <li>Same-day or timed slots</li>
          <li>Waiting time or multiple drops</li>
        </ul>
        <h2 class="svc-faq-title" style="margin-top:28px">Typical job types</h2>
        <ul class="svc-list">
          <li>Single-item or sofa collection and delivery</li>
          <li>Small removals / studio or 1-bed moves</li>
          <li>Full house or flat removals</li>
          <li>Office / IT relocations</li>
          <li>Pallet delivery UK with tail lift</li>
          <li>Same day courier London</li>
        </ul>
        <p>For the fastest man and van instant quote, use the form with from/to postcodes and a short list of items — or WhatsApp photos of the load.</p>
        <div class="hero-actions" style="margin-top:28px">
          <a class="btn btn-accent" href="/#quote">Get your price</a>
          <a class="btn btn-ghost" href="tel:+447353086191">Call +44 7353 086191</a>
        </div>
      </div>
      <aside class="svc-aside">
        <div class="svc-aside-card">
          <h2>Quick links</h2>
          <ul>
            <li><a href="/man-and-van/">Man and van London</a></li>
            <li><a href="/house-removals/">House removals</a></li>
            <li><a href="/two-man-delivery/">Two man delivery prices</a></li>
            <li><a href="/guides/book-man-and-van/">How to book</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
  <section class="section section-light">
    <div class="wrap">
      <p class="eyebrow">FAQ</p>
      <h2 class="svc-faq-title">Pricing questions</h2>
      <div class="faq" style="margin-top:24px">
        <details><summary>How much does a man and van cost in London?</summary><p>Prices depend on distance, volume, access, crew size and timing. We quote a clear fixed price for your job.</p></details>
        <details><summary>How is house removal cost calculated?</summary><p>Volume, floors, access and mileage. Share details for a tailored house removal quote.</p></details>
        <details><summary>Do you offer an hourly rate?</summary><p>Most jobs are fixed-price. Hourly options can be discussed for open-ended local work.</p></details>
      </div>
    </div>
  </section>`;
  fs.mkdirSync(path.join(root, "pricing"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "pricing", "index.html"),
    shell({ title, desc, url, img: "assets/van-load.jpg", schema, body })
  );
  console.log("wrote pricing/");
}

// --- Guides index + 2 guides ---
{
  const guides = [
    {
      slug: "book-man-and-van",
      title: "How to Book a Man and Van Online | DropShift",
      h1: "How to book a man and van online",
      desc: "Book a man and van online in minutes — what details to send for an instant quote, same-day options and two-man teams in London.",
      eyebrow: "Guide",
      lede: "A simple checklist so you get a fast, accurate man and van quote first time.",
      sections: [
        ["1. Share both addresses", "Collection and delivery postcodes (or full addresses) let us price mileage and London congestion correctly."],
        ["2. Describe the load", "List main items — sofa, wardrobe, boxes, pallets — or send WhatsApp photos. Mention floors and lift access."],
        ["3. Choose timing", "Preferred date, or ask for same-day / urgent man and van if you need it quickly."],
        ["4. Confirm crew", "One driver or man and van with two men for stairs and heavy furniture."],
        ["5. Get your quote", "Use the online form, call or WhatsApp +44 7353 086191. We reply with a clear price."],
      ],
    },
    {
      slug: "house-removal-checklist",
      title: "House Removal Checklist UK | DropShift Transport",
      h1: "House removal checklist",
      desc: "House removal checklist for London moves — packing, parking, utilities and booking your removal company.",
      eyebrow: "Guide",
      lede: "Use this checklist before moving day so your house removals run smoothly.",
      sections: [
        ["Declutter early", "Sell or donate items you will not move — smaller volume means a lower house removal cost."],
        ["Pack room by room", "Label boxes clearly. Keep essentials (kettle, chargers, documents) in a separate day bag."],
        ["Measure big items", "Sofas, beds and fridges — note stairs and door widths so we plan two-man delivery if needed."],
        ["Book parking / permits", "Arrange loading space at both addresses where possible, especially in East London."],
        ["Confirm utilities & keys", "Meter readings, broadband, and key handover times synced with your removal slot."],
        ["Book DropShift", "Send your house removal quote request with dates and a rough inventory — we confirm crew and van size."],
      ],
    },
  ];

  const url = "https://dropshift.co.uk/guides/";
  const cards = guides
    .map(
      (g) =>
        `<li><a href="/guides/${g.slug}/"><strong>${esc(g.h1)}</strong><span>${esc(g.desc)}</span></a></li>`
    )
    .join("\n          ");
  fs.mkdirSync(path.join(root, "guides"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "guides", "index.html"),
    shell({
      title: "Removal & Man and Van Guides | DropShift",
      desc: "Practical guides for booking a man and van, house removals and furniture delivery in London and the UK.",
      url,
      img: "assets/carry-boxes.jpg",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "DropShift guides",
        url,
      },
      body: `${hero({
        eyebrow: "Guides",
        h1: "Tips for smoother moves",
        lede: "Short practical guides for man and van bookings and house removals.",
        img: "assets/carry-boxes.jpg",
      })}
  <section class="section"><div class="wrap"><ul class="area-index">${cards}</ul></div></section>`,
    })
  );
  console.log("wrote guides/");

  for (const g of guides) {
    const gUrl = `https://dropshift.co.uk/guides/${g.slug}/`;
    const blocks = g.sections
      .map(
        ([t, p]) =>
          `<div class="guide-block"><h2>${esc(t)}</h2><p>${esc(p)}</p></div>`
      )
      .join("\n        ");
    const body = `${hero({
      eyebrow: g.eyebrow,
      h1: g.h1,
      lede: g.lede,
      img: "assets/carry-boxes.jpg",
    })}
  <section class="section">
    <div class="wrap svc-grid">
      <div class="svc-prose">
        ${blocks}
        <div class="hero-actions" style="margin-top:28px">
          <a class="btn btn-accent" href="/#quote">Get a free quote</a>
          <a class="btn btn-ghost" href="/pricing/">See pricing guide</a>
        </div>
      </div>
      <aside class="svc-aside">
        <div class="svc-aside-card">
          <h2>More help</h2>
          <ul>
            <li><a href="/guides/">All guides</a></li>
            <li><a href="/man-and-van/">Man and van</a></li>
            <li><a href="/house-removals/">House removals</a></li>
            <li><a href="/areas/">East London areas</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>`;
    const dir = path.join(root, "guides", g.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "index.html"),
      shell({
        title: g.title,
        desc: g.desc,
        url: gUrl,
        img: "assets/carry-boxes.jpg",
        schema: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.h1,
          description: g.desc,
          author: { "@type": "Organization", name: "DropShift Transport" },
          publisher: { "@id": "https://dropshift.co.uk/#business" },
          mainEntityOfPage: gUrl,
        },
        body,
      })
    );
    console.log("wrote guides/" + g.slug);
  }
}

// --- 404 ---
fs.writeFileSync(
  path.join(root, "404.html"),
  `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | DropShift Transport</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#0A2463">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body class="svc-page">
<header class="site-header is-solid">
  <div class="header-inner">
    <a class="brand" href="/"><img src="/assets/logo.webp" alt="DropShift Transport" width="183" height="44"></a>
    <a class="btn btn-accent" href="/#quote">Get a free quote</a>
  </div>
</header>
<main class="section" style="padding-top:calc(var(--header-h) + 48px)">
  <div class="wrap" style="max-width:640px">
    <p class="eyebrow">404</p>
    <h1 style="font-style:italic;font-size:clamp(2.4rem,6vw,3.6rem);margin:8px 0 16px">This page has moved on.</h1>
    <p class="lede">The link may be outdated. Try one of these instead:</p>
    <ul class="svc-list" style="margin-top:20px">
      <li><a href="/">Home</a></li>
      <li><a href="/man-and-van/">Man and van London</a></li>
      <li><a href="/house-removals/">House removals</a></li>
      <li><a href="/pricing/">Pricing guide</a></li>
      <li><a href="/areas/">East London areas</a></li>
      <li><a href="/#quote">Get a quote</a></li>
    </ul>
  </div>
</main>
</body>
</html>
`
);
console.log("wrote 404.html");

// --- Sitemap ---
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
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
console.log("sitemap urls:", urls.length);
