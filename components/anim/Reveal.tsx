"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children with this stagger instead of the wrapper */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
  scale?: boolean;
};

/** Fades content up as it scrolls into view. */
export function Reveal({
  children,
  className,
  stagger,
  y = 48,
  delay = 0,
  start = "top 86%",
  scale = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger !== undefined ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        opacity: 0,
        ...(scale ? { scale: 0.92, transformOrigin: "50% 80%" } : {}),
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
        clearProps: "transform,opacity",
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Pops in with a springy overshoot — for badges and stickers. */
export function PopIn({
  children,
  className,
  delay = 0,
  start = "top 88%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el, {
        scale: 0,
        rotate: -12,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Section grows to full size as it scrolls in — scrubbed to scroll position. */
export function ScrollScale({
  children,
  className,
  from = 0.92,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { scale: from, y: 56, opacity: 0.5, transformOrigin: "50% 100%" },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 96%",
            end: "top 52%",
            scrub: 0.7,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Headline words rise in one by one, scrubbed to the scroll position. */
export function ScrubWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <span className="sw inline-block will-change-transform">{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/** Slow vertical drift while scrolling — for doodles and floating props. */
export function Parallax({
  children,
  className,
  speed = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
