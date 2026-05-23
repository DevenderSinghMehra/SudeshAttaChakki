import { useRef, useState } from "react";
import heroImg from "../../assets/hero section images panel.png";
export function BrandHeroSlider() {
  const sliderSlabs = useRef(null);
  const [imgCount, setImgCount] = useState(0);

  const images = [
    heroImg,
    "https://img.magnific.com/free-photo/vertical-shot-curvy-road-forest-covered-yellowing-trees-dried-leaves-autum_181624-58749.jpg?t=st=1779442677~exp=1779446277~hmac=ad2c43df7a27ac449a4aa579370dbb28e0713784c3f3fa36a963d6e0d36d5e31&w=1060",
    "https://images.pexels.com/photos/27666784/pexels-photo-27666784.jpeg?_gl=1*ulqpdi*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk0Njg2MjQkbzIkZzEkdDE3Nzk0Njg2MzQkajUwJGwwJGgw",
    "https://images.pexels.com/photos/17976242/pexels-photo-17976242.jpeg?_gl=1*gc998f*_ga*MjEyMTAzNTIwLjE3Nzg4MzQ3MDE.*_ga_8JE65Q40S6*czE3Nzk0Njg2MjQkbzIkZzEkdDE3Nzk0Njg2NzgkajYkbDAkaDA.",
  ];

  function storeSlabs(elWidth) {
    const slabs = {
      leftUpperLimit: Math.round(elWidth * 0.3),
      rightLowerLimit: Math.round(elWidth * 0.7),
    };

    sliderSlabs.current = slabs;
  }
  // console.log(imgCount);
  return (
    <div
      onPointerDown={(e) => {
        if (!sliderSlabs.current) storeSlabs(e.currentTarget.clientWidth);
        // --
        const { leftUpperLimit, rightLowerLimit } = sliderSlabs.current;
        const pointerX = e.clientX;
        //this touch which side logic willwork here fine,but it assumes the element we are detecting touch upon has a width = vw, else e.ClientX alone will not be enougth just leving note for future build.
        if (imgCount > 0 && pointerX <= leftUpperLimit) {
          setImgCount((prev) => --prev);
        } else if (imgCount < 5 && pointerX >= rightLowerLimit) {
          setImgCount((prev) => ++prev);
        }
      }}
      className="relative h-full min-h-95"
    >
      <div className="relative size-full gap-x-4 overflow-clip">
        {images.map((imgUrl, i) => {
          let position = "";
          if (imgCount > i) position = "-translate-x-full ";
          else if (imgCount < i) position = "translate-x-full ";
          return (
            <img
              className={`${position} absolute inset-0 size-full object-cover transition-transform duration-1000`}
              src={imgUrl}
              alt=""
              srcset=""
            />
          );
        })}
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
