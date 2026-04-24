import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGINES = [
  {
    id: "ingest",
    name: "Ingest",
    tag: "Layer 01",
    color: "var(--violet-glow)",
    headline: "Every report. Every format. One workspace.",
    body: "Drop in PDFs, spreadsheets, BI exports, ops logs or pasted notes. EcoBridge parses tables, charts and prose into a structured operational model — ready to interrogate.",
    bullets: ["PDF, XLSX, CSV, JSON", "Auto-table extraction", "Chart + prose understanding"],
  },
  {
    id: "diagnose",
    name: "Diagnose",
    tag: "Layer 02",
    color: "var(--orange-eb)",
    headline: "Find the bottleneck before the meeting.",
    body: "The Diagnose engine runs your data through workflow, throughput and resource models — surfacing the steps that drag cycle time, the queues that pile up, and the inputs that drift.",
    bullets: ["Bottleneck detection", "Variance & drift scans", "Process gap mapping"],
  },
  {
    id: "recommend",
    name: "Recommend",
    tag: "Layer 03",
    color: "var(--mist)",
    headline: "From insight to a shippable next step.",
    body: "Every finding is paired with a ranked recommendation: who acts, what they change, expected impact, and the metric to watch. Insight you can put on a Jira ticket.",
    bullets: ["Ranked actions", "Expected impact %", "Owner + metric assigned"],
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
          One pipeline. <span className="text-white/40">Three engines.</span>
        </motion.h2>

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
        {which === "ingest" && <IngestMock color={color} />}
        {which === "diagnose" && <DiagnoseMock color={color} />}
        {which === "recommend" && <RecommendMock color={color} />}
      </div>
    </div>
  );
}

function IngestMock({ color }: { color: string }) {
  const files = [
    { name: "Q3-operations.pdf", size: "4.2 MB", kind: "PDF", p: 100 },
    { name: "throughput-2026.xlsx", size: "812 KB", kind: "XLSX", p: 100 },
    { name: "tickets-export.csv", size: "1.1 MB", kind: "CSV", p: 78 },
    { name: "team-notes.md", size: "12 KB", kind: "MD", p: 100 },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Ingest queue</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">Parsing</span>
      </div>
      <div className="flex-1 space-y-2">
        {files.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md text-[9px] font-semibold" style={{ background: `color-mix(in oklab, ${color} 25%, transparent)`, color }}>{f.kind}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-white/85">{f.name}</p>
              <p className="text-white/40">{f.size}</p>
            </div>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${f.p}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }} className="h-full" style={{ background: color }} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
        <span>4 files · 6.1 MB</span>
        <span style={{ color }}>2,847 fields extracted</span>
      </div>
    </div>
  );
}

function DiagnoseMock({ color }: { color: string }) {
  const stages = [
    { label: "Intake", v: 100 },
    { label: "Triage", v: 92 },
    { label: "Build", v: 64 },
    { label: "Review", v: 28, bottleneck: true },
    { label: "Ship", v: 22 },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Workflow throughput · last 30d</span>
        <span className="rounded-full bg-[var(--orange-eb)]/20 px-2 py-0.5 text-[var(--orange-eb)]">1 bottleneck</span>
      </div>
      <div className="flex flex-1 items-end gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${s.v}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-md"
                style={{ background: s.bottleneck ? "var(--orange-eb)" : color, opacity: s.bottleneck ? 1 : 0.55 }}
              />
              {s.bottleneck && <span className="absolute inset-0 rounded-md ring-2 ring-[var(--orange-eb)] animate-pulse-ring" />}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/55">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-[var(--orange-eb)]/30 bg-[var(--orange-eb)]/10 p-2.5 text-[11px] text-white/80">
        <b className="text-[var(--orange-eb)]">Review</b> is choking throughput: WIP up 3.2× vs Q2. Add 1 reviewer or split queues by risk class.
      </div>
    </div>
  );
}

function RecommendMock({ color }: { color: string }) {
  const recs = [
    { t: "Reassign 2 engineers from Build → Review", impact: "+18% throughput", risk: "Low" },
    { t: "Auto-route refunds < $200 to bot workflow", impact: "−42% queue", risk: "Low" },
    { t: "Consolidate vendor portal logins via SSO", impact: "−6 hrs / wk", risk: "Med" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Ranked recommendations</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">Ready to ship</span>
      </div>
      <div className="flex-1 space-y-2">
        {recs.map((r, i) => (
          <motion.div
            key={r.t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-[11px]"
          >
            <div className="flex items-start gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-semibold" style={{ background: color, color: "#0d0d0d" }}>{i + 1}</span>
              <p className="flex-1 text-white/85">{r.t}</p>
            </div>
            <div className="mt-2 flex items-center gap-2 pl-7 text-[10px]">
              <span className="rounded-full bg-[var(--orange-eb)]/15 px-2 py-0.5 text-[var(--orange-eb)]">{r.impact}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/60">Risk · {r.risk}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
