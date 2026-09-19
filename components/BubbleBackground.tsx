"use client";

/**
 * Decorative animated cleaning bubbles that drift up the left and right sides
 * of every public page. Purely visual: fixed behind all content, non-
 * interactive, and paused for visitors who prefer reduced motion (handled by
 * the global `prefers-reduced-motion` rule in globals.css).
 *
 * Bubbles are pinned to the page gutters (the "side" the client asked for) so
 * they never sit behind body copy in the central column.
 */

type Bubble = {
  size: number; // px
  offset: number; // px in from the edge
  duration: number; // s
  delay: number; // s
  opacity: number;
};

// Deterministic sets (no Math.random) so server and client markup match.
const LEFT: Bubble[] = [
  { size: 26, offset: 18, duration: 17, delay: 0, opacity: 0.5 },
  { size: 14, offset: 60, duration: 13, delay: 3, opacity: 0.42 },
  { size: 40, offset: 8, duration: 22, delay: 6, opacity: 0.38 },
  { size: 18, offset: 90, duration: 15, delay: 9, opacity: 0.45 },
  { size: 30, offset: 40, duration: 19, delay: 2, opacity: 0.4 },
];

const RIGHT: Bubble[] = [
  { size: 34, offset: 16, duration: 20, delay: 1.5, opacity: 0.42 },
  { size: 16, offset: 64, duration: 14, delay: 5, opacity: 0.45 },
  { size: 22, offset: 30, duration: 18, delay: 8, opacity: 0.4 },
  { size: 12, offset: 96, duration: 12, delay: 11, opacity: 0.5 },
  { size: 44, offset: 6, duration: 24, delay: 3.5, opacity: 0.34 },
];

function Column({ bubbles, side }: { bubbles: Bubble[]; side: "left" | "right" }) {
  return (
    <div
      className="absolute bottom-0 top-0 w-32 sm:w-40"
      style={{ [side]: 0 } as React.CSSProperties}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={
            {
              [side]: `${b.offset}px`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--bubble-opacity": b.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function BubbleBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Column bubbles={LEFT} side="left" />
      <Column bubbles={RIGHT} side="right" />
    </div>
  );
}
