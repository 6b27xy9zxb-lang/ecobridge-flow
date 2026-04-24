import { motion } from "framer-motion";

const SIGNALS = [
  { k: "68%", v: "of operational reports are read once and never acted on." },
  { k: "11 hrs", v: "median weekly time analysts spend reformatting data." },
  { k: "$1.3T", v: "lost annually to undetected workflow bottlenecks." },
];

export function Problem() {
  return (
    <section className="relative bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]"
        >
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          The Problem
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)] md:p-12"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--orange-eb)]/10 blur-2xl" />
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--orange-eb)]">Operators</p>
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-[var(--charcoal)]">
              Drowning in dashboards. <span className="text-[var(--charcoal)]/55">Starved of decisions.</span>
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--charcoal)]/70">
              Reports stack up faster than anyone can read them. The signal is in there —
              the workflow that's slipping, the queue that's choking throughput — but no
              one has time to find it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-[var(--charcoal)] p-8 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] md:p-12"
          >
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[var(--violet)]/30 blur-2xl" />
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--orange-eb)]">Leadership</p>
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight">
              Strategy moves at the speed of <span className="text-[var(--orange-eb)]">analysis</span>.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              Most teams wait two weeks for a deck that summarizes what already happened.
              The window to act has closed. The competitor already moved.
            </p>
          </motion.div>
        </div>

        {/* Signals strip */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--charcoal)]/10 bg-[var(--charcoal)]/10 md:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-8"
            >
              <p className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-[var(--charcoal)]">{s.k}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal)]/65">{s.v}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-24 max-w-4xl text-balance text-center text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-[var(--charcoal)] md:mt-32"
        >
          The data is already on your desk.{" "}
          <span className="italic text-[var(--orange-eb)]">The decision isn't.</span>
        </motion.h2>
      </div>
    </section>
  );
}
