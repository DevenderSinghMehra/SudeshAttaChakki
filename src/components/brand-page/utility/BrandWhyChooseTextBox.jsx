import { CustomSlider } from "../../CustomSlider";

export function BrandWhyChooseTextBox({ isAriaHidden, title, info }) {
  // !text should be little big in large screens take care of it later.
  return (
    <div
      aria-hidden={isAriaHidden}
      className="mb-10 flex last:mb-0 aria-hidden:hidden md:items-center lg:justify-between"
    >
      <div className="h-fit max-w-151.25">
        <h4 className="font-merriweather text-xl font-bold">
          {title} <br className="sm:hidden" />
        </h4>
        <p className="font-poppins mt-3 text-sm [&>b]:font-semibold">{info}</p>
      </div>
      <div className="ml-3.5 h-51 shrink-0 overflow-clip rounded-sm bg-black/40 max-lg:w-[max(96px,20vw)] lg:h-45 lg:w-52">
        <CustomSlider
          defineTransitionDuration="800ms"
          imgNameArr={[
            "heroImg-1",
            "heroImg-2",
            "heroImg-3",
            "heroImg-1",
            "heroImg-2",
            "heroImg-3",
          ]}
          setAxis="Y"
          isTouchConstraint={true}
          isLoop={false}
          isZoom={true}
          LightBoxBorderRadius="4px"
        />
      </div>
    </div>
  );
}
