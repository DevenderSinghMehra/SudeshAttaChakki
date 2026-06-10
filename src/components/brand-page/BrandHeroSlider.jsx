import { useEffect, useRef, useState } from "react";
import heroImg from "../../assets/hero section images panel.png";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { CrouselBtn } from "../CrouselBtn";
import { renderToPipeableStream } from "react-dom/server";
export function BrandHeroSlider() {
  const slider = useRef({
    sliderWidth: 0,
    isTransitioning: false,
    autoPlayId: 0,
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
  const [autoPlay, setAutoPlay] = useState(true);
  ///the problem we have is that, reset feels forced the animation part needs to be handled.

  useEffect(() => {
    if (!autoPlay) {
      clearInterval(slider.current.autoPlayId);
      slider.current.autoPlayId = 0;
    } else {
      slider.current.autoPlayId = setInterval(() => {
        updateSlider(100, "forward");
      }, 1000);
    }
  }, [autoPlay]);

  useEffect(() => {
    if (slider.current.reset.start) {
      setTimeout(() => {
        const { action } = slider.current.reset;
        // --
        const resetValue = action === "toStart" ? 0 : 5 * 100;
        setSlideX(resetValue);
        swipe.current.accumulatedSwipeX = resetValue;
        slider.current.reset.start = false;
        slider.current.reset.active = true;
      }, 300); //!i need to do something for this. being timming oriented makes thing messy especially with styles for sure.
      //?maybe make it transition end dependent.
    } else slider.current.reset.active = false;
  }, [slider.current.reset.start]);

  function updateSlider(value, action) {
    setSlideX((prev) => {
      const definedSlide = action === "forward" ? prev + value : prev - value;
      // --
      const pointer = definedSlide / 100;
      swipe.current.accumulatedSwipeX = definedSlide;
      // --
      if (pointer === -1) {
        setImgCount(5);
        slider.current.reset.start = true;
        slider.current.reset.action = "toEnd";
      } else if (pointer === 6) {
        setImgCount(0);
        slider.current.reset.start = true;
        slider.current.reset.action = "toStart";
      } else setImgCount(pointer);
      // --
      return definedSlide;
    });
  }

  function invokeSliderUpdate() {
    touch.current.focused = false;
    touch.current.active = false;
    setAutoPlay(true);
    const { currentSwipeX } = swipe.current;
    // --
    if (currentSwipeX >= 15) {
      updateSlider(100 - currentSwipeX, "forward");
    } else if (currentSwipeX <= -15) {
      updateSlider(100 + currentSwipeX, "backward");
    } else setSlideX((prevState) => prevState - currentSwipeX); //reset it back to where it was.
  }

  return (
    <div
      onPointerDown={(e) => {
        if (slider.current.isTransitioning || slider.current.reset.active) {
          return;
        }
        setAutoPlay(false);
        touch.current.focused = true;
        touch.current.startPoint = e.clientX;
        const { clientWidth } = e.currentTarget;
        if (slider.current.sliderWidth !== clientWidth) {
          slider.current.sliderWidth = clientWidth;
        }
      }}
      onPointerMove={(e) => {
        if (touch.current.focused) {
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
        if (touch.current.active) invokeSliderUpdate();
      }}
      onPointerLeave={() => {
        if (touch.current.active) invokeSliderUpdate();
      }}
      className={`relative h-full min-h-95 ${touch.current.active ? "cursor-grabbing" : "cursor-grab"} touch-pan-y select-none`}
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
          className={`flex size-full transition-transform ${slider.current.reset?.active ? "duration-0" : ""} ${touch.current.active ? "duration-0" : ""} *:size-full *:shrink-0 *:object-cover *:object-center`}
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
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          onClick={() => {
            if (slider.current.isTransitioning || slider.current.reset.start) {
              return;
            }
            updateSlider(100, "backward");
          }}
          direction="left"
        />
        <CrouselBtn
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          onClick={() => {
            if (slider.current.isTransitioning || slider.current.reset.start) {
              return;
            }
            updateSlider(100, "forward");
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
