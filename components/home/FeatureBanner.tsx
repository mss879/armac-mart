"use client";

import Link from "next/link";
import { PopIn, ScrollScale, ScrubWords } from "@/components/anim/Reveal";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { CookieDoodle, SparkleDoodle, SteamDoodle } from "@/components/ui/Doodles";
import { formatLKR } from "@/lib/format";

export function FeatureBanner() {
  return (
    <section id="hampers" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Walnut chocolate panel — interior palette */}
        <ScrollScale>
          <div className="swirl relative flex h-full flex-col justify-between overflow-hidden rounded-[2.25rem] bg-walnut p-8 text-antique shadow-pop sm:p-10">
            <CookieDoodle className="pointer-events-none absolute -right-6 -bottom-6 w-36 text-antique/10" />
            <SteamDoodle className="pointer-events-none absolute top-8 right-10 w-10 text-brand-yellow/60" />

            <div>
              <PopIn>
                <span className="display inline-block -rotate-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs tracking-widest text-cocoa-ink shadow-md">
                  This Week Only
                </span>
              </PopIn>
              <h3 className="display mt-5 max-w-md text-[clamp(1.9rem,4vw,3rem)]">
                <ScrubWords text="Taste the real imported goodness." />
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-antique/70">
                Swiss chocolate, Japanese snacks and Korean fire noodles — the
                bestseller box has landed. Grab it before the shelves clear.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="text-xs tracking-widest text-antique/60 uppercase">Bestseller box</span>
                <span className="display block text-4xl text-brand-yellow">{formatLKR(6499)}</span>
                <span className="text-xs text-antique/50 line-through">{formatLKR(8240)} if bought apart</span>
              </div>
              <div className="flex items-center gap-3 text-5xl">
                <span className="animate-bob inline-block">🍫</span>
                <span className="animate-bob inline-block [animation-delay:0.4s]">🍜</span>
                <span className="animate-bob inline-block [animation-delay:0.8s]">🥢</span>
              </div>
            </div>
          </div>
        </ScrollScale>

        {/* Cream hamper panel — reference "combo" card, kept quiet and premium */}
        <ScrollScale from={0.9}>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.25rem] border-2 border-cocoa/8 bg-antique p-8 text-cocoa-ink shadow-pop sm:p-10">
            <SparkleDoodle className="pointer-events-none absolute top-6 right-8 w-10 text-tan/30" />
            <div className="pointer-events-none absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-beige-tint" />

            <div>
              <PopIn delay={0.1}>
                <span className="display inline-block rotate-2 rounded-full bg-cocoa-ink px-4 py-1.5 text-xs tracking-widest text-brand-yellow shadow-md">
                  Combo
                </span>
              </PopIn>
              <h3 className="display mt-5 text-[clamp(1.9rem,4vw,3rem)]">
                <ScrubWords text="Build your own hamper." />
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa/70">
                Birthdays, seasons or just because — pick any 6 treats and we
                wrap them up in a ribboned Armac box. Fun for the whole family.
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <Link href="#featured" className="btn-pill bg-brand-yellow px-6 py-3 text-sm text-cocoa-ink shadow-card">
                <span className="dot" /> Start Building
              </Link>
              <RotatingBadge
                text="FUN FOR THE WHOLE FAMILY • "
                emoji="🎁"
                size={92}
                className="shrink-0"
              />
            </div>
          </div>
        </ScrollScale>
      </div>
    </section>
  );
}
