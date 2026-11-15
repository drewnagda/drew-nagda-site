// Grind coaching content. Every track teaches first ("how to get better"),
// then turns the lesson into a short list of daily reps.

export type Action = { id: string; text: string; how?: string };
export type Pro = { name: string; lesson: string; search: string };
export type Track = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  headline: string;
  principles: { title: string; body: string }[];
  pros?: Pro[];
  resources?: { label: string; url: string }[];
  actions: Action[];
  tips: string[];
};

export const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const TRACKS: Track[] = [
  {
    id: "catcher",
    name: "Baseball catcher",
    emoji: "🧤",
    blurb: "Mason's original: a young catcher learning from the pros.",
    headline: "How to get better at catching",
    principles: [
      {
        title: "Blocking: keep it in front",
        body: "You are not trying to catch a ball in the dirt. You are trying to stop it. Drop to both knees, put your glove between your legs to close the gap, lean your chest forward over the ball, round your shoulders and tuck your chin. The ball should hit you and die in front of the plate. On balls to the side, angle your chest back toward home.",
      },
      {
        title: "Framing: quiet glove, still head",
        body: "Let the ball travel and catch it, do not reach out and stab at it. Keep your head still and your glove relaxed until the last moment, then catch the outside part of the ball and stick it for one second. Never yank the glove back toward the middle: umpires see that. On low pitches, get your glove under the ball and lift slightly.",
      },
      {
        title: "Footwork and the transfer",
        body: "A fast throw to second starts with your feet set before the pitch. Get the ball out of your glove near the middle of your chest, keep your arm path short, and step toward your target. Pop time is the stopwatch from the pitch hitting your glove to the ball reaching second. Elite big leaguers are under 2 seconds. Time yours and try to beat it.",
      },
      {
        title: "Be the leader on the field",
        body: "The catcher is the only player who sees the whole field. Know the count and the outs, talk to your pitcher between batters, and back up first base on ground balls when nobody is on.",
      },
    ],
    pros: [
      { name: "William Contreras", lesson: "Keeps the ball close and in front when he blocks.", search: "William Contreras catcher blocking" },
      { name: "Patrick Bailey", lesson: "One of the best framers in baseball. Watch how still his glove is.", search: "Patrick Bailey catcher framing" },
      { name: "J.T. Realmuto", lesson: "Lightning pop times. Watch his feet, not his arm.", search: "J.T. Realmuto pop time throw to second" },
      { name: "Cal Raleigh", lesson: "Leads his pitching staff and still hits for power.", search: "Cal Raleigh catcher highlights" },
    ],
    actions: [
      {
        id: "block",
        text: "10 minutes of blocking drills",
        how: "Have someone toss tennis balls into the dirt in front of you, or bounce them off a wall. Drop to your knees, glove between your legs, chest over the ball, chin down. 3 sets of 10. Win = the ball dies in front of you.",
      },
      {
        id: "frame",
        text: "10 minutes of framing practice",
        how: "With a partner or a pitching machine, catch 30 pitches with a quiet glove. Hold every catch for one full second. No yanking the glove toward the middle.",
      },
      {
        id: "transfer",
        text: "25 quick transfers from your crouch",
        how: "Start in your stance. Pop up, move the ball from glove to throwing hand near your chest, and step toward your target. Speed comes from clean, not rushed. Time five of them.",
      },
      {
        id: "watch",
        text: "Watch one pro highlight and write down one thing to copy",
        how: "Open Game plan and tap a pro. Watch one clip twice: once for fun, once watching only their glove or feet. Write one sentence: 'I am going to copy how ___ does ___.'",
      },
    ],
    tips: [
      "Chin down when you block. A tucked chin keeps the ball off your throat and your eyes on it.",
      "Catch the outside half of the ball. It keeps borderline strikes looking like strikes.",
      "Feet first, arm second. A great throw to second starts with your feet.",
      "Talk to your pitcher. A quick 'you got this' between batters is part of the job.",
      "Relaxed hands are fast hands. Squeeze the glove only at the last moment.",
      "Know the count and the outs before every pitch. Catchers run the field.",
      "When a ball gets past you, sprint to it and turn to the glove side to throw.",
    ],
  },
  {
    id: "hitter",
    name: "Baseball hitter",
    emoji: "⚾",
    blurb: "Better swings, better eye, more line drives.",
    headline: "How to get better at hitting",
    principles: [
      { title: "Balance before power", body: "A good swing starts from a balanced load: weight slightly back, head still, hands ready. If you fall over after you swing, you were swinging too hard. Hit line drives, not home runs." },
      { title: "Track the ball", body: "Watch the ball from the pitcher's hand all the way in. Keep your head still and down through contact. Great hitters see the ball longer." },
      { title: "Short to the ball", body: "Get the bat head to the ball on the shortest path. Lead with your hands, keep your back elbow tight, and hit through the ball toward the middle of the field." },
      { title: "Know your zone", body: "Swing at strikes you can drive. Taking a ball is a win, not a failure. Juan Soto built a career on this." },
    ],
    pros: [
      { name: "Freddie Freeman", lesson: "One of the smoothest, most balanced swings in baseball.", search: "Freddie Freeman swing slow motion" },
      { name: "Juan Soto", lesson: "Elite plate discipline. Watch how he takes pitches.", search: "Juan Soto plate discipline" },
      { name: "Shohei Ohtani", lesson: "Power from a quiet, balanced setup.", search: "Shohei Ohtani swing breakdown" },
    ],
    actions: [
      { id: "tee", text: "50 tee swings aiming for line drives", how: "Set the tee at the front of the plate. Aim every swing back up the middle. Count how many are true line drives and try to beat that number tomorrow." },
      { id: "dry", text: "25 slow dry swings in front of a mirror", how: "Swing at half speed and check: head still, balanced finish, back elbow tight. Slow and perfect beats fast and sloppy." },
      { id: "toss", text: "30 soft toss or front toss swings", how: "With a partner, hit soft tosses into a net or fence. Watch the ball hit the bat on every swing." },
    ],
    tips: [
      "See it early. Pick up the ball at the pitcher's release point.",
      "A balanced finish is a sign of a good swing.",
      "Line drives up the middle win games.",
      "Taking ball four is the same as a single.",
      "Hands inside the ball. Short path, fast bat.",
    ],
  },
  {
    id: "study",
    name: "Study",
    emoji: "📚",
    blurb: "For school, exams, or learning anything new.",
    headline: "How to actually study (the research version)",
    principles: [
      { title: "Test yourself, do not just reread", body: "Rereading and highlighting feel productive but barely help. Pulling the answer out of your own head is what locks it in. Learning scientists call this retrieval practice, and it is the single best study habit there is." },
      { title: "Space it out", body: "Three 20-minute sessions across three days beat one hour the night before. Your brain needs time between reps, just like muscles." },
      { title: "Mix it up", body: "Practice different kinds of problems in one session instead of 20 of the same type. It feels harder, and that is why it works." },
      { title: "Teach it back", body: "If you can explain it out loud to a friend in simple words, you know it. If you get stuck, that is exactly what to study next." },
      { title: "Phone in another room", body: "Research shows a phone on your desk drains focus even when it is face down and silent. Out of sight, out of mind." },
    ],
    resources: [
      { label: "Khan Academy: free lessons and practice in every subject", url: "https://www.khanacademy.org" },
      { label: "The Learning Scientists: six proven ways to study", url: "https://www.learningscientists.org/downloadable-materials" },
    ],
    actions: [
      { id: "focus", text: "25-minute focus block, phone in another room", how: "Set a timer for 25 minutes. Work on one thing only. When the timer rings, take a 5-minute break. That is one rep." },
      { id: "quiz", text: "Quiz yourself: 10 questions from memory", how: "Before you open your notes, write down or say everything you remember. Then check. The things you missed are your study list." },
      { id: "teach", text: "Teach it back out loud in 2 minutes", how: "Explain today's topic to a parent, a friend, or your dog. Simple words only. Where you got stuck is what to review." },
    ],
    tips: [
      "Struggling to remember is how remembering gets stronger.",
      "Short sessions on many days beat one long cram.",
      "Sleep is when your brain saves what you studied.",
      "Do the hardest subject first, while your brain is fresh.",
      "Make flashcards with the question on one side only. Answer before you flip.",
    ],
  },
  {
    id: "fit",
    name: "Get fit",
    emoji: "💪",
    blurb: "Everyday habits to feel stronger and have more energy.",
    headline: "How to get fit the smart way",
    principles: [
      { title: "Move 60 minutes a day", body: "Health experts recommend kids and teens get an hour of activity every day: playing sports, biking, running around. It does not have to be all at once." },
      { title: "Form first, then more", body: "Ten good push-ups beat twenty sloppy ones. Get the movement right, then add reps." },
      { title: "A little more each week", body: "Add one rep or a few seconds each week. Small steps stacked up are how strong people got strong." },
      { title: "Recovery is training", body: "Sleep, water, and real food are when your body actually gets stronger. Rest days count." },
    ],
    actions: [
      { id: "cardio", text: "20 minutes of hard play or cardio", how: "Run, bike, swim, shoot hoops, play tag. Anything that gets you breathing hard counts." },
      { id: "circuit", text: "Bodyweight circuit, 3 rounds", how: "Each round: 10 push-ups (knees are fine), 15 squats, and a 20-second plank. Rest one minute between rounds." },
      { id: "recover", text: "Water with every meal and lights out on time", how: "Swap one sugary drink for water and get to bed on time. Recovery is a rep too." },
    ],
    tips: [
      "Good form is the fastest way to get strong.",
      "Add one rep this week. That is how progress works.",
      "Sleep is when muscles rebuild.",
      "Water before you are thirsty.",
      "Some movement beats no movement. Five minutes still counts.",
    ],
  },
  {
    id: "reading",
    name: "Reading",
    emoji: "📖",
    blurb: "Read more, remember more, get smarter every day.",
    headline: "How to become a strong reader",
    principles: [
      { title: "Read what you like", body: "Sports books, comics, biographies, anything. The habit matters more than the book." },
      { title: "Every day beats a lot once", body: "Twenty minutes a day adds up to over a million words a year." },
      { title: "Sum it up", body: "After you read, say what happened in one sentence. If you can, you understood it." },
    ],
    actions: [
      { id: "read", text: "Read for 20 minutes", how: "Any book you like. Set a timer and put the phone away." },
      { id: "sum", text: "Sum up what you read in one sentence", how: "Say it out loud or write it down: 'This chapter was about...'" },
      { id: "word", text: "Look up one new word", how: "Find one word you did not know, look it up, and use it in a sentence today." },
    ],
    tips: [
      "Twenty minutes a day is over a million words a year.",
      "Read about something you love. That is the secret.",
      "If you can sum it up, you understood it.",
    ],
  },
];

