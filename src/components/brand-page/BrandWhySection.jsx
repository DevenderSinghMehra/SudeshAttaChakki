import { SpriteIcon } from "../SpriteIcon";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";

export function BrandWhySection() {
  const reasons = [
    {
      title: "Nutrition Rich",
      info: "Milled fresh, retains vitamins",
      svgName: "wheat-stalk",
    },
    {
      title: "Better Taste",
      info: "Soft roti’s, natural aroma",
      svgName: "heart",
    },
    {
      title: "Good for world",
      info: "Minimum Packaging, no waste",
      svgName: "earth",
    },
  ];

  return (
    <section className="bg-cream pb-6">
      {/*//! later fix this section height we are aiming for a pulling effect. */}
      <BrandSectionTitle titleText="Why Fresh Matters?" subTitleText={null} />
      <div className="mx-auto max-w-[1120px] pt-20 md:flex md:items-end md:justify-around md:gap-x-2 md:pt-12 md:pb-5 lg:justify-between [&>*:nth-child(3)>svg]:size-17">
        {/* as of now i need reliase on the messy selector to style earth icon try to fix it size and get rid of this[&>*:nth-child(3)>svg]: selector. */}
        {reasons.map(({ title, info, svgName }, i) => (
          <div key={i} className="mb-16 text-center md:mb-0">
            <SpriteIcon className="mx-auto mb-4 size-20" iconName={svgName} />
            <h6 className="font-merriweather my-0.5 text-xl">{title}</h6>
            <p className="font-poppins text-sm">{info}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
