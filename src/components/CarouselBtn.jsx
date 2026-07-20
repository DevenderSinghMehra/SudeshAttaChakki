import { SpriteIcon } from "./SpriteIcon";

export function CarouselBtn({
  slider,
  startAutoPlay,
  stopAutoPlay,
  isLoop = false,
  slideIndexCount,
  isAutoPlayEnabled,
  onClick,
  pointingDirection,
}) {
  const autoPlayEvents = isAutoPlayEnabled
    ? {
        onMouseEnter: stopAutoPlay,
        onMouseLeave: startAutoPlay,
      }
    : null;

  function isDisabled(pointingDirection) {
    if (pointingDirection === "left") {
      if (slideIndexCount === 0) return true;
    } else if (slideIndexCount === slider.current.totalSlideCount - 1) {
      return true;
    }
    return false;
  }

  return (
    <button
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      disabled={!isLoop && isDisabled(pointingDirection)}
      onClick={onClick}
      {...autoPlayEvents}
      className="font-open-sans cursor-pointer rounded-full bg-white p-4 text-4xl font-extrabold active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-80"
    >
      <SpriteIcon
        className={`size-5 ${pointingDirection === "left" ? "rotate-180" : ""}`}
        iconName="chevron-arrow-right"
      />
    </button>
  );
}
