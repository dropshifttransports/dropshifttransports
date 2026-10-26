/**
 * DropShift instant quotation
 * Total = max(M, (T_L + T_U + T_D + T_S + T_P + T_A) × R + D × C + H + E + F)
 *
 * Tune RATES below when the client confirms live numbers.
 */
(function () {
  var RATES = {
    M: 85,
    C: 1.6,
    avgMph: 18,
    floorHours: 0.35,
    liftFactor: 0.45,
    parking: { easy: 0.15, ok: 0.35, hard: 0.7 },
    heavy: { fridge: 25, piano: 90, safe: 70, other: 35 },
    congestion: 17.5,
    parkingFee: 12,
    extraStop: 40,
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
  var priceEl = document.getElementById("iqPrice");
  var rangeEl = document.getElementById("iqRange");
  var breakEl = document.getElementById("iqBreakdown");
  var minEl = document.getElementById("iqMinNote");
  var bookBtn = document.getElementById("iqBook");
  var waBtn = document.getElementById("iqWhatsApp");
  if (!form || !priceEl) return;

  function money(n) {
    return "£" + Math.round(n).toLocaleString("en-GB");
  }

  function hours(n) {
    return (Math.round(n * 10) / 10).toFixed(1) + " h";
  }

  function calc() {
    var crewKey = document.getElementById("iqCrew").value;
    var loadKey = document.getElementById("iqLoad").value;
    var milesOne = Math.max(1, parseFloat(document.getElementById("iqMiles").value) || 1);
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
    };
  }

  function render() {
    var q = calc();
    var low = Math.max(q.M, q.total * 0.92);
    var high = q.total * 1.08;

    priceEl.textContent = money(q.total);
    rangeEl.textContent =
      q.crewLabel + " · usual range " + money(low) + "–" + money(high);

    var rows = [
      ["Labour · " + hours(q.hoursTotal) + " @ " + money(q.R) + "/hr", q.labour],
      ["Mileage · " + Math.round(q.D) + " miles", q.mileage],
    ];
    if (q.H > 0) rows.push(["Heavy items", q.H]);
    if (q.E > 0) rows.push(["Congestion / parking fees", q.E]);
    if (q.F > 0) rows.push(["Extra stop", q.F]);
    if (q.minApplied) rows.push(["Minimum booking applied", q.M]);

    breakEl.innerHTML = rows
      .map(function (row) {
        return (
          "<li><span>" +
          row[0] +
          "</span><strong>" +
          money(row[1]) +
          "</strong></li>"
        );
      })
      .join("");

    minEl.textContent = q.minApplied
      ? "A minimum booking of " + money(q.M) + " applies to this job."
      : "Includes load, unload, drive time, access and mileage.";

    var summary =
      "Instant estimate " +
      money(q.total) +
      " (" +
      q.crewLabel +
      ", " +
      q.loadLabel +
      ", ~" +
      q.milesOne +
      " mi" +
      (q.includeReturn ? " + return" : "") +
      "). Time " +
      hours(q.hoursTotal) +
      " @ " +
      money(q.R) +
      "/h. Please confirm fixed quote.";

    if (bookBtn) {
      bookBtn.dataset.estimate = summary;
    }
    if (waBtn) {
      waBtn.href =
        "https://wa.me/447353086191?text=" + encodeURIComponent(summary);
    }

    window.__dropshiftEstimate = summary;
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);

  if (bookBtn) {
    bookBtn.addEventListener("click", function () {
      var details = document.getElementById("details");
      var service = document.getElementById("service");
      var summary = bookBtn.dataset.estimate || window.__dropshiftEstimate || "";
      if (details && summary) {
        var existing = details.value.trim();
        if (existing.indexOf("Instant estimate") === -1) {
          details.value = existing
            ? existing + "\n\n" + summary
            : summary;
        } else {
          details.value = summary + (existing.indexOf("\n\n") > -1 ? "\n\n" + existing.split("\n\n").slice(1).join("\n\n") : "");
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
