"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* Flags fly in from everywhere, collapse into one parcel, ride to your door. */
const ORBIT_ITEMS = ["🇨🇭", "🇯🇵", "🇮🇹", "🇬🇧", "🇺🇸", "🇰🇷", "🇩🇪", "🇫🇷", "🇧🇪", "🇹🇭"];

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <span className="wi inline-block will-change-transform">{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const vw = () => window.innerWidth;
        const rx = () => Math.min(window.innerWidth * 0.36, 330);
        const ry = () => Math.min(window.innerHeight * 0.26, 240);
        const angle = (i: number) => (i / ORBIT_ITEMS.length) * Math.PI * 2 - Math.PI / 2;

        // Center-anchor the transformable pieces once
        gsap.set(".orbit-item", { xPercent: -50, yPercent: -50 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 4.5,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* ---------- Chapter 1 · The world gathers (0 – 2.3) ---------- */
        tl.fromTo(".st-h0 .wi", { yPercent: 120 }, { yPercent: 0, stagger: 0.08, duration: 0.8 }, 0)
          .fromTo(
            ".orbit-ring circle",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.8, ease: "none" },
            0.1
          )
          .fromTo(
            ".orbit-item",
            {
              x: (i: number) => Math.cos(angle(i)) * rx() * 2.8,
              y: (i: number) => Math.sin(angle(i)) * ry() * 2.8,
              scale: 0.3,
              opacity: 0,
            },
            {
              x: (i: number) => Math.cos(angle(i)) * rx(),
              y: (i: number) => Math.sin(angle(i)) * ry(),
              scale: 1,
              opacity: 1,
              stagger: 0.07,
              duration: 1.2,
            },
            0.3
          )
          .fromTo(".orbit-spin", { rotate: -8 }, { rotate: 8, duration: 2.4, ease: "none" }, 0)

          /* ---------- Chapter 2 · Packed into one parcel (2.3 – 4.6) ---------- */
          .to(".st-h0 .wi", { yPercent: -130, stagger: 0.05, duration: 0.5, ease: "power2.in" }, 2.3)
          .to(".orbit-ring", { opacity: 0, scale: 0.8, duration: 0.6 }, 2.5)
          .to(
            ".orbit-item",
            { x: 0, y: 0, scale: 0, opacity: 0.9, stagger: 0.05, duration: 0.9, ease: "power2.in" },
            2.5
          )
          .fromTo(
            ".parcel",
            { scale: 0, rotate: -15, autoAlpha: 0 },
            { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(2)" },
            3.0
          )
          .to(".parcel", { scaleY: 0.88, yPercent: 4, duration: 0.15, ease: "power1.inOut" }, 3.7)
          .to(".parcel", { scaleY: 1, yPercent: 0, duration: 0.25, ease: "back.out(3)" }, 3.85)
          .fromTo(".st-h1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 3.3)
          .fromTo(".st-h1 .wi", { yPercent: 120 }, { yPercent: 0, stagger: 0.07, duration: 0.6 }, 3.3)

          /* ---------- Chapter 3 · On the road (4.6 – 7.2) ---------- */
          .to(".st-h1 .wi", { yPercent: -130, stagger: 0.04, duration: 0.5, ease: "power2.in" }, 4.6)
          .to(".st-h1", { autoAlpha: 0, duration: 0.1 }, 5.1)
          .fromTo(
            ".road-line",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "none" },
            4.7
          )
          // Parcel hops onto the scooter as it sweeps through the middle
          .fromTo(
            ".courier",
            { x: () => -vw() * 0.6 },
            { x: 0, duration: 1.2, ease: "power1.inOut" },
            4.9
          )
          .to(".parcel", { y: 46, scale: 0.42, duration: 0.5, ease: "power2.in" }, 5.5)
          .to(".parcel", { autoAlpha: 0, duration: 0.12 }, 5.95)
          .fromTo(".courier-parcel", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 5.95)
          .to(".courier", { x: () => vw() * 0.16, duration: 1.1, ease: "power1.inOut" }, 6.1)
          .fromTo(
            ".motion-line",
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 0.5, stagger: 0.1, duration: 0.4 },
            5.4
          )
          .fromTo(".st-h2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 5.8)
          .fromTo(".st-h2 .wi", { yPercent: 120 }, { yPercent: 0, stagger: 0.07, duration: 0.6 }, 5.8)

          /* ---------- Chapter 4 · Delivered (7.2 – 10) ---------- */
          .to(".st-h2 .wi", { yPercent: -130, stagger: 0.04, duration: 0.5, ease: "power2.in" }, 7.2)
          .to(".st-h2", { autoAlpha: 0, duration: 0.1 }, 7.7)
          .fromTo(
            ".store-door",
            { autoAlpha: 0, x: 140 },
            { autoAlpha: 1, x: 0, duration: 0.8 },
            7.4
          )
          .to(".courier", { x: () => vw() * 0.24, duration: 0.7, ease: "power1.inOut" }, 7.7)
          .to(".motion-line", { opacity: 0, duration: 0.3 }, 7.7)
          .to(".courier-parcel", { y: -26, x: 40, scale: 1.3, duration: 0.5, ease: "power2.out" }, 8.4)
          .to(".courier-parcel", { y: 6, x: 74, scale: 1.1, duration: 0.4, ease: "bounce.out" }, 8.9)
          .fromTo(
            ".burst",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: "back.out(3)" },
            9.0
          )
          .fromTo(".st-h3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 9.0)
          .fromTo(".st-h3 .wi", { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 0.6 }, 9.0)
          .fromTo(
            ".st-cta",
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2.2)" },
            9.4
          )
          .to({}, { duration: 0.6 }) // hold the final frame

          /* ---------- Video-style scrubber, runs the whole length ---------- */
          .fromTo(
            ".story-fill",
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: tl.duration() },
            0
          )
          .to(".story-hint", { opacity: 0.35, duration: 0.6 }, 0.8);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" className="relative">
      <div className="relative h-svh overflow-hidden bg-cocoa-ink text-antique">
        {/* Cinema backdrop */}
        <div className="swirl pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ffd88a]/8 blur-3xl" />

        {/* Orbit of origin flags */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="orbit-spin relative h-full w-full">
            <svg className="orbit-ring absolute inset-0 m-auto h-[min(58vh,540px)] w-[min(76vw,700px)]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(245,240,232,0.22)"
                strokeWidth="0.5"
                strokeDasharray="0.04 0.02"
                pathLength={1}
              />
            </svg>
            {ORBIT_ITEMS.map((item, i) => (
              <span
                key={i}
                className="orbit-item absolute top-1/2 left-1/2 text-3xl drop-shadow-lg sm:text-4xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* The parcel */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="parcel invisible relative h-28 w-36 rounded-2xl bg-walnut shadow-pop sm:h-32 sm:w-44">
            <div className="absolute inset-x-0 top-0 h-7 rounded-t-2xl bg-walnut-deep" />
            <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-brand-yellow/90" />
            <div className="absolute -top-1 left-1/2 h-9 w-4 -translate-x-1/2 rounded-b-sm bg-brand-yellow" />
            <span className="display absolute bottom-2 left-3 text-[10px] tracking-widest text-antique/80">
              ARMAC MART.
            </span>
            <span className="absolute right-2.5 bottom-2 text-base">🌍</span>
          </div>
        </div>

        {/* Road + courier + store door */}
        <div className="pointer-events-none absolute inset-0">
          <div className="road-line absolute inset-x-[6%] bottom-[24%] border-t-2 border-dashed border-antique/25" />

          <div className="courier absolute bottom-[24.5%] left-1/2 -translate-x-1/2">
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="motion-line absolute -left-14 h-0.5 w-10 origin-right rounded bg-antique/60"
                  style={{ top: `${18 + i * 14}px` }}
                />
              ))}
              <span className="inline-block text-6xl drop-shadow-xl sm:text-7xl" style={{ transform: "scaleX(-1)" }}>
                🛵
              </span>
              <div className="courier-parcel invisible absolute -top-3 left-1/2 h-9 w-11 rounded-lg bg-walnut shadow-md">
                <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-brand-yellow/90" />
              </div>
            </div>
          </div>

          {/* Store arch, echoing the interior niches */}
          <div className="store-door invisible absolute right-[8%] bottom-[24%]">
            <div className="relative flex h-48 w-32 items-end justify-center rounded-t-full bg-gradient-to-b from-[#8a5a40] to-walnut-deep pb-4 shadow-pop sm:h-56 sm:w-36">
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-t-full border border-antique/15" />
              <span className="display text-xs tracking-widest text-brand-yellow">ARMAC MART.</span>
              <div className="led-strip absolute inset-x-4 bottom-2 h-0.5 rounded-full" />
            </div>
            {["-top-4 -left-6", "-top-8 left-1/2", "-top-4 -right-6", "top-1/3 -left-10", "top-1/3 -right-10", "-top-10 -right-2"].map(
              (pos, i) => (
                <span key={i} className={`burst absolute ${pos} text-xl text-brand-yellow`}>
                  ✦
                </span>
              )
            )}
          </div>
        </div>

        {/* Chapter headlines — stacked, one visible at a time */}
        <div className="st-h0 pointer-events-none absolute inset-0 flex items-start justify-center pt-[21vh]">
          <h2 className="display text-center text-[clamp(2rem,6vw,4.2rem)]">
            <Words text="From every corner" />
            <br />
            <Words text="of the world." className="text-brand-yellow" />
          </h2>
        </div>
        <div className="st-h1 invisible pointer-events-none absolute inset-0 flex items-start justify-center pt-[19vh]">
          <h2 className="display text-center text-[clamp(2rem,6vw,4.2rem)]">
            <Words text="Packed with love" />
            <br />
            <Words text="in Dehiwala." className="text-brand-yellow" />
          </h2>
        </div>
        <div className="st-h2 invisible pointer-events-none absolute inset-0 flex items-start justify-center pt-[19vh]">
          <h2 className="display text-center text-[clamp(2rem,6vw,4.2rem)]">
            <Words text="Racing to" />
            <br />
            <Words text="your doorstep." className="text-brand-yellow" />
          </h2>
        </div>
        <div className="st-h3 invisible absolute inset-0 flex flex-col items-center justify-start pt-[19vh]">
          <h2 className="display pointer-events-none text-center text-[clamp(2rem,6vw,4.2rem)]">
            <Words text="Taste the" />
            <br />
            <Words text="whole world." className="text-brand-yellow" />
          </h2>
          <a href="#categories" className="st-cta btn-pill invisible mt-7 bg-brand-yellow px-8 py-4 text-sm text-cocoa-ink shadow-pop">
            <span className="dot" /> Start Shopping
          </a>
        </div>

        {/* Video-player scrubber */}
        <div className="absolute inset-x-0 bottom-6 flex items-center gap-4 px-6 sm:bottom-8 sm:px-10">
          <span className="story-hint display flex items-center gap-2 text-[11px] tracking-widest whitespace-nowrap text-antique/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-[8px] text-cocoa-ink">
              ▶
            </span>
            Scroll to play
          </span>
          <div className="relative h-1.5 flex-1 overflow-visible rounded-full bg-antique/15">
            <div className="story-fill absolute inset-0 origin-left scale-x-0 rounded-full bg-brand-yellow" />
            {[0, 23, 47, 72].map((pct) => (
              <span
                key={pct}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cocoa-ink bg-antique/70"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>
          <span className="display text-[11px] tracking-widest text-antique/50">00:05</span>
        </div>
      </div>
    </section>
  );
}
