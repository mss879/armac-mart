"use client";

/** Circular rotating text badge, like the reference "fun for the whole family". */
export function RotatingBadge({
  text = "IMPORTED WITH LOVE • ARMAC MART • ",
  emoji = "🍫",
  size = 110,
  className = "",
}: {
  text?: string;
  emoji?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-brand-yellow" />
        <text className="fill-cocoa-ink font-bold" style={{ fontSize: "10.5px", letterSpacing: "1.6px", fontFamily: "var(--font-display)" }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize: size * 0.3 }}
      >
        {emoji}
      </span>
    </div>
  );
}
