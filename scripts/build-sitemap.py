# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import date

today = date.today().isoformat()
urls = [
    ("https://dropshift.co.uk/", "1.0", "weekly"),
    ("https://dropshift.co.uk/get-a-quote/", "0.9", "weekly"),
    ("https://dropshift.co.uk/man-and-van/", "0.9", "weekly"),
    ("https://dropshift.co.uk/house-removals/", "0.85", "weekly"),
    ("https://dropshift.co.uk/furniture-delivery/", "0.85", "weekly"),
    ("https://dropshift.co.uk/sofa-delivery/", "0.8", "weekly"),
    ("https://dropshift.co.uk/two-man-delivery/", "0.8", "weekly"),
    ("https://dropshift.co.uk/white-glove-delivery/", "0.75", "weekly"),
    ("https://dropshift.co.uk/same-day-courier/", "0.8", "weekly"),
    ("https://dropshift.co.uk/office-removals/", "0.8", "weekly"),
    ("https://dropshift.co.uk/pallet-delivery/", "0.8", "weekly"),
    ("https://dropshift.co.uk/specialist-transport/", "0.75", "weekly"),
    ("https://dropshift.co.uk/pricing/", "0.9", "weekly"),
    ("https://dropshift.co.uk/areas/", "0.85", "weekly"),
    ("https://dropshift.co.uk/areas/hackney/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/stratford/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/ilford/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/canary-wharf/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/walthamstow/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/romford/", "0.75", "weekly"),
    ("https://dropshift.co.uk/areas/bow/", "0.75", "weekly"),
    ("https://dropshift.co.uk/guides/", "0.7", "weekly"),
    ("https://dropshift.co.uk/guides/book-man-and-van/", "0.7", "monthly"),
    ("https://dropshift.co.uk/guides/house-removal-checklist/", "0.7", "monthly"),
    ("https://dropshift.co.uk/near-me/", "0.9", "weekly"),
    ("https://dropshift.co.uk/citations/", "0.8", "weekly"),
    ("https://dropshift.co.uk/google-listing/", "0.5", "monthly"),
    ("https://dropshift.co.uk/privacy.html", "0.3", "yearly"),
]

lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, pri, freq in urls:
    lines += [
        "  <url>",
        f"    <loc>{loc}</loc>",
        f"    <lastmod>{today}</lastmod>",
        f"    <changefreq>{freq}</changefreq>",
        f"    <priority>{pri}</priority>",
        "  </url>",
    ]
lines.append("</urlset>")
Path("sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("sitemap urls", len(urls))
