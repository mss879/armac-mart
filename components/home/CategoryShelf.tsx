"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, categoryCount, Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function CategoryShelf() {
  const [selected, setSelected] = useState<string>("all");
  const [activeCategoryObj, setActiveCategoryObj] = useState<Category | null>(null);

  // Listen to category picks from navbar or category circles
  useEffect(() => {
    const saved = sessionStorage.getItem("armac-cat");
    if (saved) {
      setSelected(saved);
      sessionStorage.removeItem("armac-cat");
    }
    const onPick = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setSelected(slug);
      sessionStorage.removeItem("armac-cat");
    };
    window.addEventListener("armac:category", onPick);
    return () => window.removeEventListener("armac:category", onPick);
  }, []);

  useEffect(() => {
    const found = CATEGORIES.find((c) => c.slug === selected) || null;
    setActiveCategoryObj(found);
  }, [selected]);

  const products = useMemo(() => {
    if (selected === "all") {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === selected);
  }, [selected]);

  return (
    <section id="categories" className="mx-auto max-w-[1536px] scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-mist pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
            CONVENIENCE STORE AISLES
          </span>
          <h2 className="display mt-1 text-2xl sm:text-3xl lg:text-4xl text-cocoa-ink">
            Shop All Department Shelves
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-beige">
            Authentic direct imports sourced from Switzerland, USA, UK, Japan &amp; Korea.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-cocoa-ink bg-antique px-3 py-1.5 rounded-md border border-mist">
            Showing <strong>{products.length}</strong> items
          </span>
          <Link
            href={selected === "all" ? "/shop" : `/shop?category=${selected}`}
            className="rounded-md bg-walnut px-3.5 py-1.5 text-xs font-bold text-white hover:bg-cocoa-ink transition-colors"
          >
            Open Full Filter View →
          </Link>
        </div>
      </div>

      {/* Aisle Switcher Tabs (All 10 Categories) */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setSelected("all")}
          className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
            selected === "all"
              ? "bg-walnut text-white shadow-xs"
              : "bg-white text-cocoa-ink hover:bg-antique border border-mist"
          }`}
        >
          All Aisles ({PRODUCTS.length})
        </button>

        {CATEGORIES.map((c) => {
          const isSelected = selected === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => setSelected(c.slug)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-walnut text-white shadow-xs"
                  : "bg-white text-cocoa-ink hover:bg-antique border border-mist"
              }`}
            >
              <span>{c.name}</span>
              <span
                className={`rounded px-1 text-[10px] ${
                  isSelected ? "bg-white/20 text-white font-bold" : "bg-antique text-beige"
                }`}
              >
                {categoryCount(c.slug)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Aisle Banner */}
      {activeCategoryObj && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-antique/60 p-4 border border-mist">
          <div>
            <h3 className="display text-base font-bold text-cocoa-ink">
              Department: {activeCategoryObj.name}
            </h3>
            <p className="text-xs text-beige">{activeCategoryObj.tagline}</p>
          </div>
          <Link
            href={`/shop?category=${activeCategoryObj.slug}`}
            className="text-xs font-bold text-walnut hover:underline"
          >
            Filter Aisle with Price &amp; Origin →
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
