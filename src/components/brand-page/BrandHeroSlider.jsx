import { useEffect, useRef, useState } from "react";
import heroImg from "../../assets/hero section images panel.png";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
export function BrandHeroSlider() {
  // const sliderSlabs = useRef(null);
  const isDragging = useRef({});
  const [imgCount, setImgCount] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const images = {
    heroImg,
    forestImg:
      "https://img.magnific.com/free-photo/vertical-shot-curvy-road-forest-covered-yellowing-trees-dried-leaves-autum_181624-58749.jpg?t=st=1779442677~exp=1779446277~hmac=ad2c43df7a27ac449a4aa579370dbb28e0713784c3f3fa36a963d6e0d36d5e31&w=1060",
    buildingImg:
      "https://images.pexels.com/photos/27666784/pexels-photo-27666784.jpeg?_gl=1*ulqpdi*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk0Njg2MjQkbzIkZzEkdDE3Nzk0Njg2MzQkajUwJGwwJGgw",
    mosqueImg:
      "https://images.pexels.com/photos/17976242/pexels-photo-17976242.jpeg?_gl=1*gc998f*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk0Njg2MjQkbzIkZzEkdDE3Nzk0Njg2NzgkajYkbDAkaDA.",
    building2Img:
      "https://images.pexels.com/photos/37703569/pexels-photo-37703569.jpeg?_gl=1*hwik9o*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk1MjQzNjEkbzMkZzEkdDE3Nzk1MjQzNjQkajU3JGwwJGgw",
    catImg:
      "https://images.pexels.com/photos/37681897/pexels-photo-37681897.png?_gl=1*3mftbd*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk1MjQzNjEkbzMkZzEkdDE3Nzk1MjQzNzQkajQ3JGwwJGgw",
  };

  useEffect(() => {
    if (isDragging.current.resetRequired?.status) {
      const { action } = isDragging.current.resetRequired;
      // --
      const resetValue = action === "toStart" ? 0 : 5 * 100;
      setSlideX(resetValue);
      isDragging.current.prevSwipeX = resetValue;
      isDragging.current.resetRequired = { status: true, action: "none" };//need to keep it true so the when component renders again UseEffects runs and then i will update status. what to do there was no other way to make this 3 useEffect run and do it in one. 
    }
    /* return () => {
      isDragging.current.resetRequired = { status: false, action: "none" };
    }; */ //cleanUp function not necessary for my case as anyway with each action i am setting to false.
  }, [isDragging.current.resetRequired]);

  function getSliderAutoUpdated() {
    //the reason i shifted to 2 different slider states, focuse,active is because i do not want the user to trigger this function just for a click withouth any movement, only when movement is there i want to see what to do with the slide, else ignore any way it was just a click.
    isDragging.current.focused = false;
    isDragging.current.active = false;
    const { currentSwipeX } = isDragging.current;
    // --
    // debugger;
    if (currentSwipeX >= 30) {
      updateSlider(currentSwipeX, "forward");
    } else if (currentSwipeX <= -30) {
      updateSlider(currentSwipeX, "backward");
    } else {
      console.log("this one ran.", slideX);
      setSlideX((prevState) => prevState - currentSwipeX);
    }
    //its little tricky to understad this prevState - currentSwipeX but it works the key is currentswipe can be a negative value or a positive value.

    function updateSlider(currentSwipeX, action) {
      const swipeAction = {
        forward: (a, b) => a + b,
        backward: (a, b) => a - b,
      };
      const swipeRequirement = {
        forward: (a) => 100 - a,
        backward: (b) => 100 + b,
      };

      const requirement = swipeRequirement[action](currentSwipeX);
      setSlideX((prevState) => {
        const definedSlide = swipeAction[action](prevState, requirement);
        const pointer = definedSlide / 100;
        isDragging.current.prevSwipeX = definedSlide;
        // --
        if (pointer === -1) {
          setImgCount(5);
          isDragging.current.resetRequired = { status: true, action: "toEnd" };
          console.log("i ran");
        } else if (pointer === 6) {
          setImgCount(0);
          isDragging.current.resetRequired = {
            status: true,
            action: "toStart",
          };
        } else setImgCount(pointer);

        // --
        return definedSlide;
      });
    }
  }

  return (
    <div
      onPointerDown={(e) => {
        //when i am double clicking, the Pointer move event i not getting fired fix it.
        isDragging.current.focused = true;
        isDragging.current.startPoint = e.clientX;
        // don’t complicate code disproportionately for microscopic gains. but yes reading and comparison is faster then mutation.
        const { sliderWidth } = isDragging.current;
        if (sliderWidth === undefined) {
          isDragging.current.prevSwipeX = 0; // it is the first time so there cannot be a swipe.
        }
        if (sliderWidth !== e.currentTarget.clientWidth) {
          isDragging.current.sliderWidth = e.currentTarget.clientWidth;
        }
      }}
      onPointerMove={(e) => {
        // the slider still have problem, instarting when i doing a left swipe it is breaking the code, and wheni am clicking then the slider is moving for some reason, + sliding limits are not enfroced that also needs attention.
        if (isDragging.current.focused) {
          isDragging.current.endPoint = e.clientX;
          const { endPoint, startPoint, sliderWidth, prevSwipeX, active } =
            isDragging.current;
          const deltaX = startPoint - endPoint;
          const swipeX = Math.round((deltaX / sliderWidth) * 100);
          // console.log(prevSwipeX, swipeX);
          setSlideX(prevSwipeX + swipeX);
          isDragging.current.currentSwipeX = swipeX;
          if (!active) isDragging.current.active = true;
        }
      }}
      onPointerUp={() => {
        if (isDragging.current.active) getSliderAutoUpdated();
      }}
      onPointerLeave={() => {
        if (isDragging.current.active) getSliderAutoUpdated();
      }}
      className="relative h-full min-h-95 cursor-grab touch-pan-y select-none"
    >
      <div className="absolute inset-0 overflow-clip">
        <div
          style={{
            transform: `translateX(calc(${-slideX}% - 100%))`,
          }}
          className={`flex size-full transition-transform ${isDragging.current.resetRequired?.status ? "duration-0" : ""} ${isDragging.current.active ? "cursor-grabbing duration-0" : "cursor-grab"} *:size-full *:shrink-0 *:object-cover *:object-center`}
        >
          {/* <img src={images.heroImg} draggable="false" alt="" />
          <img src={images.forestImg} draggable="false" alt="" />
          <img src={images.catImg} draggable="false" alt="" />
          <img src={images.buildingImg} draggable="false" alt="" />
          <img src={images.building2Img} draggable="false" alt="" />
          <img src={images.mosqueImg} draggable="false" alt="" /> */}
          <div className="bg-sky-200" aria-label="last-clone"></div>
          <div className="bg-stone-300"></div>
          <div className="bg-amber-200"></div>
          <div className="bg-orange-300"></div>
          <div className="bg-lime-200"></div>
          <div className="bg-teal-200"></div>
          <div className="bg-sky-200"></div>
          <div className="bg-stone-300" aria-label="first-clone"></div>
        </div>
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
