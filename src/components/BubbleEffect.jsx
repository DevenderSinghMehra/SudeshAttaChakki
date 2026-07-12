import { useRef } from "react";

export function BubbleEffect({
  borderRadius = "",
  initialDotSize = "size-4",
  bubbleBg = "bg-white/40",
}) {
  const bubbleEl = useRef(null);
  //!this done really well just scale size is not configurable in the animation else it will be just amazing.
  return (
    <div
      onClick={(e) => {
        const bubble = bubbleEl.current;
        // -- take of animation and change possition
        bubble.classList.remove("animate-fill-out");
        bubble.style.left = `${e.nativeEvent.offsetX}px`;
        bubble.style.top = `${e.nativeEvent.offsetY}px`;

        /* --not needed but i am using requestAnimationFrame to just be super sure about let current paint happen then run this code. */

        //--add back animaiton after current paint.
        requestAnimationFrame(() => bubble.classList.add("animate-fill-out"));
      }}
      className={`absolute inset-0 size-full overflow-clip *:pointer-events-none ${borderRadius}`}
    >
      <span
        ref={bubbleEl}
        className={`absolute -translate-1/2 rounded-full opacity-0 ${initialDotSize} ${bubbleBg}`}
      ></span>
    </div>
  );
}
