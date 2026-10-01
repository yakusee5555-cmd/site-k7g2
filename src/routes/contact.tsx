import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS, PageHero } from "@/components/Chrome";
import { ContactForm } from "@/components/Extras";
import cleanHome from "@/assets/clean-home.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Kevin's Gutters" },
      {
        name: "description",
        content:
          "Get a free gutter cleaning estimate from Kevin's Gutters in Pennsauken, NJ. Call (609) 801-6541.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Get your property clean today"
        sub="Free estimates, no obligation. Call or send the form and we'll get right back to you."
      />
      <section className="bg-navy-gradient py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <div>
            <a
              href={BUSINESS.phoneHref}
              className="mt-2 block font-display text-3xl text-cta sm:text-4xl"
            >
              {BUSINESS.phone}
            </a>
            <p className="mt-6 text-sm text-primary-foreground/70">
              {BUSINESS.address}
              <br />
              {BUSINESS.hours}
            </p>
            <img src={cleanHome} alt="Clean home exterior with new gutters" loading="lazy" width={1024} height={1280} className="mt-8 hidden aspect-[16/10] w-full rounded-2xl object-cover shadow-2xl lg:block" />
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
