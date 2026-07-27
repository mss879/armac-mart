/* F1 · Bento grid — knobs: tiles=4, spans=irregular (4/2 then 2/4), fills=varied
 *
 * The row rhythm mirrors itself rather than settling into three equal columns,
 * which is the feature-grid tell. Tiles carry different fills and radii so the
 * block reads as an arrangement rather than a table.
 *
 * The tags floating over the shelf photograph are rotated and half-outside their
 * container, echoing the reference boards. They carry real store promises — they
 * are labels, not ornament.
 */

import Image from "next/image";
import { Clock, Croissant, Truck } from "lucide-react";
import { store } from "@/lib/catalog";

const FLOATING_TAGS = [
  { label: "Baked on site", tilt: "tag-tilt-a", fill: "bg-signal text-signal-ink" },
  { label: "Open till 11", tilt: "tag-tilt-b", fill: "bg-paper text-ink" },
  { label: "Free delivery", tilt: "tag-tilt-c", fill: "bg-walnut text-accent-ink" },
];

export function StorePromise() {
  return (
    <section id="promise" className="scroll-mt-24 bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-6 lg:gap-5">
          {/* A — the shelf, with promises floating over it */}
          {/* Taller crop on phones: at 21:9 the tags cover the whole shelf. */}
          <figure className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper-2 sm:aspect-16/9 lg:col-span-4 lg:aspect-21/9">
            <Image
              src="/shop/shelf.png"
              alt="A walnut shelf holding a milk bottle, a coffee pouch, a cereal box, a honey jar with dipper, a bloomer loaf, a bottle of juice, a pack of batteries, a power bank and a tin of biscuits."
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              loading="lazy"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-3 sm:gap-3 sm:p-6">
              {FLOATING_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className={`tag-float ${tag.tilt} ${tag.fill} rounded-full border-2 border-ink px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.08em] whitespace-nowrap sm:px-3.5 sm:py-1.5 sm:text-[0.7rem] sm:tracking-[0.1em]`}
                >
                  {tag.label}
                </span>
              ))}
            </figcaption>
          </figure>

          {/* B — walnut statement tile, carries the section heading */}
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-walnut p-7 text-accent-ink lg:col-span-2">
            <span
              aria-hidden="true"
              className="absolute -right-10 -top-10 size-32 rounded-full bg-signal/25"
            />
            <Clock className="relative size-8 text-signal" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-[2rem] leading-[1.05] text-accent-ink sm:text-[2.35rem]">
                Open before you are.
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-accent-ink/75">
                {store.hours}. Bank holidays included — the shutters go up at
                seven regardless.
              </p>
            </div>
          </div>

          {/* C — baked on site */}
          <div className="rounded-[1.75rem] bg-tan/30 p-7 lg:col-span-2">
            <span
              aria-hidden="true"
              className="mb-5 grid size-12 place-items-center rounded-2xl bg-paper text-walnut"
            >
              <Croissant className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-xl font-extrabold text-ink">
              Baked on site
            </h3>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
              Bloomers, rolls and pastries out of our own oven every morning —
              not shipped in part-baked.
            </p>
          </div>

          {/* D — delivery + collect */}
          <div className="rounded-[1.75rem] border-2 border-ink bg-paper p-7 lg:col-span-4">
            <h3 className="flex items-center gap-3 font-display text-xl font-extrabold text-ink">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-signal text-signal-ink"
              >
                <Truck className="size-6" strokeWidth={1.75} />
              </span>
              Two ways to get it home
            </h3>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-paper-2 p-5">
                <dt className="font-display text-base font-extrabold text-walnut">
                  Delivered
                </dt>
                <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                  Free on orders over {store.deliveryThreshold} within our
                  delivery area. Same-day if you order before 4pm.
                </dd>
              </div>
              <div className="rounded-2xl bg-paper-2 p-5">
                <dt className="font-display text-base font-extrabold text-walnut">
                  Collected
                </dt>
                <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                  Order online, we pack it, you pick it up from the counter in
                  about {store.collectTime}.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
