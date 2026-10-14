# KRAANTI ✊ The Peaceful Protest Simulator

A satirical swipe-card game about running a **peaceful, democratic protest** against the very
fictional Ministry of Forms in the Republic of Bureaucratia. Built to be fun first, and to leave
young players with a feel for how nonviolent movements actually work.

**Play it:** open `index.html` in any browser (no build, no dependencies). Works on phones.

## The game in 30 seconds

- Pick a demand (or write your own) and survive **30 days**.
- Each day a card shows up. Swipe left or right.
- Keep four meters balanced: 👥 **Crowd**, 📣 **Public Love**, 🕊️ **Calm**, ☕ **Chai**.
- Too little *or* too much of any meter ends the movement, each with its own joke ending
  (*Just You and a Pigeon*, *Fire Marshal Says No*, *Sold Out*, *Accidentally Started a Yoga Retreat*…).
- Violence is never the winning move. The "tempting" options tank Calm and cost you the story.

## Design pillars

1. **Funny first.** Satire targets *systems* (paperwork, committees, spin, performative photo-ops), never real people, parties, religions or groups.
2. **Nonviolence is the strategy, not a lecture.** The game teaches it by letting you feel the trade-offs.
3. **Balance, not "number go up".** Every win-more choice has a cost. Fame can turn into *Sold Out*; calm can turn into a yoga retreat.
4. **Five-minute sessions, instant replay.** One screen, one thumb, shareable endings.
5. **Non-partisan.** Fictional country, fictional ministry. Players choose the demand.

## Repo map

| File | What it is |
| --- | --- |
| `cards.js` | **All the content**: demands, 44 cards, 11 endings, "Real talk" facts. Easiest place to contribute. |
| `engine.js` | Pure game rules (draw, apply, endings, balance score). No DOM. |
| `game.js` | UI: screens, swipe, meters, share. |
| `style.css` | Protest-poster look. |

## Writing a card

```js
{
  id: "forms", who: "📋", name: "Clerk Stampwala",
  text: "To hold a gathering you need Form 27-B. Form 27-B requires a gathering permit...",
  L: { label: "Fill every form, in triplicate", fx: { c: -4, s: 8, k: 6, t: -8 }, news: "Clerk faints on receiving 81 perfectly filled forms." },
  R: { label: "Display the loop as an exhibit", fx: { c: 7, s: 6, k: -4, t: -3 }, news: "Gallery of Absurd Paperwork opens on the footpath." },
}
```

`c` Crowd, `s` Public Love, `k` Calm, `t` Chai. Effects are multiplied by `cfg.scale` (1.6). Rules of thumb:

- Both choices should be *tempting*. If one is obviously right, it isn't a card yet.
- The `news` line is the punchline. It appears in the breaking-news ticker after the choice.
- Aim at institutions and situations, not individuals. No real politicians, parties or communities.
- Rescue cards (`when: m => m.t < 28`) appear when a meter drifts to an extreme.

## Balance

Difficulty is tuned with a headless simulation against `engine.js` (random, "mostly sensible" and
greedy players). Current target: random play wins ~14%, a mostly-sensible player ~65%, an optimal
one ~90%. Knobs live in `cfg` at the top of `engine.js`. If you add cards, re-check the drift of each meter
(mean effect per choice should stay near zero; passive daily drift compensates for the rest).

## Roadmap ideas

- 🔊 Sound and haptics (kazoo, megaphone feedback, the sigh of a Ministry clerk)
- 🌐 Hinglish / Hindi / regional language packs; community-submitted cards via PR
- 📅 "Card of the day" daily challenge with one shared seed and a leaderboard-free share grid
- 🖼️ Shareable ending images (poster-style) for Instagram/WhatsApp stories
- 🧩 Mini-games between days: slogan sign-maker, chai-pouring, "fill the form" speed round
- 🎓 Classroom mode: teacher picks the demand, class votes each card (democracy in action)
- 🏫 Real-world "what next" links: voter registration, student unions, local civic groups

## Disclaimer

This is satire and a game. All characters, ministries and pigeons are fictional. Real-world protest
should be peaceful, lawful and safe: know your local rules and look out for each other.
