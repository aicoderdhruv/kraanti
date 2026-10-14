# KRAANTI ✊ The Peaceful Protest Simulator

A satirical swipe-card game about running a **peaceful, democratic protest** against the very
fictional Ministry of Forms in the Republic of Bureaucratia. Built to be fun first, and to leave
young players with a feel for how nonviolent movements actually work.

**Play it:** open `index.html` in any browser (no build, no dependencies). Works on phones.

## Three movements, based on real protests

You pick one of three campaigns. Each is a satirical, fictionalised take on a real protest in India,
played in the fictional Republic of Bureaucratia (real events, fictional names), with its own deck of
cards, meter labels, endings and a **"The real story"** panel on the end screen.

| | Campaign | Inspired by | Flavour |
| --- | --- | --- | --- |
| 🚜 | **The Tractor March** | Farmers' protest, 2020-21 | Barricades, winter, rounds of talks, a very large kitchen (meters: Kisans, Langar) |
| 🍜 | **The Paper Leak** | NEET-UG protests, 2024 | A leaked paper, grace-mark flip-flops, a lane with room for four pigeons (meters: Aspirants, Maggi) |
| 🗳️ | **The Voter List** | "Vote chori" / voter-roll (SIR) protests, 2025-26 | Forms, documents, viral posts and "Show Your Math" (meters: Voters, Chai) |

**Accuracy and neutrality rules**

- The satire targets *systems and processes* (paperwork, spin, committees, viral rumours), never real people, parties, religions or communities. Nobody real is named in a card.
- The "real story" panels are plain, dated and hedged ("reports say", "it said"). Where a claim is disputed, the panel says so.
- **The Voter List is live and politically contested.** The game takes no side on whether anything was wrong. It satirises hard-to-prove paperwork *and* unverified viral claims from every direction, and rewards fact-checking, documentation and staying calm.
- The farm and NEET panels also avoid casualty numbers and blame; sources disagree.
- Please re-verify the panels before any public launch. They were written from news reports in Oct 2026 (Deccan Herald, The News Minute, DT Next, Scroll, ThePrint and others) and the 2025-26 story is still moving.

## The game in 30 seconds

- Pick a movement and survive **30 days**.
- Each day a card shows up. Swipe left or right.
- Keep four meters balanced: 👥 **Crowd**, 📣 **Public Love**, 🕊️ **Calm**, and the campaign's supply meter (☕ Chai / 🍲 Langar / 🍜 Maggi).
- Too little *or* too much of any meter ends the movement, each with its own joke ending.
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
| `cards.js` | Shared cards (work in every campaign), default endings, "Real talk" facts. |
| `campaigns.js` | **The three movements**: meta, meter labels, endings, "real story" panels and each campaign's own cards. |
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
- A card with `camps: ["farm"]` only appears in that campaign; no `camps` means it appears in all of them.

## Balance

Difficulty is tuned with a headless simulation against `engine.js` (random, "mostly sensible" and
greedy players), per campaign. Current results: random play wins 9-14%, a mostly-sensible player 54-71%, an optimal
one 75-92%. Knobs live in `cfg` at the top of `engine.js`. If you add cards, re-check the drift of each meter
(mean effect per choice should stay near zero; passive daily drift compensates for the rest).

## Roadmap ideas

- 🔊 Sound and haptics (kazoo, megaphone feedback, the sigh of a Ministry clerk)
- ➕ More campaigns (Agnipath, CAA/Shaheen Bagh, Ladakh...) via the same `campaigns.js` format
- 🌐 Hinglish / Hindi / regional language packs; community-submitted cards via PR
- 📅 "Card of the day" daily challenge with one shared seed and a leaderboard-free share grid
- 🖼️ Shareable ending images (poster-style) for Instagram/WhatsApp stories
- 🧩 Mini-games between days: slogan sign-maker, chai-pouring, "fill the form" speed round
- 🎓 Classroom mode: teacher picks the demand, class votes each card (democracy in action)
- 🏫 Real-world "what next" links: voter registration, student unions, local civic groups

## Disclaimer

This is satire and a game. All characters, ministries and pigeons are fictional. Real-world protest
should be peaceful, lawful and safe: know your local rules and look out for each other.
