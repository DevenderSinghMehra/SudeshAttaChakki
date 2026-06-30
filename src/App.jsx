import { useState } from "react";
import { BrandHeroSection } from "./components/brand-page/BrandHeroSection";
import { BrandWhySection } from "./components/brand-page/BrandWhySection";
import { BrandVarietySection } from "./components/brand-page/BrandVarietySection";
import { BrandYourAttaSection } from "./components/brand-page/BrandYourAttaSection";
import { BrandWhyChooseSection } from "./components/brand-page/BrandWhyChooseSection";
import { BrandTestimonialSection } from "./components/brand-page/BrandTestimonialSection";
import { BrandFooter } from "./components/brand-page/BrandFooter";

function App() {
  return (
    <>
      <BrandHeroSection />
      <BrandWhySection />
      <BrandVarietySection />
      <BrandYourAttaSection />
      <BrandWhyChooseSection />
      <BrandTestimonialSection />
      <BrandFooter />
    </>
  );
}

export default App;
