import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS, PageHero, SERVICES } from "@/components/Chrome";
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = BUSINESS.phoneHref;
            }}
            className="rounded-2xl bg-card p-6 text-card-foreground shadow-2xl"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "phone", label: "Phone", type: "tel" },
                { id: "email", label: "Email", type: "email" },
                { id: "address", label: "Address", type: "text" },
              ].map((f) => (
                <div key={f.id} className={f.id === "address" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.id} className="text-xs font-medium tracking-wide uppercase">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required={f.id !== "address"}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label htmlFor="service" className="text-xs font-medium tracking-wide uppercase">
                  Service needed
                </label>
                <select
                  id="service"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {SERVICES.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-xs font-medium tracking-wide uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="cta-glow mt-6 w-full rounded-full bg-cta py-3.5 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Get My Free Estimate
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
