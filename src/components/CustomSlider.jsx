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
  isLoop = true,
}) {
  //!though not needed but jsut as final touch implement debounce for autoplay later
  //!later do a skeleton effect for the slider.and write a logic to mount it later.
  //! and media query to turn slider vertical and horizontal.

  const slider = useRef({
    trackLength: 0,
    isTransitioning: false,
    autoPlayId: 0,
    totalSlideCount: imgNameArr.length,
    currentTranslate: 0,
    reset: {
      start: false,
      action: null,
    },
  });
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const swipe = useRef({
    accumulatedSwipe: 0,
    currentSwipe: 0,
  });
  const touch = useRef({
    focused: false,
    active: false,
    startPoint: 0,
    endPoint: 0,
  });
  const [slideIndexCount, setSlideIndexCount] = useState(0);
  const slideTrackEl = useRef(null);
  const slideEl = useRef(null);

  if (!isLoop && isAutoPlayEnabled) {
    throw new Error("Wrong prop Combination, To use autoplay set isLoop true");
  }

  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const observer = new IntersectionObserver(([entry]) => {
      //entry.isIntersecting is true when el is visible on view port
      if (entry.isIntersecting) startAutoPlay();
      else stopAutoPlay();
    });

    observer.observe(slideEl.current);

    return () => observer.disconnect();
  }, [isAutoPlayEnabled]);

  useEffect(() => {
    // --for isAutoPlayEnabled toggle and default case
    if (!isAutoPlayEnabled) return;

    //--for autoPlayDuration toggle and default case
    startAutoPlay();

    //--run cleanup  before -re-renders and after unmount
    return () => stopAutoPlay();
  }, [autoPlayDuration, isAutoPlayEnabled]);

  function startAutoPlay() {
    if (slider.current.autoPlayId !== 0) return;
    //--
    slider.current.autoPlayId = setInterval(() => {
      if (slider.current.isTransitioning || slider.current.reset.start) return; //guard
      updateSlider(100, "forward");
    }, autoPlayDuration);
  }

  function stopAutoPlay() {
    if (slider.current.autoPlayId === 0) return;
    //--
    clearInterval(slider.current.autoPlayId);
    slider.current.autoPlayId = 0;
  }

  function resetSlider() {
    const { reset, totalSlideCount } = slider.current;
    // -- reset on real first or real last
    const resetValue =
      reset.action === "realFirst" ? 0 : (totalSlideCount - 1) * 100;
    swipe.current.accumulatedSwipe = resetValue;
    slider.current.reset.action = null;
    slider.current.reset.start = false;
    moveSlideTrack({ isFast: true, translate: resetValue });
  }

  function updateIndicator(nextSlideIndexCount) {
    //update crousel indicator and ensure to reset its a clone slide
    switch (nextSlideIndexCount) {
      case -1:
        slider.current.reset.start = true;
        slider.current.reset.action = "realLast";
        setSlideIndexCount(slider.current.totalSlideCount - 1);
        return;

      case slider.current.totalSlideCount:
        slider.current.reset.start = true;
        slider.current.reset.action = "realFirst";
        setSlideIndexCount(0);
        return;

      default:
        //--for not clone slide
        setSlideIndexCount(nextSlideIndexCount);
        return;
    }
  }

  function updateSlider(value, action) {
    const { currentTranslate: prevTranslate } = slider.current;
    //-gauge the requried value needed to go to next slide
    const nextTranslate =
      action === "forward"
        ? Math.round(prevTranslate + value)
        : Math.round(prevTranslate - value);
    //-- js can introduce minor floating-point precision errors; Normalize using Math.round
    /* actually js does not causes it, its the format number data type relies upon causes it, 
    IEEE 754 double-precision floating-point format. */
    const nextSlideIndexCount = nextTranslate / 100;
    if (!isLoop) {
      //run this only for not loop case to handle its ends
      const isEnd =
        nextSlideIndexCount === -1 ||
        nextSlideIndexCount === slider.current.totalSlideCount;

      // -- do not let it slide on end for swipe only as button are disabled in the ends
      if (isEnd) {
        // --
        moveSlideTrack({
          isFast: false,
          translate: Math.round(
            slider.current.currentTranslate - swipe.current.currentSwipe,
          ),
          duration: "300ms",
        });
        swipe.current.currentSwipe = 0; //not needed but to make debugging easier i am adding this.
        return;
      }
    }
    // --update crousel indcator
    swipe.current.accumulatedSwipe = nextTranslate;
    updateIndicator(nextSlideIndexCount);

    // -- move slide track implement translate
    moveSlideTrack({
      isFast: false,
      translate: nextTranslate,
    });
    swipe.current.currentSwipe = 0; //not needed but to make debugging easier i am adding this.
  }

  function validateSwipe() {
    touch.current.active = false;
    const { currentSwipe } = swipe.current;

    // --validate swipe and update
    if (currentSwipe > 15) {
      updateSlider(100 - currentSwipe, "forward");
    } else if (currentSwipe < -15) {
      updateSlider(100 + currentSwipe, "backward");
    } else {
      moveSlideTrack({
        isFast: false,
        translate: Math.round(slider.current.currentTranslate - currentSwipe),
        duration: "400ms",
      });
    }
  }

  function handlePointerEnd(e) {
    if (touch.current.active) validateSwipe();
    // --
    if (touch.current.focused) {
      touch.current.focused = false;
      if (isAutoPlayEnabled) startAutoPlay();
    }
  }

  function moveSlideTrack({
    isFast,
    translate,
    duration = defineTransitionDuration,
  }) {
    const { style } = slideTrackEl.current; //!cache it on pointerDown

    //set right duration
    if (isFast && style.transitionDuration !== "0ms") {
      style.transitionDuration = "0ms";
    } else if (!isFast) {
      if (style.transitionDuration !== duration) {
        style.transitionDuration = duration;
      }
    }

    // --translate
    const loopOffset = isLoop ? "- 100%" : ""; //-cache it
    style.transform = `translate${axis}(calc(${-translate}% ${loopOffset}))`;

    slider.current.currentTranslate = translate;
  }

  return (
    <div
      ref={slideEl}
      onPointerDown={(e) => {
        //return if rest or transition is active
        const { isTransitioning, reset } = slider.current;
        if (isTransitioning || reset.start) return;
        //--
        if (isAutoPlayEnabled) stopAutoPlay();
        //--gather touch details
        touch.current.focused = true;
        touch.current.startPoint = e[`client${axis}`];

        //releaser pointer capturing when there is one
        if (isTouchConstraint) {
          const isCapture = e.currentTarget.hasPointerCapture(e.pointerId);
          if (isCapture) e.currentTarget.releasePointerCapture(e.pointerId);
        }

        // //cache sliderTrack style
        // slider.current.slideTrackStyle = slideTrackEl.current.style;

        //define the right track length
        const { clientWidth, clientHeight } = e.currentTarget;
        slider.current.trackLength = isAxisX ? clientWidth : clientHeight;
      }}
      onPointerMove={(e) => {
        if (touch.current.focused) {
          touch.current.endPoint = e[`client${axis}`];
          const { startPoint, endPoint, active } = touch.current;
          const { trackLength, currentTranslate } = slider.current;
          const { accumulatedSwipe } = swipe.current;
          // --
          const delta = startPoint - endPoint;
          const nextSwipeTranslate = (delta / trackLength) * 100;

          moveSlideTrack({
            isFast: true,
            translate: accumulatedSwipe + nextSwipeTranslate,
          });

          // --
          swipe.current.currentSwipe = nextSwipeTranslate;
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
            transform: isLoop ? `translate${axis}(-100%)` : undefined,
          }}
          className={`ease-smooth transition-translate flex size-full *:size-full *:shrink-0 *:object-cover *:object-center ${
            isAxisX ? "" : "flex-col"
          }`}
        >
          {isLoop && (
            <OptimizedImg
              imgName={imgNameArr[imgNameArr.length - 1]}
              isDraggable={false}
              data-clone="last"
            />
          )}
          {imgNameArr.map((imgName, i) => (
            <OptimizedImg
              key={i}
              imgName={imgName}
              isDraggable={false}
              isLoadFast={i <= 2}
            />
          ))}
          {isLoop && (
            <OptimizedImg
              imgName={imgNameArr[0]}
              isDraggable={false}
              data-clone="first"
            />
          )}
        </div>

        {isAxisX ? (
          <HorizontalSliderNavigation
            slider={slider}
            stopAutoPlay={stopAutoPlay}
            startAutoPlay={startAutoPlay}
            isLoop={isLoop}
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
