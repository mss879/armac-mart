"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatLKR } from "@/lib/format";

const PROMO_SLIDES = [
  {
    id: "main-store",
    tag: "CONVENIENCE STORE & IMPORTS",
    title: "Global Imports. Neighbourhood Speed.",
    subtitle: "Swiss chocolates, chilled sodas, viral snacks & pantry staples delivered in 30 mins.",
    ctaText: "Shop All 10 Aisles",
    ctaLink: "/shop",
    secondaryText: "Explore Viral Drops",
    secondaryLink: "/shop?tag=viral",
    badge: "100% GENUINE SEALED IMPORTS",
    image: "/images/banners/hero-convenience.jpg",
  },
  {
    id: "viral-drops",
    tag: "LIMITED BATCH DROP",
    title: "Viral Internet Snacks in Stock.",
    subtitle: "Dubai Kunafa Pistachio Bar, Takis Blue Heat & Buldak 2X Spicy Ramen available now.",
    ctaText: "Order Viral Drops",
    ctaLink: "/shop?tag=viral",
    secondaryText: "View Value Deals",
    secondaryLink: "/shop?tag=deals",
    badge: "AIR-FREIGHTED DIRECT",
    image: "/images/banners/banner-viral-drop.jpg",
  },
  {
    id: "midnight-cravings",
    tag: "MUNCHIES & BEVERAGES",
    title: "Late Night Cravings Station.",
    subtitle: "Pringles, Haribo, AriZona iced teas & cold refreshments. Open daily till 10 PM.",
    ctaText: "Browse Snacks & Drinks",
    ctaLink: "/shop?category=crisps",
    secondaryText: "Beverages Aisle",
    secondaryLink: "/shop?category=drinks",
    badge: "OPEN TILL 10:00 PM",
    image: "/images/banners/banner-midnight-snack.jpg",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = PROMO_SLIDES[current];

  return (
    <section className="mx-auto max-w-[1536px] px-4 pt-4 pb-6 sm:px-6 lg:px-8 xl:px-12 sm:pt-6">
      {/* 3/4 Grid: Main Promo Carousel + 2 High-Converting Feature Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Main Banner (8 Columns) */}
        <div
          className="relative min-h-[440px] sm:min-h-[480px] lg:col-span-8 overflow-hidden rounded-xl bg-walnut-deep text-parchment shadow-card border border-mist-dark/30 flex flex-col justify-between"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Image with Dark Linear Scrim */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center transition-all duration-700"
            />
            {/* Professional dark gradient overlay for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-walnut-deep/95 via-walnut-deep/80 to-transparent sm:w-[70%] w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut-deep/90 via-transparent to-black/30" />
          </div>

          {/* Top Banner Tag */}
          <div className="relative z-10 flex items-center justify-between p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="rounded bg-brand-amber px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-xs">
                {slide.tag}
              </span>
              <span className="hidden sm:inline-block rounded bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-parchment/90 border border-white/15">
                {slide.badge}
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded bg-black/40 px-2.5 py-1 text-[11px] font-medium text-parchment/90 backdrop-blur-sm border border-white/10">
              <span className="text-brand-amber font-bold">★ 4.9</span>
              <span className="text-white/30">|</span>
              <span>2,400+ Colombo Orders</span>
            </div>
          </div>

          {/* Main Headline & CTAs */}
          <div className="relative z-10 max-w-xl p-5 sm:p-8">
            <h1 className="display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {slide.title}
            </h1>
            <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-parchment/80 font-normal">
              {slide.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={slide.ctaLink} className="btn-primary bg-parchment text-walnut hover:bg-white text-xs sm:text-sm font-bold">
                {slide.ctaText} →
              </Link>
              <Link href={slide.secondaryLink} className="btn-outline border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm">
                {slide.secondaryText}
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Slide Switchers */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              {PROMO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    current === idx ? "w-8 bg-brand-amber" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] font-medium text-parchment/70 hidden sm:inline">
              🚚 Free islandwide delivery over Rs 7,500
            </span>
          </div>
        </div>

        {/* 2 High-Conversion Side Promo Cards (4 Columns) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Card 1: Viral Spotlight */}
          <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-walnut p-5 text-parchment shadow-card border border-mist-dark/30 min-h-[220px]">
            {/* Background Image & Gradient Scrim */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/banners/card-dubai-pistachio.jpg"
                alt="Dubai Pistachio Chocolate"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-walnut-deep via-walnut/90 to-walnut/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-deep/95 via-transparent to-black/20" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="rounded bg-brand-amber px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider shadow-xs">
                  Viral Alert
                </span>
                <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium text-parchment/90 backdrop-blur-xs border border-white/10">
                  Limited Batch
                </span>
              </div>
              <h3 className="display mt-3 text-lg sm:text-xl text-white font-bold tracking-tight">
                Dubai Pistachio Chocolate
              </h3>
              <p className="mt-1 max-w-[260px] text-xs text-parchment/85 leading-snug">
                Fresh air-shipped batch of crisp knafeh pistachio bars.
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/15 pt-3">
              <div>
                <span className="display text-base font-bold text-parchment">{formatLKR(4850)}</span>
                <span className="block text-[10px] font-medium text-brand-amber-soft">Only 6 left in stock</span>
              </div>
              <Link
                href="/shop?tag=viral"
                className="rounded-md bg-parchment px-3 py-1.5 text-xs font-bold text-walnut hover:bg-white transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                Order Drop →
              </Link>
            </div>
          </div>

          {/* Card 2: Express Delivery / Convenience Perk */}
          <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-white p-5 text-cocoa-ink shadow-card border border-mist min-h-[220px]">
            {/* Background Image & Gradient Scrim */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/banners/card-quick-pantry.jpg"
                alt="Quick Cravings & Pantry Restock"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="rounded bg-antique/90 px-2 py-0.5 text-[9px] font-bold text-walnut uppercase tracking-wider border border-mist backdrop-blur-xs">
                  30-Min Fast Dispatch
                </span>
                <span className="rounded bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-cocoa-ink/80 backdrop-blur-xs border border-mist/80">
                  Dehiwala Hub
                </span>
              </div>
              <h3 className="display mt-3 text-lg sm:text-xl text-cocoa-ink font-bold tracking-tight">
                Quick Cravings &amp; Pantry Restock
              </h3>
              <p className="mt-1 max-w-[260px] text-xs text-beige leading-snug">
                Order before 9:30 PM for same-evening doorstep delivery in Colombo &amp; Suburbs.
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center justify-between border-t border-mist/80 pt-3">
              <span className="text-xs font-bold text-cocoa-ink">Store Open: 8 AM – 10 PM</span>
              <Link
                href="/shop"
                className="rounded-md bg-walnut px-3 py-1.5 text-xs font-bold text-parchment hover:bg-walnut-light transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                Shop Full Catalog →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
