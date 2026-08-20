"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const COLORS = ["#2e3094", "#eb1c24", "#ffc20f", "#ffd54d", "#f0f2f9"];

/** One-shot GSAP confetti burst for the order-success screen. */
export function Confetti() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;
      const pieces: HTMLSpanElement[] = [];
      for (let i = 0; i < 70; i++) {
        const el = document.createElement("span");
        const size = 6 + Math.random() * 8;
        el.style.cssText = `position:absolute;top:-20px;left:${Math.random() * 100}%;width:${size}px;height:${size * (Math.random() > 0.5 ? 1 : 2.2)}px;background:${COLORS[i % COLORS.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};will-change:transform;`;
        container.appendChild(el);
        pieces.push(el);
      }
      pieces.forEach((el, i) => {
        gsap.to(el, {
          y: window.innerHeight + 60,
          x: `+=${(Math.random() - 0.5) * 240}`,
          rotation: Math.random() * 720 - 360,
          duration: 2.4 + Math.random() * 1.8,
          delay: (i % 12) * 0.06,
          ease: "power1.in",
          onComplete: () => el.remove(),
        });
      });
    },
    { scope: ref }
  );

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden />;
}
