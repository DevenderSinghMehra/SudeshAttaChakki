import Icons from "../assets/spriteIcons.svg?url&no-inline";
export function SpriteIcon({ className, iconName }) {
  return (
    <svg className={className}>
      <use href={`${Icons}#${iconName}`}></use>
    </svg>
  );
}
