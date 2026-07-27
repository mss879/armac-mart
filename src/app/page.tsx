import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { CategoryIndex } from "@/components/category-index";
import { BestSellers } from "@/components/best-sellers";
import { StorePromise } from "@/components/store-promise";
import { Reviews } from "@/components/reviews";
import { Newsletter } from "@/components/newsletter";
import { SiteFooter } from "@/components/site-footer";
import { WelcomeVeil } from "@/components/welcome-veil";

export default function Home() {
  return (
    <>
      <WelcomeVeil />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <Ticker />
        <CategoryIndex />
        <BestSellers />
        <StorePromise />
        <Reviews />
        <Newsletter />
      </main>

      <SiteFooter />
    </>
  );
}
