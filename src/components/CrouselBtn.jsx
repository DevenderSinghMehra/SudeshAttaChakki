import { SpriteIcon } from "./SpriteIcon";

export function CrouselBtn({ direction, onClick, onKeyDown }) {
  return (
    <button
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onClick={onClick}
      className="font-open-sans cursor-pointer rounded-full bg-white p-4 text-4xl font-extrabold active:bg-gray-100"
    >
      <SpriteIcon
        className={`size-5 ${direction === "left" ? "rotate-180" : ""}`}
        iconName="chevronArrowRight"
      />
    </button>
  );
}
