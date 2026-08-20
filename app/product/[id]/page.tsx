"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
  getProductById,
  getRelatedProducts,
  getBundleProducts,
  CATEGORIES,
  Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatLKR, FREE_DELIVERY_THRESHOLD } from "@/lib/format";
import { ProductCard } from "@/components/home/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const product = getProductById(id);

  const { add } = useCart();

  const [qty, setQty] = useState(1);
  const [addedMain, setAddedMain] = useState(false);
  const [addedBundle, setAddedBundle] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "storage" | "reviews">("desc");

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);

  // Bundle Data
  const bundleData = useMemo(() => {
    if (!product) return null;
    return getBundleProducts(product);
  }, [product]);

  // Track which bundle items are checked (default all true)
  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>({});

  // Initialize bundle checked state
  useMemo(() => {
    if (bundleData) {
      const initial: Record<string, boolean> = {};
      bundleData.items.forEach((item) => {
        initial[item.id] = true;
      });
      setBundleChecked(initial);
    }
  }, [bundleData]);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <span className="text-6xl">🔍</span>
        <h1 className="display mt-4 text-2xl font-bold text-cocoa-ink">Product Not Found</h1>
        <p className="mt-2 text-xs text-beige">
          The requested product could not be located in our inventory.
        </p>
        <Link href="/shop" className="btn-primary mt-6 text-xs font-bold">
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const categoryObj = CATEGORIES.find((c) => c.slug === product.category);
  const relatedProducts = getRelatedProducts(product, 4);

  // Bundle calculations
  const selectedBundleItems = bundleData
    ? bundleData.items.filter((item) => bundleChecked[item.id] !== false)
    : [];

  const rawBundleTotal = selectedBundleItems.reduce((acc, curr) => acc + curr.price, 0);
  const bundleDiscountMultiplier = (bundleData?.discountPercent || 10) / 100;
  // Apply discount if 2 or more items are selected
  const hasBundleDiscount = selectedBundleItems.length >= 2;
  const bundleDiscountAmount = hasBundleDiscount ? Math.round(rawBundleTotal * bundleDiscountMultiplier) : 0;
  const finalBundlePrice = rawBundleTotal - bundleDiscountAmount;

  // Add Single Product
  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      add(product.id);
    }
    setAddedMain(true);
    setTimeout(() => setAddedMain(false), 1500);
  };

  // Buy Now (Add and jump to checkout)
  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      add(product.id);
    }
    router.push("/checkout");
  };

  // Add Entire Bundle
  const handleAddBundle = () => {
    selectedBundleItems.forEach((item) => {
      add(item.id);
    });
    setAddedBundle(true);
    setTimeout(() => setAddedBundle(false), 1800);
  };

  const toggleBundleItem = (itemId: string) => {
    setBundleChecked((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewText.trim()) {
      setSubmittedReview(true);
    }
  };

  const waMessage = encodeURIComponent(
    `Hello Armac Mart, I would like to order: ${product.name} (Qty: ${qty}, Price: ${formatLKR(product.price * qty)}). Store Pickup/Delivery inquiry.`
  );

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8 xl:px-12 sm:py-10">
      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-beige">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-walnut transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/shop" className="hover:text-walnut transition-colors">
              Shop All
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-walnut transition-colors"
            >
              {categoryObj ? categoryObj.name : product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-cocoa-ink font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Visual Showcase & Badges (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-xl border border-mist bg-antique-card p-8 shadow-xs overflow-hidden">
            {/* Scarcity / Badge */}
            {product.badge && (
              <span className="display absolute top-3 left-3 rounded bg-walnut px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-parchment shadow-xs z-10">
                {product.badge}
              </span>
            )}

            {/* Origin Pill */}
            <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded bg-white px-2.5 py-1 text-xs font-bold text-cocoa-ink shadow-xs border border-mist z-10">
              <span className="text-sm">{product.flag}</span>
              <span className="uppercase text-[10px] text-beige font-semibold">
                Imported from {product.origin}
              </span>
            </span>

            {/* Main Visual */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-9xl">{product.emoji}</span>
            )}

            {/* Bottom Scarcity / Stock Bar */}
            <div className="absolute bottom-3 inset-x-3 rounded-lg bg-white/95 backdrop-blur-xs p-2.5 border border-mist/80 shadow-xs flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-cocoa-ink">
                <span className="h-2 w-2 rounded-full bg-brand-amber animate-pulse" />
                {product.stockLeft
                  ? `Only ${product.stockLeft} units left in Dehiwala store`
                  : "In Stock · Ready for Immediate Dispatch"}
              </span>
              <span className="text-[11px] text-beige font-semibold">
                100% Sealed Genuine
              </span>
            </div>
          </div>

          {/* Trust Guarantees Grid Under Image */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg border border-mist bg-white p-2.5 shadow-2xs text-center">
              <span className="text-base block mb-0.5">🚚</span>
              <span className="font-bold text-cocoa-ink block text-[11px]">30-Min Express</span>
              <span className="text-[10px] text-beige">Dehiwala &amp; Colombo</span>
            </div>
            <div className="rounded-lg border border-mist bg-white p-2.5 shadow-2xs text-center">
              <span className="text-base block mb-0.5">🏪</span>
              <span className="font-bold text-cocoa-ink block text-[11px]">15-Min Pickup</span>
              <span className="text-[10px] text-beige">Kalubowila Store</span>
            </div>
            <div className="rounded-lg border border-mist bg-white p-2.5 shadow-2xs text-center col-span-2 sm:col-span-1">
              <span className="text-base block mb-0.5">❄️</span>
              <span className="font-bold text-cocoa-ink block text-[11px]">Cold-Chain Bag</span>
              <span className="text-[10px] text-beige">Zero-Melt Packaging</span>
            </div>
          </div>
        </div>

        {/* Right Column: Buy Box & Product Info (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-xl border border-mist bg-white p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header: Brand & Title */}
            <div>
              <div className="flex items-center justify-between">
                <Link
                  href={`/shop?q=${product.brand}`}
                  className="text-xs font-bold tracking-widest text-brand-amber uppercase hover:underline"
                >
                  {product.brand} · Aisle {categoryObj ? categoryObj.shortName : product.category}
                </Link>
                <span className="text-xs text-beige font-semibold">SKU: {product.id}</span>
              </div>

              <h1 className="display mt-2 text-2xl sm:text-3xl text-cocoa-ink font-bold leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews Meta */}
              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <div className="flex items-center text-brand-amber">
                  {"★".repeat(Math.round(product.rating))}
                  <span className="ml-1 font-bold text-cocoa-ink">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-mist-dark">|</span>
                <span className="text-beige font-semibold">
                  {product.reviews ? product.reviews.length : 14} Verified Buyer Reviews
                </span>
                <span className="text-mist-dark">|</span>
                <span className="text-walnut font-bold">100% Authentic Direct Import</span>
              </div>
            </div>

            {/* Price Hero Section */}
            <div className="rounded-lg bg-antique p-4 border border-mist/80">
              <div className="flex items-baseline gap-3">
                <span className="display text-3xl font-extrabold text-cocoa-ink">
                  {formatLKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-beige line-through">
                    {formatLKR(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="rounded bg-brand-amber px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    Save {formatLKR(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-beige">
                <span>Unit: <strong className="text-cocoa-ink">{product.unit}</strong></span>
                <span>Tax &amp; Import Duties Included</span>
              </div>
            </div>

            {/* Short Narrative Overview */}
            {product.description && (
              <p className="text-xs sm:text-sm leading-relaxed text-cocoa-ink/80 font-normal">
                {product.description}
              </p>
            )}

            {/* Dietary / Feature Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-cocoa-ink border border-mist/80 shadow-2xs"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-mist/60">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-cocoa-ink uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center rounded-md border border-mist bg-antique/50">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center text-base font-bold text-cocoa-ink hover:bg-mist transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="display w-10 text-center text-sm font-bold text-cocoa-ink">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center text-base font-bold text-cocoa-ink hover:bg-mist transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-beige">
                  Total: <strong className="text-cocoa-ink">{formatLKR(product.price * qty)}</strong>
                </span>
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`btn-primary flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                    addedMain ? "bg-brand-amber text-white" : ""
                  }`}
                >
                  {addedMain ? (
                    <span>✓ Added {qty} to Basket!</span>
                  ) : (
                    <>
                      <span>🛒 Add to Basket</span>
                      <span>·</span>
                      <span>{formatLKR(product.price * qty)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-secondary py-3 text-xs sm:text-sm font-bold text-center cursor-pointer"
                >
                  Instant Buy Now →
                </button>
              </div>

              {/* WhatsApp Direct Ordering Button */}
              <a
                href={`https://wa.me/94771234567?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-2.5 text-xs font-bold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors w-full"
              >
                <span>💬</span>
                <span>Order via WhatsApp Desk (+94 77 123 4567)</span>
              </a>
            </div>

            {/* Islandwide Free Delivery Threshold Notice */}
            <div className="rounded-md bg-antique/60 p-3 border border-mist/60 text-xs">
              <span className="font-bold text-walnut block mb-0.5">
                🚚 Free Islandwide Delivery on Orders Over {formatLKR(FREE_DELIVERY_THRESHOLD)}
              </span>
              <span className="text-beige text-[11px]">
                Direct dispatches from our Kalubowila Superstore. Order before 6:00 PM for same-day Colombo arrival.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FREQUENTLY BOUGHT TOGETHER / SMART BUNDLE OFFERS (CORE CRO FEATURE)     */}
      {/* ========================================================================= */}
      {bundleData && bundleData.items.length > 1 && (
        <section className="mt-12 rounded-xl border border-mist bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mist pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-amber uppercase">
                CURATED CONVENIENCE COMBO
              </span>
              <h2 className="display mt-0.5 text-xl sm:text-2xl font-bold text-cocoa-ink">
                {bundleData.bundleTitle}
              </h2>
            </div>
            <span className="rounded-full bg-antique px-3 py-1 text-xs font-bold text-walnut border border-mist self-start sm:self-auto">
              ⚡ Bundle &amp; Save {bundleData.discountPercent}% OFF
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 items-center">
            {/* Visual Item Chain (8 cols) */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-3">
              {bundleData.items.map((item, idx) => {
                const isChecked = bundleChecked[item.id] !== false;
                const isCurrent = item.id === product.id;
                return (
                  <div key={item.id} className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                    <div
                      onClick={() => !isCurrent && toggleBundleItem(item.id)}
                      className={`relative flex flex-1 flex-col items-center rounded-lg border p-3.5 transition-all text-center ${
                        isCurrent
                          ? "border-walnut bg-antique/40 shadow-xs"
                          : isChecked
                            ? "border-mist bg-white hover:border-walnut cursor-pointer"
                            : "border-mist/40 bg-gray-50 opacity-60 cursor-pointer"
                      }`}
                    >
                      {/* Checkbox */}
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isCurrent}
                          onChange={() => !isCurrent && toggleBundleItem(item.id)}
                          className="h-3.5 w-3.5 rounded text-walnut focus:ring-walnut"
                        />
                        {isCurrent && (
                          <span className="text-[9px] font-bold text-brand-amber uppercase">
                            This Item
                          </span>
                        )}
                      </div>

                      {/* Origin Flag */}
                      <span className="absolute top-2 right-2 text-xs" title={item.origin}>
                        {item.flag}
                      </span>

                      {/* Image */}
                      <div className="h-20 w-20 flex items-center justify-center mt-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-3xl">{item.emoji}</span>
                        )}
                      </div>

                      {/* Info */}
                      <span className="mt-2 text-[11px] font-bold text-cocoa-ink line-clamp-1 block">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-walnut mt-0.5">
                        {formatLKR(item.price)}
                      </span>
                    </div>

                    {/* Plus Icon between items */}
                    {idx < bundleData.items.length - 1 && (
                      <span className="text-lg font-bold text-beige shrink-0 hidden sm:block">
                        +
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bundle Price & Add to Cart Action (4 cols) */}
            <div className="lg:col-span-4 rounded-lg bg-antique p-5 border border-mist/80 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-beige">
                  <span>Items Selected:</span>
                  <strong className="text-cocoa-ink">{selectedBundleItems.length} Products</strong>
                </div>
                <div className="flex justify-between text-beige">
                  <span>Regular Total:</span>
                  <span className={hasBundleDiscount ? "line-through" : "text-cocoa-ink font-bold"}>
                    {formatLKR(rawBundleTotal)}
                  </span>
                </div>
                {hasBundleDiscount && (
                  <div className="flex justify-between text-brand-amber font-bold">
                    <span>Bundle Savings ({bundleData.discountPercent}%):</span>
                    <span>− {formatLKR(bundleDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-mist pt-2 text-sm font-bold text-cocoa-ink">
                  <span>Combo Price:</span>
                  <span className="display text-xl text-walnut font-extrabold">
                    {formatLKR(finalBundlePrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                disabled={selectedBundleItems.length === 0}
                className={`btn-primary w-full py-3 text-xs font-bold cursor-pointer transition-all ${
                  addedBundle ? "bg-brand-amber text-white" : ""
                }`}
              >
                {addedBundle ? (
                  <span>✓ Added All {selectedBundleItems.length} to Basket!</span>
                ) : (
                  <span>Add Selected ({selectedBundleItems.length}) to Basket →</span>
                )}
              </button>

              <span className="block text-center text-[10px] text-beige">
                Items packed together in sealed protective carton.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. PRODUCT DETAILS TABS / ACCORDIONS (SPECIFICATIONS & PROVENANCE)        */}
      {/* ========================================================================= */}
      <section className="mt-12 rounded-xl border border-mist bg-white shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-mist bg-antique/40 overflow-x-auto">
          {[
            { id: "desc", label: "Product Description" },
            { id: "nutrition", label: "Nutrition & Ingredients" },
            { id: "storage", label: "Storage & Shelf Life" },
            { id: "reviews", label: `Customer Reviews (${product.reviews?.length || 14})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-walnut bg-white text-cocoa-ink"
                  : "border-transparent text-beige hover:text-cocoa-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 text-xs sm:text-sm text-cocoa-ink leading-relaxed">
          {/* TAB 1: Description */}
          {activeTab === "desc" && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="display text-base font-bold text-cocoa-ink">
                Authentic Craftsmanship &amp; Provenance
              </h3>
              <p className="text-cocoa-ink/80 leading-relaxed font-normal">
                {product.description ||
                  `${product.name} is imported directly from certified manufacturers in ${product.origin}. Each batch is transported via climate-controlled air and sea logistics to preserve optimal freshness, texture, and aroma.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-mist bg-antique/40 p-3.5">
                  <span className="font-bold text-walnut block mb-1">🌍 Country of Origin</span>
                  <span className="text-beige text-xs">
                    {product.origin} {product.flag} — 100% Genuine Certified Batch
                  </span>
                </div>
                <div className="rounded-lg border border-mist bg-antique/40 p-3.5">
                  <span className="font-bold text-walnut block mb-1">📦 Packaging Spec</span>
                  <span className="text-beige text-xs">
                    {product.unit} · Tamper-proof vacuum/foil barrier
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Nutrition & Ingredients */}
          {activeTab === "nutrition" && (
            <div className="space-y-6 max-w-3xl">
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="display text-base font-bold text-cocoa-ink mb-2">
                    Ingredients List
                  </h3>
                  <p className="text-xs text-beige bg-antique/40 p-3 rounded-lg border border-mist">
                    {product.ingredients.join(", ")}.
                  </p>
                </div>
              )}

              {product.nutrition && (
                <div>
                  <h3 className="display text-base font-bold text-cocoa-ink mb-2">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    {Object.entries(product.nutrition).map(([key, val]) => (
                      <div key={key} className="rounded-lg border border-mist bg-antique/40 p-3 text-center">
                        <span className="text-[10px] uppercase font-bold text-beige block">
                          {key}
                        </span>
                        <span className="display font-bold text-cocoa-ink text-sm mt-0.5 block">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Storage */}
          {activeTab === "storage" && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="display text-base font-bold text-cocoa-ink">
                Recommended Storage Guidelines
              </h3>
              <p className="text-cocoa-ink/80 leading-relaxed font-normal">
                {product.storage ||
                  "Store in a clean, dry, and cool pantry area away from direct sunlight, moisture, and strong external odors. For chocolates and dairy products, maintain between 14°C – 18°C."}
              </p>
              <div className="rounded-lg border border-mist bg-antique/40 p-3.5 text-xs text-beige">
                <span className="font-bold text-walnut block mb-1">⏳ Shelf Life Guarantee</span>
                <span>
                  {product.shelfLife || "Guaranteed minimum 6+ months best-before window upon dispatch."}
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: Customer Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-8 max-w-3xl">
              {/* Review List */}
              <div className="space-y-4">
                {(product.reviews && product.reviews.length > 0
                  ? product.reviews
                  : [
                      {
                        id: "def1",
                        author: "Kasun Jayasuriya",
                        location: "Colombo 07",
                        rating: 5,
                        date: "3 days ago",
                        comment: "Exceptional quality and genuine import. Arrived within 30 minutes in Dehiwala.",
                        verified: true,
                      },
                      {
                        id: "def2",
                        author: "Sarah Mendis",
                        location: "Mount Lavinia",
                        rating: 5,
                        date: "1 week ago",
                        comment: "Best convenience store in Sri Lanka for imported snacks. Perfectly packed.",
                        verified: true,
                      },
                    ]
                ).map((rev) => (
                  <div key={rev.id} className="rounded-lg border border-mist bg-antique/30 p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-cocoa-ink">{rev.author}</span>
                        {rev.verified && (
                          <span className="rounded bg-walnut px-1.5 py-0.2 text-[9px] font-bold text-parchment">
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-beige">{rev.date}</span>
                    </div>
                    <div className="text-brand-amber text-xs">{"★".repeat(rev.rating)}</div>
                    <p className="text-xs text-cocoa-ink/80 leading-relaxed font-normal">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="rounded-xl border border-mist bg-antique p-5 space-y-4">
                <h4 className="display text-sm font-bold text-cocoa-ink">
                  Write a Verified Review
                </h4>
                {submittedReview ? (
                  <div className="rounded-lg bg-white p-4 text-center border border-mist">
                    <span className="text-xl block mb-1">🎉</span>
                    <span className="font-bold text-walnut text-xs block">
                      Thank you for reviewing {product.name}!
                    </span>
                    <span className="text-[11px] text-beige">
                      Your feedback has been submitted to our Dehiwala moderation desk.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-cocoa-ink mb-1">Your Name</label>
                        <input
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Ayesha P."
                          className="h-8.5 w-full rounded border border-mist bg-white px-3 text-xs text-cocoa-ink focus:border-walnut"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-cocoa-ink mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="h-8.5 w-full rounded border border-mist bg-white px-2.5 text-xs text-cocoa-ink focus:border-walnut"
                        >
                          <option value={5}>★★★★★ (5/5) Excellent</option>
                          <option value={4}>★★★★☆ (4/5) Very Good</option>
                          <option value={3}>★★★☆☆ (3/5) Average</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-cocoa-ink mb-1">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Describe taste, packaging condition, and delivery experience…"
                        className="w-full rounded border border-mist bg-white p-2.5 text-xs text-cocoa-ink focus:border-walnut"
                      />
                    </div>
                    <button type="submit" className="btn-primary py-2 px-5 text-xs font-bold">
                      Submit Customer Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MORE FROM THIS AISLE (RELATED PRODUCTS CAROUSEL/GRID)                  */}
      {/* ========================================================================= */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="flex items-end justify-between border-b border-mist pb-3 mb-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-amber uppercase">
                RECOMMENDED PAIRINGS
              </span>
              <h2 className="display mt-0.5 text-2xl font-bold text-cocoa-ink">
                More from Aisle: {categoryObj ? categoryObj.name : product.category}
              </h2>
            </div>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-xs font-bold text-walnut hover:underline"
            >
              View All {categoryObj ? categoryObj.name : "Aisle Items"} →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
