import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGINES = [
  {
    id: "scopemap",
    name: "ScopeMap",
    tag: "For Businesses",
    color: "var(--sage)",
    headline: "See every emission. Source every fix.",
    body: "AI auto-estimates Scope 3 emissions across your supply chain, visualizes hotspots in real time, generates CSRD-ready reports, and flags exactly which talent gaps you need to close to fix them.",
    bullets: ["Scope 3 auto-classification", "Hotspot heatmap", "CSRD + BRSR exports"],
  },
  {
    id: "careershift",
    name: "CareerShift",
    tag: "For Workers",
    color: "var(--cream)",
    headline: "From legacy job to green career, in 90 days.",
    body: "Connect LinkedIn, get matched to green roles by skill adjacency, receive a personalized 90-day reskilling roadmap, and see real salary projections at year 1, 3, and 5.",
    bullets: ["Skill adjacency engine", "90-day roadmap", "Salary projections"],
  },
  {
    id: "connector",
    name: "Connector",
    tag: "The Network",
    color: "var(--orange-eb)",
    headline: "The bridge between supply and demand.",
    body: "Workers who complete CareerShift get verified profiles. Companies with talent gaps see matched candidates automatically. Every emissions reduction creates a career; every career closes a gap.",
    bullets: ["Verified green profiles", "Auto-matched roles", "Two-sided network effect"],
  },
];

export function Platform() {
  const [active, setActive] = useState(0);
  const e = ENGINES[active];

  return (
    <section id="platform" className="relative bg-[var(--charcoal)] py-28 text-white md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          The Platform
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-tight"
        >
          One platform. <span className="text-white/40">Three engines.</span>
        </motion.h2>

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap gap-2 border-b border-white/10">
          {ENGINES.map((eng, i) => (
            <button
              key={eng.id}
              onClick={() => setActive(i)}
              className={`relative px-5 py-4 text-sm font-medium transition-colors ${
                active === i ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              <span className="mr-2 text-[10px] tabular-nums opacity-60">0{i + 1}</span>
              {eng.name}
              {active === i && (
                <motion.span
                  layoutId="engine-indicator"
                  className="absolute inset-x-0 -bottom-px h-px"
                  style={{ background: eng.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest" style={{ color: e.color }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.color }} />
                {e.tag}
              </div>
              <h3 className="mt-6 text-balance text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                {e.headline}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">{e.body}</p>
              <ul className="mt-8 space-y-3">
                {e.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: `color-mix(in oklab, ${e.color} 25%, transparent)` }}>
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke={e.color} strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <Mockup which={e.id} color={e.color} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Mockup({ which, color }: { which: string; color: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-3xl blur-3xl" style={{ background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${color} 25%, transparent), transparent 70%)` }} />
      <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl p-6">
        {which === "scopemap" && <ScopeMapMock color={color} />}
        {which === "careershift" && <RadarMock color={color} />}
        {which === "connector" && <ConnectorMock color={color} />}
      </div>
    </div>
  );
}

function ScopeMapMock({ color }: { color: string }) {
  const cells = Array.from({ length: 48 });
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Supply chain · Scope 3</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">Live</span>
      </div>
      <div className="grid flex-1 grid-cols-8 gap-1.5">
        {cells.map((_, i) => {
          const intensity = Math.random();
          const isHot = intensity > 0.85;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.012, duration: 0.4 }}
              className="relative aspect-square rounded-md"
              style={{
                background: isHot
                  ? "var(--orange-eb)"
                  : `color-mix(in oklab, ${color} ${20 + intensity * 50}%, transparent)`,
              }}
            >
              {isHot && <span className="absolute inset-0 rounded-md ring-2 ring-[var(--orange-eb)] animate-pulse-ring" />}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
        <span>Hotspots <span className="text-[var(--orange-eb)] font-semibold">7</span></span>
        <span>Total: 12,480 tCO₂e</span>
      </div>
    </div>
  );
}

function RadarMock({ color }: { color: string }) {
  const points = [0.85, 0.6, 0.78, 0.45, 0.72, 0.9];
  const angle = (i: number) => (i / points.length) * Math.PI * 2 - Math.PI / 2;
  const cx = 50, cy = 50;
  const path = points
    .map((p, i) => {
      const r = p * 38;
      const x = cx + r * Math.cos(angle(i));
      const y = cy + r * Math.sin(angle(i));
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ") + " Z";

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Skill adjacency map</span>
        <span className="rounded-full bg-[var(--orange-eb)]/20 px-2 py-0.5 text-[var(--orange-eb)]">81% match</span>
      </div>
      <div className="relative flex-1">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {[1, 2, 3, 4].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r * 9.5} fill="none" stroke="white" strokeOpacity="0.08" />
          ))}
          {points.map((_, i) => {
            const r = 38;
            const x = cx + r * Math.cos(angle(i));
            const y = cy + r * Math.sin(angle(i));
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="white" strokeOpacity="0.08" />;
          })}
          <motion.path
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "50% 50%" }}
            d={path}
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="0.8"
          />
          {points.map((p, i) => {
            const r = p * 38;
            const x = cx + r * Math.cos(angle(i));
            const y = cy + r * Math.sin(angle(i));
            return <circle key={i} cx={x} cy={y} r="1.4" fill={color} />;
          })}
        </svg>
      </div>
    </div>
  );
}

function ConnectorMock({ color }: { color: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Connector layer</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">Auto-match</span>
      </div>
      <div className="relative flex flex-1 items-center justify-between">
        <div className="z-10 flex flex-col items-center gap-2">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 backdrop-blur">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7" /></svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/60">Business</span>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 35, 50, 65, 80].map((y, i) => (
            <motion.circle
              key={i}
              r="1.5"
              fill={color}
              initial={{ cx: 14, cy: y }}
              animate={{ cx: [14, 86, 14], cy: [y, 100 - y, y] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
            />
          ))}
          <line x1="14" y1="50" x2="86" y2="50" stroke="white" strokeOpacity="0.12" strokeDasharray="2 2" />
        </svg>

        <div className="z-10 flex flex-col items-center gap-2">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 backdrop-blur">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/60">Worker</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-white/60">
        <div className="rounded-lg bg-white/5 px-2 py-1.5">2,847 matches</div>
        <div className="rounded-lg bg-white/5 px-2 py-1.5">94% accuracy</div>
        <div className="rounded-lg bg-white/5 px-2 py-1.5">12s avg</div>
      </div>
    </div>
  );
}
