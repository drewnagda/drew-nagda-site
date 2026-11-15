"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  COINS_PER_REP, FREEZE_COST, LEVELS, MAX_FREEZES, PERFECT_BONUS, PROPS, REWARD_IDEAS, TRACKS,
  findTrack, propById, yt, type Action,
} from "../_lib/content";
import {
  BADGES, KEY, addDays, demoState, hashPin, applyCheckin, awardBadges, bestStreak, buddyShowed, buddyStreak, checkinLink, coins, earned,
  fresh, goalFromTrack, goalReps, isPerfect, level, load, parse, pretty, readCheckin, reconcile, reminderICS, repKey,
  repsOn, rid, save, streak, syncToday, teamStreak, tipFor, today, toggleRep,
  type Badge, type Buddy, type Checkin, type Goal, type State,
} from "../_lib/engine";

type Tab = "today" | "plan" | "rewards" | "buddies";
/** Runs only after a parent enters (or first sets) the PIN. Gets the latest state so nothing is overwritten. */
export type NeedPin = (title: string, fn: (st: State) => void) => void;
type Pop =
  | { kind: "badge"; badges: Badge[] }
  | { kind: "checkin"; c: Checkin; isNew: boolean; self?: boolean; props?: string[] }
  | { kind: "level"; goal: string; name: string }
  | { kind: "redeem"; name: string; cost: number; at: string }
  | { kind: "perfect" }
  | { kind: "freeze"; days: string[] };

/* ============================== sound + haptics ============================== */
let ctx: AudioContext | null = null;
function chime(on: boolean, notes: number[] = [880, 1320]) {
  if (!on) return;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const t0 = ctx.currentTime;
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain();
      o.type = "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.14, t0 + i * 0.08 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.08 + 0.22);
      o.connect(g).connect(ctx!.destination); o.start(t0 + i * 0.08); o.stop(t0 + i * 0.08 + 0.25);
    });
  } catch {}
}
const buzz = (ms: number | number[] = 12) => { try { navigator.vibrate?.(ms); } catch {} };

/* ============================== confetti ============================== */
function confetti() {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.className = "g-confetti";
  const dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  document.body.appendChild(c);
  const x = c.getContext("2d")!; x.scale(dpr, dpr);
  const colors = ["#ff7a1a", "#f2c14e", "#2f6b55", "#7cc4a8", "#ffffff", "#e8505b"];
  const ps = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    r: Math.random() * 6 + 4, c: colors[(Math.random() * colors.length) | 0], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4,
  }));
  let f = 0;
  const tick = () => {
    x.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach((p) => {
      p.vy += 0.38; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore();
    });
    if (++f < 150) requestAnimationFrame(tick); else c.remove();
  };
  tick();
}

/* ============================== share helpers ============================== */
async function shareOrCopy(text: string, url?: string): Promise<"shared" | "copied" | "failed"> {
  try {
    if (navigator.share) { await navigator.share(url ? { text, url } : { text }); return "shared"; }
  } catch (e) { if ((e as Error).name === "AbortError") return "failed"; }
  try { await navigator.clipboard.writeText(url ? `${text} ${url}` : text); return "copied"; } catch { return "failed"; }
}

function download(name: string, body: string, type: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([body], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ============================== tiny UI pieces ============================== */
function Flame({ lit, size = 22 }: { lit: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={lit ? "g-flame lit" : "g-flame"}>
      <path d="M12 2.2c.7 3.1 2.7 4.8 4.3 6.6C17.900 10.600 19 12.600 19 15.200A7 7 0 0 1 5 15.200c0-2.400 1-4.200 2.500-5.600.2 1.700 1 2.900 2.300 3.500C9.400 9.300 10.300 5.500 12 2.200Z" />
      <path className="core" d="M12 12.600c.4 1.400 1.300 2.200 2 3 .6.700 1 1.400 1 2.300a3 3 0 0 1-6 0c0-1 .4-1.700 1-2.300.2.700.5 1.200 1.100 1.500-.1-1.700.3-3.100.9-4.500Z" />
    </svg>
  );
}
const Coin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="g-coin">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6.5" className="in" />
  </svg>
);
const Snow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="g-snow" fill="none" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" />
  </svg>
);

function Bar({ pct, tone = "go" }: { pct: number; tone?: "go" | "gold" }) {
  return <div className={`g-bar ${tone}`}><i style={{ width: `${Math.max(0, Math.min(1, pct)) * 100}%` }} /></div>;
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="g-scrim" onClick={onClose}>
      <div className="g-sheet" role="dialog" aria-modal aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="g-sheet-hd"><h2>{title}</h2><button className="g-x" onClick={onClose} aria-label="Close">×</button></div>
        {children}
      </div>
    </div>
  );
}

