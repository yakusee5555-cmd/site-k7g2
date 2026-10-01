import { createFileRoute } from "@tanstack/react-router";

import { RoofAssessment } from "@/components/RoofAssessment";
import { BUSINESS, PageHero } from "@/components/Chrome";

export const Route = createFileRoute("/roof-assessment")({
  head: () => ({
    meta: [
      { title: "Free Roof Check | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Upload a photo of your gutters or roofline and get an instant AI assessment with service recommendations.",
      },
    ],
  }),
  component: RoofAssessmentPage,
});

function RoofAssessmentPage() {
  return (
    <div>
      <PageHero
        eyebrow="Free instant check"
        title="Snap your roof. Get a recommendation."
        sub="Upload a photo of your gutters or roofline and our AI will point out visible cleaning needs and suggest the right service. Final quotes always come from an on-site check."
      />
      <div className="[&>section]:py-12">
        <RoofAssessment phoneHref={BUSINESS.phoneHref} />
      </div>
    </div>
  );
}
