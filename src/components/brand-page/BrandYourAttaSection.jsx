import mudPaper from "../../assets/mudPaper.webp";
import scooter from "../../assets/scooter.png";
import { CustomSlider } from "../CustomSlider";
import { SpriteIcon } from "../SpriteIcon";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import { BrandYourAttaStepCard } from "./utility/BrandYourAttaStepCard";
import { BrandYourAttaStepCardBadge } from "./utility/BrandYourAttaStepCardBadge";

export function BrandYourAttaSection() {
  // !make it grid only later the roi as of now is less so i am not doing it now. as from performance and clarity pov it is still solid, it is jsut when one can do why use 2. but again even if you left it, it will be ok this is low roi change.
  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat pb-18"
    >
      <BrandSectionTitle
        titleText="Your Atta, Your Way"
        subTitleText="enter your text here"
      />
      <div className="mt-14 px-5 md:flex md:justify-center md:gap-x-2 lg:gap-x-4">
        <div className="max-md:mb-13.75 lg:grid lg:w-140 lg:grid-cols-[1.5fr_2.25fr] lg:gap-4">
          <BrandYourAttaStepCard
            imgWidthStyles="w-37 max-[372px]:w-[max(108px,42%)]"
            badgePositions="translate-x-[-40%] translate-y-[-45%]"
            stepCount={1}
            title="Choose Grains"
            textBoxPadding="min-[326px]:pt-2.75"
            info={
              <>
                Wheat, Millets, Corn <br className="max-[340px]:hidden" />
                and so on.
              </>
            }
          />
          {/* //*card 2 */}
          <div className="bg-cream relative mx-auto mb-1 rounded-[10px] p-5 max-lg:max-w-80.5 md:mb-2 lg:mb-0 lg:w-full lg:p-7.5">
            <div className="flex items-center lg:items-start">
              <h4 className="font-merriweather mb-0.5 text-xl font-bold lg:text-2xl">
                Create <br /> Your Own Mix
              </h4>
              <SpriteIcon
                className="fill-maroom ml-4.5 size-9 lg:ml-6 lg:size-12"
                iconName="visit-link"
              />
            </div>
            <p className="font-poppins text-sm">
              We mill in small batches every <br className="max-lg:hidden" />
              <b className="font-semibold">1-2 days</b> to ensure freshness
              conserve energy and protect nutrients, its worth the short wait.
            </p>
            <BrandYourAttaStepCardBadge
              stepCount={2}
              positions="-bottom-4 -right-4"
            />
          </div>
          {/* //*card 2 */}

          <div className="h-full w-full rounded-[10px] bg-amber-300 max-lg:hidden"></div>
          <BrandYourAttaStepCard
            imgWidthStyles="w-30.25  max-[372px]:w-[max(100px,35%)] lg:hidden "
            badgePositions="max-lg:translate-x-[-40%] max-lg:translate-y-[-45%] lg:-bottom-4 lg:-left-4"
            stepCount={3}
            title="We Mill & Deliver"
            textBoxPadding="min-[326px]:pt-2.75 lg:pb-2 lg:pt-4"
            info={
              <>
                <b className="font-semibold">Fresh delivery</b> with-in
                <br className="max-[340px]:hidden" /> 1-2 days.
                <img
                  src={scooter}
                  className="absolute right-1.75 bottom-2.5 max-lg:hidden"
                />
              </>
            }
          />
        </div>
        <div className="h-66 w-[min(322px,100%)] overflow-clip rounded-[10px] bg-amber-300 max-md:mx-auto md:h-auto lg:w-2xs">
          <CustomSlider
            defineTransitionDuration="800ms"
            autoPlayDuration={5000}
            imgNameArr={[
              "heroImg-1",
              "heroImg-2",
              "heroImg-3",
              "heroImg-1",
              "heroImg-2",
              "heroImg-3",
            ]}
            isAutoPlayEnabled={true}
            setAxis="X"
          />
        </div>
      </div>
    </section>
  );
}
