import { BrandNavBar } from "../BrandNavBar";
import { BrandCTAStrip } from "./BrandCTAStrip";
import { BrandHeroSlider } from "./BrandHeroSlider";
export function HeroSection() {
  return (
    <header className="flex flex-col h-svh">
      <BrandNavBar />
      <section className="flex h-full flex-col gap-y-1.5">
        <BrandHeroSlider />
        <BrandCTAStrip />
      </section>
    </header>
  );
}
