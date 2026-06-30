import { BrandNavBar } from "../BrandNavBar";
import { BrandCTAStrip } from "./utility/BrandCTAStrip";
import { BrandHeroSlider } from "./utility/BrandHeroSlider";
export function BrandHeroSection() {
  return (
    <header className="flex min-h-120 h-svh flex-col">
      {/* do not go for dvh it give a slight jitter. */}
      <BrandNavBar />
      <section className="mx-auto flex flex-1 flex-col gap-y-1.5 md:gap-y-1.75">
        <BrandHeroSlider />
        <BrandCTAStrip />
      </section>
    </header>
  );
}
