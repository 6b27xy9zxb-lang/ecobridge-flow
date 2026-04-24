import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NODES = [
  { label: "Ingest", angle: 0 },
  { label: "Model", angle: 90 },
  { label: "Diagnose", angle: 180 },
  { label: "Act", angle: 270 },
];

const STATS = [
  { k: "Compounding context", v: "Every report you ingest sharpens the next diagnosis. Models learn your operation, not the average one." },
  { k: "Closed-loop feedback", v: "Mark a recommendation as shipped. Northbeam tracks the metric and updates the playbook automatically." },
  { k: "From signal to ticket", v: "Recommendations come pre-scoped: owner, expected impact, and the KPI to watch — straight into your tracker." },
];

export function Flywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const cx = 200, cy = 200, r = 130;

  return (
    <section className="relative overflow-hidden bg-[var(--charcoal)] py-28 text-white md:py-40" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 -z-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18)_0%,transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          The Loop
        </div>

        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="flex justify-center">
            <svg viewBox="0 0 400 400" className="h-[min(70vw,440px)] w-[min(70vw,440px)]">
              <defs>
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="rgba(124,58,237,0)" />
                  <stop offset="100%" stopColor="rgba(124,58,237,0.3)" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r={r + 30} fill="url(#ringGlow)" />
              <motion.circle
                cx={cx} cy={cy} r={r}
                fill="none" stroke="var(--orange-eb)" strokeWidth="1.5"
                strokeDasharray={2 * Math.PI * r}
                initial={{ strokeDashoffset: 2 * Math.PI * r }}
                animate={inView ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {[0, 90, 180, 270].map((a) => (
                <motion.g
                  key={a}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 + a / 360, duration: 0.5 }}
                  style={{ transformOrigin: "200px 200px" }}
                  transform={`rotate(${a} 200 200)`}
                >
                  <path d={`M${cx + r - 8},${cy - 6} l8,6 l-8,6`} fill="none" stroke="var(--orange-eb)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
              ))}
              {NODES.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180;
                const x = cx + r * Math.cos(rad);
                const y = cy + r * Math.sin(rad);
                return (
                  <motion.g
                    key={n.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <circle cx={x} cy={y} r="32" fill="#0d0d0d" stroke="white" strokeOpacity="0.15" />
                    <circle cx={x} cy={y} r="4" fill="var(--orange-eb)" />
                    <text x={x} y={y + 50} textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="11" letterSpacing="2" style={{ textTransform: "uppercase" }}>{n.label}</text>
                  </motion.g>
                );
              })}
              <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Decision</text>
              <text x={cx} y={cy + 14} textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="10" letterSpacing="2">LOOP</text>
            </svg>
          </div>

          <div className="space-y-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.4, duration: 0.6 }}
                className="border-l-2 border-[var(--orange-eb)]/40 pl-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--orange-eb)]">{s.k}</p>
                <p className="mt-2 text-base leading-relaxed text-white/75 md:text-lg">{s.v}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-3xl text-balance text-center text-[clamp(1.6rem,3.5vw,2.6rem)] font-light leading-snug tracking-tight text-white/90 md:mt-32"
        >
          “A dashboard tells you what happened. <span className="italic text-[var(--orange-eb)]">Northbeam tells you what to do next.</span>”
        </motion.blockquote>
      </div>
    </section>
  );
}
