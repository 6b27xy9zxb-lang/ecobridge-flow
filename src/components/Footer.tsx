import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative bg-[var(--charcoal)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            The intelligence layer for modern operations. Upload a report,
            surface the bottleneck, ship the next move — on one connected workbench.
          </p>
          <div className="mt-8 flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white" href="https://github.com" aria-label="GitHub">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5Z" /></svg>
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white" href="https://linkedin.com" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8h4.5v14H.25V8Zm7.5 0h4.31v1.92h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V22h-4.94V8Z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Platform</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><a href="/#platform" className="hover:text-white">Ingest</a></li>
            <li><a href="/#platform" className="hover:text-white">Diagnose</a></li>
            <li><a href="/#platform" className="hover:text-white">Recommend</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link to="/team" className="hover:text-white">Vision</Link></li>
            <li><Link to="/team" className="hover:text-white">Team</Link></li>
            <li><a href="/#roadmap" className="hover:text-white">Roadmap</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-white/40 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} Northbeam. All rights reserved.</p>
          <p>Built by Team Mindmesh · EDGEIQ 2026</p>
        </div>
      </div>
    </footer>
  );
}
