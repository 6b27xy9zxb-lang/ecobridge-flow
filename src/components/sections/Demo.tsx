import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { Upload, FileText, Send, Sparkles, AlertTriangle, TrendingUp, Paperclip, X } from "lucide-react";
import { DEFAULT_GEMINI_KEY } from "@/lib/site";

type Tab = "analyze" | "workspace" | "chat";

export function Demo() {
  const [tab, setTab] = useState<Tab>("analyze");

  return (
    <section id="demo" className="relative bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          The Workbench
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
            Try EcoBridge. <span className="text-[var(--charcoal)]/50">No signup.</span>
          </h2>
          <div className="inline-flex rounded-full border border-[var(--charcoal)]/10 bg-white p-1 shadow-sm">
            {([
              { id: "analyze", label: "Analyze a report" },
              { id: "workspace", label: "Live workspace" },
              { id: "chat", label: "AI Analyst" },
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
              className="min-h-[620px]"
            >
              {tab === "analyze" && <AnalyzeFlow />}
              {tab === "workspace" && <WorkspaceFlow />}
              {tab === "chat" && <ChatFlow />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GEMINI HELPER
   ============================================================ */

async function callGemini(opts: {
  apiKey: string;
  system: string;
  contents: { role: "user" | "model"; parts: { text?: string; inline_data?: { mime_type: string; data: string } }[] }[];
  json?: boolean;
}) {
  const { apiKey, system, contents, json } = opts;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: system }] },
        generationConfig: json ? { responseMimeType: "application/json" } : undefined,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Gemini request failed");
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   1. ANALYZE FLOW — upload / paste a report → AI insights
   ============================================================ */

const SAMPLE_REPORT = `Q3 2025 Operations Review — Nordcrest Logistics

Throughput by stage (units/wk):
  Intake:   8,420   (target 8,500, var -1%)
  Triage:   8,100   (target 8,400, var -3.5%)
  Build:    6,800   (target 8,000, var -15%)
  Review:   2,240   (target 7,500, var -70.1%)  <-- ALERT
  Ship:     2,180   (target 7,400, var -70.5%)

Backlog: WIP in Review is up 3.2x vs Q2. Avg dwell time: 11.4 days (Q2: 3.1 days).

Headcount: Build 14, Review 4, Ship 6. Two Review hires open since June, unfilled.

Revenue impact: $1.84M shipments delayed past SLA in Q3.
NPS: dropped from 47 to 31 quarter-over-quarter.
Top customer complaint themes: "shipment update lag" (62%), "billing mismatch" (18%).

Vendor portal: 7 logins required per shipment. Avg 6 hrs/wk lost per coordinator.`;

type Insight = {
  title: string;
  severity: "high" | "medium" | "low";
  finding: string;
  recommendation: string;
  impact: string;
  owner: string;
};

type AnalysisResult = {
  summary: string;
  headline_metric: { label: string; value: string; delta: string };
  insights: Insight[];
  trend: { label: string; v: number }[];
};

function AnalyzeFlow() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const apiKey = (typeof window !== "undefined" && localStorage.getItem("northbeam_gemini_key")) || DEFAULT_GEMINI_KEY;

  const handleFile = async (f: File) => {
    setFile(f);
    setFilePreview(`${f.name} · ${(f.size / 1024).toFixed(0)} KB`);
    if (f.type.startsWith("text/") || f.name.endsWith(".csv") || f.name.endsWith(".md")) {
      const text = await f.text();
      setInput(text.slice(0, 12000));
    }
  };

  const analyze = async (textOverride?: string) => {
    const sourceText = textOverride ?? input;
    if (!sourceText.trim() && !file) {
      setError("Paste a report, drop a file, or load the sample data.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const system = `You are EcoBridge, a senior business operations analyst. Read the report and return STRICT JSON matching this schema (no prose, no markdown):

{
  "summary": "2-sentence executive summary of what's happening operationally",
  "headline_metric": { "label": "single most important KPI from the report", "value": "the value", "delta": "delta vs target or prior period, e.g. -18% vs target" },
  "insights": [
    {
      "title": "5-8 word headline",
      "severity": "high" | "medium" | "low",
      "finding": "1-2 sentences: what is wrong / what is happening, grounded in the data",
      "recommendation": "1 concrete next-step the team can ship this week",
      "impact": "expected lift, e.g. +18% throughput or -42% queue time",
      "owner": "suggested owner role, e.g. Ops Lead, Head of CS"
    }
  ],
  "trend": [
    { "label": "stage or week label", "v": number 0-100 representing relative throughput/health }
  ]
}

Return EXACTLY 4 insights, ranked by impact. Return EXACTLY 5 trend points.
Be specific. Reference actual numbers from the report. Avoid fluff. Avoid sustainability/ESG/emissions topics — focus on operational efficiency, throughput, bottlenecks, resource allocation, and process gaps.`;

      const parts: any[] = [];
      if (sourceText.trim()) parts.push({ text: `Report content:\n\n${sourceText}` });
      if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
        const b64 = await fileToBase64(file);
        parts.push({ inline_data: { mime_type: file.type, data: b64 } });
      }
      if (parts.length === 0) parts.push({ text: sourceText });

      const raw = await callGemini({
        apiKey,
        system,
        contents: [{ role: "user", parts }],
        json: true,
      });

      const parsed: AnalysisResult = JSON.parse(raw);
      setResult(parsed);
    } catch (e: any) {
      setError(e.message || "Analysis failed. Try the sample data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay messages={[
    "Parsing report structure…",
    "Extracting metrics & tables…",
    "Running workflow & throughput models…",
    "Ranking recommendations by impact…",
  ]} />;

  if (result) return <AnalysisResults result={result} onReset={() => { setResult(null); setInput(""); setFile(null); setFilePreview(""); }} />;

  return (
    <div className="px-6 py-10 text-white md:px-12 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        {/* Drop / paste area */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/50">Step 01 · Drop or paste your report</p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            onClick={() => fileRef.current?.click()}
            className="group mt-4 cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-[var(--orange-eb)]/60 hover:bg-white/[0.04]"
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.txt,.md,.csv,.json,image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[var(--orange-eb)]/15 text-[var(--orange-eb)]">
              <Upload className="h-5 w-5" />
            </div>
            {filePreview ? (
              <p className="mt-4 text-sm font-medium text-white">{filePreview}</p>
            ) : (
              <>
                <p className="mt-4 text-sm font-medium text-white/85">Drop a PDF, CSV, image or text file</p>
                <p className="mt-1 text-xs text-white/45">or click to browse</p>
              </>
            )}
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-widest text-white/50">… or paste the text</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Paste a quarterly review, ops log, sprint retro, BI export — anything operational."
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white placeholder:text-white/30 focus:border-[var(--orange-eb)] focus:outline-none"
          />

          {error && <p className="mt-4 rounded-md bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => analyze()}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--orange-eb)] px-6 py-3 text-sm font-medium text-white shadow-[0_15px_40px_-10px_var(--orange-eb)] hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="h-4 w-4" /> Analyze report
            </button>
            <button
              onClick={() => { setInput(SAMPLE_REPORT); setFile(null); setFilePreview(""); }}
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Load sample report
            </button>
          </div>
        </div>

        {/* Side panel — what we look for */}
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--orange-eb)]">What EcoBridge looks for</p>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            {[
              { t: "Bottlenecks", d: "Stages where throughput collapses." },
              { t: "Variance & drift", d: "Metrics moving away from target." },
              { t: "Resource gaps", d: "Where headcount or budget is mis-allocated." },
              { t: "Process waste", d: "Steps you can collapse, automate, route." },
              { t: "Leading indicators", d: "Signals that predict next quarter." },
            ].map((i) => (
              <li key={i.t}>
                <p className="font-medium text-white">{i.t}</p>
                <p className="text-white/55">{i.d}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function AnalysisResults({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const sevColor = (s: string) => s === "high" ? "var(--orange-eb)" : s === "medium" ? "var(--violet-glow)" : "var(--graphite)";

  return (
    <div className="px-6 py-10 text-white md:px-12 md:py-14">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-[var(--orange-eb)]">Analysis complete</p>
          <p className="mt-2 text-balance text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{result.summary}</p>
        </div>
        <button onClick={onReset} className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:bg-white/5">↻ New analysis</button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {/* Headline metric */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[10px] uppercase tracking-widest text-white/50">Headline metric</p>
          <p className="mt-2 text-sm text-white/70">{result.headline_metric.label}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight">{result.headline_metric.value}</p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--orange-eb)]/15 px-2 py-1 text-[11px] text-[var(--orange-eb)]"><TrendingUp className="h-3 w-3" /> {result.headline_metric.delta}</p>
        </div>

        {/* Trend chart */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-white/50">Workflow health · trend</p>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{result.trend.length} points</span>
          </div>
          <div className="mt-4 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="v" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: "#A78BFA", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-widest text-white/50">Ranked recommendations</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {result.insights.map((ins, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold" style={{ background: sevColor(ins.severity), color: "#0d0d0d" }}>{i + 1}</span>
                  <p className="text-sm font-semibold">{ins.title}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest" style={{ background: `color-mix(in oklab, ${sevColor(ins.severity)} 20%, transparent)`, color: sevColor(ins.severity) }}>
                  {ins.severity === "high" && <AlertTriangle className="h-3 w-3" />}
                  {ins.severity}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/65">{ins.finding}</p>
              <div className="mt-3 rounded-lg border border-[var(--orange-eb)]/25 bg-[var(--orange-eb)]/10 p-3">
                <p className="text-[10px] uppercase tracking-widest text-[var(--orange-eb)]">Recommendation</p>
                <p className="mt-1 text-xs text-white/85">{ins.recommendation}</p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">Impact · {ins.impact}</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">Owner · {ins.owner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2. LIVE WORKSPACE — analytics dashboard
   ============================================================ */

const KPI_CARDS = [
  { label: "Throughput", value: "8,240", delta: "+12.4%", positive: true },
  { label: "Cycle time", value: "4.2d", delta: "−18%", positive: true },
  { label: "WIP backlog", value: "316", delta: "+3.2×", positive: false },
  { label: "SLA hit rate", value: "92.1%", delta: "+1.8pt", positive: true },
];

const STAGE_DATA = [
  { name: "Intake", v: 8420, level: "ok" },
  { name: "Triage", v: 8100, level: "ok" },
  { name: "Build", v: 6800, level: "watch" },
  { name: "Review", v: 2240, level: "alert" },
  { name: "Ship", v: 2180, level: "alert" },
];

const FEED = [
  { t: "Bottleneck detected · Review stage WIP up 3.2× vs Q2", sev: "high", time: "2m ago" },
  { t: "Recommendation accepted · Reassign 2 engineers Build → Review", sev: "ok", time: "11m ago" },
  { t: "Variance alert · NPS down 16pt QoQ in Logistics segment", sev: "medium", time: "1h ago" },
  { t: "New report ingested · Q3-operations.pdf (4.2 MB)", sev: "info", time: "2h ago" },
  { t: "Drift detected · Vendor login count rising 4 consecutive weeks", sev: "medium", time: "5h ago" },
];

function WorkspaceFlow() {
  return (
    <div className="px-6 py-10 text-white md:px-12 md:py-14">
      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-4">
        {KPI_CARDS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/50">{k.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{k.value}</p>
            <p className={`mt-1 text-xs ${k.positive ? "text-[var(--violet-glow)]" : "text-[var(--orange-eb)]"}`}>{k.delta}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {/* Throughput chart */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Throughput by stage · last 30d</p>
              <p className="mt-1 text-lg font-medium">Review stage choking pipeline</p>
            </div>
            <div className="rounded-full bg-[var(--orange-eb)]/15 px-3 py-1 text-xs text-[var(--orange-eb)]">2 alerts</div>
          </div>
          <div className="mt-6 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STAGE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                  {STAGE_DATA.map((d, i) => (
                    <Cell key={i} fill={d.level === "alert" ? "#FF4D00" : d.level === "watch" ? "#A78BFA" : "#7C3AED"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health score */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[10px] uppercase tracking-widest text-white/50">Operational health</p>
          <div className="relative mx-auto mt-4 h-40 w-40">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none" stroke="var(--orange-eb)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 67 / 100) }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-3xl font-semibold">67</p>
                <p className="text-[10px] uppercase tracking-widest text-white/50">/ 100</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-white/55">Throughput</span><span>Strong</span></div>
            <div className="flex justify-between"><span className="text-white/55">Resource fit</span><span className="text-[var(--orange-eb)]">Stretched</span></div>
            <div className="flex justify-between"><span className="text-white/55">Drift risk</span><span>Moderate</span></div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-white/50">Live insight feed</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-white/55"><span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--violet-glow)] opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--violet-glow)]" /></span> live</span>
          </div>
          <div className="mt-4 divide-y divide-white/5">
            {FEED.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 py-3 text-sm"
              >
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: f.sev === "high" ? "var(--orange-eb)" : f.sev === "medium" ? "var(--violet-glow)" : f.sev === "ok" ? "#22c55e" : "rgba(255,255,255,0.4)" }} />
                <p className="flex-1 text-white/85">{f.t}</p>
                <span className="text-[10px] text-white/40">{f.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3. AI ANALYST CHAT — file-aware, default key, ops-focused
   ============================================================ */

type Msg = { role: "user" | "model"; text: string; attachment?: string };

const SYSTEM_PROMPT = `You are EcoBridge, a senior business operations analyst.

Your job is to help operators read their data and decide what to do next. You analyze reports, dashboards, exports and pasted notes, and produce sharp, actionable insights.

Style:
- Open with the single most important finding in 1-2 sentences.
- Then give 2-4 ranked, concrete recommendations. Each has: action, expected impact, owner role, and the metric to watch.
- Use markdown (bold, bullets, short tables) when it helps.
- Be specific. Reference the user's actual numbers when present.
- Avoid filler ("Great question!"), avoid hedging, avoid generic advice.

Strict scope:
- Operations, workflows, throughput, bottlenecks, resource allocation, process improvement, performance gaps, BI report analysis.
- DO NOT discuss sustainability, ESG, emissions, Scope 3, CSRD, green careers, climate jobs, or ecology. If asked, briefly redirect to operations and analytics.`;

const PROMPT_CHIPS = [
  "What's the bottleneck in this workflow?",
  "Where should I reallocate headcount?",
  "Summarize this report in 5 bullets",
  "What leading indicators should I watch next quarter?",
];

function ChatFlow() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("northbeam_gemini_key") : null;
    setApiKey(stored || DEFAULT_GEMINI_KEY);
  }, []);

  useEffect(() => {
    if (apiKey && apiKey !== DEFAULT_GEMINI_KEY) localStorage.setItem("northbeam_gemini_key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() && !pendingFile) return;
    if (!apiKey) { setError("Add a Gemini API key first."); return; }
    setError(null);

    const attachmentLabel = pendingFile ? `📎 ${pendingFile.name}` : undefined;
    const userMsg: Msg = { role: "user", text: text || "(file uploaded)", attachment: attachmentLabel };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Build contents with multi-turn history + optional inline file
      const contents = await Promise.all(next.map(async (m, idx) => {
        const parts: any[] = [{ text: m.text }];
        if (idx === next.length - 1 && pendingFile) {
          if (pendingFile.type.startsWith("text/") || pendingFile.name.endsWith(".csv") || pendingFile.name.endsWith(".md") || pendingFile.name.endsWith(".json")) {
            const txt = await pendingFile.text();
            parts[0] = { text: `${m.text}\n\nAttached file (${pendingFile.name}):\n\`\`\`\n${txt.slice(0, 12000)}\n\`\`\`` };
          } else if (pendingFile.type === "application/pdf" || pendingFile.type.startsWith("image/")) {
            const b64 = await fileToBase64(pendingFile);
            parts.push({ inline_data: { mime_type: pendingFile.type, data: b64 } });
          }
        }
        return { role: m.role, parts };
      }));

      const reply = await callGemini({ apiKey, system: SYSTEM_PROMPT, contents });
      setMessages((m) => [...m, { role: "model", text: reply || "(no reply)" }]);
      setPendingFile(null);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[620px] flex-col text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--orange-eb)] text-white"><Sparkles className="h-4 w-4" /></span>
          <div>
            <p className="text-sm font-semibold">EcoBridge · AI Analyst</p>
            <p className="text-[11px] text-white/50">Operations · workflows · recommendations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowKey(!showKey)} className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 hover:bg-white/5">
            {showKey ? "Hide key" : "API key"}
          </button>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-white/70 hover:bg-white/10">Clear</button>
          )}
        </div>
      </div>

      {showKey && (
        <div className="flex flex-col gap-2 border-b border-white/5 bg-white/[0.02] px-6 py-3 md:flex-row md:items-center md:px-10">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your Gemini API key (default key already loaded)"
            className="flex-1 rounded-md bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none"
          />
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 hover:bg-white/5">Get free key →</a>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-8 md:px-10" style={{ maxHeight: 460 }}>
        {messages.length === 0 && (
          <div className="grid h-full place-items-center text-center">
            <div className="max-w-md">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--orange-eb)] text-white"><Sparkles className="h-5 w-5" /></div>
              <p className="mt-4 text-lg font-medium">Ask EcoBridge about your operations.</p>
              <p className="mt-1 text-sm text-white/50">Drop a report or paste data, then ask what to do about it.</p>
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
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-[var(--violet)] text-white" : "bg-white/5 text-white/90"}`}>
              {m.attachment && <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-black/20 px-2 py-0.5 text-[10px]">{m.attachment}</p>}
              <Markdown text={m.text} />
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
        {pendingFile && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80">
            <FileText className="h-3.5 w-3.5" /> {pendingFile.name}
            <button type="button" onClick={() => setPendingFile(null)} className="text-white/50 hover:text-white"><X className="h-3 w-3" /></button>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,.md,.csv,.json,image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && setPendingFile(e.target.files[0])}
          />
          <button type="button" onClick={() => fileRef.current?.click()} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white/55 hover:bg-white/5 hover:text-white" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask EcoBridge to analyze something…"
            className="flex-1 bg-transparent text-sm placeholder:text-white/30 focus:outline-none"
          />
          <button type="submit" disabled={loading || (!input.trim() && !pendingFile)} className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--orange-eb)] text-white disabled:opacity-40">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

/* Small markdown renderer (bold + bullets + paragraphs) — avoids extra dep */
function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let listBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length) {
      out.push(
        <ul key={out.length} className="my-2 ml-4 list-disc space-y-1">
          {listBuf.map((li, k) => <li key={k} dangerouslySetInnerHTML={{ __html: inline(li) }} />)}
        </ul>
      );
      listBuf = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const m = line.match(/^[-*]\s+(.*)/);
    if (m) { listBuf.push(m[1]); continue; }
    flushList();
    if (!line.trim()) { out.push(<div key={out.length} className="h-2" />); continue; }
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) {
      const Tag = (`h${Math.min(3, h[1].length)}` as "h1"|"h2"|"h3");
      out.push(<Tag key={out.length} className="mt-2 text-sm font-semibold" dangerouslySetInnerHTML={{ __html: inline(h[2]) }} />);
      continue;
    }
    out.push(<p key={out.length} dangerouslySetInnerHTML={{ __html: inline(line) }} />);
  }
  flushList();
  return <>{out}</>;
}
function inline(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-1 py-0.5 text-[11px]">$1</code>');
}

/* ============================================================
   Shared loading overlay
   ============================================================ */

function LoadingOverlay({ messages }: { messages: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1 < messages.length ? i + 1 : i)), 700);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="grid min-h-[620px] place-items-center px-6 py-12 text-white">
      <div className="text-center">
        <div className="relative mx-auto h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-[var(--orange-eb)]" />
          <div className="absolute inset-3 grid place-items-center rounded-full bg-[var(--orange-eb)]/20">
            <Sparkles className="h-6 w-6 text-[var(--orange-eb)]" />
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
