/* F6 · Product card grid — knobs: ratio=3/4 portrait, density=4-up, action=Add
 *
 * No star ratings and no review counts: this shop has no review data yet, and a
 * fabricated "4.8 ★ (312 reviews)" is the fastest way to make a real storefront
 * look generated. Add them back once there are real numbers behind them.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { featured } from "@/lib/catalog";

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
      className="scroll-mt-24 bg-paper-2 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="text-[length:var(--text-display-s)] text-ink">
            Off the shelf this week
          </h2>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 border-b-2 border-walnut pb-1 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-walnut whitespace-nowrap"
          >
            See the full shop
            <ArrowRight
              className="size-4 transition-transform duration-[140ms] ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {featured.map((product) => {
            const saving = discountPercent(product.price, product.wasPrice);
            return (
            <li key={product.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-paper transition-[transform,border-color] duration-[240ms] ease-out hover:-translate-y-0.5 hover:border-wood">
                <div className="relative aspect-3/4 overflow-hidden bg-tan/15">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 20rem, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    /* Photo not supplied yet — a tinted monogram swatch reads as
                       deliberate, where a broken image or grey box does not. */
                    <div
                      aria-hidden="true"
                      className="grid h-full w-full place-items-center"
                    >
                      <span className="font-display text-6xl font-extrabold text-walnut/20">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-signal px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-signal-ink">
                      {product.badge}
                    </span>
                  )}

                  {saving !== null && (
                    <span className="tabular absolute right-3 top-3 rounded-full bg-walnut px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-accent-ink">
                      {saving}% off
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-wood">
                    {product.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
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
                      <span className="tabular font-display text-lg font-extrabold text-walnut">
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
                      className="relative z-10 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border-2 border-ink px-3 text-ink transition-colors duration-[140ms] ease-out hover:bg-ink hover:text-accent-ink"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                      <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] whitespace-nowrap">
                        Add
                      </span>
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
