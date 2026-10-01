import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// SAMPLE PRICES — replace with the business's real rates.
export const ROOF_TYPES = [
  { id: "1story", label: "1-story", mult: 1 },
  { id: "2story", label: "2-story", mult: 1.4 },
  { id: "3story", label: "3-story", mult: 1.8 },
  { id: "flat", label: "Flat / commercial", mult: 1.2 },
];

export const SIZES = [
  { id: "s", label: "Small (under 1,500 sq ft)", base: 125 },
  { id: "m", label: "Medium (1,500–2,500 sq ft)", base: 175 },
  { id: "l", label: "Large (2,500–4,000 sq ft)", base: 250 },
  { id: "xl", label: "Extra large (4,000+ sq ft)", base: 350 },
];

export const SERVICE_FACTORS: Record<string, number> = {
  "Gutter Cleaning": 1,
  "Gutter Repair": 1.5,
  "Gutter Guards": 4,
  "Underground Drain Cleaning": 1.2,
  "Power Washing": 1.6,
};

const STEEP_ADD = 50;
export const PRICE_EVENT = "pick-service";

export function Pricing({ initialService = "" }: { initialService?: string }) {
  const [roof, setRoof] = useState("1story");
  const [size, setSize] = useState("m");
  const [service, setService] = useState(
    initialService && initialService in SERVICE_FACTORS ? initialService : "Gutter Cleaning",
  );
  const [steep, setSteep] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const on = (e: Event) => {
      const s = (e as CustomEvent<string>).detail;
      if (s in SERVICE_FACTORS) setService(s);
    };
    window.addEventListener(PRICE_EVENT, on);
    return () => window.removeEventListener(PRICE_EVENT, on);
  }, []);

  const base = SIZES.find((s) => s.id === size)!.base;
  const mult = ROOF_TYPES.find((r) => r.id === roof)!.mult;
  let total = Math.round(base * mult * (SERVICE_FACTORS[service] ?? 1)) + (steep ? STEEP_ADD : 0);
  if (firstTime && service === "Gutter Cleaning") total -= 15;
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.15);

  const select =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <section id="pricing" className="dotted-grid bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">Pricing</span>
        <h2 className="mt-3 font-display text-3xl uppercase sm:text-5xl">Cleaning rates</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Starting gutter cleaning prices by home height and size. Pick your details for an instant
          estimate.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-navy-gradient text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-display tracking-wide uppercase">Home size</th>
                {ROOF_TYPES.map((r) => (
                  <th key={r.id} className="px-4 py-3 text-left font-display tracking-wide uppercase">
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{s.label}</td>
                  {ROOF_TYPES.map((r) => (
                    <td key={r.id} className="px-4 py-3 text-muted-foreground">
                      ${Math.round(s.base * r.mult)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Steep roofs add ${STEEP_ADD}. Final price confirmed on site.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="surface-card grid gap-4 rounded-2xl border border-border p-6 sm:grid-cols-2">
            <label className="text-xs font-medium tracking-wide uppercase">
              Service
              <select className={select} value={service} onChange={(e) => setService(e.target.value)}>
                {Object.keys(SERVICE_FACTORS).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium tracking-wide uppercase">
              Roof type
              <select className={select} value={roof} onChange={(e) => setRoof(e.target.value)}>
                {ROOF_TYPES.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium tracking-wide uppercase sm:col-span-2">
              Home size
              <select className={select} value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={steep} onChange={(e) => setSteep(e.target.checked)} />
              Steep roof
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={firstTime} onChange={(e) => setFirstTime(e.target.checked)} />
              First-time customer
            </label>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-navy-gradient p-8 text-primary-foreground">
            <div className="text-xs tracking-[0.3em] uppercase opacity-75">Estimated cost</div>
            <div className="mt-2 font-display text-5xl text-cta">
              ${low}–${high}
            </div>
            <p className="mt-2 text-sm opacity-80">{service}</p>
            <Link
              to="/contact"
              className="cta-glow mt-6 w-fit rounded-full bg-cta px-6 py-3 font-display text-sm tracking-wider text-cta-foreground uppercase"
            >
              Book this estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
