/* ---------------------------------------------------------------------------
 * ARMAC MART — store content
 *
 * PLACEHOLDER DATA. Every string, price and claim below is sample copy written
 * to give the layout realistic shape. Replace it with the real shop's details
 * before this goes anywhere near a customer. Nothing here is a measured fact.
 * ------------------------------------------------------------------------- */

import type { ComponentType, SVGProps } from "react";
import {
  Apple,
  Baby,
  BatteryCharging,
  Beef,
  Coffee,
  Cookie,
  Croissant,
  CupSoda,
  Gift,
  Headphones,
  Lightbulb,
  Milk,
  Newspaper,
  NotebookPen,
  PartyPopper,
  PawPrint,
  Pill,
  Sandwich,
  Snowflake,
  Sofa,
  SprayCan,
  Smartphone,
  ToyBrick,
  Wheat,
} from "lucide-react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type Category = {
  name: string;
  slug: string;
  icon: IconType;
  blurb: string;
  group: "Food & drink" | "Home & living" | "Tech & everyday";
};

export const categories: Category[] = [
  // ---- Food & drink ----
  {
    name: "Fresh Produce",
    slug: "fresh-produce",
    icon: Apple,
    blurb: "Loose fruit, salad, herbs",
    group: "Food & drink",
  },
  {
    name: "Bakery",
    slug: "bakery",
    icon: Croissant,
    blurb: "Baked on site each morning",
    group: "Food & drink",
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    icon: Milk,
    blurb: "Milk, butter, cheese, eggs",
    group: "Food & drink",
  },
  {
    name: "Meat & Seafood",
    slug: "meat-seafood",
    icon: Beef,
    blurb: "Counter cuts and cold packs",
    group: "Food & drink",
  },
  {
    name: "Frozen",
    slug: "frozen",
    icon: Snowflake,
    blurb: "Veg, chips, ice cream",
    group: "Food & drink",
  },
  {
    name: "Pantry & Dry Goods",
    slug: "pantry",
    icon: Wheat,
    blurb: "Pasta, rice, tins, oils",
    group: "Food & drink",
  },
  {
    name: "Snacks & Sweets",
    slug: "snacks-sweets",
    icon: Cookie,
    blurb: "Crisps, chocolate, biscuits",
    group: "Food & drink",
  },
  {
    name: "Drinks",
    slug: "drinks",
    icon: CupSoda,
    blurb: "Juice, fizzy, water, energy",
    group: "Food & drink",
  },
  {
    name: "Coffee & Tea",
    slug: "coffee-tea",
    icon: Coffee,
    blurb: "Beans, ground, loose leaf",
    group: "Food & drink",
  },
  {
    name: "Ready Meals",
    slug: "ready-meals",
    icon: Sandwich,
    blurb: "Sandwiches, hot food, salads",
    group: "Food & drink",
  },
  // ---- Home & living ----
  {
    name: "Household & Cleaning",
    slug: "household",
    icon: SprayCan,
    blurb: "Laundry, surface, bin bags",
    group: "Home & living",
  },
  {
    name: "Health & Beauty",
    slug: "health-beauty",
    icon: Pill,
    blurb: "Pharmacy basics, toiletries",
    group: "Home & living",
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
    icon: Baby,
    blurb: "Nappies, wipes, formula",
    group: "Home & living",
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    icon: PawPrint,
    blurb: "Food, treats, litter",
    group: "Home & living",
  },
  {
    name: "Home & Hardware",
    slug: "home-hardware",
    icon: Lightbulb,
    blurb: "Bulbs, tape, batteries, tools",
    group: "Home & living",
  },

  // ---- Tech & everyday ----
  {
    name: "Electronics",
    slug: "electronics",
    icon: Headphones,
    blurb: "Earbuds, speakers, cables",
    group: "Tech & everyday",
  },
  {
    name: "Mobile & Charging",
    slug: "mobile-charging",
    icon: BatteryCharging,
    blurb: "Chargers, power banks, SIMs",
    group: "Tech & everyday",
  },
  {
    name: "Stationery & Office",
    slug: "stationery",
    icon: NotebookPen,
    blurb: "Pens, pads, envelopes",
    group: "Tech & everyday",
  },
  {
    name: "News & Magazines",
    slug: "news-magazines",
    icon: Newspaper,
    blurb: "Daily papers, weeklies",
    group: "Tech & everyday",
  },
  {
    name: "Gifting & Cards",
    slug: "gifting",
    icon: Gift,
    blurb: "Cards, wrap, last-minute gifts",
    group: "Tech & everyday",
  },
  {
    name: "Party & Celebrations",
    slug: "party",
    icon: PartyPopper,
    blurb: "Candles, balloons, banners",
    group: "Tech & everyday",
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    icon: ToyBrick,
    blurb: "Pocket money to birthday",
    group: "Tech & everyday",
  },
];

