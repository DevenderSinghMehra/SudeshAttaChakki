import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandTestimonialTextBox } from "./utility/BrandTestimonialTextBox";
import { OptimizedImg } from "./OptimizedImg";

export function BrandTestimonialSection(params) {
  /*//! add this to video player
     a centered play button
a small duration chip (0:48) */
  //  ! ifeel like it needs alot of tweaking for best tweaks, first enable video player then go about tweaking it.
  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat px-5 pb-6 max-sm:px-10 sm:px-20"
    >
      <BrandSectionTitle
        titleText="What People Think About Us"
        subTitleText="Because good food speaks through people’s trust."
      />
      <div className="mx-auto mt-14 max-w-140 max-[480px]:*:not-last:mb-3 min-[480px]:grid min-[480px]:grid-cols-2 min-[480px]:gap-3 lg:max-w-240 lg:grid-cols-4">
        <BrandTestimonialTextBox
          extraClassNames="col-span-2"
          bgClassName="bg-[#8E4A21]"
          isQuoteVisible={true}
          userName="Ayesha Kapoor"
          userOccupation="Young Student"
          userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts with preservatives or pre-packaged stock. What you get isn’t “as fresh as the farm harvest,” but it is “as fresh as a mill can make”."
        />
        <BrandTestimonialTextBox
          userName="Meera Gupta"
          userOccupation="Homemaker"
          userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts."
        />
        <BrandTestimonialTextBox
          bgClassName="bg-cream"
          isTextBlack={true}
          userName="Rahul Gupta"
          userOccupation="Homemaker"
          userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts."
        />
        <BrandTestimonialTextBox
          extraClassNames="col-span-2"
          userName="Karan Mehta"
          userOccupation="Yound Professional"
          userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts with preservatives or pre-packaged stock. What you get isn’t “as fresh as the farm harvest,” but it is “as fresh as a mill can make”."
        />

        <div className="relative h-[80svh] w-[min(100%,310px)] justify-self-center max-lg:col-span-full max-lg:mt-24 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-auto">
          <OptimizedImg
            imgName="farmerDoingFarming"
            className="absolute inset-0 size-full rounded-xl object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
