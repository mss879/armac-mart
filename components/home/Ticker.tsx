"use client";

const WORDS = [
  "SWEETS & CHOCOLATES",
  "BISCUITS & LOTUS",
  "COLD DRINKS & SODAS",
  "VIRAL INTERNET DROPS",
  "CRISPS & SAVOURY SNACKS",
  "HEALTH & FITNESS NUTRITION",
  "COSMETICS & SKINCARE",
  "BABY ESSENTIALS",
  "CUPBOARD & PANTRY STAPLES",
  "DAIRY & FROZEN TREATS",
  "EXPRESS DEHIWALA DELIVERY",
];

export function Ticker() {
  const row = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden border-y border-mist bg-antique py-2.5">
      <div className="flex w-max animate-marquee items-center gap-6 pr-6">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap">
            <span className="text-xs font-bold tracking-wider text-cocoa-ink uppercase">
              {w}
            </span>
            <span className="text-xs text-brand-amber">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
