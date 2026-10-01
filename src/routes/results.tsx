import { createFileRoute, Link } from "@tanstack/react-router";

import { BeforeAfter } from "@/components/BeforeAfter";
import { BUSINESS, PageHero } from "@/components/Chrome";
import sidingBefore from "@/assets/siding-before.png";
import sidingAfter from "@/assets/siding-after.png";
import gutterBefore from "@/assets/gutter-before.png";
import gutterAfter from "@/assets/gutter-after.png";
import drainBefore from "@/assets/drain-before.png";
import drainAfter from "@/assets/drain-after.png";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Before & After Results | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Real before-and-after gutter cleaning results from Kevin's Gutters in South Jersey. Drag the slider on any photo.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Proof of work"
        title="See the difference"
        sub={`Real before-and-after results from ${BUSINESS.name}. Drag the slider on any photo.`}
      />
      <section className="bg-navy-gradient py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-3">
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
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="cta-glow inline-block rounded-full bg-cta px-7 py-3.5 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Get my free estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
