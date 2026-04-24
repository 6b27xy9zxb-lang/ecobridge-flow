import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Platform } from "@/components/sections/Platform";
import { Flywheel } from "@/components/sections/Flywheel";
import { Stories } from "@/components/sections/Stories";
import { Demo } from "@/components/sections/Demo";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Architecture } from "@/components/sections/Architecture";
import { Roadmap } from "@/components/sections/Roadmap";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoBridge — Turn every report into a decision." },
      { name: "description", content: "Upload reports, surface bottlenecks, ship the next move. The intelligence layer for modern operations." },
      { property: "og:title", content: "EcoBridge — The intelligence layer for modern operations" },
      { property: "og:description", content: "Ingest reads your data. Diagnose finds the bottleneck. Recommend ships the move — automatically." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Platform />
      <Flywheel />
      <Stories />
      <Demo />
      <Features />
      <Stats />
      <HowItWorks />
      <Architecture />
      <Roadmap />
      <Pricing />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </main>
  );
}
