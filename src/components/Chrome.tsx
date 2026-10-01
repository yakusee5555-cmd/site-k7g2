import { Link } from "@tanstack/react-router";
import { useState } from "react";

import workerLadder from "@/assets/worker-ladder.jpg";
import cleanGutter from "@/assets/clean-gutter.jpg";
import cleanHome from "@/assets/clean-home.jpg";
import gutterGuard from "@/assets/gutter-guard.jpg";
import sidingAfter from "@/assets/siding-after.png";
import gutterAfter from "@/assets/gutter-after.png";
import drainAfter from "@/assets/drain-after.png";

export const BUSINESS = {
  name: "Kevin's Gutters",
  phone: "(609) 801-6541",
  phoneHref: "tel:+16098016541",
  wa: "https://wa.me/16098016541",
  address: "4434 Witherspoon Ave, Pennsauken, NJ 08109",
  hours: "Mon–Sat, 7:00 AM – 7:00 PM",
};

export const SERVICES = [
  { name: "Gutter Cleaning", img: workerLadder, desc: "Full hand-clearing and flush of every downspout, debris hauled away." },
  { name: "Gutter Repair", img: cleanGutter, desc: "Resealing, resloping, and hanger replacement so water goes where it should." },
  { name: "Gutter Installation", img: cleanHome, desc: "Seamless aluminum gutters sized and pitched for your roofline." },
  { name: "Gutter Guards", img: gutterGuard, desc: "Screens and micro-mesh that keep leaves out through every season." },
  { name: "Underground Drain Cleaning", img: drainAfter, desc: "Jetting and clearing of buried drain lines that back up at the elbow." },
  { name: "Power Washing", img: sidingAfter, desc: "Siding, walkways and decks brought back to their original color." },
];

export const TRUST = [
  { stat: "4.8★", label: "56+ Google Reviews" },
  { stat: "10+", label: "Years Experience" },
  { stat: "✓", label: "Licensed & Insured" },
  { stat: "24h", label: "Fast Response" },
];

export const CITIES = [
  "Pennsauken", "Cherry Hill", "Merchantville", "Camden", "Gloucester City",
  "Haddonfield", "Collingswood", "Moorestown", "Palmyra", "Riverton", "Cinnaminson", "Maple Shade",
];

export const PROMOS = [
  { amt: "$15 OFF", who: "Gutter cleaning — first-time customers" },
  { amt: "$125 OFF", who: "New gutter installation, 100 ft or more" },
  { amt: "$15 OFF", who: "Senior citizen discount" },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Results", to: "/results" },
  { label: "Roof Check", to: "/roof-assessment" },
  { label: "Pricing", to: "/pricing" },
  { label: "Reviews", to: "/reviews" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function LogoMark({ className = "h-10 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={`${className} shrink-0`} aria-label={`${BUSINESS.name} logo`}>
      <path d="M24 2 44 9v17c0 13.5-8.6 23.4-20 28C12.6 49.4 4 39.5 4 26V9L24 2z" fill="#14532d" />
      <path d="M24 6.5 40 12v14c0 11-7.2 19.4-16 23.4C15.2 45.4 8 37 8 26V12l16-5.5z" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="24" y="36" textAnchor="middle" fontWeight="800" fontSize="17" fill="#ffffff" letterSpacing="1">KG</text>
    </svg>
  );
}

export function SiteHeader() {
  const [promoOpen, setPromoOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {promoOpen && (
        <div className="relative bg-destructive px-10 py-2 text-center text-destructive-foreground">
          <p className="animate-promo font-display text-[11px] tracking-[0.18em] uppercase sm:text-sm">
            🔥 Limited offer — $15 off gutter cleaning for first-time customers 🔥
          </p>
          <button
            onClick={() => setPromoOpen(false)}
            aria-label="Close offer banner"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full px-2 text-lg leading-none opacity-80 transition hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      <header className="border-b border-border/60 bg-card/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-wide text-navy-deep">
                KEVIN&rsquo;S GUTTERS
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                South Jersey
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
            {NAV_LINKS.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="cta-glow rounded-full bg-cta px-4 py-2.5 font-display text-xs tracking-wider text-cta-foreground uppercase sm:text-sm"
            >
              Call {BUSINESS.phone}
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-card px-5 py-4 xl:hidden">
            <div className="grid gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-navy-deep py-12 text-primary-foreground/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-8" />
            <div>
              <div className="font-display text-lg text-primary-foreground">KEVIN&rsquo;S GUTTERS</div>
              <div className="text-[10px] tracking-[0.3em] uppercase">South Jersey</div>
            </div>
          </div>
          <p className="mt-3 text-sm">Licensed & insured</p>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-primary-foreground uppercase">
            Pages
          </h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-cta">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-primary-foreground uppercase">
            Contact
          </h4>
          <p className="mt-3 text-sm">
            <a href={BUSINESS.phoneHref} className="text-cta">
              {BUSINESS.phone}
            </a>
            <br />
            {BUSINESS.address}
            <br />
            {BUSINESS.hours}
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs">
        © {new Date().getFullYear()} {BUSINESS.name}. Serving {CITIES.join(", ")}.
      </p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-navy-gradient py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="font-display text-xs tracking-[0.3em] text-cta uppercase">{eyebrow}</span>
        <h1 className="mt-3 max-w-3xl font-display text-4xl uppercase sm:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-xl text-primary-foreground/75">{sub}</p>}
      </div>
    </section>
  );
}
