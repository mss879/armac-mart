"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatLKR } from "@/lib/format";
import { getViralProducts } from "@/lib/products";

export function ViralDrops() {
  const { add } = useCart();
  const viralProducts = getViralProducts();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Live countdown timer for the drop
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 48,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAdd = (id: string) => {
    add(id);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1400);
  };

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <section id="viral" className="mx-auto max-w-[1536px] scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-10">
      <div className="relative overflow-hidden rounded-xl bg-walnut-deep p-6 text-parchment shadow-card sm:p-8 border border-white/10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-brand-amber px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                LIMITED TIME ONLY
              </span>
              <span className="text-xs font-medium text-parchment/70">
                Air-Freighted Global Drops
              </span>
            </div>
            <h2 className="display mt-2 text-2xl sm:text-3xl lg:text-4xl text-white">
              Trending Viral Drops
            </h2>
            <p className="mt-1 max-w-lg text-xs sm:text-sm text-parchment/70 font-normal">
              Direct air-freight allocations with strictly limited shelf quantities. Once sold out, replenishment takes weeks.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] font-bold tracking-widest text-parchment/60 uppercase">
              Current Drop Window Closes In
            </span>
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex flex-col items-center justify-center rounded bg-black/40 border border-white/15 px-3 py-1.5 min-w-[3.5rem]">
                <span className="display text-xl sm:text-2xl text-parchment">{formatDigit(timeLeft.hours)}</span>
                <span className="text-[8px] font-bold text-parchment/50 uppercase tracking-wider">Hours</span>
              </div>
              <span className="display text-lg text-parchment/60">:</span>
              <div className="flex flex-col items-center justify-center rounded bg-black/40 border border-white/15 px-3 py-1.5 min-w-[3.5rem]">
                <span className="display text-xl sm:text-2xl text-parchment">{formatDigit(timeLeft.minutes)}</span>
                <span className="text-[8px] font-bold text-parchment/50 uppercase tracking-wider">Mins</span>
              </div>
              <span className="display text-lg text-parchment/60">:</span>
              <div className="flex flex-col items-center justify-center rounded bg-black/40 border border-white/15 px-3 py-1.5 min-w-[3.5rem]">
                <span className="display text-xl sm:text-2xl text-brand-amber-soft">{formatDigit(timeLeft.seconds)}</span>
                <span className="text-[8px] font-bold text-parchment/50 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Viral Products Shelf Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {viralProducts.map((p) => {
            const isAdded = addedId === p.id;
            const stock = p.stockLeft ?? 8;
            const percentage = Math.min(100, Math.max(15, (stock / 25) * 100));

            return (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10"
              >
                {/* Top Badge & Flag */}
                <div className="flex items-center justify-between">
                  <span className="rounded bg-brand-amber px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    {p.badge ?? "VIRAL DROP"}
                  </span>
                  <span className="rounded bg-black/50 px-2 py-0.5 text-[10px] font-medium text-parchment border border-white/10">
                    {p.origin} {p.flag}
                  </span>
                </div>

                {/* Center Visual */}
                <div className="my-4 flex h-36 items-center justify-center">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-32 object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-5xl transition-transform duration-200 group-hover:scale-110">
                      {p.emoji}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-parchment/60 uppercase">
                    {p.brand} · {p.unit}
                  </span>
                  <h3 className="display mt-1 text-base font-bold text-white group-hover:text-brand-amber-soft transition-colors line-clamp-1">
                    {p.name}
                  </h3>

                  {/* Stock meter */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-medium">
                      <span className="text-brand-amber-soft">Only {stock} units left</span>
                      <span className="text-parchment/50">High Demand</span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-black/50">
                      <div
                        className="h-full rounded-full bg-brand-amber"
                        style={{ width: `${100 - percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="display text-lg font-bold text-white">{formatLKR(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-[11px] text-parchment/50 line-through">
                            {formatLKR(p.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-parchment/50">★ {p.rating.toFixed(1)} Authentic</span>
                    </div>

                    <button
                      onClick={() => handleAdd(p.id)}
                      className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                        isAdded
                          ? "bg-white text-walnut"
                          : "bg-parchment text-walnut hover:bg-white active:scale-95"
                      }`}
                    >
                      {isAdded ? "✓ Added" : "+ Order Drop"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
