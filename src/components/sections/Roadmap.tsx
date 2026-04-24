import { motion } from "framer-motion";

const PHASES = [
  { tag: "Phase 01", title: "Operations & Strategy teams", body: "Mid-market COOs, Heads of Strategy, Ops leads — the people drowning in reports today." },
  { tag: "Phase 02", title: "Cross-functional rollouts", body: "Sales, CS, Product, Finance — one workbench, one reasoning layer across the company." },
  { tag: "Phase 03", title: "Embedded analyst API", body: "Northbeam reasoning available inside Notion, Linear, Slack and your own products." },
  { tag: "Ecosystem", title: "Open analyst platform", body: "BI vendors, consultancies and PE firms plug their data and playbooks directly in." },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-[var(--charcoal)] py-28 text-white md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          Roadmap
        </div>
        <h2 className="max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
          A path from <span className="text-[var(--orange-eb)]">workbench</span> to operating layer.
        </h2>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          {PHASES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative mb-12 grid gap-4 pl-12 md:grid-cols-2 md:pl-0 md:gap-8 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}>
                <div className="absolute left-2 -translate-x-1/2 md:left-1/2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--orange-eb)] text-[10px] font-semibold ring-4 ring-[var(--charcoal)]">{i + 1}</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-[var(--orange-eb)]">{p.tag}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65 md:max-w-none">{p.body}</p>
              </div>
              <div />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
