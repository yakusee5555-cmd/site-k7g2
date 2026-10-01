import { createFileRoute } from "@tanstack/react-router";

import { Pricing } from "@/components/Pricing";
import { PROMOS, PageHero } from "@/components/Chrome";

export const Route = createFileRoute("/pricing")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () => ({
    meta: [
      { title: "Pricing | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Starting gutter cleaning prices by home height and size. Pick your details for an instant estimate.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { service } = Route.useSearch();
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Cleaning rates"
        sub="Starting gutter cleaning prices by home height and size. Pick your details for an instant estimate."
      />
      <div className="[&>section]:py-12">
        <Pricing initialService={service} />
      </div>
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
    </div>
  );
}
