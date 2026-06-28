import { getImg } from "../../helpers/getImg";

export function OptimizedImg({ imgName, className, sizes }) {
  const imageData = getImg(imgName);

  return (
    <img
      className={className}
      src={imageData.src}
      alt={imgName}
      srcSet={imageData.srcSetStr}
      sizes={sizes}
    />
  );
}
