import { useEffect, useRef, useState } from "react";
import { OptimizedImg } from "./OptimizedImg";
import { HorizontalSliderNavigation } from "./HorizontalSliderNavigation";
import { VerticalSliderNavigation } from "./VerticalSliderNavigation";

export function CustomSlider({
  defineTransitionDuration,
  autoPlayDuration,
  imgNameArr,
  isAutoPlayEnabled = false,
  setAxis = "X",
  isTouchConstraint = false,
}) {
  //!later do a skeleton effect for the slider.and write a logic to mount it later.

  //! and media query to turn slider vertical and horizontal.
  //!as of now it is nto important, but i will add infinite autoplay or differen type of autoPlay ability on the sider , but for now on loop off there will be no autoplay. then with time we will proceed forward.

  const slider = useRef({
    trackLength: 0,
    isTransitioning: false,
    autoPlayId: 0,
    totalSlideCount: imgNameArr.length,
    currentTranslateValue: 0,
    reset: {
      start: false,
      action: null,
    },
  });
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const swipe = useRef({
    accumulatedSwipeValue: 0,
    currentSwipeValue: 0,
  });
  const touch = useRef({
    focused: false,
    active: false,
    startPoint: 0,
    endPoint: 0,
  });
  const [slideIndexCount, setSlideIndexCount] = useState(0);
  const slideTrackEl = useRef(null);

  //!though not needed but jsut as final touch implement debounce for autoplay later

  function startAutoPlay() {
    slider.current.autoPlayId = setInterval(() => {
      if (slider.current.isTransitioning || slider.current.reset.start) return; //guard
      updateSlider(100, "forward");
    }, autoPlayDuration);
  }

  function stopAutoPlay() {
    clearInterval(slider.current.autoPlayId);
    slider.current.autoPlayId = 0;
  }

  useEffect(() => {
    // --handle isAutoPlayEnabled toggle and default case
    if (!isAutoPlayEnabled) return;

    // --handle autoPlayDuration toggle and default case when no toggle
    //set setInterval for autoplay
    startAutoPlay();
    //--the cleanup will run on before -re-renders and after unmount so no need to clearn interval manually on re-render caused by dependencies.
    return () => stopAutoPlay();
  }, [autoPlayDuration, isAutoPlayEnabled]);

  function resetSlider() {
    const { reset, totalSlideCount } = slider.current;
    // -- reset on real first or real last
    const resetValue =
      reset.action === "realFirst" ? 0 : (totalSlideCount - 1) * 100;
    swipe.current.accumulatedSwipeValue = resetValue;
    slider.current.reset.action = null;
    slider.current.reset.start = false;
    moveSlideTrack({ isFast: true, translateValue: resetValue });
  }

  function updateCrouselIndicator(nextSlideCount) {
    //update crousel indicator and ensure to reset when on clone slides
    if (nextSlideCount === -1) {
      slider.current.reset.start = true;
      slider.current.reset.action = "realLast";
      setSlideIndexCount(slider.current.totalSlideCount - 1);
    } else if (nextSlideCount === slider.current.totalSlideCount) {
      slider.current.reset.start = true;
      slider.current.reset.action = "realFirst";
      setSlideIndexCount(0);
    } else {
      //--do this when it is not a clone slide
      setSlideIndexCount(nextSlideCount);
    }
  }

  function updateSlider(value, action) {
    const { currentTranslateValue: prevTranslateValue } = slider.current;
    //-gauge the requried value needed to go to next slide
    const definedSlide =
      action === "forward"
        ? prevTranslateValue + value
        : prevTranslateValue - value;
    swipe.current.accumulatedSwipeValue = definedSlide;
    // --update crousel indcator
    const nextSlideCount = definedSlide / 100;
    updateCrouselIndicator(nextSlideCount);
    // -- move slide track implement translate
    moveSlideTrack({ isFast: false, translateValue: definedSlide });
  }

  function invokeSliderUpdate() {
    touch.current.active = false;
    const { currentSwipeValue } = swipe.current;
    // --validate update
    if (currentSwipeValue > 15) {
      updateSlider(100 - currentSwipeValue, "forward");
    } else if (currentSwipeValue < -15) {
      updateSlider(100 + currentSwipeValue, "backward");
    } else {
      moveSlideTrack({
        isFast: false,
        translateValue:
          slider.current.currentTranslateValue - currentSwipeValue,
      });
    }
  }

  function handlePointerEnd() {
    if (touch.current.active) invokeSliderUpdate();
    // --
    if (touch.current.focused) {
      touch.current.focused = false;
      if (isAutoPlayEnabled) startAutoPlay();
    }
  }

  function moveSlideTrack({ isFast, translateValue }) {
    const { style } = slideTrackEl.current; //!cache it on pointerDown

    if (isFast && style.transitionDuration !== "0ms") {
      style.transitionDuration = "0ms";
    } else if (!isFast) {
      if (style.transitionDuration !== defineTransitionDuration) {
        style.transitionDuration = defineTransitionDuration;
      }
    }
    // --
    style.transform = `translate${axis}(calc(${-translateValue}% - 100%))`;
    slider.current.currentTranslateValue = translateValue;
  }

  return (
    <div
      onPointerDown={(e) => {
        //return if rest or transition is active
        const { isTransitioning, reset } = slider.current;
        if (isTransitioning || reset.start) return;
        //--
        if (isAutoPlayEnabled) stopAutoPlay();
        //--gather touch details
        touch.current.focused = true;
        touch.current.startPoint = e[`client${axis}`];
        //to maintain touch constarints when browser overules with its gestures also check whether it overrules or not
        if (
          isTouchConstraint &&
          e.currentTarget.hasPointerCapture(e.pointerId)
        ) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }

        //define the right track length
        const { clientWidth, clientHeight } = e.currentTarget;
        slider.current.trackLength = isAxisX ? clientWidth : clientHeight;
      }}
      onPointerMove={(e) => {
        if (touch.current.focused) {
          touch.current.endPoint = e[`client${axis}`];
          const { endPoint, startPoint, active } = touch.current;
          const { trackLength } = slider.current;
          const { accumulatedSwipeValue } = swipe.current;
          // --
          const delta = startPoint - endPoint;
          const measuredSwipe = (delta / trackLength) * 100;
          moveSlideTrack({
            isFast: true,
            translateValue: accumulatedSwipeValue + measuredSwipe,
          });
          // --
          swipe.current.currentSwipeValue = measuredSwipe;
          if (!active) touch.current.active = true;
        }
      }}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      className={`relative h-full cursor-grab ${isAxisX ? "touch-pan-y" : "touch-pan-x"} select-none active:cursor-grabbing`}
    >
      <div className="absolute inset-0 overflow-clip">
        <div
          ref={slideTrackEl}
          onTransitionStart={() => (slider.current.isTransitioning = true)}
          onTransitionEnd={() => {
            slider.current.isTransitioning = false;
            if (slider.current.reset.start) resetSlider();
          }}
          style={{
            transform: `translate${axis}(-100%)`,
          }}
          className={`ease-smooth transition-translate flex size-full *:size-full *:shrink-0 *:object-cover *:object-center ${
            isAxisX ? "" : "flex-col"
          }`}
          id="slide-track"
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

        {isAxisX ? (
          <HorizontalSliderNavigation
            slider={slider}
            stopAutoPlay={stopAutoPlay}
            startAutoPlay={startAutoPlay}
            slideIndexCount={slideIndexCount}
            isAutoPlayEnabled={isAutoPlayEnabled}
            updateSlider={updateSlider}
          />
        ) : (
          <VerticalSliderNavigation
            slider={slider}
            slideIndexCount={slideIndexCount}
          />
        )}
      </div>
    </div>
  );
}
