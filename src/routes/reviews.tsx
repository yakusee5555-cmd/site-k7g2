import { createFileRoute } from "@tanstack/react-router";

import { Reviews } from "@/components/Extras";
import { PageHero } from "@/components/Chrome";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews | Kevin's Gutters" },
      {
        name: "description",
        content:
          "What South Jersey neighbors say about Kevin's Gutters. 4.8 stars across 56+ Google reviews.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Reviews"
        title="What neighbors say"
        sub="4.8 stars across 56+ Google reviews from homeowners all over South Jersey."
      />
      <Reviews />
    </div>
  );
}
