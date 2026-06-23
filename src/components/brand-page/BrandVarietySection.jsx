import mudPaper from "../../assets/mudPaper.webp";
import { SpriteIcon } from "../SpriteIcon";
import { BrandItemCard } from "./utility/BrandItemCard";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";
export function BrandVarietySection() {
  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat"
    >
      <div className="mx-auto w-fit pb-12 md:relative">
        <BrandSectionTitle
          titleText="Variety Of Attas"
          subTitleText="Choose from fresh, Stone-ground atta’s"
        />
        <div className="flex pt-20 pb-14 max-md:relative md:justify-center md:gap-x-6.5 md:pt-15">
          <BrandItemCard
            extraClassName="max-[335px]:-mr-16 max-md:-mr-12 max-md:-rotate-6 max-md:scale-88"
            title="M.P Special Sharbati Atta"
            rate={50}
          />
          <BrandItemCard
            extraClassName="max-md:absolute max-md:left-0 max-md:right-0 max-md:z-50"
            title="Regular Chakki Atta"
            rate={50}
          />
          <BrandItemCard
            extraClassName="max-[335px]:-ml-16 max-md:-ml-12 max-md:rotate-6 max-md:scale-88"
            title="Makka Atta"
            rate={50}
          />
        </div>
        <button className="border-golden-amber mx-auto flex items-center rounded-md border-2 bg-transparent px-4.5 py-2.25 md:absolute md:top-10 md:-right-13 md:px-3 md:py-1.5 lg:-right-15">
          {/* //!this button needs solid styling to go well with the ui, it is a ux ui concern there fore i am not working on it for now. */}
          <span className="font-poppins text-sm">
            Visit Store
          </span>
          <SpriteIcon className="ml-2 size-4.5" iconName="arrow-left" />
        </button>
      </div>
    </section>
  );
}
