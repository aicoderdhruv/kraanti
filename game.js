/* Kraanti UI: screens, swipe handling, rendering. Game rules live in engine.js. */
(function () {
  var K = window.KRAANTI, E = K.engine;
  var $ = function (s) { return document.querySelector(s); };
  var screens = { title: $("#screen-title"), game: $("#screen-game"), end: $("#screen-end") };
  var card = $("#card"), btnL = $("#btn-left"), btnR = $("#btn-right");
  var THRESH = 80;
  var st, camp, demand, busy = false, drag = null, lastEnd = null;

  // ---------- storage (best score), always guarded ----------
  function loadBest() { try { return +localStorage.getItem("kraanti.best") || 0; } catch (e) { return 0; } }
  function saveBest(v) { try { localStorage.setItem("kraanti.best", String(v)); } catch (e) {} }

  function show(name) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.toggle("hidden", k !== name); });
  }

  // ---------- title ----------
  function buildCamps() {
    var wrap = $("#camps");
    K.campaigns.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "camp"; b.dataset.id = c.id;
      var e = document.createElement("span"); e.className = "ce"; e.textContent = c.emoji; e.setAttribute("aria-hidden", "true");
      var t = document.createElement("span");
      var n = document.createElement("b"); n.textContent = c.name;
      var d = document.createElement("small"); d.textContent = c.blurb;
      var i = document.createElement("em"); i.textContent = "Inspired by: " + c.inspired;
      t.appendChild(n); t.appendChild(d); t.appendChild(i);
      b.appendChild(e); b.appendChild(t);
      b.addEventListener("click", function () { start(c); });
      wrap.appendChild(b);
    });
  }

  // ---------- meters ----------
  function meterInfo(k) { return (camp.meters && camp.meters[k]) || K.meters[k]; }

  function buildMeters() {
    var wrap = $("#meters");
    wrap.textContent = "";
    E.KEYS.forEach(function (k) {
      var d = document.createElement("div");
      d.className = "meter"; d.dataset.k = k;
      d.innerHTML = '<span class="mi"></span><span class="mn"></span><div class="bar" role="meter" aria-valuemin="0" aria-valuemax="100"><i></i></div><b class="dot"></b><b class="delta"></b>';
      d.querySelector(".mi").textContent = meterInfo(k).icon;
      d.querySelector(".mn").textContent = meterInfo(k).name;
      wrap.appendChild(d);
    });
  }

  function renderMeters() {
    E.KEYS.forEach(function (k) {
      var el = $('.meter[data-k="' + k + '"]'), v = Math.round(st.m[k]);
      el.querySelector(".bar i").style.width = v + "%";
      var bar = el.querySelector(".bar");
      bar.setAttribute("aria-valuenow", v);
      bar.setAttribute("aria-label", meterInfo(k).name + " " + v + " percent");
      el.classList.toggle("warn", v <= 18 || v >= 82);
    });
  }

  function flashDeltas(deltas) {
    E.KEYS.forEach(function (k) {
      var d = deltas[k];
      if (!d) return;
      var el = $('.meter[data-k="' + k + '"] .delta');
      el.textContent = (d > 0 ? "+" : "") + d;
      el.className = "delta " + (d > 0 ? "up" : "down");
      void el.offsetWidth; // restart animation
      el.classList.add("show");
    });
  }

  function preview(side) {
    E.KEYS.forEach(function (k) {
      var dot = $('.meter[data-k="' + k + '"] .dot');
      var v = side ? Math.abs(st.cur[side].fx[k] || 0) : 0;
      dot.classList.toggle("on", v > 0);
      dot.classList.toggle("big-dot", v >= 12);
    });
  }

  // ---------- card ----------
  function fill(text) { return text.replace(/\{demand\}/g, demand); }

  function renderCard() {
    var c = st.cur;
    $("#c-avatar").textContent = c.who;
    $("#c-name").textContent = c.name;
    $("#c-text").textContent = fill(c.text);
    btnL.querySelector("span").textContent = c.L.label;
    btnR.querySelector("span").textContent = c.R.label;
    $("#lbl-left").textContent = c.L.label;
    $("#lbl-right").textContent = c.R.label;
    $("#day").textContent = "Day " + st.day + " / " + E.DAYS;
    card.style.transform = ""; card.style.opacity = "";
    card.className = "card enter";
    setTilt(0);
    preview(null);
    renderMeters();
    busy = false; btnL.disabled = btnR.disabled = false;
  }

  function setTilt(dx) {
    card.style.transform = dx ? "translateX(" + dx + "px) rotate(" + dx / 18 + "deg)" : "";
    var a = Math.min(1, Math.abs(dx) / THRESH);
    $("#lbl-left").style.opacity = dx < 0 ? a : 0;   // dragging left shows the LEFT choice
    $("#lbl-right").style.opacity = dx > 0 ? a : 0;
  }

  function showNews(text) {
    var t = $("#ticker");
    t.textContent = "";
    var b = document.createElement("b"); b.textContent = "BREAKING";
    t.appendChild(b); t.appendChild(document.createTextNode(" " + fill(text)));
  }

  // The label on the card edge: dragging left reveals the left choice and vice versa.
  // (CSS positions the "left" label on the right edge so the finger never covers it.)

  function decide(side) {
    if (busy) return;
    busy = true; btnL.disabled = btnR.disabled = true;
    var dir = side === "L" ? -1 : 1;
    card.classList.remove("dragging", "snap", "enter");
    card.classList.add("out");
    card.style.transform = "translateX(" + dir * 420 + "px) rotate(" + dir * 22 + "deg)";
    var res = E.choose(st, side);
    showNews(res.news);
    renderMeters();
    flashDeltas(res.deltas);
    setTimeout(function () {
      if (res.ended || res.won) return finish(res.ended || E.winEnding(st.m), !!res.won);
      E.draw(st);
      renderCard();
    }, reduced() ? 0 : 280);
  }

  function reduced() { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

  // ---------- swipe ----------
  card.addEventListener("pointerdown", function (e) {
    if (busy) return;
    drag = { x: e.clientX, id: e.pointerId, dx: 0 };
    try { card.setPointerCapture(e.pointerId); } catch (err) {}
    card.classList.remove("snap", "enter");
    card.classList.add("dragging");
  });
  card.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    setTilt(drag.dx);
    preview(Math.abs(drag.dx) > 24 ? (drag.dx < 0 ? "L" : "R") : null);
  });
  function endDrag(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    var dx = drag.dx; drag = null;
    card.classList.remove("dragging");
    if (Math.abs(dx) >= THRESH) return decide(dx < 0 ? "L" : "R");
    card.classList.add("snap"); setTilt(0); preview(null);
  }
  card.addEventListener("pointerup", endDrag);
  card.addEventListener("pointercancel", endDrag);

  btnL.addEventListener("click", function () { decide("L"); });
  btnR.addEventListener("click", function () { decide("R"); });
  [["mouseenter", btnL, "L"], ["focus", btnL, "L"], ["mouseenter", btnR, "R"], ["focus", btnR, "R"]].forEach(function (a) {
    a[1].addEventListener(a[0], function () { if (!busy) preview(a[2]); });
  });
  [btnL, btnR].forEach(function (b) {
    ["mouseleave", "blur"].forEach(function (ev) { b.addEventListener(ev, function () { if (!busy) preview(null); }); });
  });

  document.addEventListener("keydown", function (e) {
    if (screens.game.classList.contains("hidden")) return;
    if (e.key === "ArrowLeft" || e.key === "a") decide("L");
    else if (e.key === "ArrowRight" || e.key === "d") decide("R");
  });

  // ---------- flow ----------
  function start(c) {
    camp = c;
    demand = c.demand;
    st = E.newState(null, c.id);
    buildMeters();
    show("game");
    $("#ticker").textContent = "";
    showNews("Organisers gather. Pigeons are watching. The demand: “" + demand + "”.");
    E.draw(st);
    renderCard();
  }

  function finish(key, won) {
    var end = camp.endings[key] || K.endings[key], days = won ? E.DAYS : st.day - 1, bal = E.balance(st.m), best = loadBest();
    if (days > best) { best = days; saveBest(best); }
    lastEnd = { title: end.title, days: days, won: won, camp: camp.name };
    $("#end-kicker").textContent = won ? "You made it" : "Movement ended on day " + st.day;
    $("#end-emoji").textContent = end.emoji;
    $("#end-title").textContent = end.title;
    $("#end-text").textContent = end.text;
    $("#st-days").textContent = days + "/" + E.DAYS;
    $("#st-bal").textContent = bal + "%";
    $("#st-best").textContent = best;
    var r = camp.real;
    $("#real-title").textContent = r.title;
    $("#real-note").textContent = r.note;
    var ul = $("#real-points"); ul.textContent = "";
    r.points.forEach(function (p) { var li = document.createElement("li"); li.textContent = p; ul.appendChild(li); });
    $("#real").open = true;
    $("#end-fact").textContent = K.facts[Math.floor(Math.random() * K.facts.length)];
    $("#share-note").textContent = "";
    show("end");
    $("#btn-again").focus();
  }

  function shareText() {
    var url = location.href.split("#")[0];
    return "✊ I ran “" + lastEnd.camp + "” for " + lastEnd.days + "/" + E.DAYS + " days in KRAANTI and ended up: “" + lastEnd.title + "”. Can you do better? " + url;
  }

  $("#btn-share").addEventListener("click", function () {
    var text = shareText(), note = $("#share-note");
    if (navigator.share) {
      navigator.share({ text: text }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { note.textContent = "Copied! Paste it anywhere."; }, function () { note.textContent = text; });
    } else {
      note.textContent = text;
    }
  });

  $("#btn-again").addEventListener("click", function () { show("title"); });
  $("#btn-quit").addEventListener("click", function () { show("title"); });

  buildCamps();
  show("title");

  // exposed for tests
  window.__kraanti = { get state() { return st; }, decide: decide };
})();
