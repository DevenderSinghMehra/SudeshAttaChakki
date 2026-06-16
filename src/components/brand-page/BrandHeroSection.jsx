import { BrandNavBar } from "../BrandNavBar";
import { BrandCTAStrip } from "./BrandCTAStrip";
import { BrandHeroSlider } from "./BrandHeroSlider";
export function HeroSection() {
  return (
    <header className="flex h-svh flex-col">
      <BrandNavBar />
      <section className="flex h-full flex-col gap-y-1.5 md:gap-y-2">
        <BrandHeroSlider />
        <BrandCTAStrip />
      </section>
    </header>
  );
}
