"use client";

import Image from "next/image";
import Link from "next/link";

export function MidnightSnackBanner() {
  return (
    <section className="mx-auto max-w-[1536px] px-4 py-6 sm:px-6 lg:px-8 xl:px-12 sm:py-8">
      <div className="relative overflow-hidden rounded-xl bg-walnut text-parchment shadow-card border border-white/10">
        {/* Banner Image Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/banner-midnight-snack.jpg"
            alt="Late Night Convenience Store Snacks & Drinks"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-walnut-deep/95 via-walnut-deep/80 to-transparent lg:w-[60%] w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-deep/90 via-transparent to-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-lg p-6 sm:p-10 lg:p-12">
          <span className="rounded bg-brand-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
            CRAVING STATION
          </span>

          <h3 className="display mt-3 text-2xl sm:text-3xl lg:text-4xl text-white">
            Late Night Munchies &amp; Chilled Drinks
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-parchment/80 leading-relaxed font-normal">
            Cold imported sodas, Pringles, Reese&apos;s peanut butter cups, and instant ramen. Delivered fast to your door or available for in-store pickup until 10:00 PM daily.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/shop?category=crisps"
              className="btn-primary bg-parchment text-walnut hover:bg-white text-xs sm:text-sm font-bold"
            >
              Shop Snacks &amp; Drinks →
            </Link>
            <span className="text-xs font-medium text-parchment/70">
              30-Min Fast Express Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ViralDropInterstitial() {
  return (
    <section className="mx-auto max-w-[1536px] px-4 py-6 sm:px-6 lg:px-8 xl:px-12 sm:py-8">
      <div className="relative overflow-hidden rounded-xl bg-walnut-deep text-parchment shadow-card border border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/banner-viral-drop.jpg"
            alt="Viral Internet Sensations & Limited Edition Snacks"
            fill
            className="object-cover object-right opacity-40 lg:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-walnut-deep/95 via-walnut-deep/80 to-transparent lg:w-[65%] w-full" />
        </div>

        <div className="relative z-10 max-w-lg p-6 sm:p-10">
          <span className="rounded bg-brand-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
            LIMITED ALLOCATION
          </span>

          <h3 className="display mt-3 text-2xl sm:text-3xl text-white">
            Dubai Pistachio Knafeh &amp; Buldak 2X In Stock
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-parchment/80 leading-relaxed font-normal">
            Direct air-freight shipment from Dubai and Seoul. Limited stock allocated per customer.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="#viral"
              className="btn-primary bg-parchment text-walnut hover:bg-white text-xs sm:text-sm font-bold"
            >
              Order Viral Drop →
            </Link>
            <span className="text-xs text-parchment/60 font-medium">
              100% Sealed Air-Shipment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
