export function SlidingText({ text, width }) {
  //!this not done yet it is not a resuable component till now i need ot get back at it, and refine. 
  //!for now i am shifting it towards later as it is animaion and in deatails correct i will pick it later 
  //!or else when it is needed. 
  return (
    <p className="text-sm font-semibold max-sm:relative max-sm:h-5 max-sm:overflow-x-clip max-sm:whitespace-nowrap sm:text-center">
      <span className="max-sm:animate-slide max-sm:absolute max-sm:inline-block max-sm:px-2">
        {text}
      </span>
      <span className="max-sm:animate-delayed-slide hidden max-sm:absolute max-sm:inline-block max-sm:px-2 max-sm:opacity-0">
        {text}
      </span>
    </p>
  );
}
/* 
import { useViewPort } from "./Hooks/useViewPort";
export function SlidingText({ text }) {
  const isMobile = useViewPort({
    isMediaQuery: true,
    widthType: "maxWidth",
    widthNum: 409,
  });
  if (!isMobile) {
    return (
      <p className="text-center text-sm font-semibold md:text-base">
        Connect with Us
      </p>
    );
  }

  return (
    <p className="relative h-5 overflow-x-clip text-sm font-semibold whitespace-nowrap">
      <span className="animate-slide absolute inline-block px-2">
        Connect with Us
      </span>
      <span className="animate-delayed-slide absolute inline-block px-2 opacity-0">
        Connect with Us
      </span>
    </p>
  );
} */
