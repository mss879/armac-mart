"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { productId: string; qty: number };

type CartState = { lines: CartLine[] };

type CartAction =
  | { type: "add"; productId: string; qty?: number }
  | { type: "setQty"; productId: string; qty: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId ? { ...l, qty: Math.min(l.qty + qty, 99) } : l
          ),
        };
      }
      return { lines: [...state.lines, { productId: action.productId, qty }] };
    }
    case "setQty": {
      if (action.qty <= 0) {
        return { lines: state.lines.filter((l) => l.productId !== action.productId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, qty: Math.min(action.qty, 99) } : l
        ),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "clear":
      return { lines: [] };
    case "hydrate":
      return { lines: action.lines };
  }
}

export type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  toast: { message: string; key: number } | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "armac-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const lines = (JSON.parse(raw) as CartLine[]).filter((l) => getProduct(l.productId));
        dispatch({ type: "hydrate", lines });
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // storage full / private mode — cart still works in memory
    }
  }, [state.lines, hydrated]);

  const add = useCallback((productId: string, qty?: number) => {
    dispatch({ type: "add", productId, qty });
    const p = getProduct(productId);
    if (p) {
      setToast({ message: `${p.emoji} ${p.name} added to cart`, key: Date.now() });
    }
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    dispatch({ type: "setQty", productId, qty });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: "remove", productId });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const items = useMemo<CartItem[]>(
    () =>
      state.lines
        .map((l) => ({ product: getProduct(l.productId)!, qty: l.qty }))
        .filter((i) => i.product),
    [state.lines]
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.product.price * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, add, setQty, remove, clear, toast }),
    [items, count, subtotal, add, setQty, remove, clear, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
