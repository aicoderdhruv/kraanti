/* Kraanti arcade: three short 2D levels, one per protest persona.
   🚜 Farmer    - lane-driving up a highway: find the gap, dodge water cannon, offer tea.
   🧑‍🎓 Aspirant - side-scrolling run: collect real evidence, dodge fake forwards.
   🗳️ Volunteer - help-desk rush: fix the right problem, fact-check viral posts.
   Peaceful play wins. Crashing into barricades is possible and is the fastest way to lose. */
(function () {
  "use strict";
  var K = window.KRAANTI;
  var W = 360, H = 640;
  var C = { ink: "#17140f", paper: "#fff4d6", card: "#fffdf6", yellow: "#ffd23f", pink: "#ff4d8d", teal: "#1fb5a8", orange: "#ff7a1a", blue: "#3a6ff8", red: "#e5322d", road: "#34343c", grass: "#9ccc65", field: "#c5e08a" };
  var EMF = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  var HEAD = 'Impact,Haettenschweiler,"Arial Narrow Bold",system-ui,sans-serif';
  var BODY = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';

  var $ = function (s) { return document.querySelector(s); };
  var canvas = $("#cv"), ctx = canvas.getContext("2d");
  var screens = { menu: $("#screen-menu"), play: $("#screen-play"), end: $("#screen-end") };
  var scale = 1, dpr = window.devicePixelRatio || 1;
  var cur = null, curId = null, raf = 0, lastT = 0, keys = {}, pops = [], shake = 0, lastRes = null;

  // ---------- helpers ----------
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function show(n) { Object.keys(screens).forEach(function (k) { screens[k].classList.toggle("hidden", k !== n); }); }

  function em(ch, x, y, size, rot, flip) {
    ctx.save(); ctx.translate(x, y);
    if (rot) ctx.rotate(rot);
    if (flip) ctx.scale(-1, 1);
    ctx.font = size + "px " + EMF; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(ch, 0, 0); ctx.restore();
  }
  function txt(s, x, y, size, color, align, font) {
    ctx.font = font || ("900 " + size + "px " + HEAD);
    ctx.fillStyle = color || C.ink; ctx.textAlign = align || "left"; ctx.textBaseline = "middle";
    ctx.fillText(s, x, y);
  }
  function rr(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function box(x, y, w, h, fill, r, line) {
    rr(x, y, w, h, r == null ? 8 : r); ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = line == null ? 3 : line; ctx.strokeStyle = C.ink; if (ctx.lineWidth) ctx.stroke();
  }
  function bar(x, y, w, h, v, color, label) {
    box(x, y, w, h, "#fff", h / 2, 2);
    var fw = Math.max(0, (w - 4) * clamp(v, 0, 1));
    if (fw > 0) { rr(x + 2, y + 2, fw, h - 4, (h - 4) / 2); ctx.fillStyle = color; ctx.fill(); }
    if (label) txt(label, x + w / 2, y + h / 2 + 1, 10, C.ink, "center", "800 10px " + BODY);
  }
  function wrap(str, x, y, maxW, lh, size, color, align) {
    ctx.font = "600 " + size + "px " + BODY; var words = str.split(" "), line = "", yy = y;
    words.forEach(function (w) {
      var t = line ? line + " " + w : w;
      if (ctx.measureText(t).width > maxW && line) { txt(line, x, yy, size, color, align, "600 " + size + "px " + BODY); line = w; yy += lh; } else line = t;
    });
    txt(line, x, yy, size, color, align, "600 " + size + "px " + BODY);
    return yy + lh;
  }
  function pop(s, x, y, color) { pops.push({ s: s, x: x, y: y, t: 0, c: color || C.ink }); }
  function updPops(dt) { pops.forEach(function (p) { p.t += dt; p.y -= 34 * dt; }); pops = pops.filter(function (p) { return p.t < 1.2; }); }
  function drawPops() {
    pops.forEach(function (p) {
      ctx.globalAlpha = clamp(1.2 - p.t, 0, 1);
      ctx.lineWidth = 4; ctx.strokeStyle = "#fff"; ctx.lineJoin = "round"; ctx.font = "900 15px " + HEAD; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.strokeText(p.s, p.x, p.y); ctx.fillStyle = p.c; ctx.fillText(p.s, p.x, p.y);
    });
    ctx.globalAlpha = 1;
  }
  function ticker(s, t) {
    if (!s) return;
    box(10, 64, W - 20, 36, C.ink, 8, 0);
    box(16, 70, 62, 24, C.red, 5, 0); txt("BREAKING", 47, 83, 11, "#fff", "center");
    var a = clamp(t * 4, 0, 1); ctx.globalAlpha = a;
    wrap(s, 86, 79, W - 106, 12, 11, "#fff", "left"); ctx.globalAlpha = 1;
  }
  function bigBanner(s, sub) {
    ctx.fillStyle = "rgba(255,244,214,.92)"; ctx.fillRect(0, 0, W, H);
    txt(s, W / 2, 250, 40, C.ink, "center"); if (sub) wrap(sub, W / 2, 300, 280, 20, 15, C.ink, "center");
  }

  // ---------- canvas sizing / input ----------
  function resize() {
    var host = $("#stage"); if (!host) return;
    var aw = host.clientWidth - 6, ah = host.clientHeight - 6; if (aw <= 0 || ah <= 0) return;
    scale = Math.min(aw / W, ah / H);
    canvas.style.width = Math.floor(W * scale) + "px"; canvas.style.height = Math.floor(H * scale) + "px";
    canvas.width = Math.floor(W * scale * dpr); canvas.height = Math.floor(H * scale * dpr);
  }
  window.addEventListener("resize", resize);
  function pt(e) { var r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
  canvas.addEventListener("pointerdown", function (e) { if (!cur) return; e.preventDefault(); try { canvas.setPointerCapture(e.pointerId); } catch (x) {} cur.down && cur.down(pt(e)); });
  canvas.addEventListener("pointermove", function (e) { if (cur && cur.move) cur.move(pt(e)); });
  canvas.addEventListener("pointerup", function (e) { if (cur && cur.up) cur.up(pt(e)); });
  window.addEventListener("keydown", function (e) {
    if (!cur || screens.play.classList.contains("hidden")) return;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].indexOf(e.key) >= 0) e.preventDefault();
    keys[e.key.toLowerCase()] = true; cur.key && cur.key(e.key.toLowerCase());
  });
  window.addEventListener("keyup", function (e) { keys[e.key.toLowerCase()] = false; });

  // ---------- loop ----------
  function loop(t) {
    raf = requestAnimationFrame(loop);
    var dt = Math.min(0.05, (t - lastT) / 1000 || 0); lastT = t;
    if (!cur) return;
    cur.update(dt); updPops(dt); shake = Math.max(0, shake - dt);
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    ctx.save();
    if (shake > 0) ctx.translate(rand(-4, 4) * shake * 3, rand(-4, 4) * shake * 3);
    cur.draw(); drawPops(); ctx.restore();
    if (cur.res && !cur.reported) { cur.reported = true; var r = cur.res; setTimeout(function () { finish(r); }, 900); }
  }

  /* ==========================================================================
     LEVEL A: THE FARMER. Drive the tractor-trolley up the highway to the border.
     ========================================================================== */
  function makeFarm() {
    var L = 6400, X0 = 36, X1 = 324, PY = 480;
    var s = { dist: 0, px: 180, tx: 180, calm: 65, sup: 50, crowd: 3, stun: 0, soak: 0, t: 0, crashes: 0, teas: 0, act: false, news: "", newsT: 0 };
    var objs = [], y = 620, bag = [], nextCop = 1000;
    var signs = ["DELHI CLOSED FOR RENOVATION", "ROAD CLOSED. REASON: ROAD", "DIVERSION: 4,000 KM", "LAWS FOR YOUR OWN GOOD"];
    function refill() { bag = ["bar", "bar", "can", "farm", "bar", "pot", "can"].sort(function () { return Math.random() - .5; }); }
    while (y < L - 700) {
      if (!bag.length) refill();
      var ty = bag.pop();
      if (ty === "bar") {
        var gw = 104, gap = rand(X0 + 14, X1 - 14 - gw);
        objs.push({ t: "sign", y: y - 250, txt: pick(signs) });
        objs.push({ t: "bar", y: y, gap: gap, gw: gw, hit: false });
      } else if (ty === "can") {
        objs.push({ t: "can", y: y, side: Math.random() < .5 ? -1 : 1, clk: rand(0, 1) });
        objs.push({ t: "pot", y: y + 120, x: rand(120, 240), got: false });
      } else if (ty === "farm") {
        var sd = Math.random() < .5 ? X0 + 22 : X1 - 22;
        for (var i = 0; i < 3; i++) objs.push({ t: "farmer", y: y + i * 46, x: sd + (sd < 180 ? 1 : -1) * (i % 2) * 22, got: false });
      } else {
        objs.push({ t: "pot", y: y, x: rand(90, 270), got: false }); objs.push({ t: "chai", y: y + 90, x: rand(90, 270), got: false });
      }
      if (y > nextCop) { objs.push({ t: "cop", y: y + 280, side: Math.random() < .5 ? -1 : 1, used: false }); nextCop = y + 1100; }
      y += 520 + rand(0, 140);
    }
    var news = [[250, "Highway closed for renovation. Reopening date: a surprise."], [1400, "Water cannon spotted. Weather forecast: also water."], [2800, "Ministry says it is 'listening'. Mute button not found."], [4300, "Langar now the best-reviewed restaurant in the region."], [5800, "Border in sight. Tea reserves: critical."]];
    var ni = 0;

    function near(o, dx, dy) { return Math.abs(o.sx - s.px) < dx && Math.abs(o.sy - PY) < dy; }
    var game = {
      s: s, objs: objs, res: null,
      down: function (p) { if (Math.hypot(p.x - 306, p.y - 580) < 40) { s.act = true; } else s.tx = clamp(p.x, X0 + 22, X1 - 22); },
      move: function (p) { if (p.y < 540 || p.x < 250) s.tx = clamp(p.x, X0 + 22, X1 - 22); },
      key: function (k) { if (k === " " || k === "e") s.act = true; },
      update: function (dt) {
        if (game.res) return;
        s.t += dt; s.newsT += dt;
        if (keys.arrowleft || keys.a) s.tx -= 280 * dt; if (keys.arrowright || keys.d) s.tx += 280 * dt;
        s.tx = clamp(s.tx, X0 + 22, X1 - 22);
        s.stun = Math.max(0, s.stun - dt); s.soak = Math.max(0, s.soak - dt);
        var sp = (120 + s.dist / L * 45) * (s.stun > 0 ? .35 : 1) * (s.soak > 0 ? .7 : 1);
        s.dist += sp * dt;
        s.px += (s.tx - s.px) * Math.min(1, dt * 9);
        s.calm = Math.min(100, s.calm + .3 * dt);
        while (ni < news.length && s.dist > news[ni][0]) { s.news = news[ni][1]; s.newsT = 0; ni++; }
        var gaveTea = false;
        objs.forEach(function (o) {
          o.sy = PY - (o.y - s.dist);
          if (o.sy < -80 || o.sy > H + 80) return;
          if (o.t === "bar" && !o.hit && Math.abs(o.sy - PY) < 34 && (s.px - 15 < o.gap || s.px + 15 > o.gap + o.gw)) {
            o.hit = true; s.calm -= 34; s.crowd = Math.max(0, s.crowd - 2); s.sup = Math.max(0, s.sup - 8); s.stun = .9; shake = .4; s.crashes++;
            s.news = "CHAOS ON HIGHWAY. Nobody reads the demand."; s.newsT = 0; pop("CRASH! -34 CALM", s.px, PY - 40, C.red);
          }
          if (o.t === "can") {
            o.clk += dt; var ph = o.clk % 3.4; o.state = ph < 1.1 ? 1 : ph < 2.2 ? 2 : 0;
            var rx0 = o.side < 0 ? X0 : X1 - 210, rx1 = o.side < 0 ? X0 + 210 : X1;
            if (o.state === 2 && Math.abs(o.sy - PY) < 42 && s.px > rx0 && s.px < rx1) {
              s.tx = clamp(s.tx - o.side * -160 * dt, X0 + 22, X1 - 22); s.px = clamp(s.px - o.side * -170 * dt, X0 + 22, X1 - 22);
              s.sup = Math.max(0, s.sup - 14 * dt); s.soak = .8;
              if (!o.popped) { o.popped = true; pop("SOAKED! LANGAR WET", s.px, PY - 40, C.blue); }
            }
          }
          if (o.t === "pot" && !o.got) { o.sx = o.x; if (near(o, 28, 30)) { o.got = true; s.sup = Math.min(100, s.sup + 16); pop("+LANGAR", o.x, o.sy, C.teal); } }
          if (o.t === "chai" && !o.got) { o.sx = o.x; if (near(o, 28, 30)) { o.got = true; s.sup = Math.min(100, s.sup + 8); s.calm = Math.min(100, s.calm + 6); pop("+CHAI", o.x, o.sy, C.orange); } }
          if (o.t === "farmer" && !o.got) { o.sx = o.x; if (near(o, 30, 30)) { o.got = true; s.crowd++; pop("+1 FARMER JOINS", o.x, o.sy, C.teal); } }
          if (o.t === "cop") {
            o.sx = o.side < 0 ? X0 - 12 : X1 + 12; o.close = !o.used && Math.abs(o.sy - PY) < 60 && Math.abs(s.px - o.sx) < 120;
            if (o.close && s.act && s.sup >= 8) {
              o.used = true; gaveTea = true; s.sup -= 8; s.calm = Math.min(100, s.calm + 14); s.teas++;
              pop("TEA OFFERED! +14 CALM", o.sx + (o.side < 0 ? 70 : -70), o.sy, C.teal); s.news = "Constable: “Not allowed to accept.” Accepts."; s.newsT = 0;
            }
          }
        });
        s.act = false;
        if (s.calm <= 0) { game.res = { id: "farm", won: false, key: "k-", kicker: "The highway got heated", stats: [["Farmers", s.crowd], ["Crashes", s.crashes], ["Km", Math.round(s.dist / L * 40)]] }; }
        else if (s.dist >= L) {
          var stars = (s.calm >= 60 ? 1 : 0) + (s.crowd >= 8 ? 1 : 0) + (s.sup >= 30 ? 1 : 0);
          game.res = { id: "farm", won: true, key: stars >= 3 ? "win_high" : stars === 2 ? "win_mid" : "win_low", kicker: "You reached the border", stats: [["Farmers", s.crowd], ["Calm", Math.round(s.calm) + "%"], ["Teas", s.teas], ["Crashes", s.crashes]] };
        }
      },
      draw: function () {
        // fields and road
        ctx.fillStyle = C.grass; ctx.fillRect(0, 0, W, H);
        for (var k = -1; k < 12; k++) { var yy = ((k * 70 + s.dist * .55) % 840) - 70; ctx.fillStyle = k % 2 ? C.field : "#b4d77a"; ctx.fillRect(0, yy, X0, 34); ctx.fillRect(X1, yy, W - X1, 34); }
        ctx.fillStyle = C.road; ctx.fillRect(X0, 0, X1 - X0, H);
        ctx.fillStyle = "#fff"; ctx.fillRect(X0, 0, 3, H); ctx.fillRect(X1 - 3, 0, 3, H);
        for (var d = -1; d < 14; d++) { var dy = ((d * 60 + s.dist) % 840) - 60; ctx.fillStyle = C.yellow; ctx.fillRect(178, dy, 4, 28); }
        // objects (far to near)
        objs.forEach(function (o) {
          var sy = o.sy; if (sy == null || sy < -90 || sy > H + 90) return;
          if (o.t === "sign") { box(X0, sy - 14, X1 - X0, 28, C.yellow, 4, 3); txt(o.txt, 180, sy + 1, 13, C.ink, "center"); }
          if (o.t === "bar") {
            var cols = [C.orange, C.blue, C.red];
            for (var side = 0; side < 2; side++) {
              var bx0 = side ? o.gap + o.gw : X0, bx1 = side ? X1 : o.gap; if (bx1 - bx0 <= 2) continue;
              for (var bx = bx0; bx < bx1; bx += 36) { var bw = Math.min(36, bx1 - bx); box(bx, sy - 17, bw, 34, cols[Math.floor(bx / 36) % 3], 3, 3); ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(bx + 4, sy - 8, Math.max(0, bw - 8), 3); ctx.fillRect(bx + 4, sy + 2, Math.max(0, bw - 8), 3); }
            }
            if (!o.hit) { ctx.strokeStyle = C.yellow; ctx.setLineDash([6, 5]); ctx.lineWidth = 3; ctx.strokeRect(o.gap + 3, sy - 18, o.gw - 6, 36); ctx.setLineDash([]); }
          }
          if (o.t === "can") {
            var tx = o.side < 0 ? 18 : W - 18, rx0 = o.side < 0 ? X0 : X1 - 210;
            if (o.state === 1) { ctx.fillStyle = "rgba(58,111,248,.18)"; ctx.fillRect(rx0, sy - 30, 210, 60); ctx.strokeStyle = C.blue; ctx.setLineDash([8, 6]); ctx.lineWidth = 2; ctx.strokeRect(rx0, sy - 30, 210, 60); ctx.setLineDash([]); txt("WATER CANNON", rx0 + 105, sy, 13, C.blue, "center"); }
            if (o.state === 2) { var g = ctx.createLinearGradient(o.side < 0 ? X0 : X1, 0, o.side < 0 ? X0 + 210 : X1 - 210, 0); g.addColorStop(0, "rgba(120,190,255,.95)"); g.addColorStop(1, "rgba(120,190,255,.25)"); ctx.fillStyle = g; ctx.fillRect(rx0, sy - 30, 210, 60); ctx.fillStyle = "#fff"; for (var q = 0; q < 8; q++) ctx.fillRect(rx0 + ((q * 29 + s.t * 400) % 200), sy - 24 + (q * 13) % 48, 14, 3); }
            em("🚒", tx, sy, 34, 0, o.side < 0);
          }
          if (o.t === "pot" && !o.got) em("🍲", o.x, sy, 26);
          if (o.t === "chai" && !o.got) em("☕", o.x, sy, 24);
          if (o.t === "farmer" && !o.got) em("🧑‍🌾", o.x, sy, 28);
          if (o.t === "cop") { em("👮", o.sx, sy, 30); if (o.close) { box(o.sx + (o.side < 0 ? 18 : -78), sy - 38, 60, 22, C.yellow, 6, 2); txt("☕ TEA?", o.sx + (o.side < 0 ? 48 : -48), sy - 27, 12, C.ink, "center"); } }
        });
        // crowd behind the trolley, trolley, tractor
        var n = Math.min(6, s.crowd);
        for (var c = 0; c < n; c++) em("🧑‍🌾", s.px + (c % 2 ? 13 : -13), PY + 58 + Math.floor(c / 2) * 18, 17);
        box(s.px - 14, PY + 14, 28, 36, C.yellow, 4, 3); txt("🚩", s.px, PY + 32, 14, C.ink, "center", "14px " + EMF);
        em("🚜", s.px, PY, 42, Math.PI / 2 + (s.stun > 0 ? Math.sin(s.t * 40) * .15 : 0));
        if (s.soak > 0) { ctx.fillStyle = "rgba(120,190,255,.25)"; ctx.fillRect(0, 0, W, H); }
        // HUD
        bar(10, 10, 130, 18, s.calm / 100, s.calm < 30 ? C.red : C.teal, "CALM");
        bar(150, 10, 110, 18, s.sup / 100, C.orange, "LANGAR");
        txt("🧑‍🌾 " + s.crowd, 272, 20, 16, C.ink, "left");
        bar(10, 36, W - 20, 12, s.dist / L, C.pink, null); em("🏁", W - 22, 42, 18);
        ticker(s.news, s.newsT);
        // tea button
        var can = s.sup >= 8; ctx.globalAlpha = can ? 1 : .45; box(272, 546, 68, 68, C.yellow, 34, 3); em("☕", 306, 579, 30); ctx.globalAlpha = 1;
        if (s.t < 5) { ctx.fillStyle = "rgba(23,20,15,.85)"; rr(30, 330, 300, 78, 12); ctx.fill(); wrap("Drag to steer. Find the gaps. Don't hit the containers. Pass a constable and tap ☕ to offer tea.", 180, 350, 270, 17, 14, "#fff", "center"); }
      },
    };
    return game;
  }

  /* ==========================================================================
     LEVEL B: THE ASPIRANT. Run the paper chase, collect the real pages.
     ========================================================================== */
  function makeNeet() {
    var L = 6800, GY = 500, PX = 90;
    var s = { x: 0, vy: 0, py: GY, calm: 80, ev: 0, fake: 0, stun: 0, t: 0, news: "", newsT: 0, jumps: 0 };
    var objs = [], x = 560, flip = 0;
    while (x < L - 500) {
      var r = Math.random(); flip++;
      if (r < .3) { objs.push({ t: "book", x: x, w: 38, h: 44 }); for (var i = -1; i <= 1; i++) objs.push({ t: "real", x: x + i * 42, y: GY - 80 - (i === 0 ? 34 : 0) }); }
      else if (r < .45) { objs.push({ t: "form", x: x, w: 34, h: 66 }); objs.push({ t: "real", x: x, y: GY - 130 }); }
      else if (r < .62) { objs.push({ t: "bird", x: x, y: GY - 34 - rand(0, 8), w: 30 }); objs.push({ t: "real", x: x + 10, y: GY - 112 }); }
      else if (r < .82) { for (var j = 0; j < 3; j++) objs.push({ t: j === 1 ? "fake" : "real", x: x + j * 46, y: GY - 60 - (j === 1 ? 20 : 40) }); }
      else if (r < .92) objs.push({ t: "maggi", x: x, y: GY - 28 });
      else { objs.push({ t: "fake", x: x, y: GY - 28 }); objs.push({ t: "real", x: x + 50, y: GY - 100 }); }
      x += rand(240, 370);
    }
    var totalReal = objs.filter(function (o) { return o.t === "real"; }).length;
    var news = [[900, "Group chat 'Physics Doubts 2.0' now has the paper. Allegedly."], [2300, "Agency: 'There is no leak, only enthusiastic information sharing.'"], [4000, "Grace marks given, withdrawn, given. Math teachers weep."], [5600, "Court ahead. Bring evidence, not vibes."]];
    var ni = 0;
    function jump() { if (s.py >= GY - 1 && !game.res) { s.vy = -720; s.jumps++; } }
    var game = {
      s: s, objs: objs, res: null, total: totalReal,
      down: function () { jump(); },
      key: function (k) { if (k === " " || k === "arrowup" || k === "w") jump(); },
      update: function (dt) {
        if (game.res) return;
        s.t += dt; s.newsT += dt; s.stun = Math.max(0, s.stun - dt);
        var sp = (170 + s.x / L * 50) * (s.stun > 0 ? .45 : 1);
        s.x += sp * dt;
        s.vy += 1900 * dt; s.py += s.vy * dt; if (s.py > GY) { s.py = GY; s.vy = 0; }
        s.calm = Math.min(100, s.calm + 1.2 * dt);
        while (ni < news.length && s.x > news[ni][0]) { s.news = news[ni][1]; s.newsT = 0; ni++; }
        objs.forEach(function (o) {
          if (o.t === "bird") o.x -= 70 * dt;
          o.sx = PX + (o.x - s.x);
          if (o.sx < -50 || o.sx > W + 60 || o.done) return;
          var pl = PX - 14, pr = PX + 14, pt = s.py - 44, pb = s.py;
          if (o.t === "book" || o.t === "form") {
            if (pr > o.sx - o.w / 2 && pl < o.sx + o.w / 2 && pb > GY - o.h) { o.done = true; s.calm -= 14; s.stun = .7; shake = .3; pop(o.t === "form" ? "FORM 27-B! -14" : "TRIPPED! -14", PX + 20, s.py - 60, C.red); }
          } else if (o.t === "bird") {
            if (pr > o.sx - 15 && pl < o.sx + 15 && pb > o.y - 14 && pt < o.y + 14) { o.done = true; s.calm -= 10; s.stun = .4; pop("PIGEON! -10", PX + 20, s.py - 60, C.red); }
          } else {
            if (Math.abs(o.sx - PX) < 22 && o.y > pt - 10 && o.y < pb + 10) {
              o.done = true;
              if (o.t === "real") { s.ev++; pop("+1 EVIDENCE", o.sx, o.y - 20, C.teal); }
              else if (o.t === "fake") { s.fake++; s.ev = Math.max(0, s.ev - 1); s.calm -= 10; pop("FAKE FORWARD! -1", o.sx, o.y - 20, C.red); s.news = "Debunked within 4 minutes. Someone's uncle is sorry."; s.newsT = 0; }
              else if (o.t === "maggi") { s.calm = Math.min(100, s.calm + 10); pop("+MAGGI", o.sx, o.y - 20, C.orange); }
            }
          }
        });
        if (s.calm <= 0) game.res = { id: "neet", won: false, key: "t-", kicker: "Burnout hit", stats: [["Evidence", s.ev], ["Fake forwards", s.fake]] };
        else if (s.x >= L) {
          var k = s.ev >= 13 ? "win_high" : s.ev >= 8 ? "win_mid" : "win_low";
          game.res = { id: "neet", won: true, key: k, kicker: "You reached the court", stats: [["Evidence", s.ev + "/" + totalReal], ["Fake forwards", s.fake], ["Calm", Math.round(s.calm) + "%"]] };
        }
      },
      draw: function () {
        var g = ctx.createLinearGradient(0, 0, 0, GY); g.addColorStop(0, "#ffe08a"); g.addColorStop(1, C.paper); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        for (var b = -1; b < 8; b++) { var bx = b * 110 - (s.x * .25 % 110), bh = 120 + ((b + 20) * 53 % 90); ctx.fillStyle = "rgba(23,20,15,.12)"; ctx.fillRect(bx, GY - bh, 84, bh); ctx.fillStyle = "rgba(255,255,255,.35)"; for (var w = 0; w < 4; w++) ctx.fillRect(bx + 10 + (w % 2) * 34, GY - bh + 14 + Math.floor(w / 2) * 34, 18, 18); }
        ctx.fillStyle = C.road; ctx.fillRect(0, GY, W, H - GY); ctx.fillStyle = C.yellow; for (var d = 0; d < 9; d++) ctx.fillRect(((d * 70 - s.x) % 630 + 630) % 630 - 40, GY + 50, 36, 5);
        ctx.fillStyle = "#e8d9a6"; ctx.fillRect(0, GY - 6, W, 6);
        // court gate near the end
        var gx = PX + (L - s.x); if (gx < W + 120) { box(gx, GY - 150, 130, 150, "#fffdf6", 6, 3); em("⚖️", gx + 65, GY - 96, 52); txt("COURT", gx + 65, GY - 30, 20, C.ink, "center"); }
        objs.forEach(function (o) {
          if (o.sx == null || o.sx < -50 || o.sx > W + 60 || o.done) return;
          if (o.t === "book") { for (var i = 0; i < 3; i++) box(o.sx - o.w / 2 + (i % 2) * 3, GY - 14 * (i + 1), o.w, 14, [C.pink, C.blue, C.teal][i], 2, 2); }
          if (o.t === "form") { box(o.sx - o.w / 2, GY - o.h, o.w, o.h, "#fff", 3, 3); txt("27-B", o.sx, GY - o.h + 14, 12, C.red, "center"); ctx.fillStyle = C.ink; for (var l = 0; l < 4; l++) ctx.fillRect(o.sx - 11, GY - o.h + 28 + l * 9, 22, 2); }
          if (o.t === "bird") em("🐦", o.sx, o.y, 28, 0, true);
          if (o.t === "maggi") em("🍜", o.sx, o.y, 26);
          if (o.t === "real" || o.t === "fake") {
            var fk = o.t === "fake", bob = Math.sin(s.t * 4 + o.x) * 3;
            box(o.sx - 12, o.y - 16 + bob, 24, 32, fk ? "#ffe45e" : "#fff", 3, fk ? 3 : 2);
            if (fk) { txt("FWD!!", o.sx, o.y - 4 + bob, 9, C.red, "center"); ctx.fillStyle = C.red; ctx.fillRect(o.sx - 8, o.y + 4 + bob, 16, 2); ctx.fillRect(o.sx - 8, o.y + 9 + bob, 12, 2); }
            else { ctx.fillStyle = "#c9c2ad"; ctx.fillRect(o.sx - 8, o.y - 10 + bob, 16, 2); ctx.fillRect(o.sx - 8, o.y - 5 + bob, 16, 2); txt("✔", o.sx, o.y + 7 + bob, 13, C.teal, "center"); }
          }
        });
        var run = s.py >= GY - 1 ? Math.sin(s.t * 18) * 3 : 0;
        em("🧑‍🎓", PX, s.py - 22 + run, 44, s.py < GY - 1 ? -.12 : 0);
        bar(10, 10, 140, 18, s.calm / 100, s.calm < 30 ? C.red : C.teal, "CALM");
        box(160, 8, 100, 22, "#fff", 6, 2); txt("📄 " + s.ev, 168, 19, 14, C.ink, "left");
        bar(10, 36, W - 20, 12, s.x / L, C.pink, null); em("⚖️", W - 22, 42, 18);
        ticker(s.news, s.newsT);
        if (s.t < 5) { ctx.fillStyle = "rgba(23,20,15,.85)"; rr(30, 270, 300, 78, 12); ctx.fill(); wrap("Tap to jump. Grab the white pages with ticks. Avoid the yellow FWD!! forwards.", 180, 290, 270, 17, 14, "#fff", "center"); }
      },
    };
    return game;
  }

  /* ==========================================================================
     LEVEL C: THE VOLUNTEER. Help-desk rush: fix the right problem, check the source.
     ========================================================================== */
  function makeVote() {
    var TIME = 60;
    var s = { time: TIME, score: 0, trust: 70, combo: 0, fixed: 0, checked: 0, wrong: 0, left: 0, spawn: 0, queue: [], quip: "", quipT: 0, t: 0, shared: 0 };
    var ACT = [
      { id: "typo", ic: "✏️", l: "Fix typo" }, { id: "move", ic: "🏠", l: "New address" }, { id: "dupe", ic: "✂️", l: "Remove dupe" },
      { id: "add", ic: "➕", l: "Add voter" }, { id: "ok", ic: "✅", l: "All correct" }, { id: "check", ic: "🔍", l: "Check source" },
    ];
    var CASES = [
      { a: "typo", who: "👵", txt: "List says “Sharmaa Devi”. ID says “Sharma Devi”." }, { a: "typo", who: "👨‍🦳", txt: "List says age 124. He is 42 and quite offended." },
      { a: "move", who: "🧑‍💼", txt: "Moved flats last year. List still shows the old address." }, { a: "move", who: "👩‍🔧", txt: "New house, same street. List says the old house." },
      { a: "dupe", who: "🧑‍🎤", txt: "Listed twice: same photo, two addresses." }, { a: "dupe", who: "👨‍🍳", txt: "Appears in two booths. One person. One biryani." },
      { a: "add", who: "🧑‍🎓", txt: "Turned 18 last month. Not on the list yet." }, { a: "add", who: "👩‍🌾", txt: "Applied three months ago. Receipt in hand. Name missing." },
      { a: "ok", who: "🧓", txt: "Everything matches. Just came to double-check." }, { a: "ok", who: "🧑‍🏫", txt: "All correct. Wants to know why he was asked to check." },
      { a: "check", who: "📱", txt: "Viral post: “5 CRORE VOTES STOLEN!!!” Source: “a friend”." }, { a: "check", who: "📱", txt: "Viral post: “Everything is PERFECT!!!” Source: “another friend”." },
      { a: "check", who: "📱", txt: "Viral post: “Your name is DELETED! Click this link now!”" },
    ];
    var right = ["Fixed. Citizen: “That was easy.”", "Sorted. Chai offered.", "Done. The form wept with joy.", "Handled. Queue applauds, quietly."];
    var wrongQ = { typo: "That wasn't a typo. Citizen is baffled.", move: "Wrong fix. Citizen now lives somewhere else.", dupe: "Wrong fix. A perfectly good voter is gone.", add: "Wrong fix. Added someone who was already there.", ok: "Not all correct. Citizen sighs.", check: "A post got shared before checking. Uncle's thrilled." };
    function mk() { var c = pick(CASES); return { a: c.a, who: c.who, txt: c.txt, pat: 1 }; }
    s.queue.push(mk());
    function answer(id) {
      var c = s.queue[0]; if (!c || game.res) return;
      s.queue.shift();
      if (id === c.a) {
        s.combo++; var pts = 10 + Math.min(10, s.combo * 2); s.score += pts; s.trust = Math.min(100, s.trust + (c.a === "check" ? 6 : 3)); if (c.a === "check") s.checked++; else s.fixed++;
        pop("+" + pts, 180, 250, C.teal); s.quip = c.a === "check" ? "Source checked. Post is 100% made up. Internet is shocked." : pick(right);
      } else {
        s.combo = 0; s.wrong++; s.trust -= 10; shake = .25; if (c.a === "check") s.shared++;
        pop("WRONG -10 TRUST", 180, 250, C.red); s.quip = wrongQ[id] || "That wasn't the right fix.";
      }
      s.quipT = 0;
    }
    var game = {
      s: s, res: null,
      down: function (p) {
        if (p.y >= 470) { var col = Math.floor((p.x - 10) / 114), row = Math.floor((p.y - 470) / 76); if (col >= 0 && col < 3 && row >= 0 && row < 2) answer(ACT[row * 3 + col].id); }
      },
      key: function (k) { var n = parseInt(k, 10); if (n >= 1 && n <= 6) answer(ACT[n - 1].id); },
      update: function (dt) {
        if (game.res) return;
        s.t += dt; s.time -= dt; s.quipT += dt; s.spawn -= dt;
        if (s.spawn <= 0 && s.queue.length < 5) { s.queue.push(mk()); s.spawn = Math.max(1.8, 3.6 - (TIME - s.time) / 40); }
        s.queue.forEach(function (c, i) { c.pat -= dt / (i === 0 ? 10 : 22); });
        if (s.queue.length && s.queue[0].pat <= 0) { s.queue.shift(); s.trust -= 8; s.left++; s.combo = 0; s.quip = "A citizen gave up and left. The queue sighs."; s.quipT = 0; pop("LEFT! -8 TRUST", 180, 250, C.red); }
        if (!s.queue.length) s.spawn = Math.min(s.spawn, .4);
        if (s.trust <= 0) game.res = { id: "vote", won: false, key: "t-", kicker: "The crowd lost patience", stats: [["Score", s.score], ["Fixed", s.fixed], ["Posts checked", s.checked]] };
        else if (s.time <= 0) { var k = s.score >= 500 ? "win_high" : s.score >= 280 ? "win_mid" : "win_low"; game.res = { id: "vote", won: true, key: k, kicker: "Help desk closed", stats: [["Score", s.score], ["Fixed", s.fixed], ["Posts checked", s.checked], ["Shared unchecked", s.shared]] }; }
      },
      draw: function () {
        ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "rgba(23,20,15,.07)"; for (var xx = 0; xx < W; xx += 14) for (var yy = 0; yy < H; yy += 14) ctx.fillRect(xx, yy, 2, 2);
        bar(10, 10, 130, 18, s.trust / 100, s.trust < 30 ? C.red : C.teal, "TRUST");
        box(150, 8, 90, 22, "#fff", 6, 2); txt("★ " + s.score, 158, 19, 14, C.ink, "left");
        box(250, 8, 60, 22, s.time < 10 ? C.red : C.yellow, 6, 2); txt(Math.ceil(Math.max(0, s.time)) + "s", 280, 19, 14, s.time < 10 ? "#fff" : C.ink, "center");
        txt("🗳️ HELP DESK", 10, 52, 16, C.ink, "left");
        if (s.combo > 1) txt("COMBO x" + s.combo, W - 12, 52, 16, C.pink, "right");
        // queue
        s.queue.forEach(function (c, i) { if (i === 0) return; var qx = 30 + (i - 1) * 62; box(qx - 22, 70, 44, 56, "#fff", 8, 2); em(c.who, qx, 94, 28); bar(qx - 18, 114, 36, 7, c.pat, c.pat < .3 ? C.red : C.teal, null); });
        // front citizen card
        var f = s.queue[0];
        if (f) {
          box(26, 140, 308, 270, C.card, 16, 3); em(f.who, 180, 205, 74);
          bar(46, 252, 268, 12, f.pat, f.pat < .3 ? C.red : C.teal, null);
          wrap(f.txt, 180, 290, 262, 22, 17, C.ink, "center");
          if (f.a === "check") txt("Not a citizen: a post!", 180, 385, 12, C.pink, "center", "800 12px " + BODY);
        } else txt("Queue is empty. Enjoy it.", 180, 270, 16, C.ink, "center", "700 16px " + BODY);
        // quip
        if (s.quip) { ctx.globalAlpha = clamp(3 - s.quipT, 0, 1); wrap(s.quip, 180, 432, 300, 16, 13, C.ink, "center"); ctx.globalAlpha = 1; }
        // buttons
        ACT.forEach(function (a, i) { var col = i % 3, row = Math.floor(i / 3), bx = 10 + col * 114, by = 470 + row * 76; box(bx, by, 106, 68, a.id === "check" ? "#ffe9c7" : "#fff", 12, 3); em(a.ic, bx + 53, by + 24, 26); txt(a.l, bx + 53, by + 52, 12, C.ink, "center", "800 12px " + BODY); txt(String(i + 1), bx + 10, by + 12, 10, "#999", "left", "700 10px " + BODY); });
        if (s.t < 5) { ctx.fillStyle = "rgba(23,20,15,.88)"; rr(24, 420, 312, 44, 12); ctx.fill(); wrap("Tap the right fix. Viral posts need a 🔍 check.", 180, 442, 290, 17, 14, "#fff", "center"); }
      },
    };
    return game;
  }

  // ---------- menu / flow ----------
  var PERSONAS = [
    { id: "farm", make: makeFarm, emoji: "🚜", role: "The Farmer", level: "Delhi Chalo", how: "Drive the tractor-trolley up a blockaded highway. Find the gap, dodge the water cannon, offer the constable tea.", real: "Farmers' protest, 2020-21" },
    { id: "neet", make: makeNeet, emoji: "🧑‍🎓", role: "The Aspirant", level: "The Paper Chase", how: "Run through the city after the leaked paper. Collect real evidence, dodge fake forwards.", real: "NEET-UG protests, 2024" },
    { id: "vote", make: makeVote, emoji: "🗳️", role: "The Volunteer", level: "The Help Desk", how: "Run a citizens' help desk. Fix the right problem fast, and fact-check every viral post.", real: "Voter-roll (SIR) protests, 2025-26" },
  ];

  function buildMenu() {
    var wrapEl = $("#personas");
    PERSONAS.forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.className = "camp"; b.dataset.id = p.id;
      var e = document.createElement("span"); e.className = "ce"; e.textContent = p.emoji; e.setAttribute("aria-hidden", "true");
      var t = document.createElement("span");
      var n = document.createElement("b"); n.textContent = p.role + ": " + p.level;
      var d = document.createElement("small"); d.textContent = p.how;
      var i = document.createElement("em"); i.textContent = "Inspired by: " + p.real;
      t.appendChild(n); t.appendChild(d); t.appendChild(i); b.appendChild(e); b.appendChild(t);
      b.addEventListener("click", function () { start(p.id); });
      wrapEl.appendChild(b);
    });
  }

  function start(id) {
    var p = PERSONAS.filter(function (x) { return x.id === id; })[0];
    curId = id; pops = []; shake = 0; keys = {};
    show("play"); resize();
    cur = p.make(); lastT = performance.now();
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function finish(res) {
    cur = null; lastRes = res;
    var camp = K.campaigns.filter(function (c) { return c.id === res.id; })[0];
    var end = camp.endings[res.key] || K.endings[res.key];
    $("#end-kicker").textContent = res.kicker;
    $("#end-emoji").textContent = end.emoji; $("#end-title").textContent = end.title; $("#end-text").textContent = end.text;
    var st = $("#end-stats"); st.textContent = "";
    res.stats.forEach(function (x) { var d = document.createElement("div"), b = document.createElement("b"), sp = document.createElement("span"); b.textContent = x[1]; sp.textContent = x[0]; d.appendChild(b); d.appendChild(sp); st.appendChild(d); });
    var r = camp.real; $("#real-title").textContent = r.title; $("#real-note").textContent = r.note;
    var ul = $("#real-points"); ul.textContent = ""; r.points.forEach(function (x) { var li = document.createElement("li"); li.textContent = x; ul.appendChild(li); });
    $("#real").open = true; $("#share-note").textContent = "";
    show("end"); $("#btn-retry").focus();
  }

  $("#btn-retry").addEventListener("click", function () { start(curId); });
  $("#btn-menu").addEventListener("click", function () { show("menu"); });
  $("#btn-quit").addEventListener("click", function () { cur = null; show("menu"); });
  $("#btn-share").addEventListener("click", function () {
    var p = PERSONAS.filter(function (x) { return x.id === curId; })[0], e = K.campaigns.filter(function (c) { return c.id === curId; })[0].endings[lastRes.key] || K.endings[lastRes.key];
    var text = "✊ I played " + p.role + " (" + p.level + ") in KRAANTI and got: “" + e.title + "”. Can you do better? " + location.href.split("#")[0].replace(/[^/]*$/, ""), note = $("#share-note");
    if (navigator.share) navigator.share({ text: text }).catch(function () {});
    else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { note.textContent = "Copied!"; }, function () { note.textContent = text; });
    else note.textContent = text;
  });

  buildMenu(); show("menu");
  window.__arcade = { start: start, get cur() { return cur; }, W: W, H: H };
})();
