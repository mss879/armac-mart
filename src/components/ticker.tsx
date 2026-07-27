/* Claim strip — the macrostructure's divider language between the fold and the
 * first browse surface. Pure CSS marquee: two identical tracks, the second
 * hidden from assistive tech. Pauses on hover and focus; stops entirely under
 * prefers-reduced-motion (see globals.css).
 */

import { tickerClaims } from "@/lib/catalog";

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {tickerClaims.map((claim) => (
        <li key={claim} className="flex items-center whitespace-nowrap">
          <span className="px-7 font-display text-[0.95rem] font-extrabold uppercase tracking-[0.06em] sm:text-[1.05rem]">
            {claim}
          </span>
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rotate-45 bg-signal"
          />
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <div className="ticker overflow-hidden border-y-2 border-ink bg-ink py-3.5 text-paper">
      <div className="ticker__track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
