/**
 * DropShift quote calculator
 * Total = max(M, (T_L + T_U + T_D + T_S + T_P + T_A) × R + D × C + H + E + F)
 *
 * Price is calculated for the DropShift team only (emailed on form submit).
 * Customers never see £ amounts on this page.
 */
(function () {
  var RATES = {
    M: 85,
    C: 1.6,
    avgMph: 18,
    floorHours: 0.35,
    liftFactor: 0.45,
    parking: { easy: 0.15, ok: 0.35, hard: 0.7 },
    heavy: { fridge: 25, safe: 70, other: 35 },
    congestion: 17.5,
    parkingFee: 12,
    extraStop: 40,
    /* Provisional one-way miles for internal ballpark only — customer is not asked */
    defaultMiles: 12,
    crews: {
      luton1: { label: "Luton van · 1 mover", R: 48 },
      luton2: { label: "Luton van · 2 movers", R: 68 },
    },
    loads: {
      few: { label: "Few items", L: 0.5, U: 0.4 },
      studio: { label: "Studio", L: 1.4, U: 1.1 },
      bed1: { label: "1-bed", L: 2.4, U: 2.0 },
      bed2: { label: "2-bed", L: 3.6, U: 3.0 },
      bed3: { label: "3-bed+", L: 5.2, U: 4.4 },
      commercial: { label: "Small commercial", L: 2.2, U: 1.8 },
    },
  };

  var form = document.getElementById("iqForm");
  var statusEl = document.getElementById("iqPrice");
  var rangeEl = document.getElementById("iqRange");
  var breakEl = document.getElementById("iqBreakdown");
  var minEl = document.getElementById("iqMinNote");
  var bookBtn = document.getElementById("iqBook");
  var waBtn = document.getElementById("iqWhatsApp");
  if (!form || !statusEl) return;

  function money(n) {
    return "£" + Math.round(n).toLocaleString("en-GB");
  }

  function hours(n) {
    return (Math.round(n * 10) / 10).toFixed(1) + " h";
  }

  function calc() {
    var crewKey = document.getElementById("iqCrew").value;
    var loadKey = document.getElementById("iqLoad").value;
    var milesOne = RATES.defaultMiles;
    var includeReturn = document.getElementById("iqReturn").value === "1";
    var floorsFrom = parseInt(document.getElementById("iqFloorsFrom").value, 10) || 0;
    var floorsTo = parseInt(document.getElementById("iqFloorsTo").value, 10) || 0;
    var hasLift = document.getElementById("iqLift").value === "1";
    var parkingKey = document.getElementById("iqParking").value;
    var assemble = parseFloat(document.getElementById("iqAssemble").value) || 0;

    var crew = RATES.crews[crewKey] || RATES.crews.luton2;
    var load = RATES.loads[loadKey] || RATES.loads.bed1;
    var R = crew.R;
    var M = RATES.M;
    var C = RATES.C;

    var T_L = load.L;
    var T_U = load.U;
    var D = includeReturn ? milesOne * 2 : milesOne;
    var T_D = D / RATES.avgMph;

    var stairFloors = floorsFrom + floorsTo;
    var T_S = stairFloors * RATES.floorHours;
    if (hasLift && stairFloors > 0) T_S *= RATES.liftFactor;

    var T_P = RATES.parking[parkingKey] || RATES.parking.easy;
    var T_A = assemble;

    var hoursTotal = T_L + T_U + T_D + T_S + T_P + T_A;
    var labour = hoursTotal * R;
    var mileage = D * C;

    var H = 0;
    var heavyLabels = [];
    form.querySelectorAll('input[name="iqHeavy"]:checked').forEach(function (cb) {
      var v = cb.value;
      H += RATES.heavy[v] || 0;
      heavyLabels.push(v);
    });

    var E = 0;
    if (document.getElementById("iqCongestion").checked) E += RATES.congestion;
    if (document.getElementById("iqParkingFee").checked) E += RATES.parkingFee;

    var F = 0;
    if (document.getElementById("iqExtraStop").checked) F += RATES.extraStop;

    var raw = labour + mileage + H + E + F;
    var total = Math.max(M, raw);
    var minApplied = total > raw - 0.01 && raw < M;

    return {
      total: total,
      raw: raw,
      minApplied: minApplied,
      M: M,
      R: R,
      C: C,
      D: D,
      T_L: T_L,
      T_U: T_U,
      T_D: T_D,
      T_S: T_S,
      T_P: T_P,
      T_A: T_A,
      hoursTotal: hoursTotal,
      labour: labour,
      mileage: mileage,
      H: H,
      E: E,
      F: F,
      crewLabel: crew.label,
      loadLabel: load.label,
      milesOne: milesOne,
      includeReturn: includeReturn,
      heavyLabels: heavyLabels,
      floorsFrom: floorsFrom,
      floorsTo: floorsTo,
      hasLift: hasLift,
      parkingKey: parkingKey,
      assemble: assemble,
    };
  }

  function publicSummary(q) {
    return (
      "Quote request — " +
      q.crewLabel +
      ", " +
      q.loadLabel +
      (q.includeReturn ? ", return journey" : ", one way") +
      ". Please call with a fixed price (confirm miles from postcodes)."
    );
  }

  function internalSummary(q) {
    var parts = [
      "INTERNAL ESTIMATE " + money(q.total),
      q.crewLabel + " · " + q.loadLabel,
      "Provisional ~" +
        q.milesOne +
        " mi one way" +
        (q.includeReturn ? " (return included)" : " (one way)") +
        " — confirm from collection/delivery postcodes",
      "Time ~" + hours(q.hoursTotal) + " @ " + money(q.R) + "/h",
      "Labour " + money(q.labour) + " · Travel " + money(q.mileage),
    ];
    if (q.H > 0) parts.push("Heavy " + money(q.H) + " (" + q.heavyLabels.join(", ") + ")");
    if (q.E > 0) parts.push("Fees " + money(q.E));
    if (q.F > 0) parts.push("Extra stop " + money(q.F));
    if (q.minApplied) parts.push("Minimum " + money(q.M) + " applied");
    parts.push(
      "Floors " +
        q.floorsFrom +
        "→" +
        q.floorsTo +
        (q.hasLift ? " (lift)" : " (stairs)") +
        " · parking " +
        q.parkingKey
    );
    parts.push("Do not show this figure to the customer — call with a fixed quote.");
    return parts.join(" | ");
  }

  function render() {
    var q = calc();
    var pub = publicSummary(q);
    var internal = internalSummary(q);

    statusEl.textContent = "We'll call you";
    rangeEl.textContent = q.crewLabel + " · " + q.loadLabel;

    breakEl.innerHTML = [
      "<li><span>Job type</span><strong>" + q.loadLabel + "</strong></li>",
      "<li><span>Crew</span><strong>" + q.crewLabel + "</strong></li>",
      "<li><span>Journey</span><strong>" + (q.includeReturn ? "Return included" : "One way") + "</strong></li>",
      "<li><span>Next step</span><strong>Fixed quote by phone</strong></li>",
    ].join("");

    minEl.textContent =
      "Send your details below — we calculate the price internally and call you with a fixed quote. No online price shown.";

    if (bookBtn) {
      bookBtn.dataset.publicSummary = pub;
    }
    if (waBtn) {
      waBtn.href =
        "https://wa.me/447353086191?text=" +
        encodeURIComponent(
          "Hi DropShift — I'd like a quote. " +
            q.crewLabel +
            ", " +
            q.loadLabel +
            ". Please call me with a price."
        );
    }

    window.__dropshiftPublicSummary = pub;
    window.__dropshiftInternalQuote = internal;
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);

  function applyPreset(el) {
    var load = el.getAttribute("data-iq-load");
    var crew = el.getAttribute("data-iq-crew");
    var loadEl = document.getElementById("iqLoad");
    var crewEl = document.getElementById("iqCrew");
    if (load && loadEl) loadEl.value = load;
    if (crew && crewEl) crewEl.value = crew;
    render();
  }

  document.querySelectorAll("[data-iq-load]").forEach(function (el) {
    el.addEventListener("click", function () {
      applyPreset(el);
    });
  });

  if (bookBtn) {
    bookBtn.addEventListener("click", function () {
      var details = document.getElementById("details");
      var service = document.getElementById("service");
      var summary = bookBtn.dataset.publicSummary || window.__dropshiftPublicSummary || "";
      if (details && summary) {
        var existing = details.value.trim();
        if (existing.indexOf("Quote request —") === -1 && existing.indexOf("Instant estimate") === -1) {
          details.value = existing ? existing + "\n\n" + summary : summary;
        } else {
          details.value =
            summary +
            (existing.indexOf("\n\n") > -1
              ? "\n\n" + existing.split("\n\n").slice(1).join("\n\n")
              : "");
        }
      }
      if (service) {
        for (var i = 0; i < service.options.length; i++) {
          if (/man and van/i.test(service.options[i].text)) {
            service.selectedIndex = i;
            break;
          }
        }
      }
    });
  }

  render();
})();
