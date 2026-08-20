"use client";

import { ScrollScale, ScrubWords } from "@/components/anim/Reveal";
import { CATEGORIES } from "@/lib/products";

export function ReviewsBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <ScrollScale>
        <div className="relative overflow-hidden rounded-[2.25rem] border-2 border-cocoa/8 bg-antique p-8 shadow-card sm:p-12">
          <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full border-[14px] border-brand-yellow/25" />
          <span className="pointer-events-none absolute top-8 right-10 hidden rotate-12 text-5xl sm:block">🍪</span>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="display max-w-md text-[clamp(1.9rem,4vw,2.9rem)] text-cocoa-ink">
                <ScrubWords text="With enough chocolate, anything is good!" />
              </h3>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-xl">
                  🧑‍🍳
                </span>
                <p className="max-w-xs text-sm leading-snug text-cocoa/70">
                  Our master plan: bring the world&apos;s snack shelves to one
                  little corner of Dehiwala.{" "}
                  <a href="#categories" className="font-bold text-walnut underline underline-offset-2">
                    What we are dishing out?
                  </a>
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="display text-6xl text-cocoa-ink">4.9</span>
                <div>
                  <span className="text-xl text-brand-yellow drop-shadow-sm" aria-hidden>
                    ★★★★★
                  </span>
                  <p className="text-sm font-semibold text-cocoa/70">
                    Based on 2,340 reviews.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {CATEGORIES.map((c) => (
                  <span
                    key={c.slug}
                    className="display rounded-full border-2 border-cocoa/15 px-4 py-1.5 text-xs tracking-widest text-cocoa/80"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollScale>
    </section>
  );
}
