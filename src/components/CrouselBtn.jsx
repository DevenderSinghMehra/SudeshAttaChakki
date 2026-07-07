import { SpriteIcon } from "./SpriteIcon";

export function CrouselBtn({
  pointingDirection,
  onClick,
  isAutoPlayEnabled,
  setIsAutoPlay,
}) {
  const autoPlayEvents = isAutoPlayEnabled
    ? {
        onMouseEnter: () => setIsAutoPlay(false),
        onMouseLeave: () => setIsAutoPlay(true),
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
