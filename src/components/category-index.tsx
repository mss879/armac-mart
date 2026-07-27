/* The primary browse surface of the Ecosystem Index.
 *
 * A bento rather than a uniform table: the two lead aisles run double-width,
 * the rest are single, and the two catch-all ranges close the block as wide
 * walnut tiles. Spans are chosen so every row fills exactly (2+2, 4, 4, 2+2) —
 * varied rhythm without a ragged edge.
 *
 * Tints rotate through the brand woods so no two adjacent tiles match. The icon
 * stays INLINE with its label throughout: icon-in-a-square-above-a-heading is
 * the icon-tile tell, and it is the one shape this block must not become.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, homepageCategories, type Category } from "@/lib/catalog";

/** Rotating tile fills, all drawn from the brand woods. */
const TINTS = ["bg-paper", "bg-tan/30", "bg-paper", "bg-wood/15"];

function Tile({
  category,
  wide,
  tint,
  solid,
}: {
  category: Category;
  wide?: boolean;
  tint: string;
  solid?: boolean;
}) {
  const Icon = category.icon;

  return (
    <li className={wide ? "sm:col-span-2" : undefined}>
      <Link
        href={`/category/${category.slug}`}
        className={`group relative flex h-full min-h-[92px] items-center gap-4 overflow-hidden rounded-2xl p-5 transition-[transform,box-shadow] duration-[240ms] ease-out hover:-translate-y-1 ${
          solid
            ? "bg-walnut text-accent-ink hover:shadow-[0_12px_28px_-14px_var(--color-ink)]"
            : `${tint} hover:shadow-[0_12px_28px_-16px_var(--color-walnut)]`
        }`}
      >
        <span
          aria-hidden="true"
          className={`grid shrink-0 place-items-center rounded-xl transition-transform duration-[240ms] ease-out group-hover:-rotate-6 ${
            solid
              ? "size-14 bg-paper/15 text-accent-ink"
              : wide
                ? "size-14 bg-paper text-walnut"
                : "size-11 bg-paper text-walnut"
          }`}
        >
          <Icon className={wide || solid ? "size-7" : "size-5"} strokeWidth={1.75} />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block font-display font-extrabold leading-tight ${
              solid ? "text-accent-ink" : "text-ink"
            } ${wide || solid ? "text-xl" : "text-[1.0625rem]"}`}
          >
            {category.name}
          </span>
          {/* Walnut, not muted grey: muted drops to 3.7:1 on the tinted tiles. */}
          <span
            className={`mt-0.5 block text-[0.8rem] leading-snug ${
              solid ? "text-accent-ink/70" : "text-ink-2"
            }`}
          >
            {category.blurb}
          </span>
        </span>

        <ArrowUpRight
          className={`size-4 shrink-0 transition-transform duration-[240ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            solid ? "text-accent-ink/70" : "text-wood"
          }`}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

export function CategoryIndex() {
  const food = homepageCategories.filter((c) => c.group === "Food & drink");
  const ranges = homepageCategories.filter((c) => c.group !== "Food & drink");

  return (
    <section id="categories" className="scroll-mt-24 bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grain relative overflow-hidden rounded-[1.75rem] bg-paper-2 p-5 sm:rounded-[2.25rem] sm:p-9 lg:p-12">
          {/* Corner stamp — a rotated circular badge, not a floating orb: it
              carries the store's opening promise. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 hidden size-40 rotate-12 place-items-center rounded-full bg-signal/25 lg:grid"
          />

          <div className="relative mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-2xl">
              <h2 className="text-[length:var(--text-display-s)] text-ink">
                {categories.length} aisles, one trip.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted">
                Everything a week actually needs — plus the batteries, cables and
                birthday cards nobody plans for.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-5 text-paper transition-colors duration-[140ms] ease-out hover:bg-walnut"
            >
              <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] whitespace-nowrap">
                All aisles
              </span>
              <ArrowUpRight
                className="size-4 transition-transform duration-[140ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <ul className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {food.map((category, i) => (
              <Tile
                key={category.slug}
                category={category}
                wide={i < 2}
                tint={TINTS[i % TINTS.length]}
              />
            ))}
          </ul>

          <ul className="relative mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ranges.map((category) => (
              <Tile key={category.slug} category={category} wide solid tint="" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
