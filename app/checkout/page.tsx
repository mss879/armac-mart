"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import {
  formatLKR,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_FEE,
  EXPRESS_DELIVERY_FEE,
  PROMO_CODES,
} from "@/lib/format";
import { Confetti } from "@/components/checkout/Confetti";

type DeliveryMethod = "standard" | "express" | "pickup";
type PaymentMethod = "card" | "cod" | "bank";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  delivery: DeliveryMethod;
  payment: PaymentMethod;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "Dehiwala",
  notes: "",
  delivery: "standard",
  payment: "card",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

const CITIES = [
  "Dehiwala", "Kalubowila", "Mount Lavinia", "Wellawatte", "Colombo 01-15",
  "Nugegoda", "Rathmalana", "Moratuwa", "Battaramulla", "Other (islandwide)",
];

const STEPS = ["Details", "Payment", "Review"] as const;

function StepHeader({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const stepNumber = i + 1;
        const active = step === stepNumber;
        const done = step > stepNumber;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`display flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                  done
                    ? "bg-walnut text-white"
                    : active
                      ? "bg-brand-amber text-white shadow-xs"
                      : "bg-antique text-beige border border-mist"
                }`}
              >
                {done ? "✓" : stepNumber}
              </span>
              <span
                className={`display hidden text-xs font-bold tracking-wider sm:block ${
                  active ? "text-cocoa-ink" : "text-beige"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="h-px w-8 bg-mist sm:w-12" />}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold tracking-wider text-cocoa-ink uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-brand-amber">{error}</span>}
    </label>
  );
}

function OptionCard({
  selected,
  onSelect,
  title,
  subtitle,
  trailing,
  emoji,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
  trailing?: string;
  emoji: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3.5 rounded-md border p-3.5 text-left transition-all cursor-pointer ${
        selected
          ? "border-walnut bg-antique/60 shadow-xs"
          : "border-mist bg-white hover:border-mist-dark"
      }`}
    >
      <span className="text-xl">{emoji}</span>
      <span className="flex-1">
        <span className="block text-xs font-bold text-cocoa-ink">{title}</span>
        <span className="block text-[11px] text-beige">{subtitle}</span>
      </span>
      {trailing && <span className="display text-xs font-bold text-cocoa-ink">{trailing}</span>}
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          selected ? "border-walnut bg-walnut" : "border-mist-dark"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
    </button>
  );
}

