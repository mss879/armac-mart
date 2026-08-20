"use client";

import Link from "next/link";
import { CATEGORIES, categoryCount } from "@/lib/products";

// Minimalist, high-visibility vector icons for all 10 departments
function DepartmentIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "sweets":
      // Chocolate Bar & Wrapped Confectionery
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Chocolate bar grid */}
          <rect x="8" y="10" width="32" height="28" rx="3" className="fill-antique/40" />
          <line x1="8" y1="24" x2="40" y2="24" />
          <line x1="18" y1="10" x2="18" y2="38" />
          <line x1="30" y1="10" x2="30" y2="38" />
          {/* Snap accent */}
          <circle cx="13" cy="17" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="24" cy="17" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="35" cy="17" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "biscuits":
      // Cookie with clean chocolate chips
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="17" className="fill-antique/40" />
          <circle cx="18" cy="19" r="2.2" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="29" cy="17" r="2" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="20" cy="29" r="2" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="30" cy="27" r="2.2" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="24" cy="23" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "drinks":
      // Chilled Soda Can with pull tab and effervescence
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="10" width="20" height="30" rx="4" className="fill-antique/40" />
          <ellipse cx="24" cy="10" rx="10" ry="2.5" />
          <ellipse cx="24" cy="40" rx="10" ry="2.5" />
          {/* Soda wave */}
          <path d="M14 26 C18 24, 22 28, 26 26 C30 24, 32 26, 34 25" stroke="currentColor" />
          {/* Bubbles */}
          <circle cx="20" cy="18" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="27" cy="20" r="1" className="fill-brand-amber text-brand-amber stroke-none" />
          <circle cx="22" cy="33" r="1.5" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "health-fitness":
      // Dumbbell & Protein Energy
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="18" width="5" height="12" rx="1.5" className="fill-brand-amber text-brand-amber" />
          <rect x="12" y="15" width="4" height="18" rx="1" className="fill-walnut" />
          <line x1="16" y1="24" x2="32" y2="24" strokeWidth="3" />
          <rect x="32" y="15" width="4" height="18" rx="1" className="fill-walnut" />
          <rect x="36" y="18" width="5" height="12" rx="1.5" className="fill-brand-amber text-brand-amber" />
          {/* Sparkle */}
          <path d="M24 12 L25 15 L28 16 L25 17 L24 20 L23 17 L20 16 L23 15 Z" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "cosmetics":
      // Skincare Lotion Dispenser & Serum Bottle
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="15" y="18" width="18" height="22" rx="3" className="fill-antique/40" />
          <rect x="20" y="14" width="8" height="4" />
          <path d="M24 14 V7 H31" />
          {/* Drop */}
          <path d="M31 10 C31 10 33 13 33 14 C33 15.1 32.1 16 31 16 C29.9 16 29 15.1 29 14 C29 13 31 10 31 10 Z" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "crisps":
      // Snack Bag / Crisps
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12 L15 38 H33 L36 12 Z" className="fill-antique/40" />
          <path d="M10 12 L12 9 L24 11 L36 9 L38 12 H10 Z" className="fill-walnut" />
          <path d="M13 38 L15 41 L24 39 L33 41 L35 38 H13 Z" className="fill-walnut" />
          {/* Crisp slice */}
          <ellipse cx="24" cy="24" rx="6" ry="3.5" className="fill-brand-amber text-brand-amber stroke-none" transform="rotate(-15 24 24)" />
        </svg>
      );
    case "baby":
      // Baby Feeding Bottle
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="16" y="17" width="16" height="23" rx="3" className="fill-antique/40" />
          <rect x="18" y="13" width="12" height="4" rx="1" className="fill-walnut" />
          <path d="M21 13 C21 9, 27 9, 27 13" className="fill-brand-amber text-brand-amber stroke-none" />
          {/* Measurement marks */}
          <line x1="20" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1.8" />
          <line x1="20" y1="27" x2="25" y2="27" stroke="currentColor" strokeWidth="1.8" />
          <line x1="20" y1="32" x2="24" y2="32" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "cupboard":
      // Pantry Jar / Can
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="15" width="20" height="25" rx="3" className="fill-antique/40" />
          <rect x="16" y="10" width="16" height="5" rx="1.5" className="fill-walnut" />
          {/* Label banner */}
          <rect x="17" y="21" width="14" height="12" rx="1" className="fill-white border stroke-mist" />
          <line x1="20" y1="25" x2="28" y2="25" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="29" x2="26" y2="29" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "frozen":
      // Ice Cream Cup / Frozen Treat & Snowflake
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-walnut" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 24 L17 40 H31 L34 24 Z" className="fill-antique/40" />
          <path d="M13 24 C13 18, 18 13, 24 13 C30 13, 35 18, 35 24 Z" className="fill-brand-amber/30" />
          {/* Little snowflake */}
          <path d="M24 6 V10 M21 8 L27 8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="18" r="2" className="fill-brand-amber text-brand-amber stroke-none" />
        </svg>
      );
    case "viral":
      // Fire Flame / Glowing Drop
      return (
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-brand-amber" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M24 6 C24 6 29 13 29 18 C29 20.5 28 22.5 26.5 24 C28.5 24.5 33 27 33 32 C33 37 29 42 24 42 C19 42 15 37 15 32 C15 25 21 18 21 18 C21 18 20 22 22 24 C23 20 24 6 24 6 Z"
            className="fill-brand-amber/20"
          />
          <path
            d="M24 28 C26.2 28 28 29.8 28 32 C28 34.2 26.2 36 24 36 C21.8 36 20 34.2 20 32 C20 29.8 21.8 28 24 28 Z"
            className="fill-brand-amber text-brand-amber"
          />
        </svg>
      );
    default:
      return <span className="text-2xl">📦</span>;
  }
}

