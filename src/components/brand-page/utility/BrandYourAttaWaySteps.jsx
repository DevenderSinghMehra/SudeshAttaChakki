import { SpriteIcon } from "../../SpriteIcon";
import React, { useEffect, useRef, useState } from "react";
import { useViewPort } from "../../Hooks/useViewPort";
export function BrandYourAttaWaySteps() {
  const stepsArray = ["Choose Grains", "Select Ratio", "We Mill & Deliver"];
  const isTablet = useViewPort({
    isMediaQuery: true,
    widthType: "maxWidth",
    widthNum: 966,
  });//!jsut remove this it pollutes window with alot of event listner not needed use window.mediaquery
  const [isSingleStep, setIsSingleStep] = useState(isTablet);
  const [activeStep, setActiveStep] = useState(1);
  const autoPlayId = useRef(0);

  useEffect(() => {
    if (isSingleStep !== isTablet) setIsSingleStep(isTablet);
  }, [isTablet]);

  useEffect(() => {
    if (isSingleStep) {
      autoPlayId.current = setInterval(() => {
        setActiveStep((prev) => {
          if (prev === 3) return 1;
          else return prev + 1;
        });
      }, 2000);
    } else clearInterval(autoPlayId.current);
    return () => clearInterval(autoPlayId.current);
  }, [isSingleStep]);

  function getSingleStep(stepsArray) {
    //!for this section as of now i do not want to add any animation also because it is looking good and else it will take some more time so i am shifting this to later.
    const index = activeStep - 1;
    return (
      <span className="flex shrink-0 flex-col items-center text-center">
        <span className="inline-block size-12 rounded-full border-3 border-black/29 py-1.5 text-2xl font-semibold md:size-13 md:py-2">
          {activeStep}
        </span>
        <p className="mt-1 text-xs font-semibold md:text-sm">
          {stepsArray[index]}
        </p>
      </span>
    );
  }

  function getAllSteps(stepsArray) {
    return stepsArray.map((stepName, i) => {
      const stepCount = i + 1;
      const isLast = stepsArray.length === stepCount;

      return (
        <React.Fragment key={i}>
          <span
            className={`${stepCount === 2 ? "" : "-mx-2"} flex shrink-0 flex-col items-center text-center`}
          >
            <span className="inline-block size-12 rounded-full border-3 border-black/29 py-1.5 text-2xl font-semibold md:size-13 md:py-2">
              {stepCount}
            </span>
            <p className="mt-1 text-xs font-semibold md:text-sm">{stepName}</p>
          </span>
          {isLast ? (
            ""
          ) : (
            <hr className="mb-6 w-full self-center border-t-3 border-black/29" />
          )}
        </React.Fragment>
      );
    });
  }

  return (
    <div className="bg-bread rounded-xxl relative w-full px-4.5 py-2 max-sm:hidden md:py-3">
      <button className="rounded-tr-xxl cursor-pointer absolute top-0 right-0 rounded-bl-sm bg-black/12 px-2.25 py-1.75">
        <SpriteIcon className="size-5 md:size-5.25" iconName="visit-link" />
        {/*//! add a shakign animation on hover for this icon later */}
        {/* //!i want a info suggestino like there is in chatgpt for this button when user hover that text should show up plus the icon should shake. */}
      </button>
      <div>
        <h6 className="mb-3 pr-7 text-sm font-semibold md:mb-6">
          {/* at 800px i want it to slide */}
          Your Atta Your Way
        </h6>
      </div>
      {/*! maybe add animation showing steps for this whole part. */}
      <div className="min-[965px]:flex min-[965px]:justify-between">
        {isSingleStep ? getSingleStep(stepsArray) : getAllSteps(stepsArray)}
      </div>
    </div>
  );
}
