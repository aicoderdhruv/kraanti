/* Kraanti campaigns: three playable movements inspired by real Indian protests.
   Each is played in the fictional Republic of Bureaucratia: real events, fictional names,
   so the satire hits systems (paperwork, spin, committees), never real people.
   Each campaign has its own deck, meter labels, endings, and a "what really happened" panel.
   Keep the panels factual, hedged and non-partisan. */
(function (root) {
  var K = (root.KRAANTI = root.KRAANTI || {});

  K.campaigns = [
    {
      id: "farm", emoji: "🚜", name: "The Tractor March",
      inspired: "Farmers' protest, 2020-21",
      blurb: "Three “Laws For Your Own Good” arrive. Nobody asked the farmers. Winter, barricades, talks and a very large kitchen.",
      demand: "TAKE THE THREE LAWS BACK",
      meters: { c: { icon: "🚜", name: "Kisans" }, t: { icon: "🍲", name: "Langar" } },
      endings: {
        "c-": { emoji: "🌾", title: "The Fields Need You", text: "The crowd drifted home to the harvest. Crops wait for no Minister." },
        "c+": { emoji: "🚜", title: "Traffic Jam of Historic Proportions", text: "So many trolleys that the map app filed a complaint. Great turnout, zero room to move, and a safety headache." },
        "t-": { emoji: "🍲", title: "The Langar Ran Dry", text: "Even the biggest community kitchen needs dal. The pots went quiet, and so did the camp." },
        "t+": { emoji: "🥘", title: "Langar Festival", text: "So much food, so many selfies. The cooking show was a hit. The demand? Pending." },
        win_high: { emoji: "📜", title: "The Laws Are Withdrawn", text: "After a very long winter the Ministry announces it's taking the laws back. Your trolley gets a medal for service." },
        win_mid: { emoji: "⚖️", title: "The Court Hits Pause", text: "The laws are paused, a committee is formed, and everybody says “we'll see”. You pack the trolley, but you don't fold the tent." },
        win_low: { emoji: "🏕️", title: "Still Camping at the Border", text: "You made it through, barely. The Ministry's “we're listening” remains on hold. Keep your thermos ready." },
      },
      real: {
        title: "The real story: Farmers' protest, 2020-21",
        points: [
          "Sept 2020: Parliament passed three farm laws. Farmer unions, mostly from Punjab and Haryana, said they would weaken price protections and called for a “Delhi Chalo” march.",
          "Late Nov 2020: marchers met barricades, water cannon and tear gas, then camped at Delhi's borders through the winter. Community kitchens (langars) fed many thousands.",
          "Dec 2020: several rounds of talks, including a government proposal to amend the laws, did not end the protest. On 12 Jan 2021 the Supreme Court stayed the laws and set up a committee.",
          "26 Jan 2021: a tractor parade turned chaotic, with clashes and damage at the Red Fort.",
          "19 Nov 2021: the government announced it would repeal the laws.",
        ],
        note: "A simplified summary. Sources differ on many details, including crowd sizes and the human cost.",
      },
    },

    {
      id: "neet", emoji: "🍜", name: "The Paper Leak",
      inspired: "NEET-UG protests, 2024",
      blurb: "The question paper may have left the building before the students did. 24 lakh aspirants. One very confused testing agency.",
      demand: "A TEST THAT CAN'T LEAK",
      meters: { c: { icon: "🎓", name: "Aspirants" }, t: { icon: "🍜", name: "Maggi" } },
      endings: {
        "c-": { emoji: "📚", title: "Everyone Went Back to Revise", text: "Understandably, the aspirants went home to prepare for the next attempt. The protest is now a study group." },
        "c+": { emoji: "🪑", title: "Seating Plan Collapsed", text: "So many aspirants arrived that the seating plan failed. Ironically, the one thing nobody could leak." },
        "t-": { emoji: "😴", title: "Out of Maggi", text: "A hungry aspirant is a sleepy aspirant. The 2 AM sit-in ended in a snoring chorus." },
        "t+": { emoji: "🍜", title: "Maggi Mela", text: "The sit-in became a noodle festival. Delicious. Zero reforms." },
        win_high: { emoji: "🔒", title: "The Paper Is Finally Sealed Properly", text: "The Agency agrees to publish how exams are run, and to audit them. The envelopes now come with seals that actually seal." },
        win_mid: { emoji: "📁", title: "A Reform Panel Is Formed", text: "A panel will examine the Agency. It will submit a report. The report will be read. Possibly." },
        win_low: { emoji: "📝", title: "The Exam Stands", text: "The exam stands, a panel is asked to fix the system, and you ask for receipts. Everyone starts preparing for next year." },
      },
      real: {
        title: "The real story: NEET-UG protests, 2024",
        points: [
          "5 May 2024: about 24 lakh students sat NEET-UG. Claims of a paper leak and malpractice led to student protests, arrests and court cases.",
          "22 June 2024: the Education Ministry set up a panel under former ISRO chief K. Radhakrishnan to review the National Testing Agency.",
          "The Supreme Court (reasons issued 2 Aug 2024) declined to cancel the exam or order a re-test, saying there was no evidence of a systemic breach, and widened the panel's remit to NTA reforms.",
          "One report from June 2026 says the court is still pressing the agency on which reforms were implemented.",
        ],
        note: "A simplified summary. The facts of who leaked what, and where, are still argued over.",
      },
    },

    {
      id: "vote", emoji: "🗳️", name: "The Voter List",
      inspired: "“Vote chori” / voter-roll (SIR) protests, 2025-26",
      blurb: "The voter list is being revised, names are vanishing, and everybody has a hashtag. Can you ask hard questions without losing your cool?",
      demand: "EVERY ELIGIBLE VOTER IN. EVERY INELIGIBLE ONE OUT. SHOW YOUR MATH.",
      meters: { c: { icon: "🗳️", name: "Voters" }, t: { icon: "☕", name: "Chai" } },
      endings: {
        "c-": { emoji: "🪪", title: "Just You and a Voter ID", text: "Turnout: you, one volunteer and a very patient voter ID." },
        "c+": { emoji: "📄", title: "The Helpdesk Ran Out of Forms", text: "Too many people showed up. The registration desk is out of forms, pens and optimism." },
        "t-": { emoji: "🫖", title: "Out of Chai, Out of Patience", text: "Without chai, even the most correct argument gets shouty. Everyone went home." },
        "t+": { emoji: "📊", title: "Chai Over Charts", text: "The sit-in turned into a tea party. Warm, social, and nobody checked the spreadsheet." },
        win_high: { emoji: "📢", title: "The Commission Opens a Public Helpdesk", text: "The Commission agrees to publish the lists, fix errors in the open and hold public Q&As. Every claim gets a receipt." },
        win_mid: { emoji: "🔎", title: "A Review Is Ordered", text: "A review is ordered. A form for the review is released. The form is 14 pages." },
        win_low: { emoji: "⏳", title: "The Matter Is Pending", text: "The matter is “pending”, which is Bureaucratian for “see you in the next election”." },
      },
      real: {
        title: "The real story: voter-roll protests, 2025-26",
        points: [
          "2025: the Election Commission ran a “Special Intensive Revision” (SIR) of Bihar's voter list. It said about 50 lakh names were removed as deceased, permanently shifted or duplicate.",
          "Opposition parties called it “vote chori” (vote theft), protested in Parliament and marched toward the Commission's office, where police stopped them.",
          "The Commission rejected the charge and said the roll had not been revised intensively for years.",
          "Reports say the Supreme Court has backed the Commission's power to run such revisions, and one independent data review found no obvious anomalies. Critics still dispute the process, and protests have continued.",
        ],
        note: "This is live and politically contested. Read several sources. This game takes no side on who is right. It only argues for peaceful, documented, lawful questions.",
      },
    },
  ];

  // ---------------- campaign-specific cards ----------------
  var C = [];
  function add(camp, o) { o.camps = [camp]; C.push(o); }

  // ===== FARM =====
  add("farm", {
    id: "t_farm", tutorial: true, who: "👳", name: "Paaji, Union Leader",
    text: "Welcome, Union Leader! The Ministry has passed three “Laws For Your Own Good” without asking you. You have 30 days (it will feel like 13 months) to get one thing: {demand}. Swipe RIGHT for yes, LEFT for no. Balance Kisans, Public Love, Calm and Langar. Too little OR too much of anything ends the movement.",
    L: { label: "Wait, too MUCH?", fx: { k: 5 }, news: "Paaji: “Too much langar is a real problem. We checked.”" },
    R: { label: "Let's roll", fx: { c: 5 }, news: "First trolley arrives. It has a stereo." },
  });
  add("farm", {
    id: "f_barricade", who: "🚧", name: "The Barricade Brigade",
    text: "The highway has been dug up, stacked with containers and fenced with wire. A sign reads: “Delhi closed for renovation.”",
    L: { label: "Set up camp politely at the border", fx: { c: 8, k: 8, s: 6, t: -8 }, news: "Trolleys line up for 12 km. The map app gives up." },
    R: { label: "Push through the barricades", fx: { k: -22, c: 8, s: -8 }, news: "Headline reads “CHAOS ON HIGHWAY”. Nobody reads the demand." },
  });
  add("farm", {
    id: "f_cannon", who: "🚿", name: "Water Cannon",
    text: "Water cannon in December. Nobody asked for a car wash, least of all in 4 degrees.",
    L: { label: "Offer the police tea and keep walking", fx: { k: 10, s: 8, t: -6, c: -3 }, news: "Picture of tea being offered goes viral. So does the hot-water joke." },
    R: { label: "Link arms, sing and hold the line", fx: { c: 8, k: 4, s: 6, t: -9 }, news: "Everyone is cold and soaked, and a little more stubborn." },
  });
  add("farm", {
    id: "f_langar", who: "🍲", name: "Langar Seva Team",
    text: "The langar is serving 20,000 meals a day. A TV crew asks: “Is the food really free?” “Yes. And so is the seva.”",
    L: { label: "Open langar to everyone, even commuters", fx: { t: -9, s: 12, k: 4, c: 3 }, news: "Commuter eats paratha, rethinks his entire opinion." },
    R: { label: "Serve protesters first, strangers when there's extra", fx: { t: 7, s: -4, c: 4 }, news: "Efficient. Slightly less heartwarming." },
  });
  add("farm", {
    id: "f_lunch", who: "🍱", name: "Round 5 of Talks",
    text: "Ministry offers lunch during the talks. You brought your own. Everyone is watching.",
    L: { label: "Eat langar food outside, politely", fx: { s: 11, k: 4, t: 6, c: 3 }, news: "Ministry biryani goes cold. Langar dal is still hot." },
    R: { label: "Accept the lunch. Diplomacy.", fx: { s: -5, k: 6, t: 8 }, news: "Lunch is accepted, and so is nothing else." },
  });
  add("farm", {
    id: "f_talks", who: "🤝", name: "Round 8 of Talks",
    text: "The Ministry proposes “amendments”. Your demand was repeal. They say it's basically the same.",
    L: { label: "Hold firm: repeal, not repair", fx: { c: 8, s: -4, k: 3, t: -4 }, news: "“Repeal” is now the most-searched word in the country." },
    R: { label: "Ask for the amendments in writing", fx: { s: 6, c: -8, k: 6 }, news: "The writing arrives. It's 94 pages and a sigh." },
  });
  add("farm", {
    id: "f_winter", who: "🥶", name: "Winter, Personified",
    text: "-3°C. Someone has invented the world's first trolley-mounted heater. It runs on optimism.",
    L: { label: "Rotate sleeping shifts, share blankets", fx: { k: 6, t: -8, s: 5, c: -2 }, news: "Blankets arrive from three states and one grandmother." },
    R: { label: "Keep the bonfire going all night", fx: { c: 4, k: -4, t: 4, s: 2 }, news: "Bonfire songs trend. So does smoke in everyone's eyes." },
  });
  add("farm", {
    id: "f_parade", who: "🚜", name: "Republic Day Proposal",
    text: "Idea: a tractor parade on Republic Day. On the agreed route, with a very large number of tractors.",
    L: { label: "Stick to the route, volunteers marshal", fx: { k: 12, c: -6, s: 8, t: -6 }, news: "Marshals in yellow caps keep it orderly. Mostly." },
    R: { label: "Go bigger. Forget the map.", fx: { c: 14, k: -18, s: -8 }, news: "The map is lost. The message goes with it." },
  });
  add("farm", {
    id: "f_label", who: "📺", name: "TV Anchor",
    text: "A TV anchor calls the protesters “anti-national”. Also “middlemen”. Also “paid”. All in one segment.",
    L: { label: "Invite the anchor to eat langar in person", fx: { s: 12, k: 6, t: -6, c: -3 }, news: "Anchor arrives, eats, reduces tone by 20 decibels." },
    R: { label: "Print posters: “Is your breakfast anti-national?”", fx: { s: 9, c: 6, k: -5, t: -3 }, news: "Posters are spotted at 3,000 tea stalls." },
  });
  add("farm", {
    id: "f_pizza", who: "🍕", name: "WhatsApp Forward",
    text: "A forward claims the protesters ate pizza, therefore they can't be real farmers. Experts agree: pizza is not a crime.",
    L: { label: "Post receipts and explain; calm facts", fx: { s: 7, c: 3, k: -3, t: -3 }, news: "Pizza shop confirms donation. Internet reconsiders everything." },
    R: { label: "Start a “pizza langar” and own it", fx: { t: 8, c: 6, s: -3, k: -2 }, news: "A pizza queue appears. Nobody can argue with that logic." },
  });
  add("farm", {
    id: "f_harvest", who: "🌾", name: "Harvest Season",
    text: "The fields need cutting. The camp needs people. Both are your job.",
    L: { label: "Rotate: one per family here, rest at the farm", fx: { c: -8, t: 8, k: 6, s: 4 }, news: "Rota works. Also, the village WhatsApp group has never been busier." },
    R: { label: "Everyone stays; neighbours help harvest", fx: { c: 8, t: -6, s: 8 }, news: "Neighbours cut the wheat. Gratitude is a crop too." },
  });
  add("farm", {
    id: "f_celeb", who: "🎤", name: "Overseas Pop Star",
    text: "A global star tweets support. The Ministry replies: “Outsiders!” The pop star replies with a cow emoji.",
    L: { label: "Thank her, keep the focus local", fx: { s: 4, k: 6, c: -4 }, news: "A careful tweet is posted. Nobody screenshots it." },
    R: { label: "Retweet and trend a hashtag", fx: { c: 8, s: -5, k: -3, t: 3 }, news: "Hashtag trends. Nuance does not." },
  });
  add("farm", {
    id: "f_court", who: "🏛️", name: "The Expert Committee",
    text: "A Committee of Experts has been appointed. Their previous articles: “Why These Laws Are Great”. Awkward.",
    L: { label: "Decline to meet them", fx: { s: 4, k: 3, c: 6, t: -2 }, news: "“We were not consulted,” says the Committee. Nobody laughs." },
    R: { label: "Meet them and submit a clear list", fx: { s: 8, k: 6, c: -6, t: -4 }, news: "The list is read. It has bullet points." },
  });
  add("farm", {
    id: "f_net", who: "📵", name: "Internet Suspended",
    text: "Internet suspended at the border. WhatsApp reads: “Last seen: 3 days ago.”",
    L: { label: "Organise by word of mouth and loudspeaker rota", fx: { c: 4, t: -6, k: 4 }, news: "A man with a loudspeaker becomes everyone's favourite news anchor." },
    R: { label: "Rig up community Wi-Fi in a trolley", fx: { s: 8, c: 4, t: -6 }, news: "Trolley Wi-Fi works. Nobody asks how." },
  });
  add("farm", {
    id: "f_students", who: "📚", name: "City Students",
    text: "Students from the city arrive with a library-on-a-trolley and a lot of questions.",
    L: { label: "Welcome them: start a protest school", fx: { s: 10, c: 5, t: -6, k: 4 }, news: "Protest school's first lesson: “Why do tractors honk in tune?”" },
    R: { label: "“This is our fight; thanks, but no.”", fx: { k: 2, s: -6, c: -6 }, news: "Students leave politely. The library stays." },
  });
  add("farm", {
    id: "f_msp", who: "📊", name: "Ministry Explainer",
    text: "The Ministry explains the pricing system in a 94-slide deck. Slide 61 is a pie chart of a pie.",
    L: { label: "Reply with a 3-minute explainer video", fx: { s: 9, k: 3, t: -5 }, news: "Explainer gets more views than the 94 slides combined." },
    R: { label: "Reply with a folk song about fair prices", fx: { c: 8, s: 6, k: -3, t: -3 }, news: "The folk song is catchy. Ministers hum it in the lift." },
  });
  add("farm", {
    id: "r_langar_low", when: function (m) { return m.t < 28; }, who: "🍲", name: "Langar Seva Team",
    text: "Emergency! The langar pantry is almost empty. Dal is a state of mind now.",
    L: { label: "Ask nearby villages for rations", fx: { t: 18, s: 4, c: -4, k: 0 }, news: "Rations arrive by tractor, bicycle and one very proud donkey." },
    R: { label: "Cut portions, serve in shifts", fx: { t: 10, k: -4, c: -3, s: 2 }, news: "Shifts work. Hunger doesn't." },
  });
  add("farm", {
    id: "r_langar_high", when: function (m) { return m.t > 72; }, who: "🥘", name: "Langar Seva Team",
    text: "There is too much food. Three pots of kheer and no one to eat them.",
    L: { label: "Send the extra to nearby hospitals and shelters", fx: { t: -15, s: 8, k: 3 }, news: "Kheer reaches a hospital ward. Doctors report “high morale”." },
    R: { label: "Host a “Kheer Challenge”", fx: { t: -8, c: 6, k: -5 }, news: "Nobody wins. Everybody naps." },
  });

  // ===== NEET =====
  add("neet", {
    id: "t_neet", tutorial: true, who: "🧑‍🎓", name: "Pia, Aspirant Rep",
    text: "Welcome, Organiser! The National Tests & Ambiguities Agency (N.T.A.) seems to have lost the question paper before the question paper was lost. You have 30 days to get: {demand}. Swipe RIGHT for yes, LEFT for no. Balance Aspirants, Public Love, Calm and Maggi. Too little OR too much of anything ends the movement.",
    L: { label: "Wait, too MUCH?", fx: { k: 5 }, news: "Pia: “Yes. Too many noodles is a real thing.”" },
    R: { label: "Let's go", fx: { c: 5 }, news: "First sign: “Test Us, Don't Test Us Like This.”" },
  });
  add("neet", {
    id: "n_leak", who: "📲", name: "WhatsApp Group “Physics Doubts 2.0”",
    text: "A screenshot shows the paper arriving in a chat six hours before the exam. Allegedly. Everyone has a screenshot of a screenshot.",
    L: { label: "File a complaint with timestamps and proof", fx: { s: 10, k: 6, c: -3, t: -5 }, news: "Complaint is neat, numbered and cross-referenced. Clerk is scared." },
    R: { label: "Post screenshots without checking", fx: { s: 6, c: 8, k: -8 }, news: "Half the screenshots turn out to be from a cooking group." },
  });
  add("neet", {
    id: "n_grace", who: "➗", name: "N.T.A. Notice",
    text: "N.T.A.: “Grace marks were given for lost time. Then withdrawn. Then, in some cases, re-given. Then...”",
    L: { label: "Ask for one clear, published formula", fx: { s: 8, k: 6, c: -4, t: -4 }, news: "N.T.A. publishes a formula. It's a flowchart with a doodle on it." },
    R: { label: "Post a meme: “How N.T.A. Marks Work”", fx: { c: 9, s: 7, k: -4, t: -3 }, news: "Meme is shared by mathematicians and one very tired invigilator." },
  });
  add("neet", {
    id: "n_coaching", who: "🏫", name: "Coaching Centre Owner",
    text: "“We'd love to sponsor your banners! Just a small logo. Maybe 40% of the banner.”",
    L: { label: "Decline: no brand logos", fx: { s: 5, c: -6, k: 3, t: -3 }, news: "Banners are plain, hand-painted and have one typo. Charming." },
    R: { label: "Accept banners with a small logo", fx: { c: 12, s: -10, t: 6 }, news: "Banners look great. People read the logo first." },
  });
  add("neet", {
    id: "n_parents", who: "👨‍👩‍👧", name: "Parents' WhatsApp Group",
    text: "“We spent 3 lakh on coaching and now a PROTEST?” says Chintu's uncle. Twelve thumbs-up follow.",
    L: { label: "Host a Parents' Day at the sit-in", fx: { s: 10, c: 6, t: -4, k: 4 }, news: "Parents arrive, sit down, accidentally lead the chants." },
    R: { label: "Reply: “Papa, it's for the next batch too.”", fx: { s: 8, c: -3, k: 4, t: 4 }, news: "Papa replies with a thumbs-up and ₹500 for samosas." },
  });
  add("neet", {
    id: "n_retest", who: "📅", name: "Rumour Mill",
    text: "Rumour: re-test on Sunday! Counter-rumour: no re-test. Third rumour: a re-test, on Monday, for some.",
    L: { label: "Wait for the official notice, keep studying", fx: { c: -6, k: 8, t: 5, s: 3 }, news: "Official notice arrives on a Friday at 11:58 PM. Of course." },
    R: { label: "Plan protests around all three rumours", fx: { c: 8, t: -10, k: -4, s: 4 }, news: "Three protests, one very tired organiser." },
  });
  add("neet", {
    id: "n_zone", who: "📍", name: "Designated Protest Zone",
    text: "The “Designated Protest Zone” is a lane with room for four pigeons. The pigeons have been informed.",
    L: { label: "Fit 500 people in, in shifts", fx: { c: 8, k: 4, t: -8, s: 3 }, news: "Shift protest invented. Pigeons file a counter-petition." },
    R: { label: "Politely ask for a bigger venue", fx: { c: -4, k: 6, s: 6, t: -3 }, news: "Larger venue granted: a lane with room for six pigeons." },
  });
  add("neet", {
    id: "n_mock", who: "📝", name: "Pia's Big Idea",
    text: "Flash-mob idea: a protest Mock Test. Q1: “Who lost the paper? A) Not me B) Printer C) A pigeon D) All of the above.”",
    L: { label: "Run it in the park", fx: { c: 9, s: 8, k: -2, t: -6 }, news: "300 people sit a one-question exam. It's the best-attended exam of the year." },
    R: { label: "Run it online and go viral", fx: { s: 10, c: 4, t: -5 }, news: "Answer key is ‘D’. Server crashes from the answers." },
  });
  add("neet", {
    id: "n_cbi", who: "🕵️", name: "Investigation Team",
    text: "A team arrives: “We are investigating everything. Including the investigators.”",
    L: { label: "Offer statements and evidence", fx: { s: 8, k: 6, c: -3, t: -4 }, news: "Evidence is delivered in colour-coded folders. Team is moved." },
    R: { label: "Demand live updates every hour", fx: { c: 6, s: -3, k: -6 }, news: "Updates arrive: “Investigating.” “Still investigating.”" },
  });
  add("neet", {
    id: "n_mukul", who: "😟", name: "Mukul, Aspirant",
    text: "“If the exam is cancelled I have to study again. If it isn't, it isn't fair. I can't sleep.”",
    L: { label: "Set up a counselling and chai-and-chat table", fx: { k: 8, s: 6, t: -5, c: 3 }, news: "Table is mobbed. Turns out everybody needed to say that out loud." },
    R: { label: "Invite him to speak at the rally", fx: { s: 8, c: 5, k: -4, t: -2 }, news: "His two-minute speech outdoes five ministers." },
  });
  add("neet", {
    id: "n_spokes", who: "🎤", name: "Ministry Spokesperson",
    text: "“There is no leak. There is only an enthusiastic information-sharing environment.”",
    L: { label: "Reply: “Then please share the answer key too.”", fx: { s: 9, c: 6, k: -5 }, news: "Reply is shared a million times. Spokesperson's lips tighten." },
    R: { label: "Request the statement in writing", fx: { k: 6, s: 4, c: -4, t: -3 }, news: "Statement arrives. It is blank, but signed." },
  });
  add("neet", {
    id: "n_court", who: "⚖️", name: "The Court",
    text: "You file a petition. The bench says: “Bring evidence, not vibes.”",
    L: { label: "Build a clean evidence file with lawyer volunteers", fx: { s: 10, k: 8, t: -8, c: -4 }, news: "Evidence file has a table of contents. The bench is visibly impressed." },
    R: { label: "Crowdfund a legal fund", fx: { c: 9, s: 5, t: 4, k: -3 }, news: "Fund hits the target in 3 hours. Chai-money counted twice." },
  });
  add("neet", {
    id: "n_results", who: "📊", name: "Results Day",
    text: "Results are out. The topper list has six students from one centre. The internet asks: “Statistically?”",
    L: { label: "Publish a calm data thread", fx: { s: 10, k: 4, c: -3, t: -5 }, news: "Thread has 14 charts and zero insults. It's in the news." },
    R: { label: "Trend “#RecountPlease”", fx: { c: 9, s: 3, k: -6 }, news: "Hashtag trends for 40 minutes. Then it's cricket season." },
  });
  add("neet", {
    id: "n_night", who: "🌙", name: "Midnight Sit-in",
    text: "It's 1 AM. Everybody is awake anyway. It is Coaching Standard Time.",
    L: { label: "Study-hall sit-in: protest + revision", fx: { c: 4, k: 8, s: 5, t: -6 }, news: "Sit-in doubles as a chemistry revision class. Examiners wept." },
    R: { label: "Candlelight march", fx: { s: 9, c: 6, k: 3, t: -8 }, news: "A thousand candles. One fire marshal sighs." },
  });
  add("neet", {
    id: "r_maggi_low", when: function (m) { return m.t < 28; }, who: "🍜", name: "Maggi Wala",
    text: "Emergency! We're out of Maggi. Aspirants are looking at the chalk with intent.",
    L: { label: "Share-a-packet drive", fx: { t: 16, s: 4, c: -3, k: 2 }, news: "Maggi drive collects 400 packets and a surprising amount of masala." },
    R: { label: "Switch to poha, call it “brain food”", fx: { t: 11, k: -3, s: 3, c: -2 }, news: "Poha is approved by 2 out of 3 aspirants." },
  });
  add("neet", {
    id: "r_maggi_high", when: function (m) { return m.t > 72; }, who: "🍜", name: "Maggi Wala",
    text: "So much Maggi. People are bargaining with noodles. One aspirant has built a noodle fort.",
    L: { label: "Donate noodle packets to a shelter", fx: { t: -14, s: 8, k: 3 }, news: "Shelter receives noodles, gratitude and unrequested masala." },
    R: { label: "Noodle-eating contest", fx: { t: -8, c: 7, k: -6 }, news: "Winner eats 9 bowls. Prize: a very long nap." },
  });

  // ===== VOTE =====
  add("vote", {
    id: "t_vote", tutorial: true, who: "🗳️", name: "Pia, Volunteer",
    text: "Welcome, Organiser! The Election Commission is revising the voter list. Some say names went missing; the Commission says they were moved, deceased or duplicates. You have 30 days to get: {demand}. Swipe RIGHT for yes, LEFT for no. Keep all four meters balanced: too little OR too much ends the movement.",
    L: { label: "That's a lot of rules", fx: { k: 5 }, news: "Pia: “Welcome to democracy. Bring a pen.”" },
    R: { label: "Let's go", fx: { c: 5 }, news: "First sign: “Show Your Math.” Spelled correctly." },
  });
  add("vote", {
    id: "v_forms", who: "📋", name: "Voter, Holding Forms",
    text: "“I filled Form 7 to prove I'm alive. Then Form 6 to prove I live here. Then Form 8 to prove I'm... me.”",
    L: { label: "Run a free Form-Filling Helpdesk", fx: { s: 10, c: 4, t: -8, k: 4 }, news: "Helpdesk hits 200 forms a day. Volunteers' pens run dry, hearts don't." },
    R: { label: "Make a sketch: “Prove You're Alive”", fx: { c: 9, s: 6, k: -4, t: -3 }, news: "Sketch gets 2 million views. Commission replies with a form." },
  });
  add("vote", {
    id: "v_docs", who: "🪪", name: "Officer at the Counter",
    text: "“Please bring any one of 11 documents.” The voter has twelve documents. Not those eleven.",
    L: { label: "Set up a “Document Doctor” stall", fx: { s: 9, k: 5, t: -6, c: 0 }, news: "Document Doctor sees 400 patients a day. Not one of them needed surgery." },
    R: { label: "Ask for the reasoning in writing", fx: { s: 6, k: 6, c: -3, t: -3 }, news: "Reasoning is sent. It's 3 lines, 2 of them the address." },
  });
  add("vote", {
    id: "v_age", who: "🧓", name: "Draft List Entry",
    text: "A voter on the draft list is listed as 124 years old. The memes arrive in 4 seconds.",
    L: { label: "Politely flag the clerical error", fx: { s: 9, k: 6, c: -3, t: -3 }, news: "Error is flagged and fixed. The Commission says: “Clerical.”" },
    R: { label: "Print “124 Not Out” T-shirts", fx: { c: 9, s: 3, t: 6, k: -3 }, news: "T-shirts sell out. Cricket Board wants royalties." },
  });
  add("vote", {
    id: "v_claims", who: "🗂️", name: "Claims and Objections Window",
    text: "A 30-day window to file claims is open. So far: eleven claims. Eleven. In a state of millions.",
    L: { label: "Host claim drives in the park, with documents", fx: { c: 4, s: 8, t: -8, k: 4 }, news: "Claim drive handles 600 claims. Chai vendor handles 2,000 cups." },
    R: { label: "Crowdsource a missing-names spreadsheet", fx: { s: 6, c: 6, t: -4 }, news: "Spreadsheet has 40,000 rows and 3 formatting wars." },
  });
  add("vote", {
    id: "v_misinfo", who: "🔊", name: "Viral Post Duel",
    text: "Post A: “5 crore votes stolen.” Post B: “Everything is perfect.” Both cite sources: “a friend.”",
    L: { label: "Fact-check both sides, calmly", fx: { s: 8, k: 8, c: -6, t: -5 }, news: "Both camps are annoyed. A neutral bystander is delighted." },
    R: { label: "Share the one that suits you", fx: { c: 10, s: -12, k: -6 }, news: "Post goes viral. A week later, it's debunked. Trust takes the hit." },
  });
  add("vote", {
    id: "v_march", who: "🚧", name: "Barricade at the Commission",
    text: "Your march reaches the Commission's office. A barricade, a police line and a very polite megaphone say: “Not beyond this point.”",
    L: { label: "Stop at the barricade; submit a memorandum", fx: { k: 8, s: 6, c: -4, t: -3 }, news: "Memorandum accepted by a clerk who says “I'll pass it on”." },
    R: { label: "Squeeze through the gap", fx: { k: -18, c: 8, s: -8 }, news: "Gap is closed. So is the story's sympathy." },
  });
  add("vote", {
    id: "v_van", who: "🚐", name: "Police Van",
    text: "Some marchers are briefly detained, then released, with tea. A hashtag is born: “#TeaWithPolice”.",
    L: { label: "Go live from the van: a calm statement", fx: { s: 10, k: 4, c: 4, t: -3 }, news: "Statement is calm. Van is not." },
    R: { label: "Sing in the van until they let you out", fx: { c: 6, k: -3, s: 3, t: 4 }, news: "Van's playlist is surprisingly good." },
  });
  add("vote", {
    id: "v_affidavit", who: "📜", name: "Commission Statement",
    text: "“Please submit an affidavit. Also, an affidavit certifying that you read this affidavit.”",
    L: { label: "Provide an affidavit. Of course.", fx: { k: 6, s: 6, t: -8, c: -4 }, news: "Affidavit is neat, notarised and witnessed. Staff are moved." },
    R: { label: "Counter: “Open data, please.”", fx: { s: 9, c: 4, k: -3, t: -3 }, news: "“Open data” becomes the chant of the week." },
  });
  add("vote", {
    id: "v_hearing", who: "⚖️", name: "The Hearing",
    text: "The Supreme Court is hearing a petition. The hearing is 6 hours. The question is: “Which documents count?”",
    L: { label: "Live-thread the hearing, plainly", fx: { s: 9, k: 4, c: 3, t: -6 }, news: "Thread is the clearest summary of the day. It's in the news." },
    R: { label: "Rally outside with law-student volunteers", fx: { c: 8, s: 4, k: -3, t: -4 }, news: "Law students hold a mock hearing. The pigeon is the judge." },
  });
  add("vote", {
    id: "v_dupe", who: "🔍", name: "Volunteer With a Spreadsheet",
    text: "“Boss, I found someone listed in two places. Same photo, two addresses. Nobody's fault? Somebody's fault?”",
    L: { label: "Report it to the local officer with proof", fx: { s: 9, k: 5, t: -4, c: -2 }, news: "Officer fixes it in 4 hours. Both addresses now have chai." },
    R: { label: "Turn it into a “#SpotTheDupe” game", fx: { c: 9, s: 4, k: -5, t: -2 }, news: "The game is fun. The two lists are not." },
  });
  add("vote", {
    id: "v_blo", who: "🏃", name: "Field Officer",
    text: "A volunteer: “The booth-level officer visited 14 houses today in 40 degrees. Honestly, kind of impressive.”",
    L: { label: "Offer to accompany voters as a polite observer", fx: { s: 8, k: 6, t: -6, c: 0 }, news: "Officer: “Do you have a chair?” Observers bring two." },
    R: { label: "Praise the officers publicly; ask for more time and staff", fx: { s: 7, k: 8, c: -3, t: -3 }, news: "Officers' union tweets a thank-you. Nobody expects it." },
  });
  add("vote", {
    id: "v_slogan", who: "🪧", name: "Slogan Battle",
    text: "Two slogans are trending: “CHORI!” and “HOUSEKEEPING!” Your sign says: “SHOW YOUR MATH.”",
    L: { label: "Stick with “Show Your Math”", fx: { s: 9, k: 6, c: -4, t: -2 }, news: "Math teachers adopt the sign. So do both sides, grudgingly." },
    R: { label: "Pick a side; the crowd will love it", fx: { c: 14, s: -10, k: -6 }, news: "Crowd roars. Half the country stops listening." },
  });
  add("vote", {
    id: "v_young", who: "🧑‍🎓", name: "New 18-Year-Olds",
    text: "“We want to vote! Which form? Which line? Which planet?”",
    L: { label: "Set up a voter-registration pop-up", fx: { c: 8, s: 8, t: -7, k: 4 }, news: "Pop-up registers 600 new voters and 1 pigeon (rejected)." },
    R: { label: "Make a 30-second explainer reel", fx: { c: 8, s: 6, t: -3, k: -2 }, news: "Reel is catchy. Link in bio: actual voter-registration page." },
  });
  add("vote", {
    id: "r_chai_low", when: function (m) { return m.t < 28; }, who: "☕", name: "Chai Uncle",
    text: "Emergency! We're out of milk. Morale is looking... decaffeinated.",
    L: { label: "Switch to lemon tea", fx: { t: 10, k: -3, s: 3, c: -2 }, news: "Lemon tea: sour, but sincere." },
    R: { label: "Crowdfund 500 litres of milk", fx: { t: 20, s: 3, c: -5 }, news: "Crowdfund hits the goal in 4 minutes. Milk arrives in 4 hours." },
  });
  add("vote", {
    id: "r_chai_high", when: function (m) { return m.t > 72; }, who: "☕", name: "Chai Uncle",
    text: "Folks are vibrating. Someone is talking at 2x speed.",
    L: { label: "Donate extra chai to hospital volunteers", fx: { t: -14, s: 8, k: 3 }, news: "Hospital volunteers receive chai and a moment of calm." },
    R: { label: "Chai-drinking contest", fx: { t: -8, c: 7, k: -6 }, news: "Winner: 11 cups. Prize: a nap." },
  });

  K.cards = K.cards.concat(C);
})(typeof window !== "undefined" ? window : globalThis);
