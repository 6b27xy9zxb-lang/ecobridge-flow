import { motion } from "framer-motion";
import { UserPlus, Sparkles, Briefcase } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Create profile", body: "1-click LinkedIn import or 60-second form. Verified instantly." },
  { icon: Sparkles, title: "AI matches you", body: "Skill-adjacency engine surfaces green roles you can actually land." },
  { icon: Briefcase, title: "Get hired", body: "Auto-apply, interview prep, and post-hire reskilling baked in." },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--cream)] py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          How it works · 3 steps
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--charcoal)]/40">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--orange-eb)] text-[11px] font-semibold text-white">{i + 1}</span>
                Step {i + 1}
              </div>
              <s.icon className="mt-8 h-7 w-7 text-[var(--charcoal)]" />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--charcoal)]/65">{s.body}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-3 hidden h-px w-16 bg-[var(--charcoal)]/15 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
