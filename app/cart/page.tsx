"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import {
  formatLKR,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_FEE,
  PROMO_CODES,
} from "@/lib/format";

function EmptyCart() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <span className="inline-block text-6xl">🛒</span>
      <h1 className="display mt-6 text-3xl sm:text-4xl text-cocoa-ink">
        Your cart is empty
      </h1>
      <p className="mt-2 text-sm text-beige">
        The convenience aisles are fully stocked. Fill your basket with fresh imports.
      </p>
      <Link href="/#categories" className="btn-primary mt-6 text-xs sm:text-sm">
        Browse Aisles →
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, count, subtotal, setQty, remove } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("armac-promo");
    if (saved && PROMO_CODES[saved]) setApplied(saved);
  }, []);
  useEffect(() => {
    if (applied) sessionStorage.setItem("armac-promo", applied);
    else sessionStorage.removeItem("armac-promo");
  }, [applied]);

  if (items.length === 0) return <EmptyCart />;

  const discountRate = applied ? PROMO_CODES[applied] : 0;
  const discount = Math.round(subtotal * discountRate);
  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = freeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal - discount + deliveryFee;
  const progress = Math.min(subtotal / FREE_DELIVERY_THRESHOLD, 1);

  const applyCode = () => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setApplied(normalized);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-10 sm:px-6 lg:px-8 xl:px-12">
      <div className="border-b border-mist pb-4">
        <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
          CHECKOUT BASKET
        </span>
        <h1 className="display mt-1 text-3xl sm:text-4xl text-cocoa-ink">
          Your Shopping Cart ({count} {count === 1 ? "item" : "items"})
        </h1>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Line items */}
        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-lg bg-white p-4 border border-mist shadow-xs sm:p-5"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-mist/60 bg-antique-card overflow-hidden">
                {product.image ? (
                  <img
                    src={`${product.image}?v=2`}
                    alt={product.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-3xl">{product.emoji}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold tracking-wider text-beige uppercase">
                  {product.brand} · {product.flag} {product.origin}
                </span>
                <h3 className="truncate font-bold text-sm text-cocoa-ink">{product.name}</h3>
                <span className="text-xs text-beige">{product.unit} · {formatLKR(product.price)} each</span>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center rounded-md border border-mist bg-antique/50">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-sm font-bold text-cocoa-ink hover:bg-mist transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="display w-7 text-center text-xs font-bold text-cocoa-ink">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-sm font-bold text-cocoa-ink hover:bg-mist transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-xs font-semibold text-beige hover:text-walnut transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <span className="display shrink-0 text-base font-bold text-cocoa-ink sm:text-lg">
                {formatLKR(product.price * qty)}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28">
          <div className="rounded-lg bg-white p-6 border border-mist shadow-xs">
            <h2 className="display text-xl font-bold text-cocoa-ink">Order Summary</h2>

            {/* Free delivery progress */}
            <div className="mt-4 rounded-md bg-antique/60 p-3.5 border border-mist/60">
              {freeDelivery ? (
                <p className="text-xs font-bold text-walnut">✓ You&apos;ve unlocked FREE Islandwide Delivery!</p>
              ) : (
                <p className="text-xs font-medium text-cocoa-ink">
                  Add <span className="font-bold text-walnut">{formatLKR(FREE_DELIVERY_THRESHOLD - subtotal)}</span> more for free delivery
                </p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-brand-amber transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Promo code */}
            <div className="mt-4">
              {applied ? (
                <div className="flex items-center justify-between rounded-md bg-antique px-3 py-2 border border-mist">
                  <span className="text-xs font-bold text-walnut">🏷️ {applied} applied</span>
                  <button
                    onClick={() => setApplied(null)}
                    className="text-xs font-semibold text-beige hover:text-walnut uppercase cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCodeError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyCode()}
                    placeholder="Promo code (try ARMAC15)"
                    className="h-9 flex-1 rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                  />
                  <button
                    onClick={applyCode}
                    className="h-9 rounded-md bg-walnut px-4 text-xs font-bold text-white hover:bg-cocoa-ink transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {codeError && (
                <p className="mt-1 pl-1 text-xs text-brand-amber font-medium">
                  Invalid code. Please try ARMAC15.
                </p>
              )}
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-mist pt-4 text-xs">
              <div className="flex justify-between">
                <dt className="text-beige">Subtotal ({count} items)</dt>
                <dd className="font-bold text-cocoa-ink">{formatLKR(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-amber font-semibold">
                  <dt>Discount ({applied})</dt>
                  <dd>− {formatLKR(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-beige">Islandwide Delivery</dt>
                <dd className={`font-bold ${freeDelivery ? "text-walnut" : "text-cocoa-ink"}`}>
                  {freeDelivery ? "FREE" : formatLKR(deliveryFee)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-mist pt-3">
                <dt className="display text-base font-bold text-cocoa-ink">Total</dt>
                <dd className="display text-2xl font-bold text-cocoa-ink">{formatLKR(total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="btn-primary mt-6 w-full justify-center py-3 text-xs sm:text-sm font-bold"
            >
              Proceed to Checkout →
            </Link>
            <Link
              href="/#categories"
              className="mt-3 block text-center text-xs font-semibold text-beige hover:text-walnut transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
