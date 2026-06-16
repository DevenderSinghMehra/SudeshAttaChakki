import dummyImage from "../../assets/madhu.jpg";
import { SpriteIcon } from "../SpriteIcon";
export function BrandCTAStrip() {
  const stepsArray = ["Choose Grains", "Select Ratio", "We Mill & Deliver"];
  //!later i want to implement, slide ability for CTA strip as teh whole strip is not visible as of now and i want to ensure it remains there only slider can save use. funthing i want to implement it with my custom slider logic. lets say iam posponing to not stop the progress in between.
  return (
    <div className="font-poppins flex shrink-0 gap-x-1.5 px-1.5 pb-1.5 md:gap-x-2 md:px-2 md:pb-2">
      <div className="bg-bread relative w-[clamp(232px,60%,450px)] shrink-0 rounded-xxl px-4.5 pt-2 pb-3 md:pt-4">
        <button className="absolute top-0 right-0 rounded-tr-xxl rounded-bl-sm bg-black/12 px-2.5 py-1.25">
          <SpriteIcon className="size-4.5 md:size-6.5" iconName="double-dots" />
        </button>
        <h6 className="mini-sm:text-center mb-2.5 text-sm font-semibold md:text-base">
          Testimonials
        </h6>
        <div className="text-xs md:text-sm">
          <span className="mb-2.25 flex items-center gap-x-2.5 md:mb-3.5">
            <div
              className={`h-12 w-13 rounded-xl bg-amber-600 bg-[url(/src/assets/madhu.jpg)] bg-size-[4.5rem] bg-top md:h-13 md:w-14`}
            ></div>
            <span>
              <p className="mini-sm:whitespace-normal -mb-1 font-semibold whitespace-nowrap md:mb-0">
                Kamla Verma
              </p>
              <p className="text-[0.83em]">House Wife</p>
            </span>
          </span>
          <p className="line-clamp-2 md:line-clamp-none md:text-sm">
            The texture is perfect, and the rotis stay soft for hours. I’ve
            switched completely to Sudesh Atta—it feels fresher and more
            wholesome than anything I’ve used before.
          </p>
        </div>
      </div>
      <span className="bg-bread flex w-[clamp(142px,37.5%,186px)] shrink-0 flex-col rounded-xxl p-4 pt-2 md:pt-4">
        <p className="text-sm font-semibold max-[410px]:relative max-[410px]:h-5 max-[410px]:overflow-x-clip max-[410px]:whitespace-nowrap min-[410px]:text-center md:text-base">
          <span className="max-[410px]:animate-slide max-[410px]:absolute max-[410px]:inline-block max-[410px]:px-2">
            Connect with Us
          </span>
          <span className="max-[410px]:animate-delayed-slide hidden max-[410px]:absolute max-[410px]:inline-block max-[410px]:px-2 max-[410px]:opacity-0">
            Connect with Us
          </span>
        </p>
        <SpriteIcon
          className="m-auto size-20 active:opacity-70 md:size-25"
          iconName="whatsapp-icon"
        />
      </span>
      <div className="bg-bread rounded-xxl relative hidden w-full px-4.5 py-4 md:block">
        <button className="rounded-tr-xxl absolute top-0 right-0 rounded-bl-sm bg-black/12 px-2.25 py-1.75">
          <SpriteIcon className="size-6 md:size-8" iconName="visit-link" />
        </button>
        <h6 className="mb-3 text-sm font-semibold md:mb-6 md:text-base">
          Your Atta Your Way
        </h6>
        <div className="relative flex justify-between">
          {stepsArray.map((step, i) => {
            const stepNum = i + 1;
            const isLast = stepNum === stepsArray.length;
            const divider = (
              <hr className="mb-6 w-full self-center border-t-3 border-black/29" />
            );
            return (
              <>
                <span className="relative shrink-0 text-center">
                  <span className="inline-block size-12 rounded-full border-3 border-black/29 py-1.5 text-2xl font-semibold md:size-14 md:py-2 md:text-3xl">
                    {stepNum}
                  </span>
                  <p className="mt-1 text-xs font-semibold md:text-sm">
                    {step}
                  </p>
                </span>
                {isLast ? "" : divider}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
