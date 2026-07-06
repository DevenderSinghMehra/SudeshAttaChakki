import cornImg from "../../../assets/cornImg.webp";
import { BrandYourAttaStepCardBadge } from "./BrandYourAttaStepCardBadge";

import { SpriteIcon } from "../../SpriteIcon";
export function BrandYourAttaStepCard({
  extraClassNames = "",
  imgWidthStyles,
  badgePositions,
  stepCount,
  title,
  textBoxPadding,
  info,
}) {
  return (
    <div
      className={`${extraClassNames} bg-cream font-merriweather relative mx-auto rounded-[10px] p-1 first:mb-1 max-lg:flex max-lg:max-w-80.5 first:md:mb-2 lg:mb-0! lg:w-full`}
    >
      <BrandYourAttaStepCardBadge
        stepCount={stepCount}
        positions={badgePositions}
      />
      <div
        className={`h-29 ${imgWidthStyles} shrink-0 overflow-y-hidden rounded-[10px] lg:w-full`}
      >
        <img
          className="size-full object-cover object-center"
          draggable="false"
          src={cornImg}
          alt=""
        />
      </div>
      <div className={`max-lg:ml-3 lg:mx-auto lg:w-fit ${textBoxPadding}`}>
        <h4 className="mb-0.5 text-xl font-bold lg:text-2xl">{title}</h4>
        <p className="font-poppins text-sm">{info}</p>
      </div>
    </div>
  );
}
