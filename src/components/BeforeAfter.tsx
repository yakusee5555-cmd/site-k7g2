import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  label: string;
};

export function BeforeAfter({ before, after, label }: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => update(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, update]);

  return (
    <figure className="space-y-3">
      <div
        ref={ref}
        onPointerDown={(e) => {
          setDragging(true);
          update(e.clientX);
        }}
        className="relative aspect-4/3 w-full cursor-ew-resize touch-none overflow-hidden rounded-2xl select-none"
        style={{ boxShadow: "var(--shadow-lift)" }}
      >
        <img
          src={after}
          alt={`${label} after cleaning`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${label} before cleaning`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-navy-deep/80 px-3 py-1 font-display text-xs tracking-widest text-primary-foreground uppercase">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-spring/90 px-3 py-1 font-display text-xs tracking-widest text-navy-deep uppercase">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-1 bg-cta"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cta bg-card text-navy-deep cta-glow">
            <span className="font-display text-sm">↔</span>
          </div>
        </div>
      </div>
      <figcaption className="font-display text-sm tracking-wide text-muted-foreground uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
