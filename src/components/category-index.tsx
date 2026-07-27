/* The primary browse surface of the Ecosystem Index.
 *
 * Deliberately NOT an icon-tile card grid (icon in a coloured square, heading
 * beneath, two lines of copy) — that shape is a named AI tell. The icon sits
 * inline with its label and the cells share hairlines, so the block reads as a
 * shop directory board rather than a feature grid.
 *
 * One flat grid, no group headings: the food aisles individually, then home and
 * tech as a single tile each. The full breakdown lives in the footer sitemap.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, homepageCategories } from "@/lib/catalog";

export function CategoryIndex() {
  return (
    <section
      id="categories"
      className="scroll-mt-24 border-b border-rule bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* S2 · Hanging section head — heading floats, no rule, single column */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
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
            className="group inline-flex items-center gap-2 border-b-2 border-walnut pb-1 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-walnut whitespace-nowrap"
          >
            All aisles
            <ArrowUpRight
              className="size-4 transition-transform duration-[140ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {homepageCategories.map((category) => {
            const Icon = category.icon;
            return (
              <li key={category.slug} className="bg-paper">
                <Link
                  href={`/category/${category.slug}`}
                  className="group flex h-full min-h-[88px] items-center gap-4 p-5 transition-colors duration-[140ms] ease-out hover:bg-paper-2"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-lg bg-tan/25 text-walnut transition-colors duration-[140ms] ease-out group-hover:bg-walnut group-hover:text-accent-ink"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
                      {category.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">
                      {category.blurb}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-tan transition-colors duration-[140ms] ease-out group-hover:text-walnut"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
