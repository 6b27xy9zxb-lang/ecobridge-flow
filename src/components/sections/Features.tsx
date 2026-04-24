import { motion } from "framer-motion";
import { Sparkles, BarChart3, MessageSquareText, TrendingUp, Search, FileText } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "AI Job Matching", body: "Skill-adjacency engine matches workers to green roles in seconds." },
  { icon: BarChart3, title: "ESG Dashboard", body: "Live Scope 1/2/3 mapping with CSRD- and BRSR-ready exports." },
  { icon: MessageSquareText, title: "AI Career Advisor", body: "Always-on coach for green career paths, ESG and reskilling." },
  { icon: TrendingUp, title: "Market Intelligence", body: "Salary benchmarks, demand signals, and policy trend tracking." },
  { icon: Search, title: "Smart Search", body: "Find suppliers, candidates and certifications by intent, not keywords." },
  { icon: FileText, title: "Resume AI", body: "Rewrite CVs around climate impact and verifiable green skills." },
];

export function Features() {
  return (
    <section className="bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
              <span className="h-px w-8 bg-[var(--orange-eb)]" />
              Features
            </div>
            <h2 className="max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Everything you need to <span className="italic text-[var(--orange-eb)]">go green — smarter.</span>
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
              className="group relative overflow-hidden rounded-2xl border border-[var(--charcoal)]/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sage)]/40 hover:shadow-[0_30px_60px_-30px_rgba(92,122,92,0.5)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--sage)]/0 blur-2xl transition-all duration-500 group-hover:bg-[var(--sage)]/20" />
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
