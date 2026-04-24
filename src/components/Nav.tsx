import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !onHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-[var(--charcoal)]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo dark={solid || onHome} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={onHome ? l.href : `/${l.href}`}
              className={`text-sm transition-colors ${
                solid || onHome ? "text-white/70 hover:text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/team"
            className="text-sm text-white/70 transition-colors hover:text-white"
            activeProps={{ className: "text-sm text-white" }}
          >
            Team
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={onHome ? "#demo" : "/#demo"}
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-[var(--orange-eb)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_-10px_var(--orange-eb)] transition-all hover:scale-[1.03] hover:shadow-[0_16px_40px_-10px_var(--orange-eb)]"
          >
            Try Demo
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-[var(--charcoal)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={onHome ? l.href : `/${l.href}`} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base text-white/80 hover:bg-white/5">
                  {l.label}
                </a>
              ))}
              <Link to="/team" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base text-white/80 hover:bg-white/5">
                Team
              </Link>
              <a href={onHome ? "#demo" : "/#demo"} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--orange-eb)] px-4 py-3 text-sm font-medium text-white">
                Try Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
