import { motion } from "framer-motion";

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
            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)] md:p-12"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--orange-eb)]/10 blur-2xl" />
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--orange-eb)]">Workers</p>
            <p className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-tight text-[var(--charcoal)]">
              500M+
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--charcoal)]/70">
              workers in carbon-disrupted industries with no clear path to a green career.
              Most never get matched, retrained, or seen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-[var(--charcoal)] p-8 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] md:p-12"
          >
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[var(--sage)]/30 blur-2xl" />
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--orange-eb)]">Businesses</p>
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight">
              EU CSRD + India BRSR now mandate <span className="text-[var(--orange-eb)]">Scope 3</span> reporting.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              Most SMEs have zero visibility into which suppliers drive their emissions —
              and zero way to source the talent that could fix them.
            </p>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-24 max-w-4xl text-balance text-center text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-[var(--charcoal)] md:mt-32"
        >
          Two crises. Zero shared infrastructure.{" "}
          <span className="italic text-[var(--orange-eb)]">Until now.</span>
        </motion.h2>
      </div>
    </section>
  );
}
