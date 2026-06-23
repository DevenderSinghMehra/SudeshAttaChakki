import { useRef } from "react";
import { useEffect, useState } from "react";

export function useViewPort({ isMediaQuery, widthType, widthNum }) {
  const [width, setWidth] = useState(
    isMediaQuery
      ? forMediaQuery(document.documentElement.clientWidth)
      : document.documentElement.clientWidth,
  );
 function handleResize() {
    const viewPortWidth = document.documentElement.clientWidth;
    setWidth(() => {
      if (isMediaQuery) return forMediaQuery(viewPortWidth);
      else return viewPortWidth;
    });
  }
  
  function forMediaQuery(viewPortWidth) {
    if (widthType === "minWidth") return viewPortWidth >= widthNum;
    else return viewPortWidth <= widthNum;
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
