import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { FallingLeaves } from "@/components/FallingLeaves";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Pricing } from "@/components/Pricing";
import { Reviews, ServiceMap } from "@/components/Extras";
import { BUSINESS, CITIES, PROMOS, SERVICES, TRUST } from "@/components/Chrome";
import heroVideo from "@/assets/hero.mp4";
import sidingBefore from "@/assets/siding-before.png";
import sidingAfter from "@/assets/siding-after.png";
import gutterBefore from "@/assets/gutter-before.png";
import gutterAfter from "@/assets/gutter-after.png";
import drainBefore from "@/assets/drain-before.png";
import drainAfter from "@/assets/drain-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kevin's Gutters | Gutter Cleaning & Repair in South Jersey" },
      {
        name: "description",
        content:
          "Professional gutter cleaning, repair, installation, guards, drains and power washing across South Jersey. 4.8 stars, 56+ reviews. Call (609) 801-6541.",
      },
      { property: "og:title", content: "Kevin's Gutters" },
      {
        property: "og:description",
        content:
          "Trusted gutter cleaning, repair and installation across South Jersey. Licensed & insured. $15 off for first-time customers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://kevinsgutter.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://kevinsgutter.vercel.app/og-image.png" },
    ],
  }),
  component: Home,
});

function Home() {
  useEffect(() => {
    document.title = "Kevin's Gutters | Gutter Cleaning & Repair in South Jersey";
  }, []);

  return (
    <div>
      <FallingLeaves />
      {/* HERO */}
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-navy-gradient opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/45 to-transparent" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center gap-7 px-5 py-24">
          <span className="w-fit rounded-full border border-cta/50 px-4 py-1.5 font-display text-[11px] tracking-[0.25em] text-cta uppercase">
            #1 Trusted Local Gutter Experts
          </span>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-primary-foreground uppercase sm:text-6xl lg:text-7xl">
            Professional Gutter Cleaning That{" "}
            <span className="animate-fade-in text-cta">Protects Your Home</span>
          </h1>
          <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Trusted gutter cleaning, repair, and installation services across South Jersey.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-7 py-3.5 font-display text-sm tracking-wider text-primary-foreground uppercase shadow-lg transition hover:-translate-y-0.5"
            >
              Get My Free Estimate
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="cta-glow rounded-full bg-cta px-7 py-3.5 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Call {BUSINESS.phone}
            </a>
          </div>

          <div className="mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm"
              >
                <div className="font-display text-xl text-cta">{t.stat}</div>
                <div className="text-[11px] tracking-wide text-primary-foreground/75 uppercase">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="dotted-grid bg-background py-20">
        <div className="mx-auto max-w-6xl px-5">
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            What we do
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl uppercase sm:text-5xl">
            Total gutter cleaning and restoration services
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article
                key={s.name}
                className={`surface-card rounded-2xl border border-border p-6 ${
                  i === 1 ? "bg-navy-gradient text-primary-foreground" : ""
                }`}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="-mx-6 -mt-6 mb-5 aspect-[16/9] w-[calc(100%+3rem)] max-w-none rounded-t-2xl object-cover"
                />
                <div className={`mb-4 h-1 w-10 rounded-full ${i === 1 ? "bg-cta" : "bg-spring"}`} />
                <h3 className={`font-display text-xl uppercase ${i === 1 ? "text-primary-foreground" : ""}`}>
                  {s.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/services"
              className="inline-flex rounded-full bg-navy-gradient px-7 py-3.5 font-display text-sm tracking-wider text-primary-foreground uppercase shadow-lg transition hover:-translate-y-0.5"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="bg-navy-gradient py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-primary-foreground font-display text-3xl uppercase sm:text-5xl">
            See the difference
          </h2>
          <p className="mt-3 max-w-xl text-primary-foreground/75">
            Real before-and-after results from {BUSINESS.name}. Drag the slider on any photo.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <BeforeAfter
              before={gutterBefore}
              after={gutterAfter}
              label="Roof & gutter line clearing"
            />
            <BeforeAfter
              before={sidingBefore}
              after={sidingAfter}
              label="Siding power washing"
            />
            <BeforeAfter
              before={drainBefore}
              after={drainAfter}
              label="Flat roof drain clearing"
            />
          </div>
          <div className="mt-10">
            <Link
              to="/results"
              className="inline-flex rounded-full border border-primary-foreground/30 px-7 py-3.5 font-display text-sm tracking-wider text-primary-foreground uppercase transition hover:border-cta hover:text-cta"
            >
              View full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <div className="[&>section]:py-20">
        <Pricing />
      </div>

      {/* REVIEWS */}
      <Reviews />

      {/* SERVICE AREAS */}
      <section className="dotted-grid bg-background py-20">
        <div className="mx-auto max-w-6xl px-5">
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            Where we work
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase sm:text-5xl">Serving South Jersey</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Headquartered in Pennsauken, NJ and covering the surrounding towns.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CITIES.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm"
              >
                <span className="text-spring">✓</span>
                {c}
              </li>
            ))}
          </ul>
          <ServiceMap className="mt-8 h-96" />
        </div>
      </section>

      {/* PROMOS */}
      <section className="bg-secondary py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-3">
          {PROMOS.map((p) => (
            <div
              key={p.who}
              className="surface-card rounded-2xl border-2 border-dashed border-autumn/50 p-6 text-center"
            >
              <div className="font-display text-3xl text-autumn">{p.amt}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-navy-gradient py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5">
          <div>
            <h2 className="font-display text-3xl uppercase sm:text-4xl">
              Get your gutters cleaned today
            </h2>
            <p className="mt-2 text-primary-foreground/75">
              Free estimates, no obligation. {BUSINESS.hours}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/roof-assessment"
              className="rounded-full bg-primary px-7 py-3.5 font-display text-sm tracking-wider text-primary-foreground uppercase shadow-lg"
            >
              Free roof check
            </Link>
            <Link
              to="/contact"
              className="cta-glow rounded-full bg-cta px-7 py-3.5 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