/* ============================== main app ============================== */
export default function GrindApp() {
  const [s, setS] = useState<State | null>(null);
  const [tab, setTab] = useState<Tab>("today");
  const [pops, setPops] = useState<Pop[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [floaters, setFloaters] = useState<{ id: string; x: number; y: number; t: string }[]>([]);
  const [settings, setSettings] = useState(false);
  const [planGoal, setPlanGoal] = useState<string | null>(null);
  const [day, setDay] = useState(today());
  const prevLevels = useRef<Record<string, number>>({});
  const demo = useRef(false);
  const [gate, setGate] = useState<{ title: string; fn: (st: State) => void } | null>(null);

  const push = (p: Pop) => setPops((q) => [...q, p]);
  const say = useCallback((t: string) => { setToast(t); setTimeout(() => setToast((x) => (x === t ? null : x)), 2400); }, []);

  /** Single write path: save, then award any badges the new state earned. */
  const commit = useCallback((next: State) => {
    const { state, fresh: got } = awardBadges(next);
    if (!demo.current) save(state);
    setS(state);
    // The perfect-day celebration already covers the "Perfect day" badge; don't show it twice.
    const show = got.filter((b) => !(b.id === "perfect1" && isPerfect(state.log[today()])));
    if (show.length) setTimeout(() => { push({ kind: "badge", badges: show }); confetti(); chime(state.sound, [660, 880, 1100, 1320]); buzz([20, 40, 20]); }, 450);
    return state;
  }, []);

  // Boot: load, spend freezes on missed days, read an incoming buddy check-in link.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    demo.current = params.has("demo");
    let st = demo.current ? demoState() : load();
    const r = reconcile(st);
    st = syncToday(r.state);
    const q = demo.current ? null : params.get("c");
    const incoming: Pop[] = [];
    if (r.usedFreezes.length) incoming.push({ kind: "freeze", days: r.usedFreezes });
    if (q) {
      const c = readCheckin(q);
      if (c && c.id === st.uid) incoming.push({ kind: "checkin", c, isNew: false, self: true });
      else if (c) {
        const res = applyCheckin(st, c);
        st = res.state;
        incoming.push({ kind: "checkin", c, isNew: res.isNew, props: res.props });
        setTab("buddies");
      }
      history.replaceState(null, "", location.pathname);
    }
    st.goals.forEach((g) => (prevLevels.current[g.id] = level(goalReps(st, g)).i));
    setPops(incoming);
    commit(st);
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") navigator.serviceWorker.register("/grind/sw.js", { scope: "/grind/" }).catch(() => {});
    // Roll over at midnight if the app stays open.
    const iv = setInterval(() => setDay((d) => (d !== today() ? today() : d)), 30000);
    return () => clearInterval(iv);
  }, [commit]);

  useEffect(() => {
    if (!s) return;
    const r = reconcile(s);
    if (r.usedFreezes.length) setPops((q) => [...q, { kind: "freeze", days: r.usedFreezes }]);
    commit(syncToday(r.state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  if (!s) return <div className="g-app g-boot"><Flame lit size={56} /></div>;
  if (!s.onboarded) return <Onboarding onDone={(st) => { commit(st); confetti(); chime(st.sound, [523, 659, 784, 1046]); }} initial={s} />;

  const st = s;
  const t = today();
  const cur = streak(st, t);
  const wallet = coins(st);
  const doneToday = repsOn(st, t);
  const atRisk = doneToday === 0 && cur > 0;

  function tick(g: Goal, a: Action, e: React.MouseEvent) {
    const key = repKey(g, a);
    const was = st.log[t]?.done.includes(key);
    const wasPerfect = isPerfect(st.log[t]);
    const next = toggleRep(st, key, t);
    const saved = commit(next);
    if (was) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = rid();
    setFloaters((f) => [...f, { id, x: rect.right - 40, y: rect.top, t: `+${COINS_PER_REP}` }]);
    setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 900);
    chime(st.sound); buzz();
    if (!wasPerfect && isPerfect(saved.log[t])) {
      setTimeout(() => { push({ kind: "perfect" }); confetti(); chime(st.sound, [523, 659, 784, 1046, 1318]); buzz([30, 50, 30, 50, 60]); }, 250);
    }
    const lv = level(goalReps(saved, g));
    if (lv.i > (prevLevels.current[g.id] ?? 0)) setTimeout(() => push({ kind: "level", goal: g.name, name: lv.name }), 600);
    prevLevels.current[g.id] = lv.i;
  }

  async function sendCheckin() {
    const url = checkinLink(st, location.origin, t);
    const line = doneToday === 0
      ? `${st.name || "I"}: no reps yet today, but I'm on it.`
      : `${st.name || "I"} got ${doneToday}/${st.goals.reduce((n, g) => n + g.actions.length, 0)} reps in today${cur ? `. 🔥 ${cur} day streak` : ""}. Your turn. Tap to log my check-in:`;
    const given = Object.values(st.propsOut).reduce((n, p) => n + p.length, 0);
    const r = await shareOrCopy(given ? `${line} (+${given} props for you)` : line, url);
    if (r === "copied") say("Check-in link copied. Paste it to your buddy.");
    if (r !== "failed" && given) commit({ ...st, propsOut: {}, propsGiven: st.propsGiven + given });
  }

  const needPin: NeedPin = (title, fn) => setGate({ title, fn });

  return (
    <div className="g-app">
      {demo.current && (
        <div className="g-demo">
          <span><b>Demo.</b> Sample data, nothing saves.</span>
          <a href="/grind">Start your own</a>
        </div>
      )}
      <header className="g-top">
        <div className="g-brand"><span className="g-logo"><Flame lit size={18} /></span>Grind<em>AI</em></div>
        <div className="g-stats">
          <span className={`g-pill ${atRisk ? "risk" : ""}`} title="Current streak"><Flame lit={cur > 0 && !atRisk} />{cur}</span>
          <span className="g-pill" title="Coins"><Coin />{wallet}</span>
          {st.freezes > 0 && <span className="g-pill" title="Streak freezes"><Snow />{st.freezes}</span>}
          <button className="g-gear" onClick={() => setSettings(true)} aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></svg>
          </button>
        </div>
      </header>

      <main className="g-main" key={tab}>
        {tab === "today" && <TodayView s={st} t={t} cur={cur} atRisk={atRisk} onTick={tick} onSend={sendCheckin} commit={commit}
          openPlan={(id) => { setPlanGoal(id); setTab("plan"); }} />}
        {tab === "plan" && <PlanView s={st} commit={commit} focus={planGoal} setFocus={setPlanGoal} say={say} />}
        {tab === "rewards" && <RewardsView s={st} commit={commit} say={say} needPin={needPin}
          onRedeem={(r) => { push({ kind: "redeem", ...r }); confetti(); chime(st.sound, [784, 988, 1318]); }} />}
        {tab === "buddies" && <BuddiesView s={st} commit={commit} onSend={sendCheckin} say={say} />}
      </main>

      <nav className="g-tabs" aria-label="Sections">
        {([
          ["today", "Today", "M4 12.5 9 17.5 20 6.5"],
          ["plan", "Game plan", "M4 19h16M4 5h16M4 12h10"],
          ["rewards", "Rewards", "M12 3l2.6 5.6 6 .7-4.500 4.100 1.200 6L12 16.500 6.700 19.400l1.200-6L3.400 9.300l6-.7Z"],
          ["buddies", "Buddies", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6m5 16a6 6 0 0 0-4-5.700"],
        ] as const).map(([id, label, d]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => { setTab(id); scrollTo(0, 0); }} aria-current={tab === id ? "page" : undefined}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            <span>{label}</span>
            {id === "buddies" && st.buddies.some((b) => buddyShowed(b, t)) && <i className="g-dot" />}
          </button>
        ))}
      </nav>

      {floaters.map((f) => <span key={f.id} className="g-float" style={{ left: f.x, top: f.y }}><Coin size={16} />{f.t}</span>)}
      {toast && <div className="g-toast" role="status">{toast}</div>}
      {settings && <Settings s={st} commit={commit} close={() => setSettings(false)} say={say} needPin={needPin} demo={demo.current} />}
      {gate && <PinGate s={st} title={gate.title} close={() => setGate(null)} onOk={(next) => { const fn = gate.fn; setGate(null); if (next !== st) commit(next); fn(next); }} />}
      {pops[0] && <PopCard p={pops[0]} s={st} close={() => setPops((q) => q.slice(1))} onSend={sendCheckin} />}
    </div>
  );
}

/* ============================== onboarding ============================== */
function Onboarding({ initial, onDone }: { initial: State; onDone: (s: State) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initial.name);
  const [picked, setPicked] = useState<string[]>(["catcher"]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= 3 ? p : [...p, id]));

  return (
    <div className="g-app g-onb">
      <div className="g-onb-in">
        <div className="g-steps" aria-hidden>{[0, 1, 2].map((i) => <i key={i} className={i <= step ? "on" : ""} />)}</div>

        {step === 0 && (
          <section className="g-onb-step">
            <div className="g-hero-flame"><Flame lit size={84} /></div>
            <h1>Grind <span className="g-ai">AI</span></h1>
            <p className="g-lead">Learn how the pros get better. Do the reps every day. Earn coins, build your streak, and bring a buddy who notices when you skip.</p>
            <label className="g-lbl" htmlFor="g-name">What should we call you?</label>
            <input id="g-name" className="g-input big" value={name} onChange={(e) => setName(e.target.value.slice(0, 24))} placeholder="Your first name" autoComplete="given-name" />
            <button className="g-btn" disabled={!name.trim()} onClick={() => setStep(1)}>Let&apos;s go</button>
          </section>
        )}

        {step === 1 && (
          <section className="g-onb-step">
            <p className="g-kick">Step 2 of 3</p>
            <h1>Pick your grind</h1>
            <p className="g-lead">Choose up to 3. Each one comes with a game plan from the pros and a few daily reps.</p>
            <div className="g-tracks">
              {TRACKS.map((tr) => (
                <button key={tr.id} className={`g-track ${picked.includes(tr.id) ? "on" : ""}`} onClick={() => toggle(tr.id)} aria-pressed={picked.includes(tr.id)}>
                  <span className="e">{tr.emoji}</span>
                  <strong>{tr.name}</strong>
                  <span>{tr.blurb}</span>
                  <span className="chk" aria-hidden>✓</span>
                </button>
              ))}
            </div>
            <p className="g-fine">You can build your own custom goal later in Game plan.</p>
            <div className="g-row"><button className="g-btn ghost" onClick={() => setStep(0)}>Back</button><button className="g-btn" disabled={!picked.length} onClick={() => setStep(2)}>Next</button></div>
          </section>
        )}

        {step === 2 && (
          <section className="g-onb-step">
            <p className="g-kick">Step 3 of 3</p>
            <h1>How it works</h1>
            <ol className="g-how">
              <li><span><Coin size={22} /></span><div><strong>{COINS_PER_REP} coins every rep</strong>Plus a {PERFECT_BONUS} coin bonus when you finish every rep in a day.</div></li>
              <li><span><Flame lit size={22} /></span><div><strong>Keep the flame lit</strong>Do at least one rep a day to grow your streak.</div></li>
              <li><span><Snow size={22} /></span><div><strong>Streak freezes</strong>Buy one with coins. It saves your streak on a day you can&apos;t make it.</div></li>
              <li><span>🤝</span><div><strong>Bring a buddy</strong>Send your check-in every day. Miss a day and you have to answer for it.</div></li>
            </ol>
            <p className="g-rule">Never miss twice. One miss is an accident. Two is a new habit.</p>
            <div className="g-row">
              <button className="g-btn ghost" onClick={() => setStep(1)}>Back</button>
              <button className="g-btn" onClick={() => onDone({ ...initial, name: name.trim(), onboarded: true, goals: picked.map(goalFromTrack) })}>Start grinding</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ============================== today ============================== */
function TodayView({ s, t, cur, atRisk, onTick, onSend, commit, openPlan }: {
  s: State; t: string; cur: number; atRisk: boolean;
  onTick: (g: Goal, a: Action, e: React.MouseEvent) => void; onSend: () => void; commit: (s: State) => State; openPlan: (id: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const done = s.log[t]?.done ?? [];
  const planned = s.goals.reduce((n, g) => n + g.actions.length, 0);
  const perfect = isPerfect(s.log[t]);
  const hour = new Date().getHours();
  const hi = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const { unanswered } = reconcile(s);
  const miss = unanswered[0];

  // This week, Monday to Sunday.
  const monday = addDays(t, -((parse(t).getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  const headline = perfect ? "Perfect day. You're locked in." :
    done.length === 0 ? (atRisk ? `Your ${cur} day streak is on the line.` : "Let's get the first rep in.") :
    `${planned - done.length} rep${planned - done.length === 1 ? "" : "s"} to a perfect day.`;

  return (
    <>
      <section className="g-hello">
        <p className="g-kick">{pretty(t)}</p>
        <h1>{hi}{s.name ? `, ${s.name}` : ""}.</h1>
        <p className={`g-head ${atRisk ? "risk" : ""} ${perfect ? "win" : ""}`}>{headline}</p>
        <div className="g-day-meter">
          <Bar pct={planned ? done.length / planned : 0} tone={perfect ? "gold" : "go"} />
          <span>{done.length}/{planned}</span>
        </div>
      </section>

      <ol className="g-week" aria-label="This week">
        {week.map((d) => {
          const lit = repsOn(s, d) > 0, fz = s.frozen.includes(d), pf = isPerfect(s.log[d]);
          return (
            <li key={d} className={`${d === t ? "now" : ""} ${d > t ? "future" : ""}`}>
              <span className="dw">{pretty(d, { weekday: "narrow" })}</span>
              <span className={`dot ${lit ? "lit" : ""} ${fz ? "fz" : ""} ${pf ? "pf" : ""}`}>{fz ? <Snow size={14} /> : lit ? <Flame lit size={16} /> : null}</span>
            </li>
          );
        })}
      </ol>

      {miss && (
        <section className="g-card g-miss">
          <p className="g-kick">Answer for it</p>
          <h2>You missed {pretty(miss, { weekday: "long" })}.</h2>
          <p>That&apos;s the rule: miss a day, own it. What got in the way, and what will you do differently today?</p>
          <textarea className="g-input" rows={3} value={note} onChange={(e) => setNote(e.target.value.slice(0, 200))} placeholder="Had a game and got home late. Today I'll do my drills right after school." />
          <button className="g-btn" disabled={note.trim().length < 4} onClick={() => { commit({ ...s, misses: { ...s.misses, [miss]: note.trim() } }); setNote(""); }}>Own it</button>
          <p className="g-fine">Your answer goes with your next check-in so your buddy sees it too.</p>
        </section>
      )}

      {s.goals.length === 0 && (
        <section className="g-card g-empty"><h2>No goals yet</h2><p>Pick a grind in Game plan to get your daily reps.</p><button className="g-btn" onClick={() => openPlan("add")}>Pick a goal</button></section>
      )}

      {s.goals.map((g) => {
        const reps = goalReps(s, g), lv = level(reps);
        const gDone = g.actions.filter((a) => done.includes(repKey(g, a))).length;
        return (
          <section key={g.id} className="g-card g-goal">
            <header>
              <span className="g-emoji" aria-hidden>{g.emoji}</span>
              <div className="g-goal-t"><h2>{g.name}</h2><button className="g-lvl" onClick={() => openPlan(g.id)}>{lv.name} · {reps} rep{reps === 1 ? "" : "s"}{lv.next ? ` · ${lv.toGo} to ${lv.next}` : ""}</button></div>
              <span className={`g-count ${gDone === g.actions.length && g.actions.length ? "full" : ""}`}>{gDone}/{g.actions.length}</span>
            </header>
            <Bar pct={lv.pct} />
            <ul className="g-list">
              {g.actions.map((a) => {
                const k = repKey(g, a), on = done.includes(k), isOpen = open === k;
                return (
                  <li key={a.id} className={on ? "on" : ""}>
                    <button className="g-check" onClick={(e) => onTick(g, a, e)} aria-pressed={on} aria-label={`${on ? "Undo" : "Done"}: ${a.text}`}>
                      <span className="box">{on && <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>}</span>
                      <span className="txt">{a.text}</span>
                      <span className="pts">{on ? `+${COINS_PER_REP}` : COINS_PER_REP}</span>
                    </button>
                    {a.how && <button className="g-howbtn" onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen}>{isOpen ? "Hide" : "How?"}</button>}
                    {isOpen && <p className="g-howtxt">{a.how}</p>}
                  </li>
                );
              })}
            </ul>
            <p className="g-tip"><b>Coach&apos;s tip</b>{tipFor(g, t)}</p>
          </section>
        );
      })}

      {s.goals.length > 0 && (
        <section className={`g-card g-send ${done.length ? "ready" : ""}`}>
          <div>
            <h2>{done.length ? "Send your check-in" : "Check in with your buddy"}</h2>
            <p>{s.buddies.length ? `Let ${s.buddies.map((b) => b.name).join(" and ")} know you showed up today.` : "Text a link to a friend. When they open it, you show up in their Grind as a buddy."}</p>
          </div>
          <button className="g-btn" onClick={onSend}>Send check-in</button>
        </section>
      )}

      <p className="g-foot">Each rep earns {COINS_PER_REP} coins. Finish every rep in a day for a {PERFECT_BONUS} coin bonus. Progress saves on this device.</p>
    </>
  );
}

/* ============================== game plan ============================== */
function PlanView({ s, commit, focus, setFocus, say }: { s: State; commit: (s: State) => State; focus: string | null; setFocus: (x: string | null) => void; say: (t: string) => void }) {
  const active = s.goals.find((g) => g.id === focus) ?? (focus === "add" ? null : s.goals[0]);
  const adding = focus === "add" || !s.goals.length;
  const [newAct, setNewAct] = useState("");
  const [custom, setCustom] = useState({ name: "", acts: ["", "", ""] });
  const [editing, setEditing] = useState(false);

  const update = (g: Goal) => commit(syncToday({ ...s, goals: s.goals.map((x) => (x.id === g.id ? g : x)) }));

  return (
    <>
      <div className="g-chips" role="tablist">
        {s.goals.map((g) => <button key={g.id} className={!adding && active?.id === g.id ? "on" : ""} onClick={() => { setFocus(g.id); setEditing(false); }}>{g.emoji} {g.name}</button>)}
        <button className={adding ? "on add" : "add"} onClick={() => setFocus("add")}>+ Add goal</button>
      </div>

      {adding && (
        <>
          <section className="g-hello"><p className="g-kick">Add a goal</p><h1>Pick your grind</h1></section>
          <div className="g-tracks">
            {TRACKS.map((tr) => {
              const has = s.goals.some((g) => g.trackId === tr.id);
              return (
                <button key={tr.id} className={`g-track ${has ? "on" : ""}`} disabled={has} onClick={() => {
                  const g = goalFromTrack(tr.id);
                  commit(syncToday({ ...s, goals: [...s.goals, g] })); setFocus(g.id); say(`${tr.name} added to Today`);
                }}>
                  <span className="e">{tr.emoji}</span><strong>{tr.name}</strong><span>{has ? "Already on your list" : tr.blurb}</span>
                </button>
              );
            })}
          </div>
          <section className="g-card">
            <h2>⭐ Build your own</h2>
            <p className="g-sub">Piano, skateboarding, chores, anything. Make each rep small enough to do on your worst day.</p>
            <input className="g-input" placeholder="Goal name, like Piano" value={custom.name} onChange={(e) => setCustom({ ...custom, name: e.target.value.slice(0, 30) })} />
            {custom.acts.map((a, i) => (
              <input key={i} className="g-input" placeholder={["10 minutes of scales", "Learn 4 new bars", "Play one song start to finish"][i]} value={a}
                onChange={(e) => setCustom({ ...custom, acts: custom.acts.map((x, j) => (j === i ? e.target.value.slice(0, 70) : x)) })} />
            ))}
            <button className="g-btn" disabled={!custom.name.trim() || !custom.acts.some((a) => a.trim())} onClick={() => {
              const g: Goal = { id: `custom-${rid().slice(0, 4)}`, trackId: "custom", name: custom.name.trim(), emoji: "⭐",
                actions: custom.acts.filter((a) => a.trim()).map((text) => ({ id: rid().slice(0, 6), text: text.trim() })) };
              commit(syncToday({ ...s, goals: [...s.goals, g] })); setCustom({ name: "", acts: ["", "", ""] }); setFocus(g.id); say(`${g.name} added to Today`);
            }}>Add my goal</button>
          </section>
        </>
      )}

      {!adding && active && (() => {
        const tr = findTrack(active.trackId);
        const reps = goalReps(s, active), lv = level(reps);
        return (
          <>
            <section className="g-hello">
              <p className="g-kick">{active.emoji} Game plan</p>
              <h1>{tr.id === "custom" ? active.name : tr.headline}</h1>
            </section>

            <section className="g-card g-ladder">
              <div className="g-ladder-hd"><strong>{lv.name}</strong><span>{reps} total rep{reps === 1 ? "" : "s"}</span></div>
              <ol>
                {LEVELS.map((L, i) => <li key={L.name} className={i <= lv.i ? "got" : ""}><i />{L.name}<span>{L.at}</span></li>)}
              </ol>
              {lv.next && <p className="g-sub">{lv.toGo} more reps to reach {lv.next}.</p>}
            </section>

            <section className="g-learn">
              {tr.principles.map((p, i) => (
                <article key={p.title} className="g-card g-lesson"><span className="n">{i + 1}</span><div><h3>{p.title}</h3><p>{p.body}</p></div></article>
              ))}
            </section>

            {tr.pros && (
              <section className="g-card">
                <h2>Learn from the pros</h2>
                <p className="g-sub">Watch once for fun. Watch again and only look at their glove, feet, or hands.</p>
                <ul className="g-pros">
                  {tr.pros.map((p) => (
                    <li key={p.name}><a href={yt(p.search)} target="_blank" rel="noopener"><strong>{p.name}</strong><span>{p.lesson}</span><em>Watch on YouTube ↗</em></a></li>
                  ))}
                </ul>
              </section>
            )}
            {tr.resources && (
              <section className="g-card">
                <h2>Free resources</h2>
                <ul className="g-pros">{tr.resources.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noopener"><span>{r.label}</span><em>Open ↗</em></a></li>)}</ul>
              </section>
            )}

            <section className="g-card">
              <div className="g-row between"><h2>Daily reps</h2><button className="g-link" onClick={() => setEditing(!editing)}>{editing ? "Done" : "Edit"}</button></div>
              <ul className="g-reps">
                {active.actions.map((a) => (
                  <li key={a.id}>
                    <div><strong>{a.text}</strong>{a.how && <p>{a.how}</p>}</div>
                    {editing && <button className="g-link danger" onClick={() => update({ ...active, actions: active.actions.filter((x) => x.id !== a.id) })} aria-label={`Remove ${a.text}`}>Remove</button>}
                  </li>
                ))}
              </ul>
              {editing && (
                <>
                  <div className="g-row">
                    <input className="g-input" placeholder="Add a daily rep" value={newAct} onChange={(e) => setNewAct(e.target.value.slice(0, 70))} />
                    <button className="g-btn sm" disabled={!newAct.trim() || active.actions.length >= 6} onClick={() => { update({ ...active, actions: [...active.actions, { id: rid().slice(0, 6), text: newAct.trim() }] }); setNewAct(""); }}>Add</button>
                  </div>
                  <p className="g-fine">Keep it to 6 or fewer. Fewer reps you actually do beat more reps you skip.</p>
                  <button className="g-link danger" onClick={() => {
                    if (!confirm(`Remove ${active.name}? Coins you already earned stay.`)) return;
                    commit(syncToday({ ...s, goals: s.goals.filter((g) => g.id !== active.id) })); setFocus(null); setEditing(false);
                  }}>Remove this goal</button>
                </>
              )}
            </section>
          </>
        );
      })()}
    </>
  );
}

/* ============================== rewards ============================== */
function RewardsView({ s, commit, say, onRedeem, needPin }: { s: State; commit: (s: State) => State; say: (t: string) => void; needPin: NeedPin; onRedeem: (r: { name: string; cost: number; at: string }) => void }) {
  const wallet = coins(s);
  const [nr, setNr] = useState({ name: "", cost: "" });
  const got = BADGES.filter((b) => s.badges[b.id]).length;
  const next = s.rewards.filter((r) => r.cost > wallet).sort((a, b) => a.cost - b.cost)[0];

  return (
    <>
      <section className="g-wallet">
        <p className="g-kick">Your coins</p>
        <div className="big"><Coin size={40} />{wallet.toLocaleString()}</div>
        <p>{earned(s).toLocaleString()} earned all time · best streak {bestStreak(s)} day{bestStreak(s) === 1 ? "" : "s"}</p>
        {next && <div className="g-goalbar"><span>{next.cost - wallet} to go for <b>{next.name}</b></span><Bar pct={wallet / next.cost} tone="gold" /></div>}
      </section>

      <section className="g-card">
        <h2>Coin shop</h2>
        <ul className="g-shop">
          <li>
            <span className="ic"><Snow size={26} /></span>
            <div><strong>Streak freeze</strong><p>Saves your streak if you miss a day. Used automatically. You can hold {MAX_FREEZES}. You have {s.freezes}.</p></div>
            <button className="g-buy" disabled={wallet < FREEZE_COST || s.freezes >= MAX_FREEZES} onClick={() => { commit({ ...s, freezes: s.freezes + 1, spent: s.spent + FREEZE_COST }); say("Streak freeze ready"); }}>
              <Coin size={14} />{FREEZE_COST}
            </button>
          </li>
          {s.rewards.map((r) => (
            <li key={r.id}>
              <span className="ic">🎁</span>
              <div><strong>{r.name}</strong><p>{wallet >= r.cost ? "You can afford this." : `${r.cost - wallet} more coins.`}</p></div>
              <button className="g-buy" disabled={wallet < r.cost} onClick={() => needPin(`Parent: approve "${r.name}" for ${r.cost} coins`, (st) => {
                const at = new Date().toISOString();
                commit({ ...st, spent: st.spent + r.cost, redeemed: [{ id: rid(), name: r.name, cost: r.cost, at }, ...st.redeemed] });
                onRedeem({ name: r.name, cost: r.cost, at });
              })}><Coin size={14} />{r.cost}</button>
            </li>
          ))}
        </ul>
        <details className="g-add">
          <summary>+ Add a real-life reward</summary>
          <p className="g-sub">Agree on these with a parent. Coins come from real work, so the rewards should be real too. Adding, removing and cashing in a reward all need the parent PIN.</p>
          <div className="g-ideas">{REWARD_IDEAS.filter((i) => !s.rewards.some((r) => r.name === i.name)).map((i) => (
            <button key={i.name} onClick={() => needPin(`Parent: add "${i.name}"`, (st) => commit({ ...st, rewards: [...st.rewards, { id: rid(), ...i }] }))}>{i.name} · {i.cost}</button>
          ))}</div>
          <div className="g-row">
            <input className="g-input" placeholder="Reward" value={nr.name} onChange={(e) => setNr({ ...nr, name: e.target.value.slice(0, 40) })} />
            <input className="g-input num" placeholder="Coins" inputMode="numeric" value={nr.cost} onChange={(e) => setNr({ ...nr, cost: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
            <button className="g-btn sm" disabled={!nr.name.trim() || !Number(nr.cost)} onClick={() => { const r = { id: rid(), name: nr.name.trim(), cost: Number(nr.cost) }; needPin(`Parent: add "${r.name}"`, (st) => { commit({ ...st, rewards: [...st.rewards, r] }); setNr({ name: "", cost: "" }); }); }}>Add</button>
          </div>
          {s.rewards.length > 0 && <ul className="g-mini">{s.rewards.map((r) => <li key={r.id}>{r.name} · {r.cost}<button className="g-link danger" onClick={() => needPin(`Parent: remove "${r.name}"`, (st) => commit({ ...st, rewards: st.rewards.filter((x) => x.id !== r.id) }))}>Remove</button></li>)}</ul>}
        </details>
      </section>

      {s.propsIn.length > 0 && (
        <section className="g-card">
          <h2>Props from your buddies</h2>
          <ul className="g-props-in">
            {s.propsIn.slice(0, 6).map((x, i) => { const pr = propById(x.p); return pr ? <li key={i}><span>{pr.emoji}</span><div><strong>{pr.label}</strong><em>from {x.from} · {pretty(x.d, { month: "short", day: "numeric" })}</em></div></li> : null; })}
          </ul>
        </section>
      )}

      <section className="g-card">
        <div className="g-row between"><h2>Badges</h2><span className="g-sub">{got}/{BADGES.length}</span></div>
        <ul className="g-badges">
          {BADGES.map((b) => (
            <li key={b.id} className={s.badges[b.id] ? "got" : ""}>
              <span className="ic">{s.badges[b.id] ? b.icon : "🔒"}</span>
              <strong>{b.name}</strong>
              <span>{s.badges[b.id] ? `Earned ${pretty(s.badges[b.id], { month: "short", day: "numeric" })}` : b.how}</span>
            </li>
          ))}
        </ul>
      </section>

      {s.redeemed.length > 0 && (
        <section className="g-card">
          <h2>Cashed in</h2>
          <ul className="g-mini">{s.redeemed.slice(0, 10).map((r) => <li key={r.id}>{r.name}<span>{new Date(r.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {r.cost}</span></li>)}</ul>
        </section>
      )}
    </>
  );
}

/* ============================== buddies ============================== */
function BuddiesView({ s, commit, onSend, say }: { s: State; commit: (s: State) => State; onSend: () => void; say: (t: string) => void }) {
  const t = today();
  const [manualName, setManualName] = useState("");
  const days = Array.from({ length: 7 }, (_, i) => addDays(t, i - 6));
  const mine = (d: string) => repsOn(s, d) > 0 || s.frozen.includes(d);

  async function nudge(b: Buddy) {
    const bs = buddyStreak(b, t);
    const msg = bs > 0
      ? `${b.name}! Haven't seen your check-in today. Don't let that 🔥 ${bs} day streak go out. Get your reps in.`
      : `${b.name}, where are your reps today? I did mine. Your turn. 💪`;
    const r = await shareOrCopy(msg);
    if (r === "copied") say("Nudge copied. Paste it to " + b.name);
  }

  return (
    <>
      <section className="g-hello">
        <p className="g-kick">Accountability</p>
        <h1>Buddies</h1>
        <p className="g-lead sm">Mason&apos;s rule: goals are easier with a friend. Send each other your check-in every day. Miss a day and you have to answer for it.</p>
      </section>

      <section className="g-card g-invite">
        <h2>How it works</h2>
        <ol className="g-steps-list">
          <li>Both of you open Grind on your own phones.</li>
          <li>After your reps, tap <b>Send check-in</b> and text it to your buddy.</li>
          <li>When they tap your link, your reps and streak show up in their Grind. They do the same for you.</li>
        </ol>
        <button className="g-btn" onClick={onSend}>Send my check-in</button>
      </section>

      {s.buddies.map((b) => {
        const fresh = b.lastSeen === t, bs = buddyStreak(b, t), team = teamStreak(s, b, t);
        const todayDay = b.days[t];
        return (
          <section key={b.id} className={`g-card g-buddy ${fresh ? "in" : ""}`}>
            <header>
              <span className="av" aria-hidden>{b.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <h2>{b.name}</h2>
                <p>{fresh ? `Checked in today${todayDay?.p ? `: ${todayDay.r}/${todayDay.p} reps` : ""}` : b.lastSeen ? `Last check-in ${pretty(b.lastSeen, { weekday: "long", month: "short", day: "numeric" })}` : "No check-ins yet"}</p>
              </div>
              <span className="g-pill"><Flame lit={bs > 0} />{bs}</span>
            </header>
            <div className="g-vs">
              <div className="row"><span>{s.name || "You"}</span>{days.map((d) => <i key={d} className={mine(d) ? "on" : ""} title={d} />)}</div>
              <div className="row"><span>{b.name}</span>{days.map((d) => <i key={d} className={buddyShowed(b, d) ? "on them" : ""} title={d} />)}</div>
              <div className="row lbl"><span />{days.map((d) => <em key={d}>{pretty(d, { weekday: "narrow" })}</em>)}</div>
            </div>
            <p className="g-team">👊 Team streak: <b>{team} day{team === 1 ? "" : "s"}</b>{team === 0 ? ". Both show up today to start one." : ""}</p>
            {!b.manual && (
              <div className="g-give">
                <span>Give {b.name} props <em>{(s.propsOut[b.id]?.length ?? 0)}/3</em></span>
                <div className="g-ideas">
                  {PROPS.map((pr) => {
                    const on = s.propsOut[b.id]?.includes(pr.id);
                    return <button key={pr.id} className={on ? "on" : ""} aria-pressed={on} onClick={() => {
                      const cur = s.propsOut[b.id] ?? [];
                      const next = on ? cur.filter((x) => x !== pr.id) : cur.length >= 3 ? cur : [...cur, pr.id];
                      const propsOut = { ...s.propsOut, [b.id]: next };
                      if (!next.length) delete propsOut[b.id];
                      commit({ ...s, propsOut });
                    }}>{pr.emoji} {pr.label}</button>;
                  })}
                </div>
                {(s.propsOut[b.id]?.length ?? 0) > 0 && <p className="g-fine">These go with your next check-in. Tap Send my check-in above.</p>}
              </div>
            )}
            {b.lastNote && <blockquote className="g-note"><b>{b.name} answered for a miss:</b> {b.lastNote}</blockquote>}
            <div className="g-row wrap">
              {!fresh && <button className="g-btn sm" onClick={() => nudge(b)}>Nudge {b.name}</button>}
              {!fresh && <button className="g-btn sm ghost" onClick={() => commit({ ...s, buddies: s.buddies.map((x) => x.id === b.id ? { ...x, lastSeen: t, streak: (bs || 0) + 1, days: { ...x.days, [t]: { r: 1, p: 0 } } } : x) })}>They told me in person</button>}
              <button className="g-link danger" onClick={() => confirm(`Remove ${b.name}?`) && commit({ ...s, buddies: s.buddies.filter((x) => x.id !== b.id) })}>Remove</button>
            </div>
          </section>
        );
      })}

      <details className="g-card g-add">
        <summary>Buddy doesn&apos;t have a phone? Add them by name</summary>
        <p className="g-sub">You&apos;ll log their check-ins yourself when they tell you in person.</p>
        <div className="g-row">
          <input className="g-input" placeholder="Buddy's name" value={manualName} onChange={(e) => setManualName(e.target.value.slice(0, 24))} />
          <button className="g-btn sm" disabled={!manualName.trim()} onClick={() => { commit({ ...s, buddies: [...s.buddies, { id: `m-${rid()}`, name: manualName.trim(), addedAt: t, days: {}, streak: 0, manual: true }] }); setManualName(""); }}>Add</button>
        </div>
      </details>
    </>
  );
}

/* ============================== settings ============================== */
function Settings({ s, commit, close, say, needPin, demo }: { s: State; commit: (s: State) => State; close: () => void; say: (t: string) => void; needPin: NeedPin; demo: boolean }) {
  const [name, setName] = useState(s.name);
  const [time, setTime] = useState(s.remindAt);
  const fileRef = useRef<HTMLInputElement>(null);
  const isIOS = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches;

  return (
    <Sheet title="Settings" onClose={close}>
      <label className="g-lbl" htmlFor="g-sname">Your name</label>
      <div className="g-row"><input id="g-sname" className="g-input" value={name} onChange={(e) => setName(e.target.value.slice(0, 24))} />
        <button className="g-btn sm" disabled={!name.trim() || name === s.name} onClick={() => { commit({ ...s, name: name.trim() }); say("Saved"); }}>Save</button></div>

      <label className="g-lbl" htmlFor="g-time">Daily reminder</label>
      <div className="g-row"><input id="g-time" type="time" className="g-input" value={time} onChange={(e) => setTime(e.target.value)} />
        <button className="g-btn sm" onClick={() => { commit({ ...s, remindAt: time }); download("grind-reminder.ics", reminderICS(time, s.name), "text/calendar"); }}>Add to calendar</button></div>
      <p className="g-fine">Adds a daily calendar alert so your phone reminds you to get your reps in.</p>

      <label className="g-toggle"><input type="checkbox" checked={s.sound} onChange={(e) => commit({ ...s, sound: e.target.checked })} /> Sounds</label>

      {!standalone && (
        <div className="g-card g-install">
          <strong>Put Grind AI on your home screen</strong>
          <p>{isIOS ? "In Safari, tap the Share button, then \"Add to Home Screen\". Grind AI opens like a real app." : "In your browser menu, tap \"Install app\" or \"Add to Home screen\"."}</p>
        </div>
      )}

      <h3 className="g-h3">Parent controls</h3>
      <p className="g-fine">{s.pinHash ? "A parent PIN is set. It's needed to add, remove or cash in rewards, restore a backup, or start over." : "Set a 4-digit PIN so rewards need a parent's OK."}</p>
      <div className="g-row wrap">
        <button className="g-btn sm ghost" onClick={() => needPin(s.pinHash ? "Enter the current PIN to change it" : "Set a parent PIN", (st) => {
          if (st.pinHash && s.pinHash) { commit({ ...st, pinHash: undefined }); setTimeout(() => needPin("Choose a new PIN", () => say("PIN updated")), 50); } else say("Parent PIN set");
        })}>{s.pinHash ? "Change PIN" : "Set parent PIN"}</button>
      </div>

      <h3 className="g-h3">Your data</h3>
      <p className="g-fine">Everything lives on this phone. Nothing is sent anywhere except the check-in links you choose to share. Back up before switching phones.</p>
      <div className="g-row wrap">
        <button className="g-btn sm ghost" onClick={() => download(`grind-backup-${today()}.json`, JSON.stringify(s), "application/json")}>Back up</button>
        <button className="g-btn sm ghost" disabled={demo} onClick={() => (s.pinHash ? needPin("Parent: restore a backup", () => fileRef.current?.click()) : fileRef.current?.click())}>Restore</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={async (e) => {
          const f = e.target.files?.[0]; if (!f) return;
          try { const d = JSON.parse(await f.text()); if (d?.v !== 1 || !Array.isArray(d.goals)) throw 0; commit({ ...fresh(), ...d }); say("Restored"); close(); }
          catch { say("That file isn't a Grind backup"); }
        }} />
        <button className="g-link danger" disabled={demo} onClick={() => {
          const wipe = () => { if (confirm("Erase everything and start over? This can't be undone.")) { localStorage.removeItem(KEY); location.reload(); } };
          if (s.pinHash) needPin("Parent: start over", wipe); else wipe();
        }}>Start over</button>
      </div>
      <p className="g-fine g-credit">Grind AI was dreamed up by Mason, age 10. Built November 2026.</p>
    </Sheet>
  );
}

/* ============================== pop-up cards ============================== */
function PopCard({ p, s, close, onSend }: { p: Pop; s: State; close: () => void; onSend: () => void }) {
  const t = today();
  const body = useMemo(() => {
    switch (p.kind) {
      case "perfect": return { icon: "★", kicker: `+${PERFECT_BONUS} bonus coins`, title: "Perfect day!", text: "Every rep, done. That's what the pros do. Send your check-in so your buddy knows.", cta: "Send check-in", act: onSend };
      case "level": return { icon: "🎽", kicker: "Level up", title: `${p.name}!`, text: `You reached ${p.name} in ${p.goal}. Every rep counted.` };
      case "redeem": return { icon: "🎁", kicker: `-${p.cost} coins`, title: p.name, text: `Cashed in ${new Date(p.at).toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })}. Show this screen to a parent to collect.` };
      case "freeze": return { icon: "❄️", kicker: "Streak saved", title: `Freeze used for ${p.days.length} day${p.days.length > 1 ? "s" : ""}`, text: `You missed ${p.days.map((d) => pretty(d, { weekday: "long" })).join(" and ")}, but a streak freeze kept your flame lit. Get back on it today. Never miss twice.` };
      case "badge": return { icon: p.badges[0].icon, kicker: p.badges.length > 1 ? `${p.badges.length} badges unlocked` : "Badge unlocked", title: p.badges.map((b) => b.name).join(" + "), text: p.badges.map((b) => b.how).join(". ") + "." };
      case "checkin": {
        const c = p.c;
        if (p.self) return { icon: "👋", kicker: "That's your link", title: "Send it to your buddy", text: "This is your own check-in. Text it to your buddy so it shows up in their Grind AI." };
        const both = repsOn(s, t) > 0;
        const got = (p.props ?? []).map(propById).filter(Boolean).map((x) => `${x!.emoji} ${x!.label}`);
        return {
          icon: "🤝", kicker: p.isNew ? "New buddy" : "Buddy check-in",
          title: c.r > 0 ? `${c.n} got ${c.r}${c.p ? `/${c.p}` : ""} reps in` : `${c.n} checked in`,
          text: `${c.s > 0 ? `🔥 ${c.s} day streak. ` : ""}${c.d !== t ? `Sent ${pretty(c.d, { weekday: "long" })}. ` : ""}${got.length ? `They gave you props: ${got.join(", ")}! ` : ""}${c.m ? `They answered for a miss: "${c.m}". ` : ""}${both ? "You both showed up. Send yours back." : "Your move. Get your reps in and send yours back."}`,
          cta: both ? "Send mine back" : undefined, act: onSend,
        };
      }
      default: return { icon: "", kicker: "", title: "", text: "" };
    }
  }, [p, s, t, onSend]);

  return (
    <div className="g-scrim center" onClick={close}>
      <div className={`g-pop k-${p.kind}`} role="alertdialog" aria-modal aria-labelledby="g-pop-t" onClick={(e) => e.stopPropagation()}>
        <div className="g-pop-ic" aria-hidden>{body.icon}</div>
        <p className="g-kick">{body.kicker}</p>
        <h2 id="g-pop-t">{body.title}</h2>
        <p>{body.text}</p>
        <div className="g-row center">
          {"cta" in body && body.cta && <button className="g-btn" onClick={() => { body.act?.(); close(); }}>{body.cta}</button>}
          <button className={`g-btn ${"cta" in body && body.cta ? "ghost" : ""}`} onClick={close} autoFocus>Nice</button>
        </div>
      </div>
    </div>
  );
}

/* ============================== parent PIN gate ============================== */
function PinGate({ s, title, close, onOk }: { s: State; title: string; close: () => void; onOk: (next: State) => void }) {
  const setting = !s.pinHash;
  const [pin, setPin] = useState("");
  const [first, setFirst] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [tries, setTries] = useState(0);
  const prompt = setting ? (first ? "Type it again to confirm" : "Parent: choose a 4-digit PIN") : "Parent PIN";

  async function enter(v: string) {
    setPin(v); setErr("");
    if (v.length < 4) return;
    if (setting) {
      if (!first) { setFirst(v); setPin(""); return; }
      if (v !== first) { setErr("Those didn't match. Start again."); setFirst(null); setPin(""); return; }
      onOk({ ...s, pinHash: await hashPin(v) });
      return;
    }
    if ((await hashPin(v)) === s.pinHash) onOk(s);
    else { setTries(tries + 1); setErr(tries >= 2 ? "Wrong PIN. Ask a parent." : "Wrong PIN."); setPin(""); buzz([40, 60, 40]); }
  }

  return (
    <Sheet title={title} onClose={close}>
      <p className="g-sub">{setting && !first ? "Rewards will need this PIN from now on. Keep it secret from the player." : prompt}</p>
      <div className="g-pin" aria-hidden>{[0, 1, 2, 3].map((i) => <i key={i} className={i < pin.length ? "on" : ""} />)}</div>
      <label className="sr-only" htmlFor="g-pin">{prompt}</label>
      <input id="g-pin" className="g-input big g-pin-in" type="password" inputMode="numeric" autoComplete="off" autoFocus maxLength={4}
        value={pin} onChange={(e) => enter(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder={setting && !first ? "New PIN" : "PIN"} />
      {err && <p className="g-err" role="alert">{err}</p>}
      {setting && <p className="g-fine">Forgot it later? Clearing this site's data in the phone's browser settings resets the app.</p>}
    </Sheet>
  );
}
