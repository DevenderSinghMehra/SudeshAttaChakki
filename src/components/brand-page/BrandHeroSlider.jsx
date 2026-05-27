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
    isDragging.current.status = false;
    const { currentSwipeX } = isDragging.current;
    // --
    if (currentSwipeX >= 30) {
      updateSlider(currentSwipeX, "forward");
    } else if (currentSwipeX <= -30) {
      updateSlider(currentSwipeX, "backward");
    } else setSlideX((prevState) => prevState - currentSwipeX);
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
        return definedSlide;
      });
    }
  }

  /*   function storeSlabs(elWidth) {
    const slabs = {
      leftUpperLimit: Math.round(elWidth * 0.3),
      rightLowerLimit: Math.round(elWidth * 0.7),
    };

    sliderSlabs.current = slabs;
  }
  // console.log(imgCount); */
  return (
    <div
      onPointerDown={(e) => {
        console.log("onPointerDown");
        //when i am double clicking, the Pointer move event i not getting fired fix it.
        isDragging.current.status = true;
        isDragging.current.startPoint = e.clientX;
        if (!isDragging.current.sliderWidth) {
          isDragging.current.sliderWidth = e.currentTarget.clientWidth;
          isDragging.current.prevSwipeX = 0; // it is the first time so there cannot be a swipe.
        }
        // isDragging.current = { status: true, startPoint: e.clientX };//creating new object is heavy then mutating an existing object.
        // if (!sliderSlabs.current) storeSlabs(e.currentTarget.clientWidth);
        // // --
        // const { leftUpperLimit, rightLowerLimit } = sliderSlabs.current;
        // const pointerX = e.clientX;
        // //this touch which side logic willwork here fine,but it assumes the element we are detecting touch upon has a width = vw, else e.ClientX alone will not be enougth just leving note for future build.
        // if (imgCount > 0 && pointerX <= leftUpperLimit) {
        //   setImgCount((prev) => --prev);
        // } else if (imgCount < 5 && pointerX >= rightLowerLimit) {
        //   setImgCount((prev) => ++prev);
        // }
      }}
      onPointerMove={(e) => {
        // the slider still have problem, instarting when i doing a left swipe it is breaking the code, and wheni am clicking then the slider is moving for some reason, + sliding limits are not enfroced that also needs attention.
        // console.log('ran')
        if (isDragging.current.status) {
          isDragging.current.endPoint = e.clientX;
          const { endPoint, startPoint, sliderWidth, prevSwipeX } =
            isDragging.current;
          // console.log(prevSwipeX, slideX);
          const deltaX = startPoint - endPoint;
          // console.log(deltaX);
          /*   // this swipes has been named on the bases on content movement not finger movement,
          const isRightSwipe = deltaX < 20;
          const isLeftSwipe = deltaX > 20; */
          const swipeX = Math.round((deltaX / sliderWidth) * 100);
          setSlideX(prevSwipeX + swipeX);
          isDragging.current.currentSwipeX = swipeX;
        }
      }}
      onPointerUp={() => {
        if (isDragging.current.status) getSliderAutoUpdated();
      }}
      onPointerLeave={() => {
        if (isDragging.current.status) getSliderAutoUpdated();
      }}
      className="relative h-full min-h-95 touch-pan-y"
    >
      <div className="absolute inset-0 overflow-clip">
        <div
          style={{
            transform: slideX ? `translateX(-${slideX}%)` : "",
          }}
          className={`flex size-full transition-transform ${isDragging.current.status ? "duration-0" : ""} *:size-full *:shrink-0 *:object-cover *:object-center`}
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
          const active = "bg-white! px-2! transition-[padding] duration-300";
          return <span key={i} className={imgCount === i ? active : ""}></span>;
        })}
      </div>
    </div>
  );
}
