import { SpriteIcon } from "../../SpriteIcon";
import brownWithNoise from "../../../assets/brownWithNoise.webp";

export function BrandYourAttaStepCardBadge({ stepCount, positions }) {
  return (
    <span
      style={{ backgroundImage: `url(${brownWithNoise})` }}
      className={`absolute bg-[#8E4A21] ${positions} z-50 inline-block size-13.5 rounded-full bg-cover py-1 shadow-[0_3.2px_6.1px_1px_#00000040]`}
    >
      {/*//* the background with noise is not looking good, later fix it. */}
      <p className="text-cream font-libre-baskerville text-center text-[32px] font-bold">
        {stepCount}
      </p>
      <SpriteIcon
        className="absolute top-3.5 right-1 -z-50 size-7 fill-[#9C5A20]"
        iconName="grain"
      />
    </span>
  );
}
