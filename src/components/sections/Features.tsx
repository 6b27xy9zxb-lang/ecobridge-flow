import { motion } from "framer-motion";
import { Sparkles, BarChart3, MessageSquareText, TrendingUp, Search, FileText } from "lucide-react";

const FEATURES = [
  { icon: FileText, title: "Report Intelligence", body: "Parse PDFs, spreadsheets and BI exports into a queryable operational model." },
  { icon: BarChart3, title: "Live KPI Workspace", body: "Pin the metrics that matter. Watch drift, variance and outliers in real time." },
  { icon: Search, title: "Bottleneck Detection", body: "Pinpoint the workflow stage that's choking throughput before it hits the deck." },
  { icon: TrendingUp, title: "Impact Forecasting", body: "Every recommendation comes with an expected lift, a confidence band and a risk class." },
  { icon: Sparkles, title: "Resource Optimizer", body: "Reallocate people, queues and budget against your highest-leverage moves." },
  { icon: MessageSquareText, title: "AI Analyst Chat", body: "Ask anything about your data. Get answers grounded in your actual reports." },
];

export function Features() {
  return (
    <section className="bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
              <span className="h-px w-8 bg-[var(--orange-eb)]" />
              Capabilities
            </div>
            <h2 className="max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Everything an operator needs to <span className="italic text-[var(--orange-eb)]">decide faster.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--charcoal)]/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--violet)]/40 hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.45)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--violet)]/0 blur-2xl transition-all duration-500 group-hover:bg-[var(--violet)]/20" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--charcoal)] text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/65">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
