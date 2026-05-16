import { BrandNavBar } from "../BrandNavBar";
import { BrandCTAStrip } from "./BrandCTAStrip";
import { BrandHeroSlider } from "./BrandHeroSlider";
export function HeroSection() {
  return (
    <header className="h-svh">
      <BrandNavBar />
      <section className="flex flex-col">
        <BrandHeroSlider />
        <BrandCTAStrip />
      </section>
    </header>
  );
}
