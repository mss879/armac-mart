"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { formatLKR } from "@/lib/format";

const OFFERS = [
  "⚡ VIRAL DROPS: Dubai Pistachio Kunafa Chocolate in Stock!",
  "🚚 Free Islandwide Express Delivery on Orders Over Rs 7,500",
  "⭐ 15% Off Your First Order — Code ARMAC15",
  "📍 Dehiwala Kalubowila Store Open Daily 8:00 AM – 10:00 PM",
  "🍫 100% Genuine Direct Imports from Switzerland, USA, UK, Japan & Korea",
];

function OfferMarquee() {
  const items = [...OFFERS, ...OFFERS];
  return (
    <div className="overflow-hidden bg-walnut-deep text-parchment/90 border-b border-white/10">
      <div className="flex w-max animate-marquee items-center gap-8 py-1.5 pr-8 text-[11px] font-semibold tracking-wider uppercase">
        {items.map((offer, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            {offer}
            <span className="text-brand-amber">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchBar({ className = "" }: { className?: string }) {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const matches =
    q.length > 1
      ? PRODUCTS.filter((p) =>
          `${p.name} ${p.brand} ${p.origin} ${p.category} ${p.tags ? p.tags.join(" ") : ""}`
            .toLowerCase()
            .includes(q)
        )
      : [];
  const results = matches.slice(0, 6);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className="flex items-center rounded-md border border-mist bg-white shadow-xs transition-all focus-within:border-walnut focus-within:ring-2 focus-within:ring-walnut/10">
        <span className="pl-3 text-beige">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.8-3.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search 10 aisles: sweets, drinks, crisps, baby, viral drops…"
          aria-label="Search products"
          className="h-10 w-full bg-transparent px-3 text-xs sm:text-sm text-cocoa-ink placeholder:text-beige/60"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="px-2 text-beige hover:text-cocoa-ink"
          >
            ✕
          </button>
        )}
      </div>

      {open && q.length > 1 && (
        <div className="absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-mist bg-white shadow-pop">
          {results.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-xs text-beige">
                No products match &ldquo;{query}&rdquo;
              </p>
              <Link
                href={`/shop?q=${encodeURIComponent(query)}`}
                onClick={() => setOpen(false)}
                className="mt-2 inline-block text-xs font-bold text-walnut hover:underline"
              >
                Search catalog for &ldquo;{query}&rdquo; →
              </Link>
            </div>
          ) : (
            <>
              <ul className="max-h-80 divide-y divide-mist/60 overflow-y-auto">
                {results.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-antique/60">
                    <Link
                      href={`/product/${p.id}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-1 items-center gap-3 min-w-0"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-base overflow-hidden border border-mist/40 bg-antique-card">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="h-7 w-7 object-contain" />
                        ) : (
                          p.emoji
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-cocoa-ink">{p.name}</span>
                        <span className="text-[10px] font-semibold text-beige uppercase">
                          {p.brand} · {p.origin} {p.flag}
                        </span>
                      </span>
                      <span className="display text-xs font-bold text-cocoa-ink">{formatLKR(p.price)}</span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        add(p.id);
                      }}
                      aria-label={`Add ${p.name} to cart`}
                      className="rounded bg-walnut px-2.5 py-1 text-[11px] font-bold text-white hover:bg-cocoa-ink transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-mist bg-antique px-4 py-2 text-[11px] font-bold text-beige">
                <span>{matches.length} product{matches.length === 1 ? "" : "s"} found</span>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={() => setOpen(false)}
                  className="text-walnut hover:underline"
                >
                  View all in Shop →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function CartButton() {
  const { count, subtotal } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${count} items`}
      className="flex items-center gap-2.5 rounded-md bg-walnut px-3.5 py-2 text-white shadow-xs transition-all hover:bg-cocoa-ink cursor-pointer"
    >
      <span className="relative">
        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
          <path
            d="M3 4h2l2.4 12.2A2 2 0 0 0 9.36 18h8.1a2 2 0 0 0 1.95-1.57L21 9H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="21" r="1.4" fill="currentColor" />
          <circle cx="17" cy="21" r="1.4" fill="currentColor" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-amber px-1 text-[9px] font-extrabold text-white shadow-xs">
            {count}
          </span>
        )}
      </span>
      <span className="hidden flex-col text-left leading-none sm:flex">
        <span className="text-[9px] font-semibold tracking-wider text-parchment/70 uppercase">Cart</span>
        <span className="display mt-0.5 text-xs font-bold text-parchment">{formatLKR(subtotal)}</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <OfferMarquee />
      <div
        className={`transition-all duration-200 ${
          scrolled ? "bg-parchment/95 shadow-sm backdrop-blur-md" : "bg-parchment border-b border-mist"
        }`}
      >
        {/* Main Bar */}
        <nav className="mx-auto flex max-w-[1536px] items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6 lg:px-8 xl:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.jpg"
              alt="Armac Mart logo"
              width={38}
              height={38}
              className="rounded-md border border-mist shadow-xs"
              priority
            />
            <div>
              <span className="display text-lg leading-none text-cocoa-ink tracking-tight font-extrabold">
                ARMAC MART
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-beige uppercase mt-0.5">
                Convenience &amp; Global Imports
              </span>
            </div>
          </Link>

          <SearchBar className="mx-auto hidden max-w-2xl flex-1 md:block" />

          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <Link
              href="/shop"
              className="hidden items-center gap-1 rounded-md bg-walnut text-white px-3 py-1.5 text-xs font-bold hover:bg-cocoa-ink transition-colors lg:flex"
            >
              <span>🛍️</span> Shop Catalog
            </Link>

            <Link
              href="/#viral"
              className="hidden items-center gap-1 rounded-md bg-antique border border-mist px-3 py-1.5 text-xs font-bold text-walnut hover:bg-white transition-colors xl:flex"
            >
              <span>🔥</span> Viral Drops
            </Link>

            <Link
              href="/#visit"
              className="hidden items-center gap-1 rounded-md bg-white border border-mist px-3 py-1.5 text-xs font-semibold text-cocoa-ink hover:bg-antique transition-colors lg:flex"
            >
              <span>📍</span> Dehiwala Store
            </Link>

            <CartButton />

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-mist bg-white lg:hidden cursor-pointer"
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-4 bg-cocoa-ink transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-4 bg-cocoa-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-4 bg-cocoa-ink transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-2.5 md:hidden">
          <SearchBar />
        </div>

        {/* Department Strip */}
        <div className="hidden border-t border-mist bg-antique/60 lg:block">
          <div className="no-scrollbar mx-auto flex max-w-[1536px] items-center gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2">
            <Link
              href="/shop"
              className="text-xs font-bold whitespace-nowrap transition-colors py-1 px-2.5 rounded bg-walnut text-white"
            >
              🛍️ All 10 Aisles
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className={`text-xs font-bold whitespace-nowrap transition-colors py-1 px-2.5 rounded ${
                  c.slug === "viral"
                    ? "bg-brand-amber text-white"
                    : "text-cocoa-ink hover:text-walnut hover:bg-white"
                }`}
              >
                {c.shortName ?? c.name}
              </Link>
            ))}
            <span className="mx-1 ml-auto h-3.5 w-px shrink-0 bg-mist" />
            <Link
              href="/#deals"
              className="text-xs font-bold text-walnut hover:underline whitespace-nowrap"
            >
              ⚡ Value Bundles
            </Link>
            <Link
              href="/#visit"
              className="text-xs font-semibold text-beige hover:text-cocoa-ink whitespace-nowrap"
            >
              📍 Store Hours
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-mist bg-white px-5 pt-3 pb-5 shadow-lg lg:hidden">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[10px] font-extrabold tracking-widest text-beige uppercase">
                10 Store Departments
              </span>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="text-xs font-bold text-walnut hover:underline"
              >
                Shop All Aisles →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-md p-2 text-xs font-bold transition-colors ${
                    c.slug === "viral"
                      ? "bg-brand-amber text-white"
                      : "bg-antique text-cocoa-ink border border-mist/40"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-2 border-t border-mist pt-3">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-md bg-walnut py-2 text-center text-xs font-bold text-white"
              >
                🛍️ Browse Shop
              </Link>
              <Link
                href="/#viral"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-md bg-antique border border-mist py-2 text-center text-xs font-bold text-cocoa-ink"
              >
                🔥 Viral Drops
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
