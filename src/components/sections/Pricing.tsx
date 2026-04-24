import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    sub: "For solo workers exploring the green economy.",
    features: ["LinkedIn profile import", "1 career match report", "AI advisor (10 msg/day)"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$29",
    sub: "For active job-seekers and SMEs going green.",
    features: ["Unlimited career matches", "90-day reskilling roadmap", "Scope 1/2/3 emissions mapping", "CSRD + BRSR exports", "Priority AI advisor"],
    cta: "Start Pro trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "For corporates, ESG firms and government partners.",
    features: ["Multi-entity ScopeMap", "Custom data sources", "Talent pool API access", "SAML SSO + audit logs", "Dedicated success manager"],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  return (
    <section className="bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
            <span className="h-px w-8 bg-[var(--orange-eb)]" />
            Pricing
            <span className="h-px w-8 bg-[var(--orange-eb)]" />
          </div>
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
            Simple pricing. <span className="italic text-[var(--orange-eb)]">Real impact.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className={`relative rounded-3xl border bg-white p-8 transition-all duration-300 ${p.popular ? "border-[var(--sage)] shadow-[0_30px_80px_-30px_rgba(92,122,92,0.55)] md:-translate-y-2" : "border-[var(--charcoal)]/8 hover:-translate-y-1"}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--sage)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--charcoal)]/60">{p.name}</p>
              <p className="mt-4 text-5xl font-semibold tracking-tight">
                {p.price}
                {p.price.startsWith("$") && p.price !== "$0" && <span className="text-base font-normal text-[var(--charcoal)]/50">/mo</span>}
              </p>
              <p className="mt-2 text-sm text-[var(--charcoal)]/65">{p.sub}</p>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sage)]" />
                    <span className="text-[var(--charcoal)]/80">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-medium transition-colors ${p.popular ? "bg-[var(--orange-eb)] text-white shadow-[0_15px_40px_-10px_var(--orange-eb)]" : "border border-[var(--charcoal)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white"}`}>
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
