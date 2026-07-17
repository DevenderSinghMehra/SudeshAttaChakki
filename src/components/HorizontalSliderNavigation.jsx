import { CrouselBtn } from "./CrouselBtn";

export function HorizontalSliderNavigation({
  slider,
  stopAutoPlay,
  startAutoPlay,
  isLoop,
  slideIndexCount,
  isAutoPlayEnabled,
  updateSlider,
}) {
  function OnClickHandler(action) {
    return () => {
      if (slider.current.reset.start) return;
      else updateSlider(100, action);
    };
  }
  return (
    <div className="absolute inset-0 flex md:flex-col">
      <div className="hidden flex-1 px-2 md:flex md:items-center md:justify-between">
        <CrouselBtn
          slider={slider}
          startAutoPlay={startAutoPlay}
          stopAutoPlay={stopAutoPlay}
          isLoop={isLoop}
          slideIndexCount={slideIndexCount}
          isAutoPlayEnabled={isAutoPlayEnabled}
          onClick={OnClickHandler("backward")}
          pointingDirection="left"
        />
        <CrouselBtn
          slider={slider}
          startAutoPlay={startAutoPlay}
          stopAutoPlay={stopAutoPlay}
          isLoop={isLoop}
          slideIndexCount={slideIndexCount}
          isAutoPlayEnabled={isAutoPlayEnabled}
          onClick={OnClickHandler("forward")}
          pointingDirection="right"
        />
      </div>
      <div className="mx-auto text-center *:inline-block *:rounded-full *:bg-black/70 *:p-1 *:not-last:mr-0.5 max-md:self-end">
        {new Array(slider.current.totalSlideCount)
          .fill(undefined)
          .map((el, i) => {
            return (
              <span
                key={i}
                className={
                  slideIndexCount === i
                    ? "bg-white! px-2! transition-[padding]"
                    : ""
                }
              ></span>
            );
          })}
      </div>
    </div>
  );
}
