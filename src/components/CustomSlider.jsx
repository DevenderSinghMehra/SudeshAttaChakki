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
  //!later allow scroll of the nonaxis swipe on slider, if x is axis then y should be avialble to sroll the page as of now none works.
  //! and media query to turn slider vertical and horizontal.
  //!as of now it is nto important, but i will add infinite autoplay or differen type of autoPlay ability on the sider , but for now on loop off there will be no autoplay. then with time we will proceed forward.

  //??migrate the whole slider from state to ref as much as possible.
  //!re-define set naming to define naming as state is reserved, i mean conventionaly used for useSate.
  const slider = useRef({
    trackLength: 0,
    isTransitioning: false,
    autoPlayId: 0,
    isAutoPlayPaused: false,
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
  //*3 state to one, in practice 2k re-render to only 12-30 rerender even on high end usage.

  useEffect(() => {
    // --handle isAutoPlayEnabled toggle and default case
    if (!isAutoPlayEnabled) return;

    // --handle autoPlayDuration toggle and default case when no toggle
    //set setInterval for autoplay
    slider.current.autoPlayId = setInterval(() => {
      if (slider.current.isAutoPlayPaused || slider.current.reset.start) return; //guard
      //!i like the re-render it is saving me but i need to clear it on pause and set it back to have a consistent duration timming. else 5s can be like 2s.
      updateSlider(100, "forward");
    }, autoPlayDuration);

    //--the cleanup will run on before -re-renders and after unmount so no need to clearn interval manually on re-render
    return () => clearInterval(slider.current.autoPlayId);
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
    if (isAutoPlayEnabled) slider.current.isAutoPlayPaused = false;
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

  function moveSlideTrack({ isFast, translateValue }) {
    const { style } = slideTrackEl.current;
    // !later twist the logic so that style is cached on pointer down so that the destructuring overhead does not bother though it is already fast but still. it can be more. i just stick with lookups but i dont want code to be hard on eyes.
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
        if (isAutoPlayEnabled) slider.current.isAutoPlayPaused = true;
        //--gather touch details
        touch.current.focused = true;
        touch.current.startPoint = e[`client${axis}`];
        //to maintain touch constarints when browser overules with its gestures
        if (isTouchConstraint) e.target.releasePointerCapture(e.pointerId); //!i want to limit it in mobile device onlly or on device where there is  pointer capture active
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
          //it becomes pixel perfect when i got rid of math.round, also become lite.
          moveSlideTrack({
            isFast: true,
            translateValue: accumulatedSwipeValue + measuredSwipe,
          });
          // --
          swipe.current.currentSwipeValue = measuredSwipe;
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
