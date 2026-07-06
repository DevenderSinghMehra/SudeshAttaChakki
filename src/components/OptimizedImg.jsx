import { getImg } from "../helpers/getImg";

export function OptimizedImg({
  imgName,
  className,
  sizes = "100vw",
  isAriaHidden = undefined,
  isDraggable = true,
  isLoadFast = false,
  ...props
}) {
  const imageData = getImg(imgName);
  const loadType = isLoadFast
    ? { loading: "eager", decoding: "sync", fetchPriority: "high" }
    : { loading: "lazy", decoding: "async" };
  return (
    <img
      className={className}
      src={imageData.src}
      alt={isAriaHidden ? "" : imgName}
      srcSet={imageData.srcSetStr}
      sizes={sizes}
      {...loadType}
      aria-hidden={isAriaHidden}
      draggable={isDraggable}
      {...props} //leveraging the jsx spred syntax.
    />
  );
}
