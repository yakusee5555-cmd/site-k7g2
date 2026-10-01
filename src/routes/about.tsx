import { createFileRoute, Link } from "@tanstack/react-router";

import { BUSINESS, PageHero } from "@/components/Chrome";
import workerLadder from "@/assets/worker-ladder.jpg";
import cleanGutter from "@/assets/clean-gutter.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Kevin's Gutters is a licensed contractor working out of Pennsauken, NJ. Every job done by hand, checked twice, and left cleaner than we found it.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="Protecting your home with care"
        sub="Licensed & insured · Mon–Sat, 7:00 AM – 7:00 PM"
      />
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
              Our story
            </span>
            <h2 className="mt-3 font-display text-3xl uppercase sm:text-5xl">
              The gutter crew South Jersey trusts
            </h2>
            <p className="mt-4 text-muted-foreground">
              {BUSINESS.name} is a licensed contractor working out of Pennsauken, NJ. Every job is
              done by hand, checked twice, and left cleaner than we found it — no rushed crews, no
              surprise charges.
            </p>
            <p className="mt-4 text-muted-foreground">
              We started with one ladder and a simple idea: show up on time, do the job right, and
              treat every home like it's our own. Thousands of clean gutters later, that hasn't
              changed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/reviews"
                className="rounded-full bg-primary px-6 py-3 font-display text-sm tracking-wider text-primary-foreground uppercase"
              >
                Read our reviews
              </Link>
              <Link
                to="/contact"
                className="cta-glow rounded-full bg-cta px-6 py-3 font-display text-sm tracking-wider text-cta-foreground uppercase"
              >
                Get a free estimate
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <img src={workerLadder} alt="Technician cleaning gutters on a ladder" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" />
              <img src={cleanGutter} alt="Close-up of a clean gutter" loading="lazy" width={1024} height={1024} className="mt-10 aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "10K+", v: "Gutters cleaned" },
                { k: "56+", v: "5-star reviews" },
                { k: "10+", v: "Years in business" },
                { k: "100%", v: "Debris hauled away" },
              ].map((item) => (
                <div key={item.v} className="surface-card rounded-2xl border border-border p-6">
                  <div className="font-display text-4xl text-primary">{item.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
