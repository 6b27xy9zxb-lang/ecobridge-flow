import { Link } from "@tanstack/react-router";

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--orange-eb)] shadow-[0_8px_24px_-8px_var(--orange-eb)] transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V8M10 20V4M16 20v-9M22 20v-6" />
        </svg>
      </span>
      <span className={`text-[15px] font-semibold tracking-tight ${dark ? "text-white" : "text-[var(--charcoal)]"}`}>
        North<span className="text-[var(--orange-eb)]">beam</span>
      </span>
    </Link>
  );
}
