"use client";

import Link from "next/link";

export function VisitStore() {
  return (
    <section id="visit" className="mx-auto max-w-[1536px] scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-12">
      <div className="relative overflow-hidden rounded-xl bg-walnut text-parchment shadow-card border border-white/10 p-6 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Info & Hours */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="rounded bg-brand-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                PHYSICAL STORE
              </span>
              <span className="flex items-center gap-1.5 rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-parchment/90 border border-white/15">
                OPEN NOW · TILL 10:00 PM
              </span>
            </div>

            <h2 className="display mt-4 text-2xl sm:text-3xl lg:text-4xl text-white">
              Experience Armac Mart in Dehiwala
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-parchment/80 leading-relaxed max-w-lg font-normal">
              10 fully stocked aisles of authentic imported chocolates, drinks, baby care, crisps, and pantry essentials. Convenient parking, fully air-conditioned, and open 7 days a week.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <span className="text-parchment font-bold block mb-1">📍 Store Address</span>
                <span className="text-parchment/75">Armac Mart, Kalubowila, Dehiwala, Sri Lanka</span>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <span className="text-parchment font-bold block mb-1">🕗 Operating Hours</span>
                <span className="text-parchment/75">Monday – Sunday: 8:00 AM – 10:00 PM</span>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <span className="text-parchment font-bold block mb-1">📞 Phone &amp; WhatsApp</span>
                <span className="text-parchment/75">+94 77 123 4567 (Direct Orders)</span>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <span className="text-parchment font-bold block mb-1">⚡ Express Pickup</span>
                <span className="text-parchment/75">Order online &amp; collect in 15 minutes</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Kalubowila,+Dehiwala"
                target="_blank"
                rel="noreferrer"
                className="btn-primary bg-parchment text-walnut hover:bg-white text-xs font-bold"
              >
                Google Maps Directions →
              </a>
              <a
                href="tel:+94771234567"
                className="btn-outline border-white/20 text-white hover:bg-white/10 text-xs"
              >
                Call Store Desk
              </a>
            </div>
          </div>

          {/* Right Column: 3 Department Showcase Tiles */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-parchment font-bold text-lg border border-white/10">
                🍫
              </span>
              <div>
                <span className="display text-sm font-bold text-white block">Aisle 1: Confectionery</span>
                <span className="text-[11px] text-parchment/60">Swiss Lindt, Ferrero, Milka &amp; Belgian Truffles</span>
              </div>
            </div>

            <div className="rounded-lg bg-white/5 border border-white/10 p-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-parchment font-bold text-lg border border-white/10">
                🔥
              </span>
              <div>
                <span className="display text-sm font-bold text-white block">Aisle 10: Viral Drops</span>
                <span className="text-[11px] text-parchment/60">Dubai Kunafa, Takis Blue Heat, Buldak 2X</span>
              </div>
            </div>

            <div className="rounded-lg bg-white/5 border border-white/10 p-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-parchment font-bold text-lg border border-white/10">
                🥤
              </span>
              <div>
                <span className="display text-sm font-bold text-white block">Aisle 3: Chilled Drinks</span>
                <span className="text-[11px] text-parchment/60">AriZona, Red Bull, Dr Pepper &amp; Ramune Soda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
