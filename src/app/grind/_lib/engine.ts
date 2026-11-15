// Grind game engine: pure functions over a single saved state.
// Coins, streaks and levels are derived from the daily log, never stored,
// so unchecking a rep can never leave the numbers out of sync.

import { COINS_PER_REP, LEVELS, PERFECT_BONUS, PROPS, findTrack, type Action } from "./content";

export type Goal = { id: string; trackId: string; name: string; emoji: string; actions: Action[] };
export type Day = { done: string[]; plan: string[] };
export type BuddyDay = { r: number; p: number };
export type Buddy = {
  id: string;
  name: string;
  addedAt: string;
  days: Record<string, BuddyDay>;
  streak: number;
  lastSeen?: string;
  lastNote?: string;
  manual?: boolean;
};
export type Reward = { id: string; name: string; cost: number };
export type Redemption = { id: string; name: string; cost: number; at: string };

export type State = {
  v: 1;
  uid: string;
  name: string;
  onboarded: boolean;
  goals: Goal[];
  log: Record<string, Day>;
  frozen: string[];
  freezes: number;
  spent: number;
  rewards: Reward[];
  redeemed: Redemption[];
  badges: Record<string, string>;
  buddies: Buddy[];
  misses: Record<string, string>;
  sound: boolean;
  remindAt: string;
  pinHash?: string;
  propsIn: PropIn[];
  propsOut: Record<string, string[]>;
  propsGiven: number;
};
export type PropIn = { from: string; p: string; d: string };

export const KEY = "grind.v1";

export const rid = () => Math.random().toString(36).slice(2, 10);

export function fresh(): State {
  return {
    v: 1, uid: rid(), name: "", onboarded: false, goals: [], log: {}, frozen: [], freezes: 0, spent: 0,
    rewards: [], redeemed: [], badges: {}, buddies: [], misses: {}, sound: true, remindAt: "16:00", propsIn: [], propsOut: {}, propsGiven: 0,
  };
}

export function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {}
  return fresh();
}

export function save(s: State) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

/* ---------- dates (local time, YYYY-MM-DD) ---------- */
export const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const today = () => ymd(new Date());
export const parse = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
export const addDays = (s: string, n: number) => { const d = parse(s); d.setDate(d.getDate() + n); return ymd(d); };
export const between = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / 86400000);
export const pretty = (s: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) =>
  parse(s).toLocaleDateString("en-US", opts);

/* ---------- derived stats ---------- */
export const repKey = (g: Goal, a: Action) => `${g.id}:${a.id}`;
export const planKeys = (s: State) => s.goals.flatMap((g) => g.actions.map((a) => repKey(g, a)));
export const plannedCount = (s: State) => planKeys(s).length;

/** Toggle one rep for a day and refresh that day's plan snapshot. */
export function toggleRep(s: State, key: string, d = today()): State {
  const day = s.log[d] ?? { done: [], plan: [] };
  const done = day.done.includes(key) ? day.done.filter((k) => k !== key) : [...day.done, key];
  return { ...s, log: { ...s.log, [d]: { done, plan: planKeys(s) } } };
}

/** Keep today's plan in sync after goals or actions change. */
export function syncToday(s: State, d = today()): State {
  const day = s.log[d];
  if (!day) return s;
  const plan = planKeys(s);
  return { ...s, log: { ...s.log, [d]: { done: day.done, plan } } };
}
export const repsOn = (s: State, d: string) => s.log[d]?.done.length ?? 0;
export const showedUp = (s: State, d: string) => repsOn(s, d) > 0;
export const isPerfect = (day?: Day) => !!day && day.plan.length > 0 && day.plan.every((k) => day.done.includes(k));
const counts = (s: State, d: string) => showedUp(s, d) || s.frozen.includes(d);

/** Current streak. Today still counts as "alive" until midnight even with no reps yet. */
export function streak(s: State, t = today()): number {
  let d = counts(s, t) ? t : addDays(t, -1);
  let n = 0;
  while (counts(s, d)) { n++; d = addDays(d, -1); }
  return n;
}

export function bestStreak(s: State): number {
  const days = [...new Set([...Object.keys(s.log).filter((d) => showedUp(s, d)), ...s.frozen])].sort();
  let best = 0, run = 0, prev = "";
  for (const d of days) { run = prev && between(prev, d) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; }
  return best;
}

