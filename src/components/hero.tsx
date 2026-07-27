"use client";

/* H1 · Marquee — knobs: size=xxl, alignment=left-bias, underlay=footage
 *
 * A single statement fills the fold. No subhead, no CTA in view — the ticker and
 * the category index directly beneath carry the browse intent.
 *
 * The footage does NOT carry `autoPlay`: playback is started by the effect below
 * only once the welcome preloader has cleared, so nothing is running underneath
 * the splash. Without JS — or under prefers-reduced-motion — the poster frame
 * stands in and no video plays at all, which is the correct behaviour for
 * motion-sensitive visitors.
 */

import { useEffect, useId, useRef } from "react";

const PRELOADER_MS = 2000;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      try {
        video.currentTime = 0;
      } catch {
        /* Seeking before metadata lands can throw — harmless. */
      }
      void video.play().catch(() => {
        /* Autoplay refusal is fine; the poster frame stands in. */
      });
    }, PRELOADER_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate flex min-h-[clamp(32rem,84vh,54rem)] items-end overflow-hidden bg-ink"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/shop/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/shop/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Scrim washes in once the footage has run clean for three seconds */}
      <div
        aria-hidden="true"
        className="hero__scrim absolute inset-0 -z-10 bg-ink/70"
      />
      <div
        aria-hidden="true"
        className="hero__scrim absolute inset-0 -z-10 bg-gradient-to-tr from-ink via-ink/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:pb-28">
        <div className="hero__reveal">
          <h1
            id={headingId}
            className="max-w-[16ch] text-[length:var(--text-display)] text-paper"
          >
            Your corner shop,{" "}
            <span className="relative inline-block">
              properly stocked.
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[0.1em] rounded-full bg-signal"
              />
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
