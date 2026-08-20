"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatLKR } from "@/lib/format";
import type { Product } from "@/lib/products";

const BADGE_STYLES: Record<string, string> = {
  BESTSELLER: "bg-walnut text-parchment",
  "HOT DEAL": "bg-brand-amber text-white",
  VIRAL: "bg-brand-amber text-white",
  "LIMITED TIME": "bg-walnut-light text-parchment",
  NEW: "bg-cocoa-ink text-parchment",
  "STAFF PICK": "bg-walnut text-parchment",
  COMBO: "bg-brand-amber text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="card-sharp group relative flex flex-col justify-between overflow-hidden bg-white border border-mist shadow-xs hover:border-walnut/50 transition-all duration-200">
      {/* Clickable Image Box linking to /product/[id] */}
      <Link
        href={`/product/${product.id}`}
        className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b border-mist/60 bg-antique-card cursor-pointer"
      >
        {/* Scarcity / Quality Badges */}
        {product.badge && (
          <span
            className={`display absolute top-2.5 left-2.5 rounded px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase shadow-xs z-10 ${
              BADGE_STYLES[product.badge] || "bg-walnut text-parchment"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Origin Country Pill */}
        <span
          className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-bold text-cocoa-ink shadow-xs border border-mist/80"
          title={`Imported from ${product.origin}`}
        >
          <span>{product.flag}</span>
          <span className="uppercase text-[9px] text-beige font-semibold">{product.origin}</span>
        </span>

        {/* Product Visual */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
            {product.emoji}
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & Unit Tag */}
        <div className="flex items-center justify-between text-[11px] font-medium text-beige">
          <span className="uppercase tracking-wider font-semibold">{product.brand}</span>
          <span>{product.unit}</span>
        </div>

        {/* Product Name linking to /product/[id] */}
        <Link href={`/product/${product.id}`} className="mt-1 block">
          <h3 className="display text-sm font-bold text-cocoa-ink group-hover:text-walnut transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Stock status */}
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="text-brand-amber font-bold">★ {product.rating.toFixed(1)}</span>
          <span className="text-mist-dark">|</span>
          <span className="text-[10px] text-beige font-medium">Verified Authentic</span>
        </div>

        {/* Pricing & Add to Cart Bar */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-mist/60">
          <Link href={`/product/${product.id}`} className="cursor-pointer">
            <div className="flex items-baseline gap-1.5">
              <span className="display text-lg font-bold text-cocoa-ink">
                {formatLKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-beige/70 line-through">
                  {formatLKR(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="block text-[9px] font-bold text-brand-amber uppercase">
                Save {formatLKR(product.originalPrice - product.price)}
              </span>
            )}
          </Link>

          {/* Quick Add Button */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`flex h-8.5 items-center justify-center gap-1 rounded-md px-3.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
              justAdded
                ? "bg-walnut-deep text-brand-amber-soft"
                : "bg-walnut text-white hover:bg-cocoa-ink active:scale-95 shadow-xs"
            }`}
          >
            {justAdded ? (
              <span>✓ Added</span>
            ) : (
              <>
                <span className="text-sm leading-none">+</span>
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