export const CUSTOM_TRACK: Track = {
  id: "custom",
  name: "Custom goal",
  emoji: "⭐",
  blurb: "Build your own goal with your own daily actions.",
  headline: "Your plan",
  principles: [
    { title: "Make it tiny", body: "Pick actions so small you can do them on your worst day. You can always do more." },
    { title: "Make it specific", body: "'Practice' is vague. '10 minutes of scales' is a rep you can check off." },
  ],
  actions: [],
  tips: ["Tiny actions done every day beat big plans done once.", "Never miss twice. One miss is an accident, two is a new habit."],
};

export const findTrack = (id: string) => TRACKS.find((t) => t.id === id) ?? CUSTOM_TRACK;

export const LEVELS = [
  { name: "Rookie", at: 0 },
  { name: "Starter", at: 10 },
  { name: "Varsity", at: 30 },
  { name: "All-Star", at: 75 },
  { name: "Pro", at: 150 },
  { name: "Hall of Fame", at: 300 },
];

export const COINS_PER_REP = 10;
export const PERFECT_BONUS = 25;
export const FREEZE_COST = 100;
export const MAX_FREEZES = 2;

export const REWARD_IDEAS = [
  { name: "Pick what's for dinner", cost: 300 },
  { name: "30 minutes extra game time", cost: 400 },
  { name: "Trip to the batting cages", cost: 1000 },
  { name: "New batting gloves", cost: 2500 },
];
