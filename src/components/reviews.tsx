/* T1 · Pull quote with marginalia — knobs: card fills varied, attribution inline
 *
 * Three tinted cards on a stagger rather than three stacked rows, with circular
 * monogram avatars standing in for photography. Monograms are honest: they do
 * not imply a portrait the shop does not have.
 *
 * PLACEHOLDER COPY. These are written samples, not collected reviews. Replace
 * them with real, attributable customer feedback before launch — published
 * testimonials that nobody actually said are both an AI tell and, in the UK,
 * a CMA/ASA problem.
 *
 * Deliberately no star ratings: there is no review data behind them yet.
 */

import { reviews } from "@/lib/catalog";

const CARD_FILLS = [
  "bg-paper border-2 border-ink",
  "bg-walnut text-accent-ink",
  "bg-tan/35",
];

const AVATAR_FILLS = [
  "bg-signal text-signal-ink",
  "bg-paper text-walnut",
  "bg-walnut text-accent-ink",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-paper-2 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-[length:var(--text-display-s)] text-ink">
            What the street says
          </h2>
        </div>

        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {reviews.map((review, i) => {
            const dark = i === 1;
            return (
              <li
                key={review.name}
                /* Middle card drops on a stagger at wide widths so the row is
                   an arrangement rather than a rank of identical boxes. */
                className={i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-4" : undefined}
              >
                <figure
                  className={`flex h-full flex-col gap-6 rounded-[1.75rem] p-7 ${CARD_FILLS[i % CARD_FILLS.length]}`}
                >
                  <blockquote
                    className={`flex-1 font-display text-[1.15rem] font-bold leading-[1.4] ${
                      dark ? "text-accent-ink" : "text-ink"
                    }`}
                  >
                    <p>&ldquo;{review.quote}&rdquo;</p>
                  </blockquote>

                  <figcaption className="flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className={`grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-sm font-extrabold ${AVATAR_FILLS[i % AVATAR_FILLS.length]}`}
                    >
                      {initials(review.name)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-display text-base font-extrabold ${
                          dark ? "text-accent-ink" : "text-walnut"
                        }`}
                      >
                        {review.name}
                      </span>
                      <span
                        className={`mt-0.5 block text-[0.8rem] leading-snug ${
                          dark ? "text-accent-ink/70" : "text-muted"
                        }`}
                      >
                        {review.detail}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
