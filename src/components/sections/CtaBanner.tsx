import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="bg-[var(--cream)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-[var(--orange-eb)] p-10 text-white shadow-[0_40px_120px_-30px_var(--orange-eb)] md:p-16"
        >
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--violet-deep)]/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">Get started today</p>
              <h2 className="mt-3 text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
                Stop reading reports. Start shipping decisions.
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/80">
                Open the workbench, drop your latest report, and get your next move in under 60 seconds.
              </p>
            </div>
            <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--charcoal)] px-7 py-4 text-sm font-medium text-white shadow-xl transition-transform hover:scale-[1.03]">
              Open the workbench
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
