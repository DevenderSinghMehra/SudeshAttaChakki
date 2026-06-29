import { getImg } from "../../helpers/getImg";

export function OptimizedImg({
  imgName,
  className,
  sizes,
  isAriaHidden = false,
  isDraggable = true,
}) {
  const imageData = getImg(imgName);
  //for sticker aria label will be hidden handle it.
  return (
    <img
      className={className}
      src={imageData.src}
      alt={imgName}
      srcSet={imageData.srcSetStr}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      aria-hidden={isAriaHidden}
      draggable={isDraggable}
    />
  );
}
