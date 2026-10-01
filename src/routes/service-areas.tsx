import { createFileRoute, Link } from "@tanstack/react-router";

import { ServiceMap } from "@/components/Extras";
import { BUSINESS, CITIES, PageHero } from "@/components/Chrome";

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "Service Areas | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Kevin's Gutters serves Pennsauken, Cherry Hill, Camden, Moorestown and towns across South Jersey.",
      },
    ],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <div>
      <PageHero
        eyebrow="Where we work"
        title="Serving South Jersey"
        sub="Headquartered in Pennsauken, NJ and covering the surrounding towns."
      />
      <section className="dotted-grid bg-background py-20">
        <div className="mx-auto max-w-6xl px-5">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              In the area? Call <a href={BUSINESS.phoneHref} className="font-medium text-primary">{BUSINESS.phone}</a> for a free estimate.
            </p>
            <Link
              to="/contact"
              className="cta-glow mt-5 inline-block rounded-full bg-cta px-7 py-3.5 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