export const totalReps = (s: State) => Object.values(s.log).reduce((n, d) => n + d.done.length, 0);
export const perfectDays = (s: State) => Object.values(s.log).filter(isPerfect).length;
export const earned = (s: State) => totalReps(s) * COINS_PER_REP + perfectDays(s) * PERFECT_BONUS;
export const coins = (s: State) => earned(s) - s.spent;

export function goalReps(s: State, g: Goal) {
  const pre = `${g.id}:`;
  return Object.values(s.log).reduce((n, d) => n + d.done.filter((k) => k.startsWith(pre)).length, 0);
}

export function level(reps: number) {
  let i = 0;
  while (i + 1 < LEVELS.length && reps >= LEVELS[i + 1].at) i++;
  const cur = LEVELS[i], next = LEVELS[i + 1];
  return { i, name: cur.name, next: next?.name, pct: next ? (reps - cur.at) / (next.at - cur.at) : 1, toGo: next ? next.at - reps : 0 };
}

/* ---------- missed days, freezes, "answer for it" ---------- */
/** Called on open. Spends banked freezes on missed days so a streak survives, Duolingo-style.
 *  Returns the missed days that still need an answer. */
export function reconcile(s: State, t = today()): { state: State; usedFreezes: string[]; unanswered: string[] } {
  const active = Object.keys(s.log).filter((d) => showedUp(s, d) && d < t).sort();
  const last = [...active, ...s.frozen].sort().pop();
  if (!last) return { state: s, usedFreezes: [], unanswered: [] };
  const missed: string[] = [];
  for (let d = addDays(last, 1); d < t; d = addDays(d, 1)) missed.push(d);
  let freezes = s.freezes;
  const usedFreezes: string[] = [];
  // Only bridge the gap if every missed day can be covered; otherwise the streak is gone anyway.
  if (missed.length > 0 && missed.length <= freezes) {
    usedFreezes.push(...missed);
    freezes -= missed.length;
  }
  const state = usedFreezes.length ? { ...s, freezes, frozen: [...s.frozen, ...usedFreezes] } : s;
  // Only the most recent miss needs an answer. Nobody wants to write ten essays.
  const unanswered = usedFreezes.length ? [] : missed.slice(-1).filter((d) => !(d in s.misses));
  return { state, usedFreezes, unanswered };
}

/* ---------- buddies ---------- */
export type Checkin = { v: 1; id: string; n: string; d: string; r: number; p: number; s: number; h: string; m?: string; k?: { to: string; p: string[] }[] };

/** Last 14 days as a bitstring ending today: "1" = showed up. Lets your buddy see your real streak. */
export function history(s: State, t = today(), len = 14) {
  let out = "";
  for (let i = len - 1; i >= 0; i--) out += counts(s, addDays(t, -i)) ? "1" : "0";
  return out;
}

const b64e = (str: string) => btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64d = (str: string) => decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/"))));

export function checkinLink(s: State, origin: string, t = today()) {
  const lastMiss = Object.keys(s.misses).sort().pop();
  const c: Checkin = {
    v: 1, id: s.uid, n: s.name || "Your buddy", d: t, r: repsOn(s, t), p: plannedCount(s), s: streak(s, t), h: history(s, t),
    ...(Object.keys(s.propsOut).length ? { k: Object.entries(s.propsOut).map(([to, p]) => ({ to, p })) } : {}),
    ...(lastMiss && between(lastMiss, t) <= 2 ? { m: `${pretty(lastMiss, { weekday: "long" })}: ${s.misses[lastMiss]}`.slice(0, 220) } : {}),
  };
  return `${origin}/grind?c=${b64e(JSON.stringify(c))}`;
}

export function readCheckin(param: string): Checkin | null {
  try {
    const c = JSON.parse(b64d(param));
    if (c?.v !== 1 || typeof c.id !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(c.d)) return null;
    return {
      v: 1, id: c.id.slice(0, 20), n: String(c.n ?? "Buddy").slice(0, 30), d: c.d,
      r: Math.max(0, Math.min(99, Number(c.r) || 0)), p: Math.max(0, Math.min(99, Number(c.p) || 0)),
      s: Math.max(0, Math.min(9999, Number(c.s) || 0)), h: String(c.h ?? "").replace(/[^01]/g, "").slice(-30),
      m: c.m ? String(c.m).slice(0, 220) : undefined,
      k: Array.isArray(c.k) ? c.k.slice(0, 10).map((x: { to: unknown; p: unknown }) => ({ to: String(x?.to ?? "").slice(0, 20), p: Array.isArray(x?.p) ? x.p.filter((id: unknown) => PROPS.some((q) => q.id === id)).slice(0, 5) : [] })) : undefined,
    };
  } catch { return null; }
}

