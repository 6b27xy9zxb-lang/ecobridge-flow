import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

type Tab = "business" | "worker" | "chat";

export function Demo() {
  const [tab, setTab] = useState<Tab>("business");

  return (
    <section id="demo" className="relative bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          Live Demo
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
            Try EcoBridge. <span className="text-[var(--charcoal)]/50">No signup.</span>
          </h2>
          <div className="inline-flex rounded-full border border-[var(--charcoal)]/10 bg-white p-1 shadow-sm">
            {([
              { id: "business", label: "I'm a Business" },
              { id: "worker", label: "I'm a Worker" },
              { id: "chat", label: "AI Advisor" },
            ] as { id: Tab; label: string }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-[var(--charcoal)] text-white shadow"
                    : "text-[var(--charcoal)]/60 hover:text-[var(--charcoal)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser frame */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--charcoal)]/10 bg-[var(--charcoal)] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <div className="mx-auto rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/50">
              app.ecobridge.io / {tab}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="min-h-[560px]"
            >
              {tab === "business" && <BusinessFlow />}
              {tab === "worker" && <WorkerFlow />}
              {tab === "chat" && <ChatFlow />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* =============== BUSINESS FLOW =============== */

const SAMPLE_SUPPLIERS = [
  { name: "Indigo Dyes Pvt", category: "Chemicals", spend: 4_200_000, country: "IN" },
  { name: "Maruti Logistics", category: "Logistics", spend: 1_850_000, country: "IN" },
  { name: "Cottonworks Co.", category: "Raw Materials", spend: 3_100_000, country: "IN" },
  { name: "PowerGrid Energy", category: "Utilities", spend: 980_000, country: "IN" },
  { name: "Packify", category: "Packaging", spend: 720_000, country: "BD" },
];

function BusinessFlow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [company, setCompany] = useState({ name: "", industry: "Textiles", revenue: 50, suppliers: 12 });
  const [suppliers, setSuppliers] = useState<typeof SAMPLE_SUPPLIERS>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const SKILL_OPTIONS = ["ESG Manager", "Carbon Analyst", "Sustainability Lead", "Supply Chain Auditor", "Renewables Specialist"];

  const runAnalysis = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2400));
    setLoading(false);
    setDone(true);
  };

  if (done) return <BusinessResults onReset={() => { setDone(false); setStep(1); }} />;
  if (loading) return <LoadingOverlay messages={[
    "Classifying emissions across your supply chain…",
    "Identifying Scope 3 hotspots…",
    "Scanning talent pool for green skill matches…",
    "Building your compliance roadmap…",
  ]} />;

  return (
    <div className="px-6 py-10 text-white md:px-12 md:py-14">
      <Stepper step={step} total={3} labels={["Company", "Suppliers", "Workforce"]} />

      {step === 1 && (
        <div className="mt-10 grid gap-5 md:max-w-2xl">
          <Field label="Company name">
            <input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} placeholder="e.g. Surat Textiles Ltd." className={inputCls} />
          </Field>
          <Field label="Industry">
            <select value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })} className={inputCls}>
              {["Textiles", "Manufacturing", "Logistics", "Agriculture", "Construction", "Energy", "Other"].map((i) => <option key={i}>{i}</option>)}
            </select>
          </Field>
          <Field label={`Annual revenue: ₹${company.revenue} Cr`}>
            <input type="range" min={1} max={500} value={company.revenue} onChange={(e) => setCompany({ ...company, revenue: +e.target.value })} className="w-full accent-[var(--orange-eb)]" />
          </Field>
          <Field label="Number of suppliers">
            <input type="number" value={company.suppliers} onChange={(e) => setCompany({ ...company, suppliers: +e.target.value })} className={inputCls} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/60">Add your top suppliers by spend.</p>
            <div className="flex gap-2">
              <button onClick={() => setSuppliers(SAMPLE_SUPPLIERS)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15">Load sample data</button>
              <button onClick={() => setSuppliers([...suppliers, { name: "", category: "", spend: 0, country: "IN" }])} className="rounded-full bg-[var(--orange-eb)] px-3 py-1.5 text-xs">+ Add row</button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[11px] uppercase tracking-widest text-white/50">
                <tr>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Spend (₹)</th>
                  <th className="px-4 py-3 text-left">Country</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-white/40">No suppliers yet. Load sample data to continue.</td></tr>}
                {suppliers.map((s, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 py-3"><input className="w-full bg-transparent" value={s.name} onChange={(e) => { const c = [...suppliers]; c[i] = { ...c[i], name: e.target.value }; setSuppliers(c); }} /></td>
                    <td className="px-4 py-3"><input className="w-full bg-transparent" value={s.category} onChange={(e) => { const c = [...suppliers]; c[i] = { ...c[i], category: e.target.value }; setSuppliers(c); }} /></td>
                    <td className="px-4 py-3 text-right tabular-nums"><input type="number" className="w-32 bg-transparent text-right" value={s.spend} onChange={(e) => { const c = [...suppliers]; c[i] = { ...c[i], spend: +e.target.value }; setSuppliers(c); }} /></td>
                    <td className="px-4 py-3"><input className="w-12 bg-transparent" value={s.country} onChange={(e) => { const c = [...suppliers]; c[i] = { ...c[i], country: e.target.value }; setSuppliers(c); }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-10 grid gap-5 md:max-w-2xl">
          <Field label="Current green roles">
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((s) => {
                const on = skills.includes(s);
                return (
                  <button key={s} onClick={() => setSkills(on ? skills.filter((k) => k !== s) : [...skills, s])} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-[var(--orange-eb)] bg-[var(--orange-eb)]/15 text-white" : "border-white/15 text-white/70 hover:border-white/30"}`}>
                    {s}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Missing skills (free text)">
            <textarea rows={3} placeholder="e.g. life-cycle assessment, BRSR reporting, decarbonization strategy" className={inputCls} />
          </Field>
          <Field label="Compliance deadline">
            <input type="date" className={inputCls} defaultValue="2026-03-31" />
          </Field>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
        <button disabled={step === 1} onClick={() => setStep(step - 1)} className="text-sm text-white/50 hover:text-white disabled:opacity-30">← Back</button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[var(--charcoal)] hover:bg-white/90">Continue</button>
        ) : (
          <button onClick={runAnalysis} className="rounded-full bg-[var(--orange-eb)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_15px_40px_-10px_var(--orange-eb)] hover:scale-[1.02] transition-transform">
            Generate My EcoBridge Report →
          </button>
        )}
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--orange-eb)] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">{label}</span>
      {children}
    </label>
  );
}

function Stepper({ step, total, labels }: { step: number; total: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium ${i + 1 <= step ? "bg-[var(--orange-eb)] text-white" : "bg-white/5 text-white/40"}`}>
            {i + 1}
          </div>
          <span className={`text-xs uppercase tracking-widest ${i + 1 === step ? "text-white" : "text-white/40"}`}>{labels[i]}</span>
          {i < total - 1 && <div className="h-px w-10 bg-white/10" />}
        </div>
      ))}
    </div>
  );
}

function LoadingOverlay({ messages }: { messages: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1 < messages.length ? i + 1 : i)), 600);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="grid min-h-[560px] place-items-center px-6 py-12 text-white">
      <div className="text-center">
        <div className="relative mx-auto h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-[var(--orange-eb)]" />
          <div className="absolute inset-3 grid place-items-center rounded-full bg-[var(--orange-eb)]/20">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--orange-eb)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18c3-6 15-6 18 0" /></svg>
          </div>
        </div>
        <div className="mt-8 space-y-2">
          {messages.slice(0, idx + 1).map((m, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: i === idx ? 1 : 0.4, y: 0 }} className="text-sm text-white/80">
              {i === idx && <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orange-eb)]" />}
              {m}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

const EMISSIONS_DATA = [
  { name: "Indigo Dyes", v: 7800, level: "high" },
  { name: "Cottonworks", v: 2300, level: "med" },
  { name: "Maruti Log.", v: 1100, level: "med" },
  { name: "PowerGrid", v: 820, level: "low" },
  { name: "Packify", v: 460, level: "low" },
];

const CANDIDATES = [
  { initials: "AK", name: "Aarav Kumar", from: "Logistics Manager", to: "Sustainability Lead", match: 92, location: "Mumbai" },
  { initials: "RS", name: "Riya Shah", from: "Procurement", to: "ESG Analyst", match: 88, location: "Surat" },
  { initials: "NM", name: "Neel Mehta", from: "Operations Lead", to: "Carbon Analyst", match: 84, location: "Pune" },
  { initials: "PV", name: "Priya Verma", from: "Quality Engineer", to: "LCA Specialist", match: 81, location: "Bangalore" },
  { initials: "SR", name: "Sai Reddy", from: "Plant Supervisor", to: "Decarbon Lead", match: 78, location: "Hyderabad" },
  { initials: "AT", name: "Ananya Iyer", from: "Supply Analyst", to: "Scope 3 Auditor", match: 75, location: "Chennai" },
];

function BusinessResults({ onReset }: { onReset: () => void }) {
  const score = 78;
  return (
    <div className="grid gap-6 px-6 py-10 text-white md:grid-cols-3 md:px-12 md:py-14">
      {/* Emissions chart */}
      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Top emission-driving suppliers</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">12,480 <span className="text-sm font-normal text-white/50">tCO₂e Scope 3</span></p>
          </div>
          <div className="rounded-full bg-[var(--orange-eb)]/15 px-3 py-1 text-xs text-[var(--orange-eb)]">3 hotspots</div>
        </div>
        <div className="mt-6 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EMISSIONS_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {EMISSIONS_DATA.map((d, i) => (
                  <Cell key={i} fill={d.level === "high" ? "#FF4D00" : d.level === "med" ? "#f0a050" : "#5C7A5C"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CSRD score */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-widest text-white/50">CSRD readiness</p>
        <div className="relative mx-auto mt-4 h-40 w-40">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none" stroke="var(--orange-eb)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-3xl font-semibold">{score}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/50">/ 100</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-white/60">BRSR ready</span>
          <span className="rounded-full bg-[var(--sage)]/30 px-2 py-1 text-[var(--sage)]">Yes</span>
        </div>
      </div>

      {/* Candidates */}
      <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Talent matched to your gaps</p>
            <p className="mt-1 text-lg font-medium">6 candidates · fit score 4.2/5</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <Chip>Skill match ↓</Chip>
            <Chip>Any location</Chip>
            <Chip>Any role</Chip>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CANDIDATES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-[var(--charcoal)] p-4 transition-all hover:border-[var(--orange-eb)]/40"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg, var(--orange-eb), var(--sage))` }}>{c.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <span className="text-xs font-semibold text-[var(--orange-eb)]">{c.match}%</span>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-white/50">{c.from} → <span className="text-white/80">{c.to}</span></p>
                  <p className="mt-1 text-[11px] text-white/40">{c.location}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button className="text-[11px] text-white/60 hover:text-white">View profile →</button>
                <svg className="h-4 w-4 text-[#0a66c2]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8h4.5v14H.25V8Zm7.5 0h4.31v1.92h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V22h-4.94V8Z" /></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="md:col-span-3 rounded-2xl border border-[var(--orange-eb)]/30 bg-gradient-to-br from-[var(--orange-eb)]/15 to-transparent p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[var(--orange-eb)]">Report summary</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>• Indigo Dyes drives <b>62%</b> of your Scope 3 — switching to bio-dye suppliers cuts 4,800 tCO₂e.</li>
              <li>• Hiring 1 Sustainability Lead + 1 Carbon Analyst closes <b>78%</b> of compliance gap.</li>
              <li>• You are CSRD-track on energy/waste; flagged on <b>logistics &amp; chemicals</b>.</li>
            </ul>
            <p className="mt-4 text-sm text-white/65">Top action: shortlist Aarav Kumar &amp; Riya Shah this week.</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded-full bg-[var(--orange-eb)] px-5 py-2.5 text-sm font-medium text-white">Download PDF Report</button>
            <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white">Connect with talent</button>
            <button onClick={onReset} className="text-xs text-white/50 hover:text-white">↻ Start over</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">{children}</span>;
}

/* =============== WORKER FLOW =============== */

function WorkerFlow() {
  const [step, setStep] = useState(0); // 0 connect, 1 form, 2 loading, 3 results
  const [oauth, setOauth] = useState(false);

  const startOAuth = async () => {
    setOauth(true);
    await new Promise((r) => setTimeout(r, 1400));
    setOauth(false);
    setStep(1);
  };

  const analyze = async () => {
    setStep(2);
    await new Promise((r) => setTimeout(r, 2400));
    setStep(3);
  };

  if (step === 2) return <LoadingOverlay messages={[
    "Extracting your skill profile…",
    "Mapping adjacencies to 2,847 green roles…",
    "Calculating your transition score…",
  ]} />;

  if (step === 3) return <WorkerResults onReset={() => setStep(0)} />;

  return (
    <div className="grid min-h-[560px] place-items-center px-6 py-10 text-white md:px-12">
      {step === 0 && (
        <div className="w-full max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#0a66c2]">
            <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8h4.5v14H.25V8Zm7.5 0h4.31v1.92h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V22h-4.94V8Z" /></svg>
          </div>
          <h3 className="mt-6 text-2xl font-semibold tracking-tight">Connect LinkedIn to begin</h3>
          <p className="mt-3 text-sm text-white/55">We'll auto-fill your skills, role and experience. Read-only. No posting.</p>
          <button onClick={startOAuth} disabled={oauth} className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#0a66c2] px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
            {oauth ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Connecting…</> : "Continue with LinkedIn"}
          </button>
          <p className="mt-4 text-[11px] text-white/30">Demo simulation. No real OAuth runs.</p>
        </div>
      )}

      {step === 1 && (
        <div className="w-full max-w-2xl">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, var(--orange-eb), var(--sage))" }}>PR</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Priya R. — Operations Engineer</p>
              <p className="text-xs text-white/50">5 yrs at Tata Motors · Pune, IN · Synced from LinkedIn</p>
            </div>
            <span className="rounded-full bg-[var(--sage)]/30 px-2 py-1 text-[10px] text-[var(--sage)]">Verified</span>
          </div>

          <div className="grid gap-5">
            <Field label="Industry"><select className={inputCls} defaultValue="Manufacturing">{["Textiles", "Manufacturing", "Logistics", "Energy", "Construction"].map((i) => <option key={i}>{i}</option>)}</select></Field>
            <Field label="Years of experience: 5"><input type="range" min={0} max={20} defaultValue={5} className="w-full accent-[var(--orange-eb)]" /></Field>
            <Field label="Current role"><input className={inputCls} defaultValue="Operations Engineer" /></Field>
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span>Open to reskilling?</span>
              <span className="inline-flex h-6 w-11 items-center rounded-full bg-[var(--orange-eb)] p-0.5">
                <span className="ml-auto h-5 w-5 rounded-full bg-white" />
              </span>
            </label>
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={analyze} className="rounded-full bg-[var(--orange-eb)] px-6 py-3 text-sm font-medium text-white shadow-[0_15px_40px_-10px_var(--orange-eb)]">
              Find My Green Career Match →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CAREER_MATCHES = [
  {
    title: "Wind Turbine Technician",
    match: 81,
    salary: { y1: "₹6.5L", y3: "₹9.2L", y5: "₹14L" },
    have: ["Mechanical systems", "Field ops", "Safety protocols"],
    need: ["Turbine maintenance", "Rope-access cert"],
  },
  {
    title: "Energy Storage Specialist",
    match: 74,
    salary: { y1: "₹7.2L", y3: "₹11L", y5: "₹16L" },
    have: ["Process design", "QA"],
    need: ["Battery chemistry", "Grid integration"],
  },
  {
    title: "Decarbonization Analyst",
    match: 69,
    salary: { y1: "₹6L", y3: "₹10L", y5: "₹15L" },
    have: ["Data analysis", "Process mapping"],
    need: ["LCA tools", "GHG protocol"],
  },
];

function WorkerResults({ onReset }: { onReset: () => void }) {
  const [selected, setSelected] = useState(0);
  const c = CAREER_MATCHES[selected];

  const radarData = [
    { skill: "Tech", v: 70 },
    { skill: "Field", v: 88 },
    { skill: "Safety", v: 82 },
    { skill: "Renewables", v: 45 },
    { skill: "Cert", v: 30 },
    { skill: "Soft", v: 75 },
  ];

  return (
    <div className="px-6 py-10 text-white md:px-12 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Top 3 career matches for Priya</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">Your green career, mapped.</p>
        </div>
        <button onClick={onReset} className="text-xs text-white/50 hover:text-white">↻ Start over</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CAREER_MATCHES.map((m, i) => (
          <button key={m.title} onClick={() => setSelected(i)} className={`rounded-2xl border p-5 text-left transition-all ${selected === i ? "border-[var(--orange-eb)] bg-[var(--orange-eb)]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{m.title}</p>
              <span className="text-xs font-semibold text-[var(--orange-eb)]">{m.match}%</span>
            </div>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-white/55">
              <span>Y1 {m.salary.y1}</span>
              <span>·</span>
              <span>Y3 {m.salary.y3}</span>
              <span>·</span>
              <span>Y5 {m.salary.y5}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-widest text-white/50">{c.title} · skill radar</p>
          <div className="mt-2 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.1)" tick={false} axisLine={false} />
                <Radar dataKey="v" stroke="#FF4D00" fill="#FF4D00" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--sage)]">Skills you already have</p>
              <div className="mt-3 flex flex-wrap gap-2">{c.have.map((s) => <span key={s} className="rounded-full bg-[var(--sage)]/20 px-3 py-1 text-xs text-[var(--sage)]">{s}</span>)}</div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--orange-eb)]">Skills to acquire</p>
              <div className="mt-3 flex flex-wrap gap-2">{c.need.map((s) => <span key={s} className="rounded-full bg-[var(--orange-eb)]/15 px-3 py-1 text-xs text-[var(--orange-eb)]">{s}</span>)}</div>
            </div>
            <button className="mt-2 rounded-full bg-[var(--orange-eb)] px-5 py-3 text-sm font-medium text-white">Start 90-Day Roadmap →</button>
          </div>
        </div>
      </div>

      {/* 90-day roadmap */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-widest text-white/50">90-day roadmap</p>
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-3 h-px bg-white/10" />
          <div className="relative grid grid-cols-3 gap-4">
            {[
              { label: "Days 1–30", title: "Foundation courses", body: "Renewables 101, GHG Protocol basics, hands-on simulators." },
              { label: "Days 31–60", title: "Certification prep", body: "Wind safety, BEE, IRENA Wind Tech track." },
              { label: "Days 61–90", title: "Apply & interview", body: "3 matched roles, mock interviews, on-site visits." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="mb-4 flex justify-center">
                  <button className="relative grid h-7 w-7 place-items-center rounded-full bg-[var(--orange-eb)] text-[10px] font-semibold text-white ring-4 ring-[var(--charcoal)]">
                    {i + 1}
                  </button>
                </div>
                <p className="text-center text-[10px] uppercase tracking-widest text-white/40">{s.label}</p>
                <p className="mt-2 text-center text-sm font-medium">{s.title}</p>
                <p className="mt-1 text-center text-xs text-white/55">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============== CHAT FLOW =============== */

type Msg = { role: "user" | "model"; text: string };
const SYSTEM_PROMPT = "You are EcoBridge AI, a green jobs and sustainability career advisor. Help users find green jobs, understand ESG, get career advice for clean energy/sustainability roles, and the green economy. Be helpful, concise, and motivating. Reply in markdown when useful.";
const PROMPT_CHIPS = ["Find me a solar energy job", "What is ESG?", "Help me write a green resume", "What skills do I need for climate tech?"];

function ChatFlow() {
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("ecobridge_gemini_key") : null;
    if (stored) setApiKey(stored);
  }, []);

  useEffect(() => {
    if (apiKey) localStorage.setItem("ecobridge_gemini_key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    if (!apiKey) { setError("Add your free Gemini API key first."); return; }
    setError(null);
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: next.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Request failed");
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "(no reply)";
      setMessages((m) => [...m, { role: "model", text: reply }]);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[560px] flex-col text-white">
      {/* Key bar */}
      <div className="flex flex-col gap-3 border-b border-white/5 px-6 py-4 md:flex-row md:items-center md:px-10">
        <div className="flex flex-1 items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--orange-eb)]/15 text-[var(--orange-eb)]">🔑</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your free Gemini API key (aistudio.google.com/app/apikey)"
            className="flex-1 bg-transparent text-sm placeholder:text-white/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5">Get free key →</a>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">Clear chat</button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-8 md:px-10" style={{ maxHeight: 440 }}>
        {messages.length === 0 && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--orange-eb)] text-xl">🌿</div>
              <p className="mt-4 text-lg font-medium">Ask EcoBridge AI anything green.</p>
              <p className="mt-1 text-sm text-white/50">Career paths, ESG concepts, resume help, climate-tech skills.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {PROMPT_CHIPS.map((p) => (
                  <button key={p} onClick={() => send(p)} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-[var(--orange-eb)] hover:text-white">{p}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-[var(--sage)] text-white" : "bg-white/5 text-white/90"}`}>
              {m.text.split("\n").map((line, k) => <p key={k}>{line}</p>)}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl bg-white/5 px-4 py-3 text-white/60">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
            </div>
          </div>
        )}

        {error && <p className="rounded-md bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-white/5 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message EcoBridge AI…"
            className="flex-1 bg-transparent text-sm placeholder:text-white/30 focus:outline-none"
          />
          <button type="submit" disabled={loading || !input.trim()} className="grid h-9 w-9 place-items-center rounded-full bg-[var(--orange-eb)] text-white disabled:opacity-40">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
}
