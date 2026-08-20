/* Hand-drawn style line doodles, echoing the reference art direction. */

type DoodleProps = { className?: string };

export function ChocolateDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="10" y="14" width="44" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 26h44M10 38h44M24 14v36M39 14v36" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function CandyDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse cx="32" cy="32" rx="13" ry="11" stroke="currentColor" strokeWidth="2.5" />
      <path d="M19 30c-4-2-7-6-7-10 2 4 5 6 8 6M19 35c-4 2-7 5-8 9 3-3 6-4 9-4M45 30c4-2 7-6 7-10-2 4-5 6-8 6M45 35c4 2 7 5 8 9-3-3-6-4-9-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 27c3 3 7 7 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BottleDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M27 8h10v8c0 3 6 6 6 12v24a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V28c0-6 6-9 6-12V8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 36h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CookieDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="26" cy="26" r="2.4" fill="currentColor" />
      <circle cx="38" cy="30" r="2.4" fill="currentColor" />
      <circle cx="28" cy="39" r="2.4" fill="currentColor" />
      <circle cx="39" cy="41" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function SparkleDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M32 10c2 10 8 16 20 22-12 6-18 12-20 22-2-10-8-16-20-22 12-6 18-12 20-22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function SquiggleDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 24" fill="none" className={className} aria-hidden>
      <path d="M3 14c8-12 14-12 21 0s14 12 21 0 14-12 21 0 12 10 21 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function SteamDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 32" fill="none" className={className} aria-hidden>
      <path d="M8 28c-3-5 3-8 0-13M20 30c-3-6 3-9 0-16M32 28c-3-5 3-8 0-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
