"use client";

/* N12 · Announcement banner + retracting nav
 *
 * The banner retracts by translating the whole header upward by exactly the
 * banner's height. Transform is a compositor-only property: it does not change
 * the document height, so scroll position is never perturbed by the animation.
 *
 * This matters. An earlier version animated `grid-template-rows` to collapse the
 * banner, which reflows on every frame — the page got shorter mid-animation,
 * that shifted scrollY, the shift re-fired the scroll handler, the direction
 * test flipped, and the banner re-expanded. The nav visibly vibrated. Never
 * animate a layout property on a sticky element that also reads scroll position.
 *
 * Two further guards against jitter:
 *   · the handler is rAF-throttled, so it runs at most once per frame;
 *   · a movement threshold means momentum scrolling and sub-pixel deltas can't
 *     flip the state.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBasket, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", href: "#categories" },
  { label: "Offers", href: "#best-sellers" },
  { label: "Why Armac", href: "#promise" },
  { label: "Reviews", href: "#reviews" },
];

/** Scroll distance required before the retract state may change, in px. */
const THRESHOLD = 8;

export function SiteHeader() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [retracted, setRetracted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Measure the banner so the retract distance is exact at any text wrap.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) {
      setBannerHeight(0);
      return;
    }
    const measure = () => setBannerHeight(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [bannerOpen]);

  useEffect(() => {
    if (!bannerOpen) return;

    let ticking = false;
    let anchor = window.scrollY;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);

        if (y <= 0) {
          setRetracted(false);
          anchor = 0;
        } else {
          const delta = y - anchor;
          // `anchor` only moves when we act, so small deltas accumulate rather
          // than repeatedly toggling the state.
          if (Math.abs(delta) > THRESHOLD) {
            if (delta > 0 && y > bannerHeight) setRetracted(true);
            else if (delta < 0) setRetracted(false);
            anchor = y;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [bannerOpen, bannerHeight]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // An open disclosure panel pins the header — retracting underneath the user
  // while they are choosing a link is hostile.
  const lifted = retracted && !menuOpen && bannerOpen;

  return (
    <header
      className="sticky top-0 z-30 transition-transform duration-[240ms] ease-out"
      style={{
        transform: lifted ? `translate3d(0, -${bannerHeight}px, 0)` : undefined,
        willChange: "transform",
      }}
    >
      {bannerOpen && (
        <div ref={bannerRef} className="bg-walnut text-accent-ink">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center sm:px-6">
            <p className="text-[0.8rem] leading-snug tracking-wide">
              Free local delivery on orders over{" "}
              <span className="font-semibold">£25</span>
              {" — "}
              click &amp; collect ready in 30 minutes
            </p>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              aria-label="Dismiss announcement"
              /* Pseudo-element widens the tap area to 44px without growing
                 the banner — the visible glyph stays small. */
              className="relative -mr-1 shrink-0 rounded-full p-1 transition-colors duration-[140ms] ease-out after:absolute after:-inset-[0.6875rem] after:content-[''] hover:bg-paper/15"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className="border-b-2 border-ink bg-paper">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6"
        >
          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 items-center gap-2.5"
            aria-label="ARMAC MART — home"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-md bg-walnut font-display text-lg font-extrabold text-accent-ink"
            >
              A
            </span>
            <span className="font-display text-base font-extrabold uppercase leading-none tracking-[-0.02em] whitespace-nowrap xs:text-lg sm:text-xl">
              Armac <span className="text-wood">Mart</span>
            </span>
          </Link>

          <ul className="ml-auto hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative whitespace-nowrap text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-[140ms] ease-out hover:text-walnut after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-walnut after:transition-[width] after:duration-[140ms] after:ease-out hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-6">
            {/* Below sm the bar cannot hold this and stay on screen at 320px,
                so search moves into the disclosure panel instead. */}
            <button
              type="button"
              aria-label="Search the shop"
              className="hidden size-11 place-items-center rounded-md text-ink transition-colors duration-[140ms] ease-out hover:bg-paper-3 sm:grid"
            >
              <Search className="size-[1.15rem]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-md bg-walnut px-3 text-accent-ink transition-colors duration-[140ms] ease-out hover:bg-ink sm:px-4"
            >
              <ShoppingBasket className="size-[1.15rem]" aria-hidden="true" />
              <span className="hidden text-[0.78rem] font-semibold uppercase tracking-[0.08em] whitespace-nowrap sm:inline">
                Basket
              </span>
              <span className="tabular text-[0.78rem] font-semibold opacity-70">
                <span className="sr-only">Items in basket: </span>0
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-md text-ink transition-colors duration-[140ms] ease-out hover:bg-paper-3 lg:hidden"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-rule bg-paper-2 lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              <li className="border-b border-rule sm:hidden">
                <button
                  type="button"
                  className="flex min-h-[44px] w-full items-center gap-3 text-left text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-ink"
                >
                  <Search className="size-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Search the shop</span>
                </button>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-rule last:border-0">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex min-h-[44px] items-center whitespace-nowrap text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
