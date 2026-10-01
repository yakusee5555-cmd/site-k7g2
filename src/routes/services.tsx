import { createFileRoute, Link } from "@tanstack/react-router";

import { BUSINESS, PageHero, SERVICES } from "@/components/Chrome";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Gutter cleaning, repair, installation, guards, underground drain cleaning and power washing across South Jersey.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="What we do"
        title="Our services"
        sub="Total gutter cleaning and restoration services across South Jersey. Every job done by hand, checked twice, and left cleaner than we found it."
      />
      <section className="dotted-grid bg-background py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <Link
                  to="/contact"
                  className={`mt-5 inline-block rounded-full px-5 py-2.5 font-display text-xs tracking-wider uppercase ${
                    i === 1
                      ? "bg-cta text-cta-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  Book this service
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-secondary p-8">
            <div>
              <h3 className="font-display text-2xl uppercase">Not sure what you need?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Snap a photo of your roofline and get an instant recommendation, or call us at{" "}
                <a href={BUSINESS.phoneHref} className="font-medium text-primary">
                  {BUSINESS.phone}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/roof-assessment"
                className="rounded-full bg-primary px-6 py-3 font-display text-sm tracking-wider text-primary-foreground uppercase"
              >
                Free roof check
              </Link>
              <Link
                to="/pricing"
                className="rounded-full border border-primary px-6 py-3 font-display text-sm tracking-wider text-primary uppercase"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
