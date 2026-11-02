# -*- coding: utf-8 -*-
from pathlib import Path
import re

root = Path(".")
pages = []
for p in root.rglob("*.html"):
    if ".git" in p.parts:
        continue
    t = p.read_text(encoding="utf-8", errors="ignore")
    robots_m = re.search(r'name=["\']robots["\']\s+content=["\']([^"\']+)["\']', t, re.I)
    canon_m = re.search(r'rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', t, re.I)
    title_m = re.search(r"<title>([^<]+)</title>", t, re.I)
    pages.append(
        {
            "path": p.as_posix(),
            "robots": robots_m.group(1) if robots_m else "NONE",
            "canonical": canon_m.group(1) if canon_m else "NONE",
            "title": title_m.group(1) if title_m else "",
        }
    )

sm = Path("sitemap.xml").read_text(encoding="utf-8")
locs = re.findall(r"<loc>([^<]+)</loc>", sm)
loc_norm = {u.rstrip("/") for u in locs}

print("PAGE | ROBOTS | CANONICAL")
missing = []
for pg in sorted(pages, key=lambda x: x["path"]):
    flag = "!" if "noindex" in pg["robots"].lower() else " "
    print(f"{flag} {pg['path']} | {pg['robots']} | {pg['canonical']}")
    can = pg["canonical"]
    if can.startswith("http") and "noindex" not in pg["robots"].lower():
        if can.rstrip("/") not in loc_norm:
            missing.append(can)

print("\nSITEMAP COUNT", len(locs))
print("MISSING FROM SITEMAP", len(missing))
for m in missing:
    print(" ", m)
