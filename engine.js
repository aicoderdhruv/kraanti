/* Kraanti engine: pure game logic, no DOM. Used by game.js and the balance sim. */
(function (root) {
  var K = (root.KRAANTI = root.KRAANTI || {});
  var KEYS = ["c", "s", "k", "t"];
  var DAYS = 30;
  var COOLDOWN = 6; // days before a rescue card can repeat
  // Difficulty knobs (tuned with a headless balance sim, see README)
  var cfg = {
    scale: 1.6, // global effect multiplier
    newsCycle: 0.12, // public attention drifts back toward neutral each day
    fatigue: 1.5, // people drift home: exams, jobs, sore feet
    thermos: 1, // volunteers bring their own flasks
    rescue: 0.7, // chance a rescue card shows up when one is eligible
  };

  function clamp(v) { return Math.max(0, Math.min(100, v)); }
  function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

  function newState(rng) {
    return { day: 1, m: { c: 50, s: 50, k: 50, t: 50 }, seen: {}, last: {}, cur: null, rng: rng || Math.random };
  }

  function draw(st) {
    var cards = K.cards, card;
    if (st.day === 1) {
      card = cards.filter(function (c) { return c.tutorial; })[0];
    } else {
      var rescue = cards.filter(function (c) {
        return c.when && c.when(st.m) && st.day - (st.last[c.id] || -99) >= COOLDOWN;
      });
      var pool = cards.filter(function (c) { return !c.when && !c.tutorial && !st.seen[c.id]; });
      if (!pool.length) { st.seen = {}; pool = cards.filter(function (c) { return !c.when && !c.tutorial; }); }
      card = rescue.length && st.rng() < cfg.rescue ? pick(rescue, st.rng) : pick(pool, st.rng);
    }
    if (card.when) st.last[card.id] = st.day; else st.seen[card.id] = true;
    st.cur = card;
    return card;
  }

  // Returns { ended: "c-" | ... | null, won: bool, news, deltas }
  function choose(st, side) {
    var ch = st.cur[side], deltas = {};
    KEYS.forEach(function (k) {
      var v = Math.round((ch.fx[k] || 0) * cfg.scale);
      if (v) v += Math.round(st.rng() * 2 - 1); // small jitter, -1..+1
      deltas[k] = v;
      st.m[k] = clamp(st.m[k] + v);
    });
    var ended = null;
    for (var i = 0; i < KEYS.length && !ended; i++) {
      if (st.m[KEYS[i]] <= 0) ended = KEYS[i] + "-";
      else if (st.m[KEYS[i]] >= 100) ended = KEYS[i] + "+";
    }
    if (!ended) {
      // passive daily drift, applied once the day survived
      st.m.s = clamp(st.m.s - (st.m.s - 50) * cfg.newsCycle);
      st.m.t = clamp(st.m.t + cfg.thermos);
      st.m.c = clamp(st.m.c - cfg.fatigue);
    }
    var res = { ended: ended, won: false, news: ch.news, deltas: deltas };
    if (!ended) {
      st.day++;
      if (st.day > DAYS) res.won = true;
    }
    return res;
  }

  // 100 = every meter perfectly centred, 0 = everything at the edge
  function balance(m) {
    var dev = KEYS.reduce(function (a, k) { return a + Math.abs(m[k] - 50); }, 0) / KEYS.length;
    return Math.max(0, Math.round(100 - dev * 2));
  }

  function winEnding(m) {
    var b = balance(m);
    return b >= 70 ? "win_high" : b >= 45 ? "win_mid" : "win_low";
  }

  K.engine = { cfg: cfg, KEYS: KEYS, DAYS: DAYS, newState: newState, draw: draw, choose: choose, balance: balance, winEnding: winEnding };
})(typeof window !== "undefined" ? window : globalThis);
