export function VerticalSliderNavigation({ slider }) {
  return (
    <div className="absolute inset-0 flex items-center justify-end">
      <div className="flex flex-col items-center gap-y-0.5 pr-2 *:inline-block *:rounded-full *:bg-black/70 *:p-1">
        {new Array(slider.current.totalSlideCount)
          .fill(undefined)
          .map((el, i) => {
            return (
              <span
                key={i}
                className={
                  slider.current.currentSlideIndexCount === i
                    ? "bg-white! py-2! transition-[padding]"
                    : ""
                }
              ></span>
            );
          })}
      </div>
    </div>
  );
}
