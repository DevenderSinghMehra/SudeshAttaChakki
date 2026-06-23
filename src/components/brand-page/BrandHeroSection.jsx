import { BrandNavBar } from "../BrandNavBar";
import { BrandCTAStrip } from "./utility/BrandCTAStrip";
import { BrandHeroSlider } from "./utility/BrandHeroSlider";
export function BrandHeroSection() {
  return (
    <header className="flex h-svh flex-col">
      {/* do not go for dvh it give a slight jitter. */}
      <BrandNavBar />
      <section className="flex h-full flex-col gap-y-1.5 md:gap-y-1.75">
        <BrandHeroSlider />
        <BrandCTAStrip />
      </section>
    </header>
  );
}
