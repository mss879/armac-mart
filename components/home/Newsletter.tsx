"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-12">
      <div className="relative overflow-hidden rounded-xl bg-walnut-deep p-6 text-center text-parchment shadow-card sm:p-10 border border-white/10">
        <div className="mx-auto max-w-xl">
          <span className="rounded bg-brand-amber px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
            VIP SNACK CLUB
          </span>

          <h3 className="display mt-3 text-2xl sm:text-3xl lg:text-4xl text-white">
            Get 15% Off Your First Order
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-parchment/80 font-normal">
            Be the first to know when limited viral snacks drop, new Swiss chocolates land, and weekly flash combos go live.
          </p>

          {done ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-xs font-bold text-white shadow-xs border border-white/20">
              <span>✓ Welcome! Use code</span>
              <span className="rounded bg-white text-walnut px-2 py-0.5 font-bold">ARMAC15</span>
              <span>at checkout</span>
            </div>
          ) : (
            <form
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address…"
                aria-label="Email address"
                className="h-10 flex-1 rounded-md border border-white/20 bg-white/10 px-3.5 text-xs sm:text-sm text-white placeholder:text-parchment/40 focus:border-brand-amber"
              />
              <button
                type="submit"
                className="h-10 rounded-md bg-parchment px-5 text-xs font-bold text-walnut hover:bg-white transition-colors cursor-pointer"
              >
                Join Club →
              </button>
            </form>
          )}

          <span className="mt-4 block text-[10px] text-parchment/50">
            No spam guaranteed. Unsubscribe anytime with 1 click.
          </span>
        </div>
      </div>
    </section>
  );
}
