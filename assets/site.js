(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer:fine)").matches;

  /* ---------- Year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById("preloader");
  var countEl = document.getElementById("preCount");
  var barEl = document.querySelector(".preloader-bar > i");
  function finishPreloader() {
    if (!preloader) return;
    preloader.classList.add("is-done");
    setTimeout(function () {
      preloader.setAttribute("aria-hidden", "true");
    }, 1200);
  }
  if (preloader && !reduce) {
    var n = 0;
    var tick = setInterval(function () {
      n += Math.floor(Math.random() * 7) + 3;
      if (n >= 100) {
        n = 100;
        clearInterval(tick);
        if (countEl) countEl.textContent = "100";
        if (barEl) barEl.style.width = "100%";
        setTimeout(finishPreloader, 280);
      } else {
        if (countEl) countEl.textContent = String(n);
        if (barEl) barEl.style.width = n + "%";
      }
    }, 40);
  } else {
    finishPreloader();
  }

  /* ---------- Nav ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", o);
      menuBtn.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Header hide / show ---------- */
  var header = document.querySelector(".site-header");
  var lastY = 0;
  function onHeaderScroll() {
    var y = window.scrollY || 0;
    if (!header) return;
    header.classList.toggle("is-scrolled", y > 40);
    if (y > 160) header.classList.toggle("is-hidden", y > lastY);
    else header.classList.remove("is-hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------- Contact modal ---------- */
  var modal = document.getElementById("contactModal");
  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
  document.querySelectorAll("[data-open-contact]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });
  document.querySelectorAll("[data-close-contact]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Hero service cycler ---------- */
  var services = [
    "Commercial & warehouse logistics",
    "Office, corporate & IT relocations",
    "Furniture & residential removals",
    "Specialist commercial deliveries",
  ];
  var cyclerLabel = document.getElementById("cyclerLabel");
  var cyclerCount = document.getElementById("cyclerCount");
  var ci = 0;
  function setCycler(i) {
    ci = i % services.length;
    if (cyclerCount) cyclerCount.textContent = String(ci + 1).padStart(2, "0") + " / 04";
    if (cyclerLabel) {
      cyclerLabel.style.opacity = "0";
      setTimeout(function () {
        cyclerLabel.textContent = services[ci];
        cyclerLabel.style.opacity = "1";
      }, 220);
    }
  }
  setCycler(0);
  if (!reduce) setInterval(function () { setCycler(ci + 1); }, 3200);

  /* ---------- Services expand ---------- */
  document.querySelectorAll(".svc-row").forEach(function (row) {
    var btn = row.querySelector(".svc-row-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = row.classList.contains("is-open");
      document.querySelectorAll(".svc-row.is-open").forEach(function (r) {
        if (r !== row) {
          r.classList.remove("is-open");
          var b = r.querySelector(".svc-row-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
      row.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ---------- Biz types ---------- */
  var biz = [
    "Warehouses and distribution centres",
    "Logistics and fulfilment companies",
    "Retailers and wholesalers",
    "E-commerce businesses",
    "Furniture suppliers and retailers",
    "IT and technology companies",
    "Corporate offices",
    "Commercial property businesses",
    "Event and exhibition companies",
    "Professional service providers",
  ];
  var bizEl = document.getElementById("bizTypes");
  if (bizEl) {
    bizEl.innerHTML = biz
      .map(function (b) {
        return "<div><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12l5 5L20 7'/></svg>" + b + "</div>";
      })
      .join("");
  }

  /* ---------- Reviews crossfade ---------- */
  var slides = [].slice.call(document.querySelectorAll(".review-slide"));
  var ri = 0;
  function setReview(i) {
    slides.forEach(function (s, j) {
      s.classList.toggle("is-active", j === i);
    });
  }
  if (slides.length) {
    setReview(0);
    if (!reduce) {
      setInterval(function () {
        ri = (ri + 1) % slides.length;
        setReview(ri);
      }, 4500);
    }
  }

  /* ---------- Gallery drag ---------- */
  var gallery = document.getElementById("workGallery");
  if (gallery) {
    var down = false, startX = 0, scrollL = 0;
    gallery.addEventListener("pointerdown", function (e) {
      down = true;
      startX = e.pageX;
      scrollL = gallery.scrollLeft;
      gallery.setPointerCapture(e.pointerId);
    });
    gallery.addEventListener("pointermove", function (e) {
      if (!down) return;
      gallery.scrollLeft = scrollL - (e.pageX - startX);
    });
    gallery.addEventListener("pointerup", function () { down = false; });
    gallery.addEventListener("pointerleave", function () { down = false; });
  }

  /* ---------- Toast ---------- */
  var toastHost = document.getElementById("toastHost");
  function showToast(title, msg, type) {
    if (!toastHost) return;
    var el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " is-error" : "");
    el.setAttribute("role", "status");
    el.innerHTML =
      '<div class="toast-icon" aria-hidden="true">' +
      (type === "error" ? "!" : "✓") +
      "</div><div><div class=\"toast-title\">" +
      title +
      '</div><div class="toast-msg">' +
      msg +
      '</div></div><button type="button" class="toast-close" aria-label="Dismiss">×</button>';
    toastHost.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("is-in");
    });
    var close = function () {
      el.classList.add("is-out");
      el.classList.remove("is-in");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 400);
    };
    el.querySelector(".toast-close").addEventListener("click", close);
    setTimeout(close, type === "error" ? 7000 : 5500);
  }

  /* ---------- Multi-step quote → Brevo HTML email + toast ---------- */
  var form = document.getElementById("quoteForm");
  var steps = [].slice.call(document.querySelectorAll(".form-step"));
  var pills = [].slice.call(document.querySelectorAll("[data-step-pill]"));
  var step = 0;
  var err = document.getElementById("formError");
  /* Injected at deploy from GitHub Actions secret BREVO_API_KEY; override locally via window.DROPSHIFT_BREVO_KEY */
  var BREVO_API_KEY = window.DROPSHIFT_BREVO_KEY || "__BREVO_API_KEY__";
  var BREVO_URL = "https://api.brevo.com/v3/smtp/email";
  var QUOTE_TO = "contact@dropshift.co.uk";

  function escHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildQuoteEmail(f) {
    var when = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });
    var phoneHref = "tel:" + encodeURIComponent(f.phone.replace(/\s/g, ""));
    var wa =
      "https://wa.me/447353086191?text=" +
      encodeURIComponent("Hi DropShift — following up on quote from " + f.name);
    function row(label, value) {
      if (!value) return "";
      return (
        '<tr><td style="padding:10px 0;border-bottom:1px solid #E8E5DE;width:38%;font-size:13px;color:#5C5A55">' +
        escHtml(label) +
        '</td><td style="padding:10px 0;border-bottom:1px solid #E8E5DE;font-size:15px;color:#121214;font-weight:700">' +
        escHtml(value) +
        "</td></tr>"
      );
    }
    var details = f.details
      ? '<tr><td style="padding:0 28px 24px"><div style="background:#F2F0EB;border:1px solid #D9D4C8;padding:16px 18px"><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#5C5A55;font-weight:700;margin-bottom:8px">Job details</div><div style="font-size:15px;line-height:1.55;color:#121214">' +
        escHtml(f.details).replace(/\n/g, "<br>") +
        "</div></div></td></tr>"
      : "";
    var html =
      '<!DOCTYPE html><html><body style="margin:0;background:#E8E5DE;font-family:Arial,Helvetica,sans-serif">' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center">' +
      '<table width="100%" style="max-width:600px;background:#fff;border:1px solid #D9D4C8">' +
      '<tr><td style="background:#0B0B0C;padding:22px 28px;border-bottom:3px solid #C2A06B">' +
      '<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C2A06B;font-weight:700">DropShift Transport</div>' +
      '<div style="font-size:24px;font-weight:700;color:#F2F0EB;margin-top:8px">New quote request</div></td></tr>' +
      '<tr><td style="padding:20px 28px 8px;color:#5C5A55;font-size:14px">Submitted ' +
      escHtml(when) +
      " (London)</td></tr>" +
      '<tr><td style="padding:8px 28px"><table width="100%" style="background:#121214"><tr>' +
      '<td style="padding:16px;width:44%"><div style="color:#C2A06B;font-size:10px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Collection</div><div style="color:#F2F0EB;font-weight:700">' +
      escHtml(f.from) +
      "</div></td>" +
      '<td align="center" style="color:#C2A06B;width:12%">→</td>' +
      '<td style="padding:16px;width:44%"><div style="color:#C2A06B;font-size:10px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Delivery</div><div style="color:#F2F0EB;font-weight:700">' +
      escHtml(f.to) +
      "</div></td></tr></table></td></tr>" +
      '<tr><td style="padding:12px 28px"><table width="100%">' +
      row("Name", f.name) +
      row("Phone", f.phone) +
      row("Company", f.company) +
      row("Service", f.service) +
      row("Preferred date", f.date) +
      row("Frequency", f.freq) +
      "</table></td></tr>" +
      details +
      '<tr><td style="padding:8px 28px 28px" align="center">' +
      '<a href="' +
      escHtml(phoneHref) +
      '" style="display:inline-block;background:#C2A06B;color:#0B0B0C;text-decoration:none;font-weight:700;padding:14px 22px;margin:4px">Call customer</a>' +
      '<a href="' +
      escHtml(wa) +
      '" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;margin:4px">WhatsApp</a></td></tr>' +
      '<tr><td style="background:#0B0B0C;padding:18px 28px;border-top:3px solid #C2A06B;color:rgba(242,240,235,.62);font-size:12px">' +
      '<div style="color:#F2F0EB;font-weight:700">DropShift Transport</div>East London · Nationwide UK · contact@dropshift.co.uk · +44 7353 086191</td></tr>' +
      "</table></td></tr></table></body></html>";
    var text = [
      "DROPSHIFT TRANSPORT — New quote",
      "Submitted: " + when + " (London)",
      "Name: " + f.name,
      "Phone: " + f.phone,
      f.company ? "Company: " + f.company : null,
      "Service: " + (f.service || "—"),
      "Collection: " + f.from,
      "Delivery: " + f.to,
      f.date ? "Date: " + f.date : null,
      "Frequency: " + (f.freq || "—"),
      f.details ? "Details: " + f.details : null,
    ]
      .filter(Boolean)
      .join("\n");
    return { html: html, text: text };
  }

  function showStep(i) {
    step = i;
    steps.forEach(function (s, j) {
      s.classList.toggle("is-on", j === i);
    });
    pills.forEach(function (d, j) {
      d.classList.toggle("is-on", j === i);
      d.classList.toggle("is-done", j < i);
    });
  }
  showStep(0);

  document.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (step === 0) {
        var name = document.getElementById("name");
        var phone = document.getElementById("phone");
        var bad = false;
        [name, phone].forEach(function (f) {
          var ok = f.value.trim() !== "";
          f.setAttribute("aria-invalid", !ok);
          if (!ok) bad = true;
        });
        if (bad) {
          err.textContent = "Add your name and phone number to continue.";
          err.classList.add("show");
          return;
        }
        err.classList.remove("show");
      }
      if (step === 1) {
        var from = document.getElementById("from");
        var to = document.getElementById("to");
        var bad2 = false;
        [from, to].forEach(function (f) {
          var ok = f.value.trim() !== "";
          f.setAttribute("aria-invalid", !ok);
          if (!ok) bad2 = true;
        });
        if (bad2) {
          err.textContent = "Add collection and delivery locations.";
          err.classList.add("show");
          return;
        }
        err.classList.remove("show");
      }
      showStep(Math.min(step + 1, steps.length - 1));
    });
  });
  document.querySelectorAll("[data-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      err.classList.remove("show");
      showStep(Math.max(step - 1, 0));
    });
  });

  document.querySelectorAll("[data-service]").forEach(function (a) {
    a.addEventListener("click", function () {
      var s = document.getElementById("service");
      var v = a.getAttribute("data-service");
      if (!s || !v) return;
      for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].text.indexOf(v.slice(0, 12)) === 0) {
          s.selectedIndex = i;
          break;
        }
      }
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (document.getElementById("website").value) return;
      var v = function (id) {
        return document.getElementById(id).value.trim();
      };
      var req = ["name", "phone", "from", "to"];
      var missing = false;
      req.forEach(function (id) {
        var f = document.getElementById(id);
        var ok = f.value.trim() !== "";
        f.setAttribute("aria-invalid", !ok);
        if (!ok) missing = true;
      });
      if (missing) {
        err.textContent = "Please complete all required fields.";
        err.classList.add("show");
        showStep(0);
        showToast("Missing details", "Please complete the required fields and try again.", "error");
        return;
      }
      err.classList.remove("show");
      var payload = {
        name: v("name"),
        phone: v("phone"),
        company: v("company"),
        service: v("service"),
        from: v("from"),
        to: v("to"),
        date: v("date"),
        freq: v("freq"),
        details: v("details"),
      };
      var submitBtn = document.getElementById("quoteSubmit");
      var prevHtml = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.classList.add("is-loading");
        submitBtn.textContent = "Sending…";
      }

      var mail = buildQuoteEmail(payload);
      var subject =
        "New quote — " +
        payload.name +
        (payload.company ? " / " + payload.company : "") +
        " · " +
        payload.from +
        " → " +
        payload.to;

      fetch(BREVO_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "DropShift Transport", email: QUOTE_TO },
          to: [{ email: QUOTE_TO }],
          replyTo: { email: QUOTE_TO, name: "DropShift Transport" },
          subject: subject,
          htmlContent: mail.html,
          textContent: mail.text,
          tags: ["website-quote"],
        }),
      })
        .then(function (r) {
          if (!r.ok) throw new Error("brevo " + r.status);
          form.reset();
          showStep(0);
          showToast(
            "Quote request sent",
            "Thanks " +
              payload.name.split(" ")[0] +
              " — we’ve emailed the DropShift team. We’ll get back to you shortly."
          );
        })
        .catch(function () {
          showToast(
            "Couldn’t send just now",
            "Please try again, or call / WhatsApp +44 7353 086191 and we’ll help straight away.",
            "error"
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.classList.remove("is-loading");
            submitBtn.innerHTML = prevHtml;
          }
        });
    });
  }

  /* ---------- Coverage map ---------- */
  var cities = [
    ["Birmingham", 52.49, -1.89],
    ["Manchester", 53.48, -2.24],
    ["Liverpool", 53.41, -2.98],
    ["Leeds", 53.8, -1.55],
    ["Sheffield", 53.38, -1.47],
    ["Nottingham", 52.95, -1.15],
    ["Leicester", 52.64, -1.13],
    ["Coventry", 52.41, -1.51],
    ["Bristol", 51.45, -2.59],
    ["Oxford", 51.75, -1.26],
    ["Cambridge", 52.21, 0.12],
    ["Southampton", 50.9, -1.4],
    ["Cardiff", 51.48, -3.18],
    ["Newcastle", 54.98, -1.61],
    ["Edinburgh", 55.95, -3.19],
    ["Glasgow", 55.86, -4.25],
  ];
  var hub = [51.5048, 0.0489];
  function proj(lat, lon) {
    return [40 + (lon + 4.5) * 70, 40 + (56.2 - lat) * 90];
  }
  var NS = "http://www.w3.org/2000/svg";
  var map = document.getElementById("ukMap");
  var arcs = [];
  var cityEls = [];
  var mover;
  var moverT = 0;
  var active = -1;
  var listBtns = [];

  if (map) {
    function el(n, a) {
      var e = document.createElementNS(NS, n);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }
    var dots = el("g", {});
    for (var gx = 12; gx < 420; gx += 16)
      for (var gy = 12; gy < 560; gy += 16)
        dots.appendChild(el("circle", { cx: gx, cy: gy, r: 1.1, class: "grid-dot" }));
    map.appendChild(dots);
    var H = proj(hub[0], hub[1]);
    var arcsG = el("g", {});
    var citiesG = el("g", {});
    map.appendChild(arcsG);
    map.appendChild(citiesG);
    var labelLeft = { Liverpool: 1, Cardiff: 1, Birmingham: 1, Southampton: 1 };
    var labelTop = { Manchester: 1 };
    cities.forEach(function (c) {
      var P = proj(c[1], c[2]);
      var mx = (H[0] + P[0]) / 2;
      var my = (H[1] + P[1]) / 2;
      var dx = P[0] - H[0];
      var dy = P[1] - H[1];
      var len = Math.hypot(dx, dy) || 1;
      var bend = Math.min(60, len * 0.22);
      var qx = mx - (dy / len) * bend;
      var qy = my + (dx / len) * bend;
      var path = el("path", {
        d: "M" + H[0] + " " + H[1] + " Q" + qx + " " + qy + " " + P[0] + " " + P[1],
        class: "arc",
      });
      arcsG.appendChild(path);
      arcs.push(path);
      var g = el("g", { class: "city" });
      g.appendChild(el("circle", { cx: P[0], cy: P[1], r: 3.5 }));
      var left = labelLeft[c[0]];
      var top = labelTop[c[0]];
      var t = el(
        "text",
        top
          ? { x: P[0], y: P[1] - 10, "text-anchor": "middle" }
          : { x: P[0] + (left ? -8 : 8), y: P[1] + 4, "text-anchor": left ? "end" : "start" }
      );
      t.textContent = c[0];
      g.appendChild(t);
      citiesG.appendChild(g);
      cityEls.push(g);
    });
    var hubG = el("g", {});
    hubG.appendChild(el("circle", { cx: H[0], cy: H[1], r: 10, class: "hub-ring" }));
    hubG.appendChild(el("circle", { cx: H[0], cy: H[1], r: 5, fill: "#C2A06B" }));
    var ht = el("text", {
      x: H[0] - 10,
      y: H[1] + 22,
      "text-anchor": "end",
      fill: "#F2F0EB",
      style: "font:600 12px DM Sans,sans-serif",
    });
    ht.textContent = "East London";
    hubG.appendChild(ht);
    map.appendChild(hubG);
    mover = el("circle", { r: 4, fill: "#C2A06B", opacity: 0 });
    map.appendChild(mover);
    arcs.forEach(function (p) {
      var L = p.getTotalLength();
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = reduce ? 0 : L;
      p._len = L;
    });
    var list = document.getElementById("cityList");
    if (list) {
      cities.forEach(function (c, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = c[0];
        list.appendChild(b);
        ["mouseenter", "focus", "click"].forEach(function (ev) {
          b.addEventListener(ev, function () {
            setCity(i);
          });
        });
      });
      listBtns = [].slice.call(list.children);
    }
    function setCity(i) {
      active = i;
      moverT = 0;
      arcs.forEach(function (a, j) {
        a.classList.toggle("on", j === i);
      });
      cityEls.forEach(function (c, j) {
        c.classList.toggle("on", j === i);
      });
      listBtns.forEach(function (b, j) {
        b.classList.toggle("on", j === i);
      });
    }
    var mapDrawn = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting && !mapDrawn) {
              mapDrawn = true;
              arcs.forEach(function (p, i) {
                p.style.transition =
                  "stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1) " + i * 60 + "ms, stroke .2s";
                requestAnimationFrame(function () {
                  p.style.strokeDashoffset = 0;
                });
              });
              setTimeout(function () {
                if (active < 0) setCity(0);
              }, reduce ? 0 : 1400);
              if (!reduce) {
                setInterval(function () {
                  if (!document.hidden && list && !list.matches(":hover"))
                    setCity((active + 1) % cities.length);
                }, 3400);
              }
            }
          });
        },
        { threshold: 0.25 }
      ).observe(map);
    } else {
      arcs.forEach(function (p) {
        p.style.strokeDashoffset = 0;
      });
      setCity(0);
    }
    (function moveLoop() {
      if (active >= 0 && !reduce && mover) {
        moverT = Math.min(1, moverT + 0.016);
        var p = arcs[active];
        var pt = p.getPointAtLength(p._len * moverT);
        mover.setAttribute("cx", pt.x);
        mover.setAttribute("cy", pt.y);
        mover.setAttribute("opacity", moverT < 1 ? 1 : 0);
      }
      requestAnimationFrame(moveLoop);
    })();
  }

  /* ---------- GSAP / Lenis ---------- */
  function bootMotion() {
    if (typeof gsap === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    var LenisCtor = window.Lenis || (window.lenis && window.lenis.default);
    if (!reduce && typeof LenisCtor === "function") {
      var lenis = new LenisCtor({
        duration: 1.15,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    /* Split lines */
    document.querySelectorAll("[data-split]").forEach(function (el) {
      var text = el.textContent.trim();
      var lines = text.split(/\n/).filter(Boolean);
      if (lines.length <= 1) {
        var words = text.split(" ");
        var mid = Math.ceil(words.length / 2);
        lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")].filter(Boolean);
      }
      el.innerHTML = lines
        .map(function (l) {
          return '<span class="split-line"><span>' + l + "</span></span>";
        })
        .join("");
      if (!reduce) {
        gsap.to(el.querySelectorAll(".split-line > span"), {
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      } else {
        el.querySelectorAll(".split-line > span").forEach(function (s) {
          s.style.transform = "none";
        });
      }
    });

    /* Hero entrance */
    if (!reduce) {
      gsap.from(".hero-word", { y: 60, opacity: 0, duration: 1.3, ease: "expo.out", delay: 0.9 });
      gsap.from(".hero h1 .split-line > span", {
        y: "110%",
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.12,
        delay: 1.05,
      });
      gsap.from(".hero .lede, .hero-actions, .hero-cycler", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 1.35,
      });
      gsap.to(".hero-media img, .hero-media video", {
        scale: 1,
        duration: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    /* Reveals */
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (reduce) {
        el.classList.add("is-in");
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: function () {
          el.classList.add("is-in");
        },
      });
    });

    document.querySelectorAll(".why-card").forEach(function (card, i) {
      if (reduce) return;
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });

    document.querySelectorAll(".gallery figure").forEach(function (fig) {
      ScrollTrigger.create({
        trigger: fig,
        start: "top 90%",
        onEnter: function () {
          fig.classList.add("is-in");
        },
      });
    });

    /* How horizontal pin */
    var track = document.querySelector(".how-track");
    var pin = document.querySelector(".how-pin");
    var progress = document.querySelector(".how-progress > i");
    if (track && pin && !reduce && window.innerWidth > 900) {
      var getScroll = function () {
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };
      gsap.to(track, {
        x: function () {
          return -getScroll();
        },
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top+=76",
          end: function () {
            return "+=" + getScroll();
          },
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: function (self) {
            if (progress) progress.style.width = self.progress * 100 + "%";
          },
          invalidateOnRefresh: true,
        },
      });
    }

    /* Magnetic buttons */
    if (!reduce && fine) {
      document.querySelectorAll(".btn-accent, .btn-magnetic").forEach(function (btn) {
        btn.addEventListener("pointermove", function (e) {
          var r = btn.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          btn.style.transform = "translate(" + x * 8 + "px," + (y * 6 - 1) + "px)";
        });
        btn.addEventListener("pointerleave", function () {
          btn.style.transform = "";
        });
      });
    }

    /* Custom cursor disabled — system pointer stays visible */
    document.body.classList.remove("has-cursor");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(bootMotion, reduce ? 0 : 200);
    });
  } else {
    setTimeout(bootMotion, reduce ? 0 : 200);
  }
})();
