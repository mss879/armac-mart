import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ViralDrops } from "@/components/home/ViralDrops";
import { CategoryShelf } from "@/components/home/CategoryShelf";
import { MidnightSnackBanner, ViralDropInterstitial } from "@/components/home/InterstitialBanners";
import { ImpulseDeals } from "@/components/home/ImpulseDeals";
import { VisitStore } from "@/components/home/VisitStore";
import { TrustBar } from "@/components/home/TrustBar";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* 3/4-Page Promotional Banner Carousel */}
      <Hero />

      {/* Convenience Store Aisle Marquee */}
      <Ticker />

      {/* 10 Visual Category Shelf Cards (Custom Generated Images) */}
      <CategoryGrid />

      {/* Viral Drops Spotlight (Limited Time Only with Live Urgency Countdown) */}
      <ViralDrops />

      {/* Interactive 10-Aisle Product Showcase & Shelf */}
      <CategoryShelf />

      {/* Interstitial Promo Banner 1: Late Night Snacks & Drinks */}
      <MidnightSnackBanner />

      {/* Grab-and-Go Impulse Combos & Savings */}
      <ImpulseDeals />

      {/* Interstitial Promo Banner 2: Limited Edition Drops */}
      <ViralDropInterstitial />

      {/* Dehiwala Store Interior Experience & Late-Night Hours */}
      <VisitStore />

      {/* Convenience Store USPs & Guarantee Bar */}
      <TrustBar />

      {/* 15% First-Order Snack Club Newsletter */}
      <Newsletter />
    </>
  );
}
