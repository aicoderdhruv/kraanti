/* Kraanti content: causes, cards, endings, facts.
   Meters: c = Crowd, s = Public Love (sympathy), k = Calm, t = Chai (morale).
   Each card: who (emoji), name, text, L / R = { label, fx:{c,s,k,t}, news }.
   Cards with `when` are "rescue" cards that appear when a meter drifts to an extreme.
   {demand} in text is replaced with the player's demand.
   Content rules: punch up at systems (paperwork, spin, committees), never at real people,
   parties or groups. Violence is never the winning move. */
(function (root) {
  var K = (root.KRAANTI = root.KRAANTI || {});

  K.meters = {
    c: { icon: "👥", name: "Crowd" },
    s: { icon: "📣", name: "Public Love" },
    k: { icon: "🕊️", name: "Calm" },
    t: { icon: "☕", name: "Chai" },
  };

  K.cards = [
    // ---------- Bureaucracy & the Ministry ----------
    {
      id: "forms", who: "📋", name: "Clerk Stampwala",
      text: "To hold a gathering you need Form 27-B. Form 27-B requires a gathering permit. The gathering permit requires Form 27-B.",
      L: { label: "Fill every form, in triplicate", fx: { c: -4, s: 8, k: 6, t: -8 }, news: "Clerk faints on receiving 81 perfectly filled forms." },
      R: { label: "Display the loop as an exhibit", fx: { c: 7, s: 6, k: -4, t: -3 }, news: "“Gallery of Absurd Paperwork” opens on the footpath. Entry free." },
    },
    {
      id: "committee", who: "🏛️", name: "Under-Secretary of Pending Matters",
      text: "Wonderful news! We've set up a Dialogue Committee. It meets in the year 2031 (tentative).",
      L: { label: "Decline politely", fx: { s: 6, c: 4, k: -4 }, news: "“We said no thank you,” says organiser. Ministry hears “maybe”." },
      R: { label: "Accept and demand dates", fx: { s: -4, c: -5, k: 8 }, news: "Dates demanded. Ministry reschedules the scheduling." },
    },
    {
      id: "paid", who: "🎤", name: "Minister Windbag",
      text: "Press release: “These protesters are paid actors.”",
      L: { label: "Invite him to count us", fx: { c: 8, s: 6, k: -6, t: -3 }, news: "Minister declines to count. “Not on my schedule.”" },
      R: { label: "Publish a polite fact sheet", fx: { s: 8, k: 5, c: -5, t: -6 }, news: "Fact sheet gets 4M views and one angry email from the Minister's cousin." },
    },
    {
      id: "phone", camps: ["neet", "vote"], who: "📱", name: "Spokesperson Dr. Spin",
      text: "Official statement: “Youth have smartphones, therefore have no problems.”",
      L: { label: "Reply: “My phone is at 2%, like my hope.”", fx: { s: 10, c: 6, k: -6, t: -4 }, news: "Reply gets more likes than the Ministry's entire year." },
      R: { label: "Host a phones-down picnic", fx: { c: -6, k: 8, t: 6, s: 4 }, news: "Everyone talks to each other. Unsettling but nice." },
    },
    {
      id: "photoop", who: "🤳", name: "Minister Windbag",
      text: "The Minister arrives, takes 40 selfies with your signs, and leaves in 90 seconds.",
      L: { label: "Hand him the petition mid-selfie", fx: { s: 9, c: -3, k: 3, t: -4 }, news: "Petition accepted. Minister's smile frozen at 71%." },
      R: { label: "Photobomb: “ACTION > SELFIES”", fx: { c: 8, s: 6, k: -5 }, news: "Photobomb photo now the Ministry's most-shared image." },
    },
    {
      id: "committee2", who: "🌀", name: "Under-Secretary of Pending Matters",
      text: "We've formed a Committee to Examine your demand. We have also formed a Committee to Examine that Committee.",
      L: { label: "Request a Committee on the Committee on the Committee", fx: { s: 8, k: 4, c: -3, t: -3 }, news: "Committee count passes the number of people it serves." },
      R: { label: "Thank-you card, with a deadline", fx: { k: 6, s: 4, t: -6, c: -2 }, news: "Card is very polite. Deadline is very real." },
    },
    {
      id: "noise", who: "🔇", name: "Municipal Noise Inspector",
      text: "Loudspeakers are banned after 10 PM. Singing is allowed. Humming is “under review”.",
      L: { label: "Go unplugged: acoustic jam", fx: { k: 6, s: 7, c: -5, t: -4 }, news: "Unplugged set is, annoyingly, better." },
      R: { label: "Silent protest with phone-torch signs", fx: { s: 10, c: 3, k: 3, t: -8 }, news: "A thousand tiny lights. The Ministry has no rule against lights." },
    },
    {
      id: "leak", who: "📄", name: "Anonymous Intern",
      text: "I found a memo: “Ignore the youth until semester ends.” What do we do?",
      L: { label: "Publish it with a calm caption", fx: { s: 14, k: -5, c: 6, t: -4 }, news: "Memo now has more readers than the Ministry's website." },
      R: { label: "Frame it, gift it at the meeting", fx: { s: 8, k: 5, c: 3, t: -6 }, news: "Memo is framed. Ministry is, too." },
    },
    {
      id: "app", camps: ["neet", "vote"], who: "💻", name: "Youth Grievance App",
      text: "The Ministry launches the Youth Grievance App. Step 1: solve 14 CAPTCHAs. Step 2: app crashes.",
      L: { label: "Try it. Document the crashing.", fx: { s: 9, k: 4, t: -9, c: -2 }, news: "“Select all traffic lights” becomes a protest chant." },
      R: { label: "Hand-deliver a paper petition", fx: { s: 7, c: 7, t: -6 }, news: "Paper beats pixels. Again." },
    },
    {
      id: "deepfake", who: "🎭", name: "Mystery Video",
      text: "A deepfake of you endorsing “Pizza Palace” goes viral. You look oddly good.",
      L: { label: "Laugh it off, post the real video", fx: { s: 7, c: 7, k: -4, t: -3 }, news: "Pizza Palace sponsors nothing. Pizza Palace sees a spike anyway." },
      R: { label: "Calm fact-check thread", fx: { s: 9, k: 5, c: -4, t: -5 }, news: "Thread is long, sourced and, shockingly, read." },
    },
    {
      id: "estimate", who: "🔢", name: "Official Crowd Estimate",
      text: "Ministry: “Turnout: a few dozen.” Your clicker app: 40,000.",
      L: { label: "Publish a live public counter", fx: { s: 9, c: 3, k: 3, t: -6 }, news: "Ministry counts the counter. Doesn't match. Blames the counter." },
      R: { label: "Rooftop drone photo", fx: { c: 9, s: 6, k: -3, t: -3 }, news: "Photo is epic. Ministry: “Looks photoshopped.”" },
    },
    {
      id: "party", who: "🎪", name: "Political Party Rep",
      text: "We'd LOVE to host your protest on our stage! (with our logo, our flags and our speaker list).",
      L: { label: "Decline: we're non-partisan", fx: { s: 4, c: -8, k: 5, t: -3 }, news: "“Our cause belongs to everyone,” says organiser. Rep sulks off." },
      R: { label: "Accept the mic", fx: { c: 14, s: -14, t: 6, k: -2 }, news: "Bigger stage. Smaller message." },
    },

    // ---------- Logistics & crowd life ----------
    {
      id: "megaphone", who: "📢", name: "Pia, Head Volunteer",
      text: "We have 400 volunteers and 3 megaphones.",
      L: { label: "Run a megaphone rota", fx: { k: 7, t: -5, c: 3 }, news: "Rota works. Someone invents “megaphone etiquette”." },
      R: { label: "Order 50 more, on credit", fx: { c: 10, t: -10, s: 4, k: -3 }, news: "Fifty megaphones. Zero listening." },
    },
    {
      id: "chaiuncle", camps: ["neet", "vote"], who: "☕", name: "Chai Uncle",
      text: "Free chai for everyone today! Pay me back when the Ministry listens.",
      L: { label: "Pay him fairly. Fair trade.", fx: { t: 8, s: 8, c: -3, k: 3 }, news: "Chai Uncle: “Honest protesters? Print that.”" },
      R: { label: "Free chai? YES.", fx: { t: 16, c: 7, s: -3 }, news: "Chai queue longer than the speeches queue." },
    },
    {
      id: "rain", who: "🌧️", name: "Weather Auntie",
      text: "Heavy rain forecast. Dramatic, but wet.",
      L: { label: "Indoor sing-along instead", fx: { c: -8, k: 8, t: 6 }, news: "Sing-along goes late. Neighbours join in. Some neighbours." },
      R: { label: "March with umbrellas. Aesthetic.", fx: { c: 8, s: 9, t: -12, k: -3 }, news: "Rainbow of umbrellas makes the front page. Soggy shoes don't." },
    },
    {
      id: "rumour", who: "📲", name: "Forward-Uncle (family group)",
      text: "A forwarded message says the protest is cancelled. It also says guava cures everything.",
      L: { label: "Ignore it. He's always wrong.", fx: { c: -10, t: 4 }, news: "Half the crowd stays home due to “guava logic”." },
      R: { label: "Send a calm voice note", fx: { c: 6, s: 4, t: -8 }, news: "Voice note spreads. So does a second guava rumour." },
    },
    {
      id: "counter", who: "🥁", name: "Rival Group",
      text: "A rival group arrives with flags and very loud drums.",
      L: { label: "Offer chai and a respectful debate", fx: { s: 12, k: 5, t: -8, c: -4 }, news: "Debate ends in a draw and one shared samosa." },
      R: { label: "Chant louder", fx: { k: -12, c: 6, s: -5, t: -4 }, news: "Headline: “Two Noises, Zero Points.”" },
    },
    {
      id: "heckler", who: "🚗", name: "Man in a Honking Car",
      text: "“GET A JOB!” he yells, honking. He also appears to be on a Tuesday afternoon commute.",
      L: { label: "Hold your sign higher and smile", fx: { k: 8, s: 4, c: -4 }, news: "Sign: “I have a job. I'm also doing this.”" },
      R: { label: "Witty comeback (goes viral)", fx: { s: 10, c: 6, k: -9 }, news: "Comeback viewed 3M times. Man is now a meme. Is that okay?" },
    },
    {
      id: "rocky", who: "💪", name: "Rocky, Eager Volunteer",
      text: "Bro, let's flip that barricade. Just a LITTLE bit.",
      L: { label: "Hand him a drum. Solo time.", fx: { k: 8, c: 3, t: -5 }, news: "Rocky discovers a talent. Neighbours discover earplugs." },
      R: { label: "Okay, but just a little", fx: { k: -25, c: 8, s: -12 }, news: "Barricade flipped. Your message wasn't." },
    },
    {
      id: "police", who: "👮", name: "Constable Dev",
      text: "“Please keep one lane clear. We're all here till 8 anyway.”",
      L: { label: "Offer him chai and clear a lane", fx: { k: 10, s: 6, t: -5, c: -4 }, news: "Photo of officer with chai ends up on 10,000 phones." },
      R: { label: "Livestream: “Police being nice #nofilter”", fx: { s: 10, c: 6, k: -5 }, news: "Stream gets 2M views. Constable gets 2M awkward waves." },
    },
    {
      id: "speeches", who: "🎙️", name: "MC Mic-Hog",
      text: "Speeches have been going for 4 hours. Someone is asleep on a drum.",
      L: { label: "Cap speeches at 3 minutes", fx: { c: 8, k: 3, s: 3, t: -4 }, news: "Three-minute rule leads to the best speech yet." },
      R: { label: "Let him finish, it's his moment", fx: { c: -10, k: 5, s: -5, t: 4 }, news: "He finished. Eventually. Cheering was mostly relief." },
    },
    {
      id: "influencer", who: "🤳", name: "@ChaiAndChill (2M followers)",
      text: "Wanna collab? SparkleCola would love a tie-up. You'd get “exposure”.",
      L: { label: "Decline: not for sale", fx: { s: 6, c: -8, k: 3, t: -4 }, news: "Influencer posts a sad face. Ministry posts a confused one." },
      R: { label: "Accept the collab", fx: { c: 16, s: -10, t: 8, k: -3 }, news: "Crowd up. Sincerity down. Cola up." },
    },
    {
      id: "anchor", who: "📺", name: "TV Anchor",
      text: "LIVE! You have five seconds to tell us which side you're on! GO!",
      L: { label: "Calm one-line statement", fx: { s: 8, t: -4, k: 4, c: -3 }, news: "One line. Played on loop. Anchor looks irritated." },
      R: { label: "Sarcastic quip", fx: { c: 8, s: 4, k: -8 }, news: "Quip trends. Calm does not." },
    },
    {
      id: "slogan", who: "🖍️", name: "Pia, Head Volunteer",
      text: "Slogan time! One cardboard, glitter, 12 markers. Rhyme or pun?",
      L: { label: "Rhyme: “Hear us out, don't shut us out!”", fx: { s: 9, c: 3, t: -5 }, news: "Rhyme catches on. Chant is learned by lunchtime." },
      R: { label: "Pun: “We're not dropouts, we're drop-INS!”", fx: { c: 9, s: 3, k: -3, t: -3 }, news: "Pun gets a groan, a laugh and 5,000 reposts." },
    },
    {
      id: "grandma", who: "👵", name: "Grandma Kamala",
      text: "I marched in my day. Also, I brought snacks.",
      L: { label: "Make her the spokesperson", fx: { s: 12, k: 4, t: -6, c: 3 }, news: "Grandma outshines three ministers. On mute." },
      R: { label: "Share her laddoos with everyone", fx: { t: 14, c: 5, k: -3 }, news: "Laddoos vanish in 11 minutes. Peace is delicious." },
    },
    {
      id: "shop", camps: ["neet", "vote"], who: "🏪", name: "Shopkeeper Mehta",
      text: "Your crowd is blocking my shop entrance. Nothing personal. (A little personal.)",
      L: { label: "Move 10 metres, apologise", fx: { k: 6, s: 8, c: -5 }, news: "Shopkeeper joins in at lunch. Brings samosas." },
      R: { label: "Buy all his samosas as an apology", fx: { t: 11, s: 7, k: -2, c: 0 }, news: "Sold out by 2 PM. Shopkeeper: “Come back tomorrow.”" },
    },
    {
      id: "interview", who: "📝", name: "Journalist",
      text: "Honest question: what's your plan after Day 30?",
      L: { label: "“Plan? We'll see.” (laughs)", fx: { s: 7, c: 7, k: -3 }, news: "“Relatable,” says internet. “Worrying,” says policy desk." },
      R: { label: "Present a 10-point policy brief", fx: { s: 9, c: -7, t: -5, k: 4 }, news: "Brief praised by experts. Nobody under 30 reads past point 3." },
    },
    {
      id: "banner", who: "🎨", name: "Banner Committee",
      text: "Half the volunteers want blue banners. Half want green. Both sides are very civil. It is terrifying.",
      L: { label: "Hold a vote. Democracy!", fx: { k: 8, s: 5, t: -6, c: -3 }, news: "Vote result: tie. Then a recount. Then tea." },
      R: { label: "Both. Tie-dye.", fx: { c: 8, k: -4, s: 3, t: 5 }, news: "Tie-dye banners look suspiciously expensive." },
    },
    {
      id: "sleep", who: "😴", name: "You (Exhausted)",
      text: "You haven't slept in 38 hours. You keep seeing signs everywhere. Technically, they are signs.",
      L: { label: "Sleep 6 hours", fx: { t: 12, c: -7, k: 4 }, news: "Organiser wakes up. The movement did not collapse. Surprising." },
      R: { label: "One more all-nighter", fx: { c: 8, t: -12, k: -6, s: 3 }, news: "Late-night poster shows productivity, and typos." },
    },
    {
      id: "udhr", who: "⚖️", name: "Law Student Arjun",
      text: "Fun fact: Article 20 of the Universal Declaration of Human Rights protects the right to peaceful assembly.",
      L: { label: "Print it on 500 posters", fx: { s: 10, t: -8, c: 3, k: 3 }, news: "Posters up. Lawyers nod. Pigeons unimpressed." },
      R: { label: "Put it on a T-shirt, sell for $5", fx: { c: 8, t: 7, k: -3 }, news: "T-shirt sells out. Ironically, you're now merch." },
    },
    {
      id: "heat", who: "🌞", name: "Medic Volunteer",
      text: "Heatwave. Someone fainted. Three people discovered the only shade.",
      L: { label: "Water stations and shift breaks", fx: { k: 6, t: -3, s: 5, c: -5 }, news: "Water stations become the most popular spot. Of course." },
      R: { label: "Keep going, we're tough", fx: { c: 8, k: -10, t: -6 }, news: "Tough, yes. Also sunburnt." },
    },
    {
      id: "mom", camps: ["neet", "vote"], who: "📞", name: "Mom (calling, 14th time)",
      text: "Beta, I saw you on TV. Did you eat?",
      L: { label: "Pick up: “Yes Mom, I'm fine.”", fx: { t: 12, c: -4, k: 4 }, news: "Mom now has 40 followers. She posts in all caps." },
      R: { label: "Let it ring. Revolution first.", fx: { c: 4, k: -4, t: -5 }, news: "Mom has joined the protest. You can't hide." },
    },
    {
      id: "drone", who: "🚁", name: "Mystery Drone",
      text: "A drone is circling. Is it surveillance or a very confused pizza delivery?",
      L: { label: "Wave politely", fx: { k: 6, s: 7 }, news: "Drone waves back? Unclear. Possibly a gust." },
      R: { label: "Hold up a sign: “HI MINISTRY”", fx: { s: 9, c: 6, k: -4, t: -4 }, news: "Sign seen by Ministry. Acknowledged by nobody." },
    },
    {
      id: "students", camps: ["neet", "vote"], who: "🎓", name: "Student Union",
      text: "Tomorrow is the mid-semester exam. Half of us are protesting, half are crying.",
      L: { label: "Rest day: study circles in the park", fx: { c: -8, t: 9, s: 6, k: 4 }, news: "Study circles double as a sit-in. Quietly effective." },
      R: { label: "Study-protest hybrid: “Civics Chapter 4”", fx: { c: 8, s: 7, t: -9 }, news: "Chapter 4 is about this exact thing. Spooky." },
    },
    {
      id: "busker", who: "🎸", name: "Busker Bunty",
      text: "I wrote a protest song! It's 11 minutes. It has a key change.",
      L: { label: "Let Bunty perform it all", fx: { c: 8, s: 6, k: 3, t: -8 }, news: "Song goes viral. Key change goes viral separately." },
      R: { label: "Edit it down to 2 minutes", fx: { c: -5, s: 3, k: 6, t: 4 }, news: "Two minutes. Bunty calls it “tragic”. Crowd calls it “perfect”." },
    },

    // ---------- Rescue cards (appear when a meter hits an extreme) ----------
    {
      id: "r_calm_low", when: function (m) { return m.k < 28; }, who: "😬", name: "Pia, Head Volunteer",
      text: "Everyone is on edge. Someone just said “hmm” aggressively.",
      L: { label: "Group singalong", fx: { k: 16, t: -5, c: 3 }, news: "Singalong cools tempers. And your throat." },
      R: { label: "Silent sit-down", fx: { k: 14, c: -5, s: 5 }, news: "Silence is loud. Ministry hears it anyway." },
    },
    {
      id: "r_crowd_low", when: function (m) { return m.c < 28; }, who: "🦗", name: "Pia, Head Volunteer",
      text: "Where is everyone? “Exams.” Also, it's Friday.",
      L: { label: "Move the rally to the weekend", fx: { c: 16, t: -4, s: -3 }, news: "Weekend turnout is up. So is the number of dogs." },
      R: { label: "Bring-a-friend flash mob", fx: { c: 14, k: -5, t: -6, s: 3 }, news: "Everyone brought a friend. One brought a goat." },
    },
    {
      id: "r_love_low", when: function (m) { return m.s < 28; }, who: "🚗", name: "Stuck Commuter",
      text: "Honestly? You're blocking my commute AND my podcast.",
      L: { label: "Community clean-up day", fx: { s: 16, t: -8, c: -3, k: 3 }, news: "City is cleaner. Public opinion is, too." },
      R: { label: "Free biscuits for stuck commuters", fx: { s: 12, t: -6, c: 3 }, news: "Biscuit diplomacy succeeds. Podcast resumes." },
    },
    {
      id: "r_crowd_high", when: function (m) { return m.c > 72; }, who: "🚒", name: "Fire Marshal",
      text: "Venue capacity is 500. Current crowd: “yes”.",
      L: { label: "Split into three groups", fx: { c: -14, k: 4, s: 4 }, news: "Three groups, three perspectives, one very smooth day." },
      R: { label: "We're just standing close. Cozy.", fx: { c: 4, k: -10, s: -3 }, news: "Cozy turns to squish. Squish turns to “that's enough.”" },
    },
    {
      id: "r_love_high", when: function (m) { return m.s > 72; }, who: "🌟", name: "PR Agency",
      text: "You're famous! A cereal brand wants you to say “it's grrreat!”.",
      L: { label: "Decline everything", fx: { s: -10, k: 4, c: 3 }, news: "Cereal brand: “Tragically, we respect that.”" },
      R: { label: "One ad, fee donated to a library", fx: { s: -6, t: 10, c: 6, k: -3 }, news: "Ad is cringey. Library is new." },
    },
    {
      id: "r_calm_high", when: function (m) { return m.k > 72; }, who: "😴", name: "Pia, Head Volunteer",
      text: "It's so peaceful that three people are asleep and one is doing yoga.",
      L: { label: "Surprise flash-mob dance!", fx: { k: -14, c: 8, s: 4, t: -4 }, news: "Dance goes viral. Choreography does not." },
      R: { label: "Hand out kazoos", fx: { k: -12, s: 6, c: 4, t: -3 }, news: "Kazoo orchestra is deafening, but joyful." },
    },
  ];

  K.endings = {
    "c-": { emoji: "🐦", title: "Just You and a Pigeon", text: "Turnout dropped to one organiser and one very supportive pigeon. History will remember the pigeon." },
    "c+": { emoji: "🚒", title: "Fire Marshal Says No", text: "So many people showed up that the capacity sign started crying. Shut down for being too popular. Next time: split into smaller groups." },
    "s-": { emoji: "📉", title: "Trending for the Wrong Reasons", text: "Public love hit rock bottom. Your hashtag is now a meme about parking. Bring people with you, not against you." },
    "s+": { emoji: "🧢", title: "Sold Out", text: "You're so famous you now have a sponsor, a mascot and a limited-edition hoodie (3 payments of $19.99). Nobody remembers the demand." },
    "k-": { emoji: "🔥", title: "It Got Heated", text: "Tempers flared, the message got lost, and tomorrow's headline is about the chaos, not your cause. Nonviolence isn't weakness. It's the whole strategy." },
    "k+": { emoji: "🧘", title: "Accidentally Started a Yoga Retreat", text: "So calm. So peaceful. So... asleep. The Ministry thanks you for the nap. Add a little energy next time." },
    "t-": { emoji: "🫖", title: "Out of Chai, Out of Steam", text: "Morale collapsed. Movements march on their stomachs, and yours is empty. Everyone went home for tea." },
    "t+": { emoji: "🎡", title: "Chai Festival", text: "Everyone's so full of snacks that the protest became a street fair. Delicious. Zero policy outcomes." },
    win_high: { emoji: "🏆", title: "The Minister Agrees to Meet You", text: "Day 30. The Ministry schedules a real meeting. It will be postponed twice, but still. You did it: peacefully, wittily, democratically." },
    win_mid: { emoji: "📁", title: "A Committee Has Been Formed", text: "The Ministry forms a Committee to Examine your demand. Not a win, but a named committee is more than most get. Round two?" },
    win_low: { emoji: "😅", title: "Technically Survived", text: "You made it to Day 30, barely, with one meter hanging on for dear life. The Minister says “we noted it”. Keep your movement balanced and go again." },
  };

  K.facts = [
    "Article 20 of the Universal Declaration of Human Rights recognises the right to peaceful assembly and association.",
    "Researchers Chenoweth and Stephan studied hundreds of campaigns (“Why Civil Resistance Works”, 2011) and found nonviolent ones were about twice as likely to succeed as violent ones.",
    "Gandhi's 1930 Salt March covered roughly 240 miles (about 390 km) on foot over around 24 days. Nobody had to download an app.",
    "Real-life tip: know your local rules, stay peaceful, tell someone where you'll be, and look out for the people around you.",
  ];
})(typeof window !== "undefined" ? window : globalThis);