export const categoryGroups = [
  "Food & drink",
  "Home & living",
  "Tech & everyday",
] as const;

/* -------------------------------------------------------------------------
 * Homepage browse grid.
 *
 * One flat grid rather than three grouped tables: the food aisles individually,
 * then the home and tech ranges rolled into a single tile each. The full
 * twenty-two-aisle breakdown still lives in the footer sitemap, so nothing is
 * lost — the homepage just stops asking the visitor to read three tables.
 * ----------------------------------------------------------------------- */

export const homepageCategories: Category[] = [
  ...categories.filter((c) => c.group === "Food & drink"),
  {
    name: "Home & Living",
    slug: "home-living",
    icon: Sofa,
    blurb: "Cleaning, health, baby, pets",
    group: "Home & living",
  },
  {
    name: "Tech & Everyday",
    slug: "tech",
    icon: Smartphone,
    blurb: "Chargers, gadgets, gifting",
    group: "Tech & everyday",
  },
];

/* -------------------------------------------------------------------------
 * Featured products
 *
 * `image` points at /public/products/<slug>.jpg. Those files do not exist yet
 * — drop real product photography in and the cards pick it up automatically.
 * Until then each card falls back to a tinted initial tile.
 * ----------------------------------------------------------------------- */

export type Product = {
  name: string;
  slug: string;
  category: string;
  price: string;
  /** Pre-discount price. When set, the card shows was → now plus a saving. */
  wasPrice?: string;
  badge?: string;
  note: string;
  image?: string;
};

export const featured: Product[] = [
  {
    name: "Sourdough Bloomer",
    slug: "sourdough-bloomer",
    category: "Bakery",
    price: "£2.40",
    badge: "Baked today",
    note: "Out of the oven before seven.",
  },
  {
    name: "Free-Range Eggs, 6",
    slug: "free-range-eggs",
    category: "Dairy & Eggs",
    price: "£1.95",
    note: "From a farm two counties over.",
  },
  {
    name: "Whole Milk, 2L",
    slug: "whole-milk-2l",
    category: "Dairy & Eggs",
    price: "£1.65",
    note: "The one you actually came in for.",
  },
  {
    name: "Colombian Ground Coffee",
    slug: "colombian-coffee",
    category: "Coffee & Tea",
    price: "£4.50",
    wasPrice: "£5.60",
    badge: "Shelf favourite",
    note: "227g, medium roast, resealable.",
  },
  {
    name: "USB-C Fast Charger, 30W",
    slug: "usb-c-charger",
    category: "Mobile & Charging",
    price: "£12.99",
    wasPrice: "£16.99",
    note: "For the day the cable gives up.",
  },
  {
    name: "AA Batteries, 8 Pack",
    slug: "aa-batteries",
    category: "Home & Hardware",
    price: "£5.25",
    note: "Alkaline, five-year shelf life.",
  },
  {
    name: "Blood Orange Juice, 1L",
    slug: "blood-orange-juice",
    category: "Drinks",
    price: "£2.85",
    badge: "New in",
    note: "Pressed, not from concentrate.",
  },
  {
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    category: "Electronics",
    price: "£24.99",
    wasPrice: "£34.99",
    note: "Charging case, 18 hours total.",
  },
];

/* -------------------------------------------------------------------------
 * Customer reviews — PLACEHOLDER
 * Written as sample copy. Swap for real, attributable reviews before launch;
 * do not publish invented testimonials.
 * ----------------------------------------------------------------------- */

export type Review = {
  quote: string;
  name: string;
  detail: string;
};

export const reviews: Review[] = [
  {
    quote:
      "I came in for milk and left with dinner, a birthday card and a phone cable. That is either very good shopkeeping or a personal failing.",
    name: "Priya Raman",
    detail: "Shops here most weekday evenings",
  },
  {
    quote:
      "The bread is genuinely baked on site. You can tell because the whole shop smells like it from about half six.",
    name: "Tomasz Wójcik",
    detail: "Lives two streets away",
  },
  {
    quote:
      "Being able to buy a charger at nine at night without a bus journey has saved me more than once.",
    name: "Bev Adeyemi",
    detail: "Click & collect regular",
  },
];

/* -------------------------------------------------------------------------
 * Store details — PLACEHOLDER
 * Replace opening hours, delivery terms and address with the real ones.
 * ----------------------------------------------------------------------- */

export const store = {
  name: "ARMAC MART",
  tagline: "Your corner shop, properly stocked.",
  hours: "Open 7am – 11pm, seven days",
  deliveryThreshold: "£25",
  collectTime: "30 minutes",
  address: "Replace with your street address",
  phone: "Replace with your phone number",
  email: "hello@example.com",
};

export const tickerClaims = [
  "Open 7am – 11pm",
  "Free local delivery over £25",
  "Fresh bread baked on site",
  `${categories.length} aisles, one stop`,
  "Click & collect in 30 minutes",
  "Card, cash & contactless",
];
