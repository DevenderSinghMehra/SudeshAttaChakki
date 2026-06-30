import dummyImage from "../../../assets/madhu.jpg";
import { SlidingText } from "../../SlidingText";
import { SpriteIcon } from "../../SpriteIcon";
import { BrandYourAttaWaySteps } from "./BrandYourAttaWaySteps";
export function BrandCTAStrip() {
  //!later i want to implement, slide ability for CTA strip as teh whole strip is not visible as of now and i want to ensure it remains there only slider can save use. funthing i want to implement it with my custom slider logic. lets say iam posponing to not stop the progress in between.
  return (
    <div className="font-poppins flex  shrink-0 gap-x-1.5 px-1.5 pb-1.5 md:gap-x-1.75 md:px-1.75 md:pb-1.75">
      <div className="bg-bread rounded-xxl relative w-[max(232px,75%)] px-4.5 pt-2 pb-3 sm:w-[min(400px,50%)] sm:shrink-0 md:pt-3">
        <button className="rounded-tr-xxl absolute top-0 right-0 cursor-pointer rounded-bl-sm bg-black/12 px-2.5 py-1.25">
          <SpriteIcon
            className="size-4.5 md:size-5.75"
            iconName="double-dots"
          />
        </button>
        <h6 className="mini-sm:text-center mb-2.5 text-sm font-semibold">
          Testimonials
        </h6>
        <div className="text-xs">
          <span className="mb-2.25 flex items-center gap-x-2.5 md:mb-3.25">
            <div
              className={`h-12 w-13 rounded-xl bg-amber-600 bg-[url(/src/assets/madhu.jpg)] bg-size-[4.5rem] bg-top md:h-12.5 md:w-13.5`}
            ></div>
            <span>
              <p className="mini-sm:whitespace-normal -mb-1 font-semibold whitespace-nowrap md:mb-0">
                Kamla Verma
              </p>
              <p className="text-[0.83em]">House Wife</p>
            </span>
          </span>
          <p className="line-clamp-2 md:line-clamp-none">
            The texture is perfect, and the rotis stay soft for hours. I’ve
            switched completely to Sudesh Atta—it feels fresher and more
            wholesome than anything I’ve used before.
          </p>
        </div>
      </div>
      <span className="bg-bread rounded-xxl w-[clamp(142px,35%,168px)] p-4 pt-2 sm:shrink-0 md:pt-3">
        <SlidingText text="Connect With Us" />
        {/* create a slider text logic resuable componet where you jsut give your text and when you want it to run and all set. */}
        <a
          href="https://wa.me/919876543210?text=Hello"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block cursor-pointer"
        >
          <SpriteIcon
            className="mx-auto size-20 active:opacity-70 md:size-21"
            iconName="whatsapp-icon"
          />
        </a>
      </span>
      <BrandYourAttaWaySteps />
    </div>
  );
}
