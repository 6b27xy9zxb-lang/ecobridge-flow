import { motion } from "framer-motion";

const LAYERS = [
  {
    name: "Sources",
    color: "var(--violet-glow)",
    items: ["PDF / DOCX uploads", "XLSX, CSV, JSON", "BI exports (Looker, Tableau)", "Pasted prose & notes", "Webhook ingest"],
  },
  {
    name: "AI Reasoning",
    color: "var(--orange-eb)",
    items: ["Document parser (Gemini)", "Workflow & throughput models", "Variance & drift detection", "Recommendation ranker"],
  },
  {
    name: "Workbench",
    color: "var(--mist)",
    items: ["Insight feed", "KPI workspace", "AI Analyst chat", "Action tracker"],
  },
  {
    name: "Infrastructure",
    color: "white",
    items: ["React + TanStack Start", "Edge functions", "Postgres + vector store", "SOC 2-aligned encryption"],
  },
];

export function Architecture() {
  return (
    <section className="relative overflow-hidden bg-[var(--charcoal)] py-28 text-white md:py-40">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          System Architecture
        </div>
        <h2 className="max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
          Built like a product. <span className="text-white/40">Not a hack.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="text-[10px] uppercase tracking-widest" style={{ color: l.color }}>Layer 0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{l.name}</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                {l.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
                    {it}
                  </li>
                ))}
              </ul>

              {i < LAYERS.length - 1 && (
                <svg className="absolute -right-3 top-1/2 hidden h-4 w-6 -translate-y-1/2 text-white/30 md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {["Gemini 1.5 Flash", "OpenAI", "LangChain", "Postgres + pgvector", "ClickHouse", "Vercel + Cloudflare"].map((d, i) => (
            <motion.span
              key={d}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + 0.6 }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70"
            >
              {d}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
