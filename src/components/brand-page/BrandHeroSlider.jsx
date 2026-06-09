import { useEffect, useRef, useState } from "react";
import heroImg from "../../assets/hero section images panel.png";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { CrouselBtn } from "../CrouselBtn";
export function BrandHeroSlider() {
  const slider = useRef({
    sliderWidth: 0,
    isTransitioning: false,
    reset: {
      start: false,
      action: null,
      active: false,
    },
  });
  const swipe = useRef({
    accumulatedSwipeX: 0,
    currentSwipeX: 0,
  });
  const touch = useRef({
    focused: false,
    active: false,
    startPoint: 0,
    endPoint: 0,
  });
  const [imgCount, setImgCount] = useState(0);
  const [slideX, setSlideX] = useState(0);
  ///the problem we have is that, reset feels forced the animation part needs to be handled.

  function getSlideXStateUpdated(value, action) {
    setSlideX((prev) => {
      const definedSlide = action === "forward" ? prev + value : prev - value;
      const pointer = definedSlide / 100;
      swipe.current.accumulatedSwipeX = definedSlide;
      // --
      if (pointer === -1) {
        setImgCount(5);
        slider.current.reset = { start: true, action: "toEnd" };
      } else if (pointer === 6) {
        setImgCount(0);
        slider.current.reset = { start: true, action: "toStart" };
      } else setImgCount(pointer);

      // --
      return definedSlide;
    });
  }

  useEffect(() => {
    if (slider.current.reset.start) {
      setTimeout(() => {
        // debugger;
        const { action } = slider.current.reset;
        // --
        const resetValue = action === "toStart" ? 0 : 5 * 100;
        setSlideX(resetValue);
        swipe.current.accumulatedSwipeX = resetValue;
        slider.current.reset.start = false;
        slider.current.reset.active = true;
      }, 300); //i need to do something for this. being timming oriented makes thing messy especially with styles for sure.
    } else slider.current.reset.active = false;
  }, [slider.current.reset.start]);

  function getSliderAutoUpdated() {
    touch.current.focused = false;
    touch.current.active = false;
    const { currentSwipeX } = swipe.current;
    // --
    // debugger;
    if (currentSwipeX >= 15) {
      getSlideXStateUpdated(100 - currentSwipeX, "forward");
    } else if (currentSwipeX <= -15) {
      getSlideXStateUpdated(100 + currentSwipeX, "backward");
    } else {
      setSlideX((prevState) => prevState - currentSwipeX);
    }
    //its little tricky to understad this prevState - currentSwipeX but it works the key is currentswipe can be a negative value or a positive value.
  }

  return (
    <div
      onPointerDown={(e) => {
        console.log("down");
        if (slider.current.isTransitioning || slider.current.reset.start) {
          return;
        }
        touch.current.focused = true;
        touch.current.startPoint = e.clientX;
        // don’t complicate code disproportionately for microscopic gains. but yes reading and comparison is faster then mutation.
        const { clientWidth } = e.currentTarget;
        // direction assignment is faster then destruction the difference is negligible but is there, so always use direction assignment when you just want one property out of a object else destructure.
        //but if you wanna convey that you are not changing the variable name as varible= key name then destructuring is fine as well.
        if (slider.current.sliderWidth !== clientWidth) {
          slider.current.sliderWidth = clientWidth;
        }
      }}
      onPointerMove={(e) => {
        if (touch.current.focused) {
          console.log("working");
          touch.current.endPoint = e.clientX;
          const { endPoint, startPoint, active } = touch.current;
          const { accumulatedSwipeX } = swipe.current;
          const { sliderWidth } = slider.current;
          // --
          const deltaX = startPoint - endPoint;
          const swipeX = Math.round((deltaX / sliderWidth) * 100);

          setSlideX(accumulatedSwipeX + swipeX);
          swipe.current.currentSwipeX = swipeX;
          if (!active) touch.current.active = true; //touch active is there to signal user made movement after pointer down not just pointer down.
        }
      }}
      onPointerUp={() => {
        if (touch.current.active) getSliderAutoUpdated();
      }}
      onPointerLeave={() => {
        if (touch.current.active) getSliderAutoUpdated();
      }}
      className="relative h-full min-h-95 cursor-grab touch-pan-y select-none"
    >
      <div className="absolute inset-0 overflow-clip">
        <div
          onTransitionStart={() => {
            slider.current.isTransitioning = true;
          }}
          onTransitionEnd={() => {
            slider.current.isTransitioning = false;
          }}
          style={{
            transform: `translateX(calc(${-slideX}% - 100%))`,
          }}
          className={`flex size-full transition-transform ${slider.current.reset?.active ? "duration-0" : ""} ${touch.current.active ? "cursor-grabbing duration-0" : "cursor-grab"} *:size-full *:shrink-0 *:object-cover *:object-center`}
        >
          <img
            src="https://picsum.photos/id/292/1200/800"
            draggable="false"
            aria-label="last-clone"
          />
          <img src="https://picsum.photos/id/10/1200/800" draggable="false" />
          <img src="https://picsum.photos/id/29/1200/800" draggable="false" />
          <img src="https://picsum.photos/id/1040/1200/800" draggable="false" />
          <img src="https://picsum.photos/id/106/1200/800" draggable="false" />
          <img src="https://picsum.photos/id/133/1200/800" draggable="false" />
          <img src="https://picsum.photos/id/292/1200/800" draggable="false" />

          <img
            src="https://picsum.photos/id/10/1200/800"
            draggable="false"
            aria-label="first-clone"
          />
        </div>
      </div>
      <div className="absolute inset-0 hidden items-center justify-between px-2 md:flex">
        <CrouselBtn
          onClick={() => {
            if (slider.current.isTransitioning || slider.current.reset.start) {
              return;
            }
            getSlideXStateUpdated(100, "backward");
          }}
          direction="left"
        />
        <CrouselBtn
          onClick={() => {
            if (slider.current.isTransitioning || slider.current.reset.start) {
              return;
            }
            getSlideXStateUpdated(100, "forward");
          }}
          direction="right"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 text-center *:inline-block *:rounded-full *:bg-black/70 *:p-1 *:not-last:mr-0.5">
        {Array.from({ length: 6 }).map((el, i) => {
          //send this cutom made array to useRef it will save use array creation loop so good you know.
          const active = "bg-white! px-2! transition-[padding]";
          return <span key={i} className={imgCount === i ? active : ""}></span>;
        })}
      </div>
    </div>
  );
}
