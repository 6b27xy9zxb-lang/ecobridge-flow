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
      { title: "EcoBridge — One platform. Two crises. One connected solution." },
      { name: "description", content: "Map Scope 3 emissions, match green talent, close the loop. Built for the green transition." },
      { property: "og:title", content: "EcoBridge — The operating system for the green transition" },
      { property: "og:description", content: "ScopeMap measures. CareerShift retrains. The Connector Layer matches them — automatically." },
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
