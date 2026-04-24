import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { v: 50000, suffix: "+", label: "Green jobs surfaced" },
  { v: 1200, suffix: "+", label: "Companies onboarded" },
  { v: 94, suffix: "%", label: "Match accuracy" },
  { v: 180, suffix: "+", label: "Countries served" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="bg-[var(--charcoal)] py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4 md:px-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="border-l border-white/10 pl-6"
          >
            <p className="text-[clamp(2rem,4vw,3.6rem)] font-semibold tracking-tight">
              <Counter to={s.v} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/50">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
