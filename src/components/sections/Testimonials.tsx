import { motion } from "framer-motion";

const ITEMS = [
  {
    initials: "RA",
    quote: "We mapped Scope 3 in a morning. By Friday, EcoBridge had pre-shortlisted three candidates for our new ESG role.",
    name: "Rohit Arora",
    role: "COO, MetroDye Industries",
  },
  {
    initials: "PI",
    quote: "I switched from automotive QA to a wind-energy career in 11 weeks. The roadmap was honest about every gap.",
    name: "Priya Iyer",
    role: "Wind Tech, Suzlon",
  },
  {
    initials: "LK",
    quote: "Finally a tool that doesn't pretend reporting and reskilling are different problems. They're the same problem.",
    name: "Liang Kim",
    role: "Climate Lead, Aster Capital",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--charcoal)] py-28 text-white md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-14 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          Voices
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <svg className="h-6 w-6 text-[var(--orange-eb)]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h4v4H7c0 2 1 4 4 4v3c-4 0-7-3-7-7V7Zm9 0h4v4h-4c0 2 1 4 4 4v3c-4 0-7-3-7-7V7Z" /></svg>
              <blockquote className="mt-4 text-base leading-relaxed text-white/85">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full text-xs font-semibold" style={{ background: "linear-gradient(135deg, var(--orange-eb), var(--sage))" }}>{t.initials}</div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