export function CategoryGrid({ onSelectCategory }: { onSelectCategory?: (slug: string) => void }) {
  const handleCategoryClick = (slug: string) => {
    sessionStorage.setItem("armac-cat", slug);
    window.dispatchEvent(new CustomEvent("armac:category", { detail: slug }));
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-mist pb-3">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
            QUICK AISLE NAVIGATION
          </span>
          <h2 className="display text-2xl sm:text-3xl text-cocoa-ink">
            Browse by Department
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-beige hidden sm:inline">
            Tap any department to view authentic imported shelves
          </span>
          <Link
            href="/shop"
            className="text-xs font-bold text-walnut hover:underline"
          >
            Open Full Shop Catalog →
          </Link>
        </div>
      </div>

      {/* 10 Department Minimalist Badges - Responsive & High Visibility */}
      <div className="no-scrollbar flex items-start gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 sm:grid sm:grid-cols-5 lg:grid-cols-10 sm:overflow-visible">
        {CATEGORIES.map((cat) => {
          const isViral = cat.slug === "viral";
          const count = categoryCount(cat.slug);

          return (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group flex flex-col items-center min-w-[80px] sm:min-w-0 flex-shrink-0 cursor-pointer text-center"
              aria-label={`Browse ${cat.name}`}
            >
              {/* Minimalist High-Contrast Icon Circle */}
              <div className="relative">
                <div
                  className={`flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl border transition-all duration-200 shadow-xs group-hover:scale-105 group-hover:shadow-sm ${
                    isViral
                      ? "bg-brand-amber/10 border-brand-amber text-brand-amber group-hover:bg-brand-amber/20"
                      : "bg-white border-mist group-hover:border-walnut group-hover:bg-antique/80"
                  }`}
                >
                  <DepartmentIcon slug={cat.slug} />
                </div>

                {/* Viral / Count Pill Badge */}
                {isViral ? (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-brand-amber px-1.5 py-0.2 text-[9px] font-extrabold text-white shadow-xs">
                    DROP
                  </span>
                ) : (
                  <span className="absolute -bottom-1.5 right-1/2 translate-x-1/2 rounded-full bg-walnut px-1.5 py-0.2 text-[9px] font-bold text-parchment shadow-xs">
                    {count}
                  </span>
                )}
              </div>

              {/* Title Underneath with High Readability */}
              <span className="mt-3 block text-xs font-bold text-cocoa-ink group-hover:text-walnut transition-colors leading-tight">
                {cat.shortName ?? cat.name}
              </span>
              <span className="text-[10px] text-beige font-medium mt-0.5">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
