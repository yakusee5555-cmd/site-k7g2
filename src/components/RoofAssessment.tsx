import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

type Result = {
  relevant: boolean;
  severity: "low" | "moderate" | "high";
  summary: string;
  findings: string[];
  recommendations: { service: string; reason: string }[];
  urgency: string;
};

const SEVERITY: Record<string, string> = {
  low: "bg-spring text-primary-foreground",
  moderate: "bg-cta text-cta-foreground",
  high: "bg-destructive text-destructive-foreground",
};

function resize(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const max = 1280;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Couldn't read that image."));
    img.src = URL.createObjectURL(file);
  });
}

export function RoofAssessment({ phoneHref }: { phoneHref: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function onFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose a photo.");
    setError(null);
    setResult(null);
    try {
      const dataUrl = await resize(file);
      setPreview(dataUrl);
      setLoading(true);
      const res = await fetch("/api/assess-roof", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="assess" className="bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
          Free instant check
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-3xl uppercase sm:text-5xl">
          Snap your roof. Get a recommendation.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Upload a photo of your gutters or roofline and our AI will point out visible cleaning
          needs and suggest the right service. Final quotes always come from an on-site check.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files[0]);
            }}
            className="surface-card flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-card p-4 text-center"
          >
            {preview ? (
              <img src={preview} alt="Your uploaded roof" className="max-h-80 rounded-xl object-contain" />
            ) : (
              <p className="font-display text-lg uppercase text-muted-foreground">
                Drop a photo here
              </p>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <button
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="mt-4 rounded-full bg-primary px-6 py-3 font-display text-sm tracking-wider text-primary-foreground uppercase disabled:opacity-60"
            >
              {loading ? "Analyzing…" : preview ? "Try another photo" : "Upload roof photo"}
            </button>
          </div>

          <div className="surface-card rounded-2xl border border-border bg-card p-6">
            {loading && (
              <div className="space-y-3">
                <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-20 w-full animate-pulse rounded bg-muted" />
              </div>
            )}
            {!loading && error && <p className="text-destructive">{error}</p>}
            {!loading && !error && !result && (
              <p className="text-muted-foreground">Your assessment will appear here.</p>
            )}
            {!loading && result && !result.relevant && (
              <p className="text-muted-foreground">
                We couldn't spot a roof or gutters in that photo. Try a clear shot of your roofline.
              </p>
            )}
            {!loading && result?.relevant && (
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl uppercase">Assessment</h3>
                  <span
                    className={`rounded-full px-3 py-1 font-display text-[11px] tracking-wider uppercase ${SEVERITY[result.severity] ?? SEVERITY["moderate"]}`}
                  >
                    {result.severity} need
                  </span>
                </div>
                <p className="mt-3 text-sm">{result.summary}</p>
                {result.findings.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {result.findings.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                )}
                {result.recommendations.length > 0 && (
                  <div className="mt-5 space-y-3">
                    {result.recommendations.map((r) => (
                      <div key={r.service} className="rounded-xl border border-border bg-background p-4">
                        <div className="font-display uppercase text-primary">{r.service}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{r.reason}</p>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-4 text-sm font-medium">{result.urgency}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/pricing"
                    search={{ service: result.recommendations[0]?.service ?? "Gutter Cleaning" }}
                    className="rounded-full bg-primary px-5 py-2.5 font-display text-xs tracking-wider text-primary-foreground uppercase"
                  >
                    See my price
                  </Link>
                  <a href={phoneHref} className="cta-glow rounded-full bg-cta px-5 py-2.5 font-display text-xs tracking-wider text-cta-foreground uppercase">
                    Call now
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
