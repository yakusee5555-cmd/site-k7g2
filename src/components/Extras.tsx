import { useState } from "react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/16098016541"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="animate-wa fixed right-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lg lg:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43zm8.03-17.46A11.3 11.3 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.64l6.03-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
      </svg>
    </a>
  );
}

export function ServiceMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border shadow-lg ${className}`}>
      <iframe
        title="Kevin's Gutters service area map"
        src="https://maps.google.com/maps?q=4434%20Witherspoon%20Ave%2C%20Pennsauken%2C%20NJ%2008109&z=11&output=embed"
        className="h-full min-h-80 w-full grayscale-[0.7] contrast-[1.05]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// SAMPLE REVIEWS — replace with real Google reviews.
const REVIEWS = [
  { name: "Maria G.", town: "Pennsauken", text: "The Kevin's Gutters crew were incredible. Fast response time, cleared my completely clogged downspouts, and left no mess behind. Highly recommend!" },
  { name: "James T.", town: "Cherry Hill", text: "Very professional and fairly priced. They even showed me before and after photos of the roof. Will be using Kevin's Gutters every fall." },
  { name: "Priya S.", town: "Merchantville", text: "Booked on a Monday, done by Wednesday. They found a loose hanger and fixed it on the spot at no extra charge. Gutters flow perfectly now." },
  { name: "Robert D.", town: "Camden", text: "Had gutter guards installed last spring — not a single clog since. Crew was polite, on time and cleaned up everything." },
];

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-label="Google">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function Reviews() {
  const [i, setI] = useState(0);
  return (
    <section id="reviews" className="bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">Reviews</span>
            <h2 className="mt-3 font-display text-3xl uppercase sm:text-5xl">What neighbors say</h2>
          </div>
          <div className="flex gap-2 lg:hidden">
            <button aria-label="Previous review" onClick={() => setI((i + REVIEWS.length - 1) % REVIEWS.length)} className="h-10 w-10 rounded-full border border-border bg-card">‹</button>
            <button aria-label="Next review" onClick={() => setI((i + 1) % REVIEWS.length)} className="h-10 w-10 rounded-full border border-border bg-card">›</button>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {REVIEWS.map((r, idx) => (
            <article key={r.name} className={`surface-card flex-col rounded-2xl border border-border p-6 ${idx === i ? "flex" : "hidden"} lg:flex`}>
              <div className="flex items-center justify-between">
                <div className="text-lg tracking-widest text-star" aria-label="5 out of 5 stars">★★★★★</div>
                <GoogleG />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">“{r.text}”</p>
              <div className="mt-5 font-display uppercase">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.town}, NJ</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
