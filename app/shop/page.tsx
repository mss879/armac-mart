"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { CATEGORIES, PRODUCTS, Product, getAvailableOrigins } from "@/lib/products";
import { ProductCard } from "@/components/home/ProductCard";
import { formatLKR } from "@/lib/format";

const PRICE_RANGES = [
  { id: "all", label: "All Prices" },
  { id: "under-2000", label: "Under Rs 2,000", min: 0, max: 2000 },
  { id: "2000-5000", label: "Rs 2,000 – Rs 5,000", min: 2000, max: 5000 },
  { id: "5000-10000", label: "Rs 5,000 – Rs 10,000", min: 5000, max: 10000 },
  { id: "over-10000", label: "Over Rs 10,000", min: 10000, max: Infinity },
];

const SPECIAL_TAGS = [
  { id: "all", label: "All Items" },
  { id: "viral", label: "🔥 Viral Drops" },
  { id: "deals", label: "⚡ Hot Deals" },
  { id: "bestsellers", label: "⭐ Bestsellers" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "all";
  const activeOrigin = searchParams.get("origin") || "all";
  const activePrice = searchParams.get("price") || "all";
  const activeTag = searchParams.get("tag") || "all";
  const activeSort = searchParams.get("sort") || "featured";
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const origins = useMemo(() => getAvailableOrigins(), []);

  // Update URL search params cleanly
  const updateFilter = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all" || !val) {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    router.push("/shop", { scroll: false });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      // Origin
      if (activeOrigin !== "all" && p.origin.toLowerCase() !== activeOrigin.toLowerCase()) return false;
      // Special tag
      if (activeTag === "viral" && !p.isViral && p.category !== "viral") return false;
      if (activeTag === "deals" && !p.isDeal && !p.originalPrice && p.badge !== "HOT DEAL") return false;
      if (activeTag === "bestsellers" && p.badge !== "BESTSELLER") return false;
      // Price range
      if (activePrice !== "all") {
        const range = PRICE_RANGES.find((r) => r.id === activePrice);
        if (range && (p.price < (range.min || 0) || p.price > (range.max || Infinity))) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (activeSort === "price-asc") return a.price - b.price;
      if (activeSort === "price-desc") return b.price - a.price;
      if (activeSort === "rating") return b.rating - a.rating;
      if (activeSort === "name-asc") return a.name.localeCompare(b.name);
      return 0; // Default featured order
    });
  }, [activeCategory, activeOrigin, activePrice, activeTag, activeSort, searchQuery]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === activeCategory);
  const activeFiltersCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeOrigin !== "all" ? 1 : 0) +
    (activePrice !== "all" ? 1 : 0) +
    (activeTag !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-semibold text-beige">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-walnut transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-cocoa-ink font-bold">
            {activeCategoryObj ? activeCategoryObj.name : "Shop All Aisles"}
          </li>
        </ol>
      </nav>

      {/* Catalog Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-mist pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
            CONVENIENCE SUPERSTORE CATALOG
          </span>
          <h1 className="display mt-1 text-3xl sm:text-4xl text-cocoa-ink">
            {activeCategoryObj ? activeCategoryObj.name : "Browse All 10 Aisles"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-beige max-w-xl">
            {activeCategoryObj
              ? activeCategoryObj.tagline
              : "Authentic imported chocolates, cold drinks, baby essentials, snacks, and exclusive viral drops direct from Switzerland, USA, Japan, and the UK."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="rounded-md bg-antique px-3 py-1.5 text-xs font-bold text-cocoa-ink border border-mist">
            {filteredProducts.length} Product{filteredProducts.length === 1 ? "" : "s"}
          </span>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-walnut px-3 py-1.5 text-xs font-bold text-white md:hidden cursor-pointer"
          >
            <span>⚙️ Filters</span>
            {activeFiltersCount > 0 && (
              <span className="rounded-full bg-brand-amber px-1.5 py-0.2 text-[10px] text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Top Quick Aisle Chips */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-3.5 border-b border-mist/60">
        <button
          onClick={() => updateFilter("category", "all")}
          className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
            activeCategory === "all"
              ? "bg-walnut text-white shadow-xs"
              : "bg-white text-cocoa-ink border border-mist hover:border-walnut"
          }`}
        >
          All Aisles
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => updateFilter("category", cat.slug)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
              activeCategory === cat.slug
                ? "bg-walnut text-white shadow-xs"
                : "bg-white text-cocoa-ink border border-mist hover:border-walnut"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.shortName || cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Catalog Layout: Sidebar + Grid */}
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden space-y-6 md:block">
          {/* Search Box */}
          <div className="rounded-lg border border-mist bg-white p-4 shadow-xs">
            <h3 className="display text-xs font-bold uppercase tracking-wider text-cocoa-ink mb-2.5">
              Search Catalog
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword…"
                className="h-8.5 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-beige hover:text-cocoa-ink"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Department / Aisle Filter */}
          <div className="rounded-lg border border-mist bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="display text-xs font-bold uppercase tracking-wider text-cocoa-ink">
                Aisles
              </h3>
              {activeCategory !== "all" && (
                <button
                  onClick={() => updateFilter("category", "all")}
                  className="text-[10px] font-semibold text-brand-amber hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  onClick={() => updateFilter("category", "all")}
                  className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                    activeCategory === "all"
                      ? "bg-antique font-bold text-walnut"
                      : "text-cocoa-ink hover:bg-antique/60"
                  }`}
                >
                  <span>All 10 Aisles</span>
                  <span className="text-[10px] text-beige">{PRODUCTS.length}</span>
                </button>
              </li>
              {CATEGORIES.map((c) => {
                const count = PRODUCTS.filter((p) => p.category === c.slug).length;
                return (
                  <li key={c.slug}>
                    <button
                      onClick={() => updateFilter("category", c.slug)}
                      className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                        activeCategory === c.slug
                          ? "bg-antique font-bold text-walnut"
                          : "text-cocoa-ink hover:bg-antique/60"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span>{c.emoji}</span>
                        <span className="truncate">{c.name}</span>
                      </span>
                      <span className="text-[10px] text-beige">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Curations / Tags */}
          <div className="rounded-lg border border-mist bg-white p-4 shadow-xs">
            <h3 className="display text-xs font-bold uppercase tracking-wider text-cocoa-ink mb-3">
              Special Curations
            </h3>
            <div className="space-y-1 text-xs">
              {SPECIAL_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => updateFilter("tag", tag.id)}
                  className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                    activeTag === tag.id
                      ? "bg-antique font-bold text-walnut"
                      : "text-cocoa-ink hover:bg-antique/60"
                  }`}
                >
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Country of Origin Filter */}
          <div className="rounded-lg border border-mist bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="display text-xs font-bold uppercase tracking-wider text-cocoa-ink">
                Country of Origin
              </h3>
              {activeOrigin !== "all" && (
                <button
                  onClick={() => updateFilter("origin", "all")}
                  className="text-[10px] font-semibold text-brand-amber hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => updateFilter("origin", "all")}
                className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                  activeOrigin === "all"
                    ? "bg-antique font-bold text-walnut"
                    : "text-cocoa-ink hover:bg-antique/60"
                }`}
              >
                <span>All Origins</span>
              </button>
              {origins.map((origin) => {
                const count = PRODUCTS.filter((p) => p.origin === origin).length;
                const sampleFlag = PRODUCTS.find((p) => p.origin === origin)?.flag || "🌍";
                return (
                  <button
                    key={origin}
                    onClick={() => updateFilter("origin", origin)}
                    className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                      activeOrigin.toLowerCase() === origin.toLowerCase()
                        ? "bg-antique font-bold text-walnut"
                        : "text-cocoa-ink hover:bg-antique/60"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{sampleFlag}</span>
                      <span>{origin}</span>
                    </span>
                    <span className="text-[10px] text-beige">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="rounded-lg border border-mist bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="display text-xs font-bold uppercase tracking-wider text-cocoa-ink">
                Price Range
              </h3>
              {activePrice !== "all" && (
                <button
                  onClick={() => updateFilter("price", "all")}
                  className="text-[10px] font-semibold text-brand-amber hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-1 text-xs">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => updateFilter("price", r.id)}
                  className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left font-medium transition-colors ${
                    activePrice === r.id
                      ? "bg-antique font-bold text-walnut"
                      : "text-cocoa-ink hover:bg-antique/60"
                  }`}
                >
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Section: Sort Bar, Active Tags & Product Grid */}
        <main>
          {/* Controls Bar: Active Filters + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-mist bg-white p-3.5 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-beige">Active Filters:</span>
              {activeFiltersCount === 0 ? (
                <span className="text-xs text-beige/70 italic">None (showing all)</span>
              ) : (
                <>
                  {activeCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded bg-antique px-2 py-0.5 text-[11px] font-bold text-walnut border border-mist">
                      Aisle: {activeCategoryObj?.name}
                      <button onClick={() => updateFilter("category", "all")} className="hover:text-red-700">✕</button>
                    </span>
                  )}
                  {activeOrigin !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded bg-antique px-2 py-0.5 text-[11px] font-bold text-walnut border border-mist">
                      Origin: {activeOrigin}
                      <button onClick={() => updateFilter("origin", "all")} className="hover:text-red-700">✕</button>
                    </span>
                  )}
                  {activePrice !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded bg-antique px-2 py-0.5 text-[11px] font-bold text-walnut border border-mist">
                      Price: {PRICE_RANGES.find((r) => r.id === activePrice)?.label}
                      <button onClick={() => updateFilter("price", "all")} className="hover:text-red-700">✕</button>
                    </span>
                  )}
                  {activeTag !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded bg-antique px-2 py-0.5 text-[11px] font-bold text-walnut border border-mist">
                      {SPECIAL_TAGS.find((t) => t.id === activeTag)?.label}
                      <button onClick={() => updateFilter("tag", "all")} className="hover:text-red-700">✕</button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 rounded bg-antique px-2 py-0.5 text-[11px] font-bold text-walnut border border-mist">
                      &ldquo;{searchQuery}&rdquo;
                      <button onClick={() => setSearchQuery("")} className="hover:text-red-700">✕</button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-bold text-brand-amber hover:underline ml-1"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-bold text-cocoa-ink">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={activeSort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="h-8 rounded-md border border-mist bg-white px-2.5 text-xs text-cocoa-ink focus:border-walnut focus:outline-none"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="name-asc">Alphabetical (A to Z)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-8 rounded-xl border border-mist bg-white p-12 text-center shadow-xs">
              <span className="text-5xl">🔍</span>
              <h3 className="display mt-4 text-xl font-bold text-cocoa-ink">No items found</h3>
              <p className="mt-1 text-xs text-beige max-w-sm mx-auto">
                We couldn&apos;t find any products matching your active filters. Try broadening your criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-primary mt-6 text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs md:hidden">
          <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-mist pb-3">
              <h2 className="display text-base font-bold text-cocoa-ink">Filter Catalog</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-sm font-bold text-beige hover:text-cocoa-ink"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto py-4 text-xs">
              {/* Search */}
              <div>
                <span className="block font-bold text-cocoa-ink mb-1.5 uppercase tracking-wider text-[11px]">Search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword search…"
                  className="h-8.5 w-full rounded border border-mist px-2.5 text-xs"
                />
              </div>

              {/* Aisles */}
              <div>
                <span className="block font-bold text-cocoa-ink mb-1.5 uppercase tracking-wider text-[11px]">Aisles</span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      updateFilter("category", "all");
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left p-1.5 rounded ${activeCategory === "all" ? "bg-antique font-bold text-walnut" : ""}`}
                  >
                    All Aisles
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        updateFilter("category", c.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between p-1.5 rounded ${activeCategory === c.slug ? "bg-antique font-bold text-walnut" : ""}`}
                    >
                      <span>{c.emoji} {c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="block font-bold text-cocoa-ink mb-1.5 uppercase tracking-wider text-[11px]">Price</span>
                <div className="space-y-1">
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        updateFilter("price", r.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left p-1.5 rounded ${activePrice === r.id ? "bg-antique font-bold text-walnut" : ""}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-mist pt-3">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full rounded bg-antique py-2 text-xs font-bold text-cocoa-ink border border-mist mb-2"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded bg-walnut py-2 text-xs font-bold text-white"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1536px] px-6 py-24 text-center">
          <span className="display text-xl text-walnut font-bold">Loading convenience catalog…</span>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
