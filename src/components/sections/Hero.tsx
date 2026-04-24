import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HEADLINE = ["The", "intelligence", "layer", "for", "the", "green", "transition."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--charcoal)] text-white">
      {/* Background image */}
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-50" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--charcoal)]/40 via-[var(--charcoal)]/60 to-[var(--charcoal)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,77,0,0.18)_0%,transparent_60%)]" />
      </motion.div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-28 pb-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-eb)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-eb)]" />
          </span>
          EDGEIQ Hackathon 2026 · Live demo
        </motion.div>

        <h1 className="mt-8 max-w-[18ch] text-balance text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {HEADLINE.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 text-[clamp(1.6rem,3.5vw,2.6rem)] font-light tracking-tight text-white/90"
        >
          One platform. <span className="text-[var(--violet-glow)] italic">Measured.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
        >
          A unified analytics platform that maps Scope 3 emissions, models workforce capability,
          and routes the two together — in real time. Built for operations, strategy, and ESG teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a href="#demo" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--orange-eb)] px-6 py-3.5 text-sm font-medium text-white shadow-[0_20px_50px_-15px_var(--orange-eb)] transition-all hover:scale-[1.02]">
            Map Your Emissions
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
          <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/10">
            Find Green Careers
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <span className="relative h-10 w-[1px] bg-white/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-[float-y_2s_ease-in-out_infinite] bg-[var(--orange-eb)]" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
