/* T1 · Pull quote with marginalia — knobs: roman large, attribution=margin-aligned
 *
 * PLACEHOLDER COPY. These are written samples, not collected reviews. Replace
 * them with real, attributable customer feedback before launch — published
 * testimonials that nobody actually said are both an AI tell and, in the UK,
 * a CMA/ASA problem.
 */

import { reviews } from "@/lib/catalog";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-paper-2 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t-2 border-ink pt-6">
          <h2 className="max-w-[20ch] text-[length:var(--text-display-s)] text-ink">
            What the street says
          </h2>
        </div>

        <ul className="mt-12 space-y-10">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="grid gap-4 border-b border-rule pb-10 last:border-0 last:pb-0 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10"
            >
              <blockquote className="font-display text-[1.35rem] font-bold leading-[1.35] text-ink sm:text-[1.6rem]">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <footer className="lg:pt-2">
                <p className="font-display text-base font-extrabold text-walnut">
                  {review.name}
                </p>
                <p className="mt-1 text-[0.85rem] leading-snug text-muted">
                  {review.detail}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
