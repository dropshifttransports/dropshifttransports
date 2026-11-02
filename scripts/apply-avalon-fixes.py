# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path("index.html")
t2 = p.read_text(encoding="utf-8")

old_title = "Man and Van London | House Removals &amp; Furniture Delivery | DropShift"
new_title = "Man and Van London | Removals &amp; Delivery | DropShift"
plain = "Man and Van London | Removals & Delivery | DropShift"
print("title len", len(plain))
t2 = t2.replace(old_title, new_title)
t2 = t2.replace(
    "Man and Van London | House Removals & Furniture Delivery | DropShift",
    "Man and Van London | Removals & Delivery | DropShift",
)

t2 = t2.replace(
    "Yes. We are a fully insured removal company with goods-in-transit and public liability cover — amounts are available on request.",
    "Yes. We are fully insured: Goods in Transit cover from £10,000 to £50,000 and Public Liability from £1 million to £5 million.",
)
t2 = t2.replace(
    '<article class="why-card"><span class="num">04</span><h3>Fully insured</h3><p>Goods-in-transit and public liability cover. Cover amounts confirmed on your quote.</p></article>',
    '<article class="why-card"><span class="num">04</span><h3>Fully insured</h3><p>Goods in Transit £10k–£50k and Public Liability £1M–£5M — confirmed on your quote.</p></article>',
)
t2 = t2.replace(
    '<div class="spec-card"><strong>Load capacity</strong><span>Luton van dimensions and approximate capacity available on request.</span></div>',
    '<div class="spec-card"><strong>Load capacity</strong><span>Luton approx 4.0×2.0×2.2 m (14–18 m³), tail lift fitted.</span></div>',
)
t2 = t2.replace(
    '<div class="spec-card"><strong>Insurance</strong><span>Goods-in-transit and public liability cover — amounts available on request.</span></div>',
    '<div class="spec-card"><strong>Insurance</strong><span>Goods in Transit £10k–£50k · Public Liability £1M–£5M.</span></div>',
)
t2 = t2.replace(
    '<div class="feature-item"><span class="num">03</span><div><strong>Insured transport</strong><span>Goods-in-transit and public liability cover — amounts confirmed on your quote.</span></div></div>',
    '<div class="feature-item"><span class="num">03</span><div><strong>Insured transport</strong><span>Goods in Transit £10k–£50k · Public Liability £1M–£5M.</span></div></div>',
)
t2 = t2.replace(
    "<details><summary>Are you insured?</summary><p>Yes. We are a fully insured removal company with goods-in-transit and public liability cover. We’ll confirm cover amounts when we quote.</p></details>",
    "<details><summary>Are you insured?</summary><p>Yes. Goods in Transit cover from £10,000 to £50,000 and Public Liability from £1 million to £5 million — confirmed on your quote.</p></details>",
)

old_nap = """    <div class=\"local-pack-nap reveal\">
      <h3>DropShift Transport</h3>
      <p>East London · Nationwide UK</p>
      <p><a href=\"tel:+447353086191\">+44 7353 086191</a></p>
      <p><a href=\"mailto:contact@dropshift.co.uk\">contact@dropshift.co.uk</a></p>
      <p><a href=\"https://dropshift.co.uk/\">dropshift.co.uk</a></p>
    </div>"""
new_nap = """    <div class=\"local-pack-nap reveal\">
      <h3>DropShift Transport</h3>
      <p>East London service area · Nationwide UK</p>
      <p>Coverage: Stratford E15 · Canary Wharf E14 · Hackney E8 · Ilford IG1 · Walthamstow E17 · Bow E3</p>
      <p><a href=\"tel:+447353086191\">+44 7353 086191</a></p>
      <p><a href=\"mailto:contact@dropshift.co.uk\">contact@dropshift.co.uk</a></p>
      <p><a href=\"https://dropshift.co.uk/\">dropshift.co.uk</a></p>
      <p><a href=\"/citations/\">UK directory citations</a></p>
    </div>"""
t2 = t2.replace(old_nap, new_nap)

if '{ "@type": "City", "name": "Bow" }' not in t2:
    t2 = t2.replace(
        '{ "@type": "City", "name": "Romford" },',
        '{ "@type": "City", "name": "Romford" },\n        { "@type": "City", "name": "Bow" },',
    )