/** Merge a received check-in into the buddy list (matched by their device id). */
export function applyCheckin(s: State, c: Checkin): { state: State; buddy: Buddy; isNew: boolean; props: string[] } {
  const existing = s.buddies.find((b) => b.id === c.id);
  const days = { ...(existing?.days ?? {}) };
  [...c.h].forEach((bit, i) => {
    const d = addDays(c.d, i - (c.h.length - 1));
    if (bit === "1" && !days[d]) days[d] = { r: 1, p: 0 };
  });
  days[c.d] = { r: c.r, p: c.p };
  const buddy: Buddy = {
    id: c.id, name: c.n, addedAt: existing?.addedAt ?? today(), days, streak: c.s,
    lastSeen: c.d, lastNote: c.m ?? existing?.lastNote,
  };
  const buddies = existing ? s.buddies.map((b) => (b.id === c.id ? buddy : b)) : [...s.buddies, buddy];
  // Props addressed to me. Skip ones already logged from this buddy today so re-opening a link doesn't double count.
  const mine = (c.k ?? []).filter((x) => x.to === s.uid).flatMap((x) => x.p);
  const seen = new Set(s.propsIn.filter((x) => x.from === c.n && x.d === c.d).map((x) => x.p));
  const props = mine.filter((p) => !seen.has(p));
  const propsIn = [...props.map((p) => ({ from: c.n, p, d: c.d })), ...s.propsIn].slice(0, 200);
  return { state: { ...s, buddies, propsIn }, buddy, isNew: !existing, props };
}

export const buddyShowed = (b: Buddy, d: string) => (b.days[d]?.r ?? 0) > 0;

/** Their streak as of today: what they told you, minus any days since that have passed in silence. */
export function buddyStreak(b: Buddy, t = today()) {
  if (!b.lastSeen) return 0;
  const gap = between(b.lastSeen, t);
  if (gap > 1) return 0;
  return b.streak;
}

/** Team streak: consecutive days you BOTH showed up. */
export function teamStreak(s: State, b: Buddy, t = today()) {
  const both = (d: string) => counts(s, d) && buddyShowed(b, d);
  let d = both(t) ? t : addDays(t, -1);
  let n = 0;
  while (both(d)) { n++; d = addDays(d, -1); }
  return n;
}

/* ---------- badges ---------- */
export type Badge = { id: string; name: string; how: string; icon: string; test: (s: State) => boolean };
export const BADGES: Badge[] = [
  { id: "first", name: "First rep", how: "Finish your first action", icon: "✓", test: (s) => totalReps(s) >= 1 },
  { id: "perfect1", name: "Perfect day", how: "Finish every action in one day", icon: "★", test: (s) => perfectDays(s) >= 1 },
  { id: "streak3", name: "On the board", how: "Reach a 3 day streak", icon: "🔥", test: (s) => bestStreak(s) >= 3 },
  { id: "streak7", name: "One week strong", how: "Reach a 7 day streak", icon: "🔥", test: (s) => bestStreak(s) >= 7 },
  { id: "buddy", name: "Better together", how: "Add your first buddy", icon: "🤝", test: (s) => s.buddies.length > 0 },
  { id: "owned", name: "Owned it", how: "Answer for a missed day", icon: "✋", test: (s) => Object.keys(s.misses).length > 0 },
  { id: "coins100", name: "Stacking", how: "Earn 100 coins", icon: "🪙", test: (s) => earned(s) >= 100 },
  { id: "varsity", name: "Varsity", how: "Reach Varsity level in any goal", icon: "🎽", test: (s) => s.goals.some((g) => goalReps(s, g) >= 30) },
  { id: "perfect5", name: "Perfectionist", how: "Have 5 perfect days", icon: "💎", test: (s) => perfectDays(s) >= 5 },
  { id: "team3", name: "Team streak", how: "3 days in a row you and a buddy both show up", icon: "👊", test: (s) => s.buddies.some((b) => teamStreak(s, b) >= 3) },
  { id: "hype", name: "Hype squad", how: "Give your buddies 5 props", icon: "📣", test: (s) => s.propsGiven >= 5 },
  { id: "streak14", name: "Locked in", how: "Reach a 14 day streak", icon: "🔒", test: (s) => bestStreak(s) >= 14 },
  { id: "coins1000", name: "The bank", how: "Earn 1,000 coins", icon: "🏦", test: (s) => earned(s) >= 1000 },
  { id: "streak30", name: "Unbreakable", how: "Reach a 30 day streak", icon: "🏆", test: (s) => bestStreak(s) >= 30 },
  { id: "hof", name: "Hall of Fame", how: "Reach Hall of Fame in any goal", icon: "👑", test: (s) => s.goals.some((g) => goalReps(s, g) >= 300) },
];

