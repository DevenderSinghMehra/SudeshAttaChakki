import { useState } from "react";
import { BrandHeroSection } from "./components/brand-page/BrandHeroSection";
import { BrandWhySection } from "./components/brand-page/BrandWhySection";
import { BrandVarietySection } from "./components/brand-page/BrandVarietySection";
import { BrandYourAttaSection } from "./components/brand-page/BrandYourAttaSection";
import { BrandWhyChooseSection } from "./components/brand-page/BrandWhyChooseSection";
import { BrandTestimonialSection } from "./components/brand-page/BrandTestimonialSection";
function App() {
  return (
    <>
      <BrandHeroSection></BrandHeroSection>
      <BrandWhySection></BrandWhySection>
      <BrandVarietySection></BrandVarietySection>
      <BrandYourAttaSection></BrandYourAttaSection>
      <BrandWhyChooseSection></BrandWhyChooseSection>
      <BrandTestimonialSection></BrandTestimonialSection>
    </>
  );
}

export default App;