if '"makesOffer"' not in t2:
    t2 = t2.replace(
        '"priceRange": "££",',
        '''"priceRange": "££",
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Luton van · 1 mover",
          "priceCurrency": "GBP",
          "price": "48",
          "description": "Guide hourly rate for Luton van with 1 mover. Fixed quote confirmed for each job. Minimum booking from £85."
        },
        {
          "@type": "Offer",
          "name": "Luton van · 2 movers",
          "priceCurrency": "GBP",
          "price": "68",
          "description": "Guide hourly rate for Luton van with 2 movers. Fixed quote confirmed for each job."
        }
      ],''',
    )

marker = '<section class="iq-sec" id="instant-quote">'
aio_block = '''<section class="section section-light" id="guide-rates">
  <div class="wrap">
    <p class="eyebrow reveal">Guide rates &amp; fleet</p>
    <h2 class="reveal">Man and van prices</h2>
    <p class="lede reveal" style="margin-top:14px">Published guide rates for search and AI Overviews — your fixed price is confirmed when we know the load and route.</p>
    <table class="price-table reveal">
      <thead><tr><th>Crew</th><th>Guide rate</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Luton van · 1 mover</td><td><strong>From £48 / hour</strong></td><td>Local man and van London</td></tr>
        <tr><td>Luton van · 2 movers</td><td><strong>From £68 / hour</strong></td><td>Two-man delivery / heavier loads</td></tr>
        <tr><td>Minimum booking</td><td><strong>From £85</strong></td><td>Short local jobs</td></tr>
      </tbody>
    </table>
    <h3 class="svc-faq-title reveal">Luton van dimensions</h3>
    <table class="price-table reveal">
      <thead><tr><th>Spec</th><th>Approx</th></tr></thead>
      <tbody>
        <tr><td>Load length</td><td>4.0 m</td></tr>
        <tr><td>Load width</td><td>2.0 m</td></tr>
        <tr><td>Load height</td><td>2.2 m</td></tr>
        <tr><td>Volume</td><td>14–18 m³</td></tr>
        <tr><td>Equipment</td><td>Tail lift + pallet truck</td></tr>
      </tbody>
    </table>
    <h3 class="svc-faq-title reveal">Insurance</h3>
    <ul class="svc-list reveal">
      <li><strong>Goods in Transit:</strong> £10,000 to £50,000</li>
      <li><strong>Public Liability:</strong> £1 million to £5 million</li>
    </ul>
    <p class="reveal" style="margin-top:12px"><a href="/pricing/">Full pricing guide</a> · <a href="/citations/">UK directory citations</a></p>
  </div>
</section>

'''
if 'id="guide-rates"' not in t2:
    t2 = t2.replace(marker, aio_block + marker)

if 'id="chatLaunch" hidden' not in t2:
    t2 = t2.replace(
        '<button class="chat-launch" type="button" id="chatLaunch"',
        '<button class="chat-launch" type="button" id="chatLaunch" hidden',
    )


def picturize(html, rel):
    webp = rel.rsplit(".", 1)[0] + ".webp"
    if f'srcset="{webp}"' in html and f'src="{rel}"' in html:
        return html
    rx = re.compile(rf'<img([^>]*\ssrc="{re.escape(rel)}"[^>]*)/?>', re.I)

    def repl(m):
        inner = m.group(1)
        if "srcset" in inner:
            return m.group(0)
        return f'<picture><source srcset="{webp}" type="image/webp"><img{inner}></picture>'

    return rx.sub(repl, html)


for rel in [
    "assets/tail-lift-pallet.jpg",
    "assets/pack-bed.jpg",
    "assets/carry-boxes.jpg",
    "assets/van-load.jpg",
    "assets/hero-commercial.jpg",
    "assets/hallway-move.jpg",
    "assets/pack-kitchen.jpg",
    "assets/commercial-loading.jpg",
    "assets/van-interior-pallets.jpg",
    "assets/pallet-bay-load.jpg",
    "assets/hero-job.jpg",
    "assets/fleet-luton-lineup.jpg",
]:
    t2 = picturize(t2, rel)

# bump css/js cache on homepage
t2 = t2.replace("site.css?v=20261031c", "site.css?v=20261102a")
t2 = t2.replace("site.js?v=20261031f", "site.js?v=20261102a")
t2 = t2.replace("quote-calc.js?v=", "quote-calc.js?v=20261102a&amp;x=")  # leave if absent

p.write_text(t2, encoding="utf-8")
print("index ok", '"reviewCount": "21"' in t2, 'guide-rates' in t2, new_title in t2)
