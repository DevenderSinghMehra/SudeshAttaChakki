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
  //!for slider image i may need to change iamge configuration the problem is srcset optimization the images are looking slightly bluring so see it. later. 
  //*change sharp setting to generate a image for px more than 1024 px.
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
