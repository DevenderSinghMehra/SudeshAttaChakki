import { useRef } from "react";

export function RippleEffect({
  borderRadius = "",
  rippleStartSize = "size-4",
  rippleBg = "bg-white/40",
  rippleEndSize = "",
  rippleDuration = "",
}) {
  const rippleEl = useRef(null);
  //!this done really well just scale size is not configurable in the animation else it will be just amazing.
  //add effect configuration and make another ripple wrapper component with more complex position,so that it can work really well.

  //add crisp to it
  return (
    <div
      onClick={(e) => {
        const ripple = rippleEl.current;
        // -- take of animation and change possition
        ripple.classList.remove("animate-ripple");
        ripple.style.left = `${e.nativeEvent.offsetX}px`;
        ripple.style.top = `${e.nativeEvent.offsetY}px`;

        /* --not needed but i am using requestAnimationFrame to just be super sure about let current paint happen then run this code. */

        //--add back animaiton after current paint.
        requestAnimationFrame(() => ripple.classList.add("animate-ripple"));
      }}
      className={`absolute inset-0 size-full overflow-clip *:pointer-events-none ${borderRadius}`}
    >
      <span
        ref={rippleEl}
        style={{
          "--ripple-end-size": rippleEndSize,
          animationDuration: rippleDuration,
        }}
        className={`absolute -translate-1/2 rounded-full opacity-0 ${rippleStartSize} ${rippleBg}`}
      ></span>
    </div>
  );
}
