"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatLKR } from "@/lib/format";

const COMBOS = [
  {
    id: "combo-late-night",
    title: "Late Night Munchies Bundle",
    tag: "POPULAR COMBO",
    description: "Pringles Sour Cream + Red Bull Energy + Reese's Peanut Butter Cups + Haribo Goldbears.",
    items: ["Pringles Sour Cream (158g)", "Red Bull Energy (250ml)", "Reese's Peanut Butter (42g)", "Haribo Goldbears (100g)"],
    itemIds: ["crisps-pringles-sourcream", "drink-redbull", "sweets-reeses-cups", "sweets-haribo-goldbears"],
    price: 4350,
    originalPrice: 4840,
    saveAmount: 490,
    badge: "SAVE RS 490",
  },
  {
    id: "combo-viral-heat",
    title: "Viral Heat & Cool Combo",
    tag: "INTERNET COMBO",
    description: "Samyang Buldak 2X Spicy Ramen + Takis Blue Heat Chips + Chilled AriZona Green Tea Honey.",
    items: ["Buldak 2X Hot Chicken (140g)", "Takis Blue Heat (92g)", "AriZona Green Tea (680ml)"],
    itemIds: ["viral-samyang-buldak-2x", "viral-takis-blue-heat", "drink-arizona-greentea"],
    price: 4150,
    originalPrice: 4590,
    saveAmount: 440,
    badge: "SAVE RS 440",
  },
  {
    id: "combo-sweet-tooth",
    title: "European Chocolatier Pack",
    tag: "VALUE BUNDLE",
    description: "Ferrero Rocher 16pc + Lindt 70% Dark + Toblerone Almond + Lotus Biscoff biscuit pack.",
    items: ["Ferrero Rocher 16pc (200g)", "Lindt Excellence 70% (100g)", "Toblerone Milk (100g)", "Lotus Biscoff (250g)"],
    itemIds: ["sweets-ferrero-16", "sweets-lindt-70", "sweets-toblerone", "bisc-lotus-biscoff"],
    price: 9450,
    originalPrice: 10200,
    saveAmount: 750,
    badge: "SAVE RS 750",
  },
];

export function ImpulseDeals() {
  const { add } = useCart();
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const handleAddCombo = (combo: typeof COMBOS[0]) => {
    combo.itemIds.forEach((id) => add(id));
    setAddedComboId(combo.id);
    setTimeout(() => setAddedComboId(null), 1400);
  };

  return (
    <section id="deals" className="mx-auto max-w-[1536px] scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-mist pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
            CROSS-MERCHANDISING COMBOS
          </span>
          <h2 className="display mt-1 text-2xl sm:text-3xl text-cocoa-ink">
            Grab-and-Go Value Bundles
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-beige">
            Curated convenience store pairings bundled together with instant savings.
          </p>
        </div>
      </div>

      {/* 3 Combo Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COMBOS.map((combo) => {
          const isAdded = addedComboId === combo.id;

          return (
            <div
              key={combo.id}
              className="card-sharp flex flex-col justify-between p-5 border border-mist bg-white shadow-xs"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-walnut text-parchment px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    {combo.tag}
                  </span>
                  <span className="rounded bg-antique border border-mist px-2 py-0.5 text-[10px] font-bold text-brand-amber">
                    {combo.badge}
                  </span>
                </div>

                <h3 className="display mt-3 text-lg font-bold text-cocoa-ink">{combo.title}</h3>
                <p className="mt-1 text-xs text-beige leading-relaxed">{combo.description}</p>

                {/* Items in Combo */}
                <div className="mt-4 space-y-1.5 border-t border-mist/60 pt-3">
                  <span className="text-[10px] font-bold text-cocoa-ink uppercase tracking-wider block">
                    Included in pack:
                  </span>
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-cocoa-ink">
                      <span className="text-brand-amber font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 flex items-center justify-between border-t border-mist/60 pt-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="display text-xl font-bold text-cocoa-ink">{formatLKR(combo.price)}</span>
                    <span className="text-xs text-beige/70 line-through">{formatLKR(combo.originalPrice)}</span>
                  </div>
                  <span className="block text-[10px] font-medium text-brand-amber">Instant bundled savings</span>
                </div>

                <button
                  onClick={() => handleAddCombo(combo)}
                  className={`btn-primary text-xs cursor-pointer ${
                    isAdded ? "bg-walnut-deep text-brand-amber-soft" : ""
                  }`}
                >
                  {isAdded ? "✓ Added Bundle" : "+ Add Bundle"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
