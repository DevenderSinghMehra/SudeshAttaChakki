import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { OptimizedImg } from "./OptimizedImg";
import { HorizontalSliderNavigation } from "./HorizontalSliderNavigation";
import { VerticalSliderNavigation } from "./VerticalSliderNavigation";

export function CustomSlider({
  transitionDuration,
  autoPlayDuration,
  imgNameArr,
  isAutoPlayEnabled = false,
  definedAxis = "X",
  isTouchConstraint = false,
}) {
  //!later do a skeleton effect for the slider.and write a logic to mount it later.
  //!later allow scroll of the nonaxis swipe on slider, if x is axis then y should be avialble to sroll the page as of now none works.
  const slider = useRef({
    trackLength: 0,
    isTransitioning: false,
    autoPlayId: 0,
    totalSlideCount: imgNameArr.length,
    currentSlideIndexCount: 0,
    boundingClientRect: null,
    reset: {
      start: false,
      action: null,
    },
  });
  const axis = definedAxis.toUpperCase(); //?maybe i will be limiting it but i will see it later.

  const swipe = useRef({
    accumulatedSwipeLength: 0,
    currentSwipeLength: 0,
  });
  const touch = useRef({
    focused: false,
    active: false,
    startPoint: 0,
    endPoint: 0,
  });
  const [translate, setTranslate] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(isAutoPlayEnabled);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!isAutoPlayEnabled) return;
    // --
    if (!isAutoPlay) {
      clearInterval(slider.current.autoPlayId);
      slider.current.autoPlayId = 0;
    } else {
      slider.current.autoPlayId = setInterval(() => {
        if (slider.current.reset.start) return; //*this condition make autoplay high level effective though rarely needed but keeping it is trivial so i am keep it.
        updateSlider(100, "forward");
      }, autoPlayDuration);
    }

    return () => clearInterval(slider.current.autoPlayId);
  }, [isAutoPlay, autoPlayDuration, isAutoPlayEnabled]);

  function resetSlider() {
    const { action } = slider.current.reset;
    // --
    const resetValue =
      action === "toStart" ? 0 : (slider.current.totalSlideCount - 1) * 100;
    setTranslate(resetValue);
    swipe.current.accumulatedSwipeLength = resetValue;
    slider.current.reset.action = null;
    slider.current.reset.start = false;
    flushSync(() => setIsResetting(true));
    requestAnimationFrame(() => setIsResetting(false));
  }

  function updateSlider(value, action) {
    // --
    setTranslate((prev) => {
      const definedSlide = action === "forward" ? prev + value : prev - value;
      // --
      const pointer = definedSlide / 100;
      swipe.current.accumulatedSwipeLength = definedSlide;
      // --
      if (pointer === -1) {
        slider.current.reset.start = true;
        slider.current.reset.action = "toEnd";
        slider.current.currentSlideIndexCount =
          slider.current.totalSlideCount - 1;
      } else if (pointer === slider.current.totalSlideCount) {
        slider.current.reset.start = true;
        slider.current.reset.action = "toStart";
        slider.current.currentSlideIndexCount = 0;
      } else {
        slider.current.currentSlideIndexCount = pointer;
      }
      // --
      return definedSlide;
    });
  }

  function invokeSliderUpdate() {
    setIsAutoPlay(true);
    touch.current.active = false;
    const { currentSwipeLength } = swipe.current;
    // --
    if (currentSwipeLength >= 15) {
      updateSlider(100 - currentSwipeLength, "forward");
    } else if (currentSwipeLength <= -15) {
      updateSlider(100 + currentSwipeLength, "backward");
    } else setTranslate((prevState) => prevState - currentSwipeLength); //reset it back to where it was.
  }

  return (
    <div
      onPointerDown={(e) => {
        if (slider.current.isTransitioning || slider.current.reset.start) {
          return;
        }
        // --
        if (isAutoPlayEnabled) setIsAutoPlay(false);
        touch.current.focused = true;
        touch.current.startPoint = e[`client${axis}`];
        if (isTouchConstraint) e.target.releasePointerCapture(e.pointerId);
        const { clientWidth, clientHeight } = e.currentTarget;
        slider.current.trackLength = axis === "X" ? clientWidth : clientHeight;
      }}
      onPointerMove={(e) => {
        if (touch.current.focused) {
          //!later thing about optimizing this callback as much as possible in 1 min active scroll it fires for more than 2k times so it is important code and should be optimized at best.
          touch.current.endPoint = e[`client${axis}`];
          const { endPoint, startPoint, active } = touch.current;
          const { trackLength } = slider.current;
          // --
          const delta = startPoint - endPoint;
          const measuredSwipe = Math.round((delta / trackLength) * 100);
          swipe.current.currentSwipeLength = measuredSwipe;
          setTranslate(swipe.current.accumulatedSwipeLength + measuredSwipe);
          if (!active) touch.current.active = true;
        }
      }}
      onPointerUp={() => {
        if (touch.current.active) invokeSliderUpdate();
        touch.current.focused = false;
      }}
      onPointerLeave={() => {
        if (touch.current.active) invokeSliderUpdate();
        touch.current.focused = false;
      }}
      className="relative h-full cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <div className="absolute inset-0 overflow-clip">
        <div
          onTransitionStart={() => (slider.current.isTransitioning = true)}
          onTransitionEnd={() => {
            slider.current.isTransitioning = false;
            if (slider.current.reset.start) resetSlider();
          }}
          style={{
            transform: `translate${axis}(calc(${-translate}% - 100%))`,
            transitionDuration: `${touch.current.active || isResetting ? "0ms" : transitionDuration}`,
          }}
          className={`ease-smooth flex size-full transition-transform *:size-full *:shrink-0 *:object-cover *:object-center ${axis === "X" ? "" : "flex-col"}`}
        >
          <OptimizedImg
            imgName={imgNameArr[imgNameArr.length - 1]}
            isDraggable={false}
            data-clone="last"
          />
          {imgNameArr.map((imgName, i) => (
            <OptimizedImg
              key={i}
              imgName={imgName}
              isDraggable={false}
              isLoadFast={i <= 2}
            />
          ))}
          <OptimizedImg
            imgName={imgNameArr[0]}
            isDraggable={false}
            data-clone="first"
          />
        </div>

        {axis === "X" ? (
          <HorizontalSliderNavigation
            slider={slider}
            isAutoPlayEnabled={isAutoPlayEnabled}
            setIsAutoPlay={setIsAutoPlay}
            updateSlider={updateSlider}
          />
        ) : (
          <VerticalSliderNavigation slider={slider} />
        )}
      </div>
    </div>
  );
}
