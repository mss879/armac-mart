/* Ft3 · Index-style category list — knobs: columns=4, heads=small caps, bullet=hairline
 *
 * Ft3 is normally the AI-footer fingerprint, but it is the honest shape here:
 * a twenty-aisle shop has a genuine sitemap. The tell is avoided by dropping
 * the social-icon row and the tiny copyright tail, and by using real store
 * departments instead of Product / Company / Resources / Legal.
 */

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { categories, store } from "@/lib/catalog";

const SHOP_LINKS = [
  { label: "About the shop", href: "/about" },
  { label: "Delivery areas", href: "/delivery" },
  { label: "Click & collect", href: "/collect" },
  { label: "Weekly offers", href: "/offers" },
  { label: "Work with us", href: "/careers" },
];

const HELP_LINKS = [
  { label: "Returns & refunds", href: "/returns" },
  { label: "Allergen information", href: "/allergens" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy notice", href: "/privacy" },
  { label: "Contact us", href: "/contact" },
];

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="border-b border-paper/20 pb-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.16em] text-tan">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function Item({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.875rem] text-paper/75 transition-colors duration-[140ms] ease-out hover:text-paper"
      >
        {label}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  const food = categories.filter((c) => c.group === "Food & drink");
  const rest = categories.filter((c) => c.group !== "Food & drink");

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8 border-b border-paper/20 pb-10">
          <div>
            <p className="font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.02em]">
              Armac <span className="text-tan">Mart</span>
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-paper/70">
              {store.tagline} Food, home and everyday tech on one high street.
            </p>
          </div>

          <dl className="grid gap-3 text-[0.875rem] text-paper/75">
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-tan" aria-hidden="true" />
              <dt className="sr-only">Opening hours</dt>
              <dd>{store.hours}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-tan" aria-hidden="true" />
              <dt className="sr-only">Address</dt>
              <dd>{store.address}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-tan" aria-hidden="true" />
              <dt className="sr-only">Telephone</dt>
              <dd>{store.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Food & drink">
            {food.map((c) => (
              <Item
                key={c.slug}
                href={`/category/${c.slug}`}
                label={c.name}
              />
            ))}
          </Column>

          <Column title="Home, tech & everyday">
            {rest.map((c) => (
              <Item
                key={c.slug}
                href={`/category/${c.slug}`}
                label={c.name}
              />
            ))}
          </Column>

          <Column title="The shop">
            {SHOP_LINKS.map((l) => (
              <Item key={l.href} href={l.href} label={l.label} />
            ))}
          </Column>

          <Column title="Help">
            {HELP_LINKS.map((l) => (
              <Item key={l.href} href={l.href} label={l.label} />
            ))}
            <li className="pt-2">
              <Link
                href="/instagram"
                className="text-[0.875rem] text-paper/75 underline underline-offset-4 transition-colors duration-[140ms] ease-out hover:text-paper"
              >
                Instagram
              </Link>
              <span aria-hidden="true" className="px-2 text-paper/30">
                /
              </span>
              <Link
                href="/facebook"
                className="text-[0.875rem] text-paper/75 underline underline-offset-4 transition-colors duration-[140ms] ease-out hover:text-paper"
              >
                Facebook
              </Link>
            </li>
          </Column>
        </div>

        <p className="mt-14 border-t border-paper/20 pt-6 text-[0.8rem] leading-relaxed text-paper/50">
          Prices and availability are confirmed at checkout and can change while
          stock moves.{" "}
          <span className="whitespace-nowrap">
            &copy; {new Date().getFullYear()} {store.name}.
          </span>
        </p>
      </div>
    </footer>
  );
}
