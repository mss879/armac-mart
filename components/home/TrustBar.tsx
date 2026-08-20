"use client";

const USPS = [
  {
    icon: "🚚",
    title: "Fast Islandwide Delivery",
    sub: "Free on orders over Rs 7,500. Same-day in Colombo.",
  },
  {
    icon: "✨",
    title: "100% Genuine Direct Imports",
    sub: "Sealed fresh from Switzerland, USA, UK, Japan & Korea.",
  },
  {
    icon: "🔒",
    title: "Secure Payment Options",
    sub: "Visa, Mastercard, Amex, Koko & Cash on Delivery.",
  },
  {
    icon: "🏪",
    title: "Dehiwala Physical Store",
    sub: "Open 7 days a week, 8:00 AM to 10:00 PM.",
  },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-[1536px] px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {USPS.map(({ icon, title, sub }, i) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-lg border border-mist/80 bg-white p-4 shadow-xs"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-antique text-lg text-walnut">
              {icon}
            </span>
            <div>
              <span className="display block text-xs sm:text-sm font-bold text-cocoa-ink">{title}</span>
              <span className="text-[11px] text-beige leading-tight block mt-0.5">{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
