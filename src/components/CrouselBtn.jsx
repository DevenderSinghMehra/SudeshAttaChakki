import { SpriteIcon } from "./SpriteIcon";

export function CrouselBtn({
  pointingDirection,
  onClick,
  isAutoPlayEnabled,
  slider,
}) {
  const autoPlayEvents = isAutoPlayEnabled
    ? {
        onMouseEnter: () => {
          slider.current.isAutoPlayPaused = true;
          console.log("sir i have turned it off");
        },
        onMouseLeave: () => (slider.current.isAutoPlayPaused = false),
      }
    : null;

  return (
    <button
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onClick={onClick}
      {...autoPlayEvents}
      className="font-open-sans cursor-pointer rounded-full bg-white p-4 text-4xl font-extrabold active:bg-gray-100"
    >
      <SpriteIcon
        className={`size-5 ${pointingDirection === "left" ? "rotate-180" : ""}`}
        iconName="chevron-arrow-right"
      />
    </button>
  );
}
