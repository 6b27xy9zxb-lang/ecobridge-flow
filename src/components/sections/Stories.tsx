import { motion } from "framer-motion";
import rahul from "@/assets/story-rahul.jpg";
import priya from "@/assets/story-priya.jpg";

export function Stories() {
  return (
    <section id="how" className="bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-8 md:pt-40">
        <div className="mb-16 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--orange-eb)]">
          <span className="h-px w-8 bg-[var(--orange-eb)]" />
          How it works · Two journeys
        </div>
      </div>

      <Story
        side="left"
        dark
        image={rahul}
        kicker="Rahul · Procurement Lead, Surat"
        title="A textile mill maps Scope 3 in 4 hours."
        steps={[
          "Rahul enters supplier spend data into ScopeMap.",
          "AI reveals his dye supplier drives 62% of Scope 3 emissions.",
          "EcoBridge surfaces a transitioning procurement manager nearby.",
          "Rahul hires. Emissions drop 38%. Compliance solved.",
        ]}
      />

      <Story
        side="right"
        image={priya}
        kicker="Priya · Operations Engineer, Pune"
        title="A career shift in 90 days, not 5 years."
        steps={[
          "Priya connects her LinkedIn in one click.",
          "CareerShift maps her skills: 81% adjacency to Wind Turbine Tech.",
          "She receives a personalized 90-day reskilling plan.",
          "Three local job matches. A new career begins.",
        ]}
      />

      <div className="h-28 md:h-40" />
    </section>
  );
}

function Story({
  side,
  dark,
  image,
  kicker,
  title,
  steps,
}: {
  side: "left" | "right";
  dark?: boolean;
  image: string;
  kicker: string;
  title: string;
  steps: string[];
}) {
  return (
    <div
      className={`relative ${dark ? "bg-[var(--charcoal)] text-white" : "bg-[var(--cream)] text-[var(--charcoal)]"}`}
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-0 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[640px] ${side === "right" ? "md:order-2" : ""}`}
        >
          <img
            src={image}
            alt={kicker}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1024}
            height={1280}
          />
          <div className={`absolute inset-0 ${dark ? "bg-gradient-to-t from-[var(--charcoal)]/60 to-transparent" : "bg-gradient-to-t from-black/20 to-transparent"}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center gap-8 px-6 py-20 md:px-14 md:py-28"
        >
          <div className={`text-xs font-medium uppercase tracking-[0.25em] ${dark ? "text-[var(--orange-eb)]" : "text-[var(--orange-eb)]"}`}>
            {kicker}
          </div>
          <h3 className="text-balance text-[clamp(1.8rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
            {title}
          </h3>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${dark ? "bg-[var(--orange-eb)] text-white" : "bg-[var(--charcoal)] text-white"}`}>
                  {i + 1}
                </span>
                <span className={`text-base leading-relaxed ${dark ? "text-white/75" : "text-[var(--charcoal)]/75"}`}>
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </div>
  );
}
