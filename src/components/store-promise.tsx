/* F1 · Bento grid — knobs: tiles=4, spans=irregular (4/2 then 2/4), border=hairline
 *
 * The row rhythm mirrors itself rather than settling into three equal columns,
 * which is the feature-grid tell. The section's heading lives inside the walnut
 * tile instead of floating above the block, so this section head reads
 * differently from the two above it.
 */

import Image from "next/image";
import { Clock, Croissant, Truck } from "lucide-react";
import { store } from "@/lib/catalog";

export function StorePromise() {
  return (
    <section
      id="promise"
      className="scroll-mt-24 border-y border-rule bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-6 lg:gap-5">
          {/* A — the shelf */}
          <figure className="overflow-hidden rounded-2xl border border-rule bg-paper-2 lg:col-span-4">
            <Image
              src="/shop/shelf.png"
              alt="A walnut shelf holding a milk bottle, a coffee pouch, a cereal box, a honey jar with dipper, a bloomer loaf, a bottle of juice, a pack of batteries, a power bank and a tin of biscuits."
              width={1584}
              height={672}
              sizes="(min-width: 1024px) 56rem, 100vw"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>

          {/* B — walnut statement tile, carries the section heading */}
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-walnut p-7 text-accent-ink lg:col-span-2">
            <Clock className="size-7 text-signal" aria-hidden="true" />
            <div>
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
          <div className="rounded-2xl border border-rule bg-paper-2 p-7 lg:col-span-2">
            <h3 className="flex items-center gap-3 font-display text-xl font-extrabold text-ink">
              <Croissant className="size-6 shrink-0 text-wood" aria-hidden="true" />
              Baked on site
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              Bloomers, rolls and pastries out of our own oven every morning —
              not shipped in part-baked.
            </p>
          </div>

          {/* D — delivery + collect */}
          <div className="rounded-2xl border border-rule bg-paper-2 p-7 lg:col-span-4">
            <h3 className="flex items-center gap-3 font-display text-xl font-extrabold text-ink">
              <Truck className="size-6 shrink-0 text-wood" aria-hidden="true" />
              Two ways to get it home
            </h3>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="border-l-2 border-tan pl-4">
                <dt className="font-display text-base font-extrabold text-ink">
                  Delivered
                </dt>
                <dd className="mt-1 text-[0.9rem] leading-relaxed text-muted">
                  Free on orders over {store.deliveryThreshold} within our
                  delivery area. Same-day if you order before 4pm.
                </dd>
              </div>
              <div className="border-l-2 border-tan pl-4">
                <dt className="font-display text-base font-extrabold text-ink">
                  Collected
                </dt>
                <dd className="mt-1 text-[0.9rem] leading-relaxed text-muted">
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
