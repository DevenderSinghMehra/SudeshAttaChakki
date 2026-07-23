import { useState } from "react";
import { SpriteIcon } from "./SpriteIcon";

export function ZoomSlider({ slideEl, slideContainerEl }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  //add validation in teh custom slider to cue the user to add relative in the container, else just conditional code it much better

  //! see later why i am not able to fill the icon i mean change its color.
  //! the border can be much better work on that.
  //! make it more smoothe handle transition well. plust ensure the close overlay can be look better but do not go into to much styling a cross works fine,
  //!shift the logic of inherit rounded to css variable
  //ditch teh cross teh other picture in and out svg looks better.
  return (
    <button
      onClick={() => {
        //overflow approach to disable-scroll use to fail in safari but back in 2019 in IOS 13 it was fixed so we can rely on it unless that srollbar hidden jump hurts ux.
        const active = `fixed inset-0 z-100 flex size-full items-center justify-center bg-black/80 *:h-8/10! *:w-7/10! *:transition-all`;

        if (!isLightBoxOpen) slideContainerEl.current.className = active;
        else slideContainerEl.current.className = "size-full";

        document.body.classList.toggle("overflow-hidden");
        slideEl.current.classList.toggle("*:rounded-[var(--slider-radius)]");

        // --
        setIsLightBoxOpen(!isLightBoxOpen);
      }}
      className="absolute top-1 right-1 z-10 cursor-pointer rounded-full bg-white p-1.75 opacity-70 shadow-md transition-opacity *:stroke-black hover:opacity-100 active:opacity-100  translate-0"
    >
      {isLightBoxOpen ? (
        <SpriteIcon className="size-7" iconName="minimizer" />
      ) : (
        <SpriteIcon className="size-3" iconName="maximizer" />
      )}
    </button>
  );
}
