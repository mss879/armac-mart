import Image from "next/image";
import Link from "next/link";

const SHOP_LINKS_1 = [
  { label: "Sweets & Chocolates", href: "/shop?category=sweets" },
  { label: "Biscuits & Cookies", href: "/shop?category=biscuits" },
  { label: "Cold Drinks & Sodas", href: "/shop?category=drinks" },
  { label: "Health & Fitness", href: "/shop?category=health-fitness" },
  { label: "Cosmetics & Skincare", href: "/shop?category=cosmetics" },
];

const SHOP_LINKS_2 = [
  { label: "Crisps & Savoury Snacks", href: "/shop?category=crisps" },
  { label: "Baby Care Products", href: "/shop?category=baby" },
  { label: "Cupboard & Pantry Staples", href: "/shop?category=cupboard" },
  { label: "Dairy & Frozen Treats", href: "/shop?category=frozen" },
  { label: "Viral Drops (Limited Time)", href: "/shop?category=viral" },
];

export function Footer() {
  return (
    <footer className="bg-walnut-deep text-parchment border-t border-white/10">
      <div className="mx-auto max-w-[1536px] px-4 pt-12 pb-8 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="Armac Mart logo"
                width={40}
                height={40}
                className="rounded-md border border-white/20 shadow-xs"
              />
              <div>
                <span className="display text-xl leading-none text-white tracking-tight font-extrabold">
                  ARMAC MART
                </span>
                <span className="block text-[9px] font-bold tracking-widest text-parchment/70 uppercase mt-0.5">
                  Convenience &amp; Global Imports
                </span>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-parchment/70 font-normal">
              Dehiwala&apos;s premier neighbourhood convenience superstore. 10 fully stocked aisles of authentic imported chocolates, drinks, crisps, baby essentials &amp; pantry staples delivered in 30 minutes.
            </p>
            <div className="mt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-bold text-parchment hover:bg-white hover:text-cocoa-ink transition-colors border border-white/15"
              >
                <span>🛍️</span> Open Full Shop Catalog →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="display mb-3 text-xs tracking-wider text-parchment uppercase font-bold">Aisles (1-5)</h4>
            <ul className="space-y-2 text-xs text-parchment/75">
              {SHOP_LINKS_1.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="display mb-3 text-xs tracking-wider text-parchment uppercase font-bold">Aisles (6-10)</h4>
            <ul className="space-y-2 text-xs text-parchment/75">
              {SHOP_LINKS_2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="display mb-3 text-xs tracking-wider text-parchment uppercase font-bold">Store &amp; Location</h4>
            <ul className="space-y-2 text-xs text-parchment/75">
              <li>📍 Armac Mart, Kalubowila, Dehiwala, Sri Lanka</li>
              <li>🕗 Open Daily: 8:00 AM – 10:00 PM</li>
              <li>📞 +94 77 123 4567</li>
              <li>✉️ orders@armacmart.lk</li>
              <li className="text-brand-amber-soft font-semibold pt-1">🚚 Free islandwide delivery over Rs 7,500</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-[11px] text-parchment/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Armac Mart. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            {["VISA", "MASTERCARD", "AMEX", "COD", "KOKO"].map((p) => (
              <span key={p} className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-bold tracking-wider text-[9px] text-parchment/80">
                {p}
              </span>
            ))}
          </div>
          <span>
            Dehiwala • Colombo • Sri Lanka
          </span>
        </div>
      </div>
    </footer>
  );
}
