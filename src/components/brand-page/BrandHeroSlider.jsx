import { useRef, useState } from "react";
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
  function getSliderAutoUpdated() {
    //the reason i shifted to 2 different slider states, focuse,active is because i do not want the user to trigger this function just for a click withouth any movement, only when movement is there i want to see what to do with the slide, else ignore any way it was just a click.
    isDragging.current.focused = false;
    isDragging.current.active = false;
    const { currentSwipeX } = isDragging.current;
    console.log(currentSwipeX);
    // --
    // debugger;
    if (currentSwipeX >= 30 && imgCount < 5) {
      updateSlider(currentSwipeX, "forward");
    } else if (currentSwipeX <= -30 && imgCount > 0) {
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
        isDragging.current.prevSwipeX = definedSlide;
        setImgCount(definedSlide / 100);
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
            transform: slideX ? `translateX(${-slideX}%)` : "",
          }}
          className={`flex size-full transition-transform ${isDragging.current.active ? "cursor-grabbing duration-0" : "cursor-grab"} *:size-full *:shrink-0 *:object-cover *:object-center`}
        >
          {/* <img src={images.heroImg} draggable="false" alt="" />
          <img src={images.forestImg} draggable="false" alt="" />
          <img src={images.catImg} draggable="false" alt="" />
          <img src={images.buildingImg} draggable="false" alt="" />
          <img src={images.building2Img} draggable="false" alt="" />
          <img src={images.mosqueImg} draggable="false" alt="" /> */}
          <div className="bg-blue-100"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-300"></div>
          <div className="bg-blue-400"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-600"></div>
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
