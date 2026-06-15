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
    imgCount: 0,
    reset: {
      start: false,
      action: null,
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
  const [slideX, setSlideX] = useState(0);
  const [isautoPlay, setIsAutoPlay] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!isautoPlay) {
      clearInterval(slider.current.autoPlayId);
      slider.current.autoPlayId = 0;
    } else {
      slider.current.autoPlayId = setInterval(() => {
        if (slider.current.isTransitioning || isResetting) return;
        updateSlider(100, "forward");
      }, 5000);
    }

    return () => {
      clearInterval(slider.current.autoPlayId);
      //slider.current.autoPlayId = 0; //*no need to do this if unmount happen states are destroyed and on mount it are created fresh.
    };
  }, [isautoPlay]);
  //!there is still a problem on fast reset request, transition duration-0 is not happening it is not too much but in between it is happening.
  useEffect(() => {
    if (isResetting) setIsResetting(false); //just prevent the initial state update else even with if it can work.
    //?fun fact is because reset transition duration is 0 that is why this code is working the way we wanted else, maybe in half or so it will get changed.
  }, [isResetting]);

  function resetSlider() {
    const { action } = slider.current.reset;
    // --
    const resetValue = action === "toStart" ? 0 : 5 * 100;
    setSlideX(resetValue);
    swipe.current.accumulatedSwipeX = resetValue;
    slider.current.reset.action = null;
    slider.current.reset.start = false;
    setIsResetting(true);
  }

  function updateSlider(value, action) {
    // --
    setSlideX((prev) => {
      const definedSlide = action === "forward" ? prev + value : prev - value;
      // --
      const pointer = definedSlide / 100;
      swipe.current.accumulatedSwipeX = definedSlide;
      // --
      if (pointer === -1) {
        slider.current.reset.start = true;
        slider.current.reset.action = "toEnd";
        slider.current.imgCount = 5;
      } else if (pointer === 6) {
        slider.current.reset.start = true;
        slider.current.reset.action = "toStart";
        slider.current.imgCount = 0;
      } else {
        slider.current.imgCount = pointer;
      }
      // --
      return definedSlide;
    });
  }

  function invokeSliderUpdate() {
    touch.current.focused = false;
    touch.current.active = false;
    setIsAutoPlay(true);
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
        if (slider.current.isTransitioning || slider.current.reset.start) {
          return;
        }
        // *i wanted to allow to this touch even during transtion, but i think as per ux it is not important let then user see thing full or not see at all.
        setIsAutoPlay(false);
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
          onTransitionStart={() => (slider.current.isTransitioning = true)}
          onTransitionEnd={() => {
            slider.current.isTransitioning = false;
            if (slider.current.reset.start) resetSlider();
          }}
          style={{
            transform: `translateX(calc(${-slideX}% - 100%))`,
          }}
          className={`ease-smooth flex size-full transition-transform *:size-full *:shrink-0 *:object-cover *:object-center ${touch.current.active || isResetting ? "duration-0" : "duration-[0.8s]"}`}
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
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onClick={() => {
            if (slider.current.reset.start) return;
            //i have shifited it from isResetting to this, because when reset should have i need transition to end to initiate rest, if i do not block input then transition will not end utill user stops by then because i have done ther reset and the user is just shifting an shifting they will skip flex track and see empty space.
            updateSlider(100, "backward");
          }}
          direction="left"
        />
        <CrouselBtn
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onClick={() => {
            if (slider.current.reset.start) return;
            updateSlider(100, "forward");
          }}
          direction="right"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 text-center *:inline-block *:rounded-full *:bg-black/70 *:p-1 *:not-last:mr-0.5">
        {Array.from({ length: 6 }).map((el, i) => {
          //send this cutom made array to useRef it will save use array creation loop so good you know.
          const active = "bg-white! px-2! transition-[padding]";
          return (
            <span
              key={i}
              className={slider.current.imgCount === i ? active : ""}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
