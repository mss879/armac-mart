"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

export function Toast() {
  const { toast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2.5 rounded-lg bg-walnut px-4 py-2.5 text-xs font-semibold text-parchment shadow-md border border-white/10">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-[10px] font-bold text-white">
          ✓
        </span>
        {toast.message}
      </div>
    </div>
  );
}
