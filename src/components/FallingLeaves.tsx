import { useEffect, useState } from "react";

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<
    Array<{ left: number; delay: number; duration: number; size: number; opacity: number }>
  >([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 10 : 26;
    setLeaves(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        duration: 14 + Math.random() * 14,
        size: 8 + Math.random() * 12,
        opacity: 0.12 + Math.random() * 0.18,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="animate-leaf absolute top-0 block rounded-tr-full rounded-bl-full bg-autumn"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