export default function CheckoutPage() {
  const { items, count, subtotal, clear } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [promo, setPromo] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("armac-promo");
    if (saved && PROMO_CODES[saved]) setPromo(saved);
  }, []);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const discountRate = promo ? PROMO_CODES[promo] : 0;
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee =
    form.delivery === "pickup"
      ? 0
      : form.delivery === "express"
        ? EXPRESS_DELIVERY_FEE
        : subtotal >= FREE_DELIVERY_THRESHOLD
          ? 0
          : STANDARD_DELIVERY_FEE;
  const total = subtotal - discount + deliveryFee;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^(\+94|0)\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid Sri Lankan number, e.g. 077 123 4567";
    if (!/.+@.+\..+/.test(form.email)) e.email = "Valid email is required";
    if (form.delivery !== "pickup" && !form.address.trim())
      e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    if (form.payment !== "card") return true;
    const e: typeof errors = {};
    if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Card number should be 16 digits";
    if (!form.cardName.trim()) e.cardName = "Name on card is required";
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cardCvc)) e.cardCvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrderNo(`ARM-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      clear();
      sessionStorage.removeItem("armac-promo");
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  /* ---- Success screen ---- */
  if (orderNo) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Confetti />
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-walnut text-3xl text-white shadow-xs">
          ✓
        </span>
        <h1 className="display mt-6 text-3xl sm:text-4xl text-cocoa-ink">
          Order Placed Successfully
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-beige">
          Your items are being packed at our Dehiwala superstore. Confirmation details sent to your email.
        </p>
        <div className="mt-6 rounded-lg bg-white p-6 border border-mist shadow-xs text-left">
          <span className="text-[10px] font-bold tracking-widest text-beige uppercase">Order Tracking ID</span>
          <span className="display mt-1 block text-2xl text-cocoa-ink">{orderNo}</span>
          <div className="mt-4 border-t border-mist pt-4 text-xs text-beige">
            {form.delivery === "pickup" ? (
              <>🏪 Ready for express collection at Armac Mart, Kalubowila in 15 minutes.</>
            ) : form.delivery === "express" ? (
              <>⚡ 3-Hour Express Dispatch to {form.city}.</>
            ) : (
              <>🚚 Standard islandwide dispatch to {form.city} within 24–48 hours.</>
            )}
          </div>
        </div>
        <Link href="/" className="btn-primary mt-6 text-xs sm:text-sm">
          Return to Superstore
        </Link>
      </div>
    );
  }

  /* ---- Empty guard ---- */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="display mt-4 text-2xl text-cocoa-ink">Nothing to check out yet</h1>
        <p className="mt-2 text-xs text-beige">Your basket is currently empty.</p>
        <Link href="/#categories" className="btn-primary mt-6 text-xs">
          Browse Aisles
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 xl:px-12">
      <h1 className="display text-center text-3xl sm:text-4xl text-cocoa-ink">
        Secure Checkout
      </h1>
      <div className="mt-6">
        <StepHeader step={step} />
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg bg-white p-6 border border-mist shadow-xs">
          {/* ---- STEP 1: details ---- */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="display text-lg font-bold text-cocoa-ink">Customer &amp; Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Ayesha Perera"
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="077 123 4567"
                    inputMode="tel"
                  />
                </Field>
              </div>
              <Field label="Email" error={errors.email}>
                <input
                  className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@email.com"
                  inputMode="email"
                />
              </Field>

              <div>
                <span className="mb-2 block text-xs font-bold tracking-wider text-cocoa-ink uppercase">
                  Delivery method
                </span>
                <div className="space-y-2">
                  <OptionCard
                    emoji="🚚"
                    selected={form.delivery === "standard"}
                    onSelect={() => set("delivery", "standard")}
                    title="Standard delivery"
                    subtitle="24–48 hours, islandwide"
                    trailing={subtotal >= FREE_DELIVERY_THRESHOLD ? "FREE" : formatLKR(STANDARD_DELIVERY_FEE)}
                  />
                  <OptionCard
                    emoji="⚡"
                    selected={form.delivery === "express"}
                    onSelect={() => set("delivery", "express")}
                    title="Express (Colombo area)"
                    subtitle="At your door within ~3 hours"
                    trailing={formatLKR(EXPRESS_DELIVERY_FEE)}
                  />
                  <OptionCard
                    emoji="🏪"
                    selected={form.delivery === "pickup"}
                    onSelect={() => set("delivery", "pickup")}
                    title="Pick up in store"
                    subtitle="Armac Mart, Dehiwala, Kalubowila"
                    trailing="FREE"
                  />
                </div>
              </div>

              {form.delivery !== "pickup" && (
                <>
                  <Field label="Delivery address" error={errors.address}>
                    <input
                      className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      placeholder="No. 12, Galle Road"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="City / area">
                      <select
                        className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink bg-white focus:border-walnut"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                      >
                        {CITIES.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Notes for the rider (optional)">
                      <input
                        className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut"
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Ring doorbell on arrival"
                      />
                    </Field>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ---- STEP 2: payment ---- */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="display text-lg font-bold text-cocoa-ink">Select Payment Method</h2>
              <div className="space-y-2">
                <OptionCard
                  emoji="💳"
                  selected={form.payment === "card"}
                  onSelect={() => set("payment", "card")}
                  title="Credit / debit card"
                  subtitle="Visa, Mastercard, Amex"
                />
                <OptionCard
                  emoji="💵"
                  selected={form.payment === "cod"}
                  onSelect={() => set("payment", "cod")}
                  title="Cash on delivery"
                  subtitle="Pay the rider upon arrival"
                />
                <OptionCard
                  emoji="🏦"
                  selected={form.payment === "bank"}
                  onSelect={() => set("payment", "bank")}
                  title="Bank transfer"
                  subtitle="Details provided after confirmation"
                />
              </div>

              {form.payment === "card" && (
                <div className="space-y-3 rounded-md bg-antique/60 p-4 border border-mist mt-3">
                  <Field label="Card number" error={errors.cardNumber}>
                    <input
                      className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut bg-white"
                      value={form.cardNumber}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        set("cardNumber", digits.replace(/(\d{4})(?=\d)/g, "$1 "));
                      }}
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                    />
                  </Field>
                  <Field label="Name on card" error={errors.cardName}>
                    <input
                      className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut bg-white"
                      value={form.cardName}
                      onChange={(e) => set("cardName", e.target.value)}
                      placeholder="A PERERA"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" error={errors.cardExpiry}>
                      <input
                        className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut bg-white"
                        value={form.cardExpiry}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                          set("cardExpiry", digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                        }}
                        placeholder="MM/YY"
                        inputMode="numeric"
                      />
                    </Field>
                    <Field label="CVC" error={errors.cardCvc}>
                      <input
                        className="h-9 w-full rounded-md border border-mist px-3 text-xs text-cocoa-ink placeholder:text-beige/60 focus:border-walnut bg-white"
                        value={form.cardCvc}
                        onChange={(e) => set("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        inputMode="numeric"
                        type="password"
                      />
                    </Field>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---- STEP 3: review ---- */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="display text-lg font-bold text-cocoa-ink">Order Confirmation &amp; Review</h2>

              <div className="space-y-2">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3 rounded-md bg-antique/60 px-3.5 py-2.5 border border-mist/60">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base bg-white border border-mist/60 overflow-hidden">
                      {product.image ? (
                        <img src={`${product.image}?v=2`} alt={product.name} className="h-6 w-6 object-contain" />
                      ) : (
                        product.emoji
                      )}
                    </span>
                    <span className="flex-1 text-xs font-semibold text-cocoa-ink">
                      {product.name} <span className="text-beige">× {qty}</span>
                    </span>
                    <span className="display text-xs font-bold text-cocoa-ink">{formatLKR(product.price * qty)}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="rounded-md border border-mist p-3.5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-beige uppercase">Deliver to</span>
                    <button onClick={() => setStep(1)} className="text-xs font-bold text-walnut underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs font-bold text-cocoa-ink">{form.name}</p>
                  <p className="text-xs text-beige">
                    {form.delivery === "pickup"
                      ? "Store pickup — Armac Mart, Kalubowila"
                      : `${form.address}, ${form.city}`}
                  </p>
                  <p className="text-xs text-beige">{form.phone}</p>
                </div>
                <div className="rounded-md border border-mist p-3.5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-beige uppercase">Payment Method</span>
                    <button onClick={() => setStep(2)} className="text-xs font-bold text-walnut underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs font-bold text-cocoa-ink">
                    {form.payment === "card"
                      ? `💳 Card ending ${form.cardNumber.replace(/\s/g, "").slice(-4) || "····"}`
                      : form.payment === "cod"
                        ? "💵 Cash on delivery"
                        : "🏦 Bank transfer"}
                  </p>
                  <p className="text-xs text-beige">
                    {form.delivery === "standard" && "🚚 Standard, 24–48h"}
                    {form.delivery === "express" && "⚡ Express, ~3h"}
                    {form.delivery === "pickup" && "🏪 Pickup, same day"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ---- Step controls ---- */}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-mist pt-5">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-secondary text-xs">
                ← Back
              </button>
            ) : (
              <Link href="/cart" className="btn-secondary text-xs">
                ← Cart
              </Link>
            )}
            {step < 3 ? (
              <button onClick={next} className="btn-primary text-xs">
                Continue →
              </button>
            ) : (
              <button
                onClick={placeOrder}
                disabled={placing}
                className="btn-primary text-xs disabled:opacity-60"
              >
                {placing ? "Processing Order…" : `Place Order · ${formatLKR(total)}`}
              </button>
            )}
          </div>
        </div>

        {/* ---- Sticky order summary ---- */}
        <aside className="rounded-lg bg-walnut-deep p-6 text-parchment border border-white/10 shadow-xs lg:sticky lg:top-28">
          <h2 className="display text-base font-bold text-white">Your Basket</h2>
          <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-2.5 text-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs bg-white/10 overflow-hidden">
                  {product.image ? (
                    <img src={`${product.image}?v=2`} alt={product.name} className="h-4 w-4 object-contain" />
                  ) : (
                    product.emoji
                  )}
                </span>
                <span className="flex-1 truncate text-parchment/80">
                  {product.name} × {qty}
                </span>
                <span className="font-bold text-white">{formatLKR(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <dl className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs">
            <div className="flex justify-between text-parchment/70">
              <dt>Subtotal ({count})</dt>
              <dd className="text-white">{formatLKR(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-amber-soft font-semibold">
                <dt>Promo {promo}</dt>
                <dd>− {formatLKR(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between text-parchment/70">
              <dt>Delivery</dt>
              <dd className="text-white">{deliveryFee === 0 ? "FREE" : formatLKR(deliveryFee)}</dd>
            </div>
            <div className="flex items-end justify-between border-t border-white/10 pt-3">
              <dt className="display text-sm font-bold text-white">Total</dt>
              <dd className="display text-xl font-bold text-white">{formatLKR(total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[10px] leading-relaxed text-parchment/50">
            Direct air-freight sealed imports. 100% genuine guaranteed.
          </p>
        </aside>
      </div>
    </div>
  );
}
