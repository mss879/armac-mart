/* F6 · Product card grid — knobs: ratio=3/4 portrait, density=4-up, action=Add
 *
 * Cards carry a coloured header strip and a heavy outline, echoing the reference
 * boards. Strip fills rotate through the brand woods; each pairing below was
 * checked for contrast — walnut takes paper text, the lighter woods take ink.
 *
 * No star ratings and no review counts: this shop has no review data yet, and a
 * fabricated "4.8 ★ (312 reviews)" is the fastest way to make a real storefront
 * look generated. Add them back once there are real numbers behind them.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { featured } from "@/lib/catalog";

/** Header-strip fills, paired with a text colour that clears AA against them. */
const STRIPS = [
  "bg-signal text-signal-ink",
  "bg-tan text-ink",
  "bg-walnut text-accent-ink",
  "bg-wood text-ink",
];

/** "£5.60" → 5.6. Returns null for anything it can't parse cleanly. */
function toNumber(price: string): number | null {
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function discountPercent(price: string, wasPrice?: string): number | null {
  if (!wasPrice) return null;
  const now = toNumber(price);
  const was = toNumber(wasPrice);
  if (now === null || was === null || was <= now) return null;
  return Math.round(((was - now) / was) * 100);
}

export function BestSellers() {
  return (
    <section
      id="best-sellers"
      className="scroll-mt-24 bg-paper-2 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="text-[length:var(--text-display-s)] text-ink">
            Off the shelf this week
          </h2>
          <Link
            href="/shop"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-ink px-5 text-ink transition-colors duration-[140ms] ease-out hover:bg-ink hover:text-paper"
          >
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] whitespace-nowrap">
              See the full shop
            </span>
            <ArrowRight
              className="size-4 transition-transform duration-[140ms] ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {featured.map((product, i) => {
            const saving = discountPercent(product.price, product.wasPrice);
            const strip = STRIPS[i % STRIPS.length];
            return (
              <li key={product.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper transition-[transform,box-shadow] duration-[240ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_34px_-18px_var(--color-ink)]">
                  {/* Coloured header strip */}
                  <p
                    className={`flex items-center justify-between gap-2 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${strip}`}
                  >
                    <span className="truncate">{product.category}</span>
                    {saving !== null && (
                      <span className="tabular shrink-0 whitespace-nowrap">
                        −{saving}%
                      </span>
                    )}
                  </p>

                  <div className="relative aspect-3/4 overflow-hidden border-b-2 border-ink bg-tan/15">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 20rem, 50vw"
                        className="object-cover transition-transform duration-[240ms] ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      /* Photo not supplied yet — a tinted monogram swatch reads
                         as deliberate, where a broken image or grey box does not. */
                      <div
                        aria-hidden="true"
                        className="grid h-full w-full place-items-center"
                      >
                        <span className="font-display text-7xl font-extrabold text-walnut/20">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {product.badge && (
                      <span className="tag-tilt-a absolute left-3 top-3 rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-[1.0625rem] font-extrabold leading-tight text-walnut">
                      <Link
                        href={`/product/${product.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[0.8rem] leading-snug text-muted">
                      {product.note}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 pt-1">
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="tabular font-display text-lg font-extrabold text-ink">
                          {product.price}
                        </span>
                        {product.wasPrice && (
                          <span className="tabular text-[0.8rem] text-muted line-through">
                            <span className="sr-only">Was </span>
                            {product.wasPrice}
                          </span>
                        )}
                      </p>
                      <button
                        type="button"
                        aria-label={`Add ${product.name} to basket`}
                        className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-colors duration-[140ms] ease-out hover:bg-ink hover:text-paper"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
