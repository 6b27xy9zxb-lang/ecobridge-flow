import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import teamHero from "@/assets/team-hero.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team & Vision — EcoBridge" },
      { name: "description", content: "Meet Team Mindmesh — the builders behind EcoBridge, the intelligence layer for modern operations." },
      { property: "og:title", content: "Team & Vision — EcoBridge" },
      { property: "og:description", content: "One workbench where every report turns into a shippable decision." },
      { property: "og:image", content: teamHero },
    ],
  }),
  component: TeamPage,
});

const MEMBERS = [
  { initials: "P", name: "Piyush S Meharwade", role: "Product · Architecture", fact: "Believes the right diagram replaces ten meetings." },
  { initials: "H", name: "Himanshu Pal", role: "AI · Backend", fact: "Treats every problem as a graph problem in disguise." },
  { initials: "M", name: "Mahi Talwani", role: "Design · Frontend", fact: "Pixel-perfect, but only after the third espresso." },
  { initials: "N", name: "Nandini Singh", role: "Research · Operations", fact: "Has read more ops post-mortems than anyone should." },
];

function TeamPage() {
  return (
    <main className="relative">
      <Nav />

      {/* Vision hero */}
      <section className="relative isolate overflow-hidden bg-[var(--charcoal)] pt-32 pb-24 text-white md:min-h-[90svh] md:flex md:items-center md:pt-40">
        <img src={teamHero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--charcoal)]/30 via-[var(--charcoal)]/60 to-[var(--charcoal)]" />
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--orange-eb)]">
            Our Vision
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-6 max-w-[20ch] text-balance text-[clamp(2.6rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            EcoBridge is the intelligence layer for modern operations.
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[var(--cream)] py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] font-light leading-snug tracking-tight text-[var(--charcoal)]">
            Operators don't lack data — they lack the time to act on it. We're building the workbench that closes the gap between <span className="font-medium italic text-[var(--orange-eb)]">a report on your desk</span> and a decision in production.
          </motion.p>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-[var(--charcoal)] py-28 text-white md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
            <span className="h-px w-8 bg-[var(--orange-eb)]" />
            Team Mindmesh
          </div>
          <h2 className="max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
            Four builders. <span className="text-white/40">One mission.</span>
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {MEMBERS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[var(--orange-eb)]/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-start gap-5">
                  <div className="grid h-20 w-20 place-items-center rounded-full text-3xl font-semibold text-white" style={{ background: `linear-gradient(135deg, var(--violet), var(--orange-eb))` }}>
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-[var(--orange-eb)]">{m.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/85">
                      <span className="text-white/40">“</span>{m.fact}<span className="text-white/40">”</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--orange-eb)]/30 bg-[var(--orange-eb)]/10 p-6 text-sm text-white/85">
            Built for <b>EDGEIQ Open Innovation Hackathon 2026</b> · Team <b>Mindmesh</b>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