/** Award any newly earned badges. Badges, once earned, stay earned. */
export function awardBadges(s: State): { state: State; fresh: Badge[] } {
  const got = BADGES.filter((b) => !s.badges[b.id] && b.test(s));
  if (!got.length) return { state: s, fresh: [] };
  const badges = { ...s.badges };
  got.forEach((b) => (badges[b.id] = today()));
  return { state: { ...s, badges }, fresh: got };
}

/* ---------- goals ---------- */
export function goalFromTrack(trackId: string): Goal {
  const t = findTrack(trackId);
  return { id: `${t.id}-${rid().slice(0, 4)}`, trackId: t.id, name: t.name, emoji: t.emoji, actions: t.actions.map((a) => ({ ...a })) };
}

export function tipFor(g: Goal, d = today()) {
  const tips = findTrack(g.trackId).tips;
  const n = Math.floor(parse(d).getTime() / 86400000);
  return tips[n % tips.length];
}

/* ---------- reminders without a server: a repeating calendar event ---------- */
export function reminderICS(time: string, name: string) {
  const [h, m] = time.split(":").map(Number);
  const start = new Date(); start.setHours(h, m, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const local = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(m)}00`;
  const end = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(Math.min(m + 15, 59))}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Grind AI//Daily reps//EN", "BEGIN:VEVENT",
    `UID:grind-${rid()}@drewnagda.com`, `DTSTAMP:${stamp}`, `DTSTART:${local}`, `DTEND:${end}`, "RRULE:FREQ=DAILY",
    `SUMMARY:🔥 Grind AI: get your reps in${name ? `, ${name}` : ""}`,
    "DESCRIPTION:Open Grind AI and check off today's reps. Don't let the flame go out.",
    "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", "DESCRIPTION:Get your reps in", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

/* ---------- parent PIN (hashed so it isn't sitting in plain text) ---------- */
export async function hashPin(pin: string) {
  const data = new TextEncoder().encode(`grind-pin:${pin}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- demo data: a lived-in account to show people what it looks like ---------- */
export function demoState(): State {
  const t = today();
  const s = fresh();
  s.uid = "demo"; s.name = "Mason"; s.onboarded = true; s.sound = true;
  s.goals = [goalFromTrack("catcher"), goalFromTrack("study")];
  s.goals[0].id = "catcher-demo"; s.goals[1].id = "study-demo";
  const keys = s.goals.flatMap((g) => g.actions.map((a) => `${g.id}:${a.id}`));
  for (let i = 18; i >= 1; i--) {
    if (i === 9) continue; // one honest miss, covered by a freeze
    const d = addDays(t, -i);
    const done = i % 4 === 0 ? keys.slice(0, 4) : keys;
    s.log[d] = { done, plan: keys };
  }
  s.frozen = [addDays(t, -9)];
  s.log[t] = { done: keys.slice(0, 2), plan: keys };
  s.freezes = 1; s.spent = 400;
  s.rewards = [{ id: "r1", name: "Trip to the batting cages", cost: 1000 }, { id: "r2", name: "Pick what's for dinner", cost: 300 }];
  s.redeemed = [{ id: "x1", name: "Pick what's for dinner", cost: 300, at: new Date(Date.now() - 5 * 86400000).toISOString() }];
  s.misses = { [addDays(t, -9)]: "Had a doubleheader and got home late. Drills before school next time." };
  const days: Record<string, BuddyDay> = {};
  for (let i = 12; i >= 0; i--) if (i !== 5) days[addDays(t, -i)] = { r: 3, p: 4 };
  s.buddies = [{ id: "demo-b", name: "Ezra", addedAt: addDays(t, -14), days, streak: 5, lastSeen: t }];
  s.propsIn = [{ from: "Ezra", p: "beast", d: t }, { from: "Ezra", p: "locked", d: addDays(t, -1) }, { from: "Ezra", p: "pro", d: addDays(t, -3) }];
  s.propsGiven = 4;
  return awardBadges(s).state;
}
