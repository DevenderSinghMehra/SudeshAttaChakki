import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandTestimonialTextBox } from "./utility/BrandTestimonialTextBox";

export function BrandTestimonialSection(params) {
  // !especifically for this layout ui and ux decision needs attention, the video frame is necessary to be there as it creates impact but it does not go well with the layout for tab vw. look into that later.
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
      <div className="mx-auto mt-14 max-lg:max-w-140 lg:mx-auto lg:flex lg:max-w-240 lg:gap-x-3">
        <div className="max-w-180 max-[480px]:*:not-last:mb-3 min-[480px]:grid min-[480px]:grid-cols-2 min-[480px]:gap-3 lg:grid-cols-3">
          <BrandTestimonialTextBox
            extraClassNames="col-span-2"
            bgClassName="bg-[#8E4A21]"
            isQuoteVisible={true}
            userName="Ayesha Kapoor"
            userOccupation="Young Student"
            userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts with preservatives or pre-packaged stock. What you get isn’t “as fresh as the farm harvest,” but it is “as fresh as a mill can make”."
          />
          <BrandTestimonialTextBox
            extraClassNames=""
            userName="Meera Gupta"
            userOccupation="Homemaker"
            userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts."
          />
          <BrandTestimonialTextBox
            extraClassNames=""
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
        </div>
        <div className="mx-auto h-[min(80svh,650px)] w-[min(100%,312px)] rounded-xl bg-[url(https://i.pinimg.com/736x/f5/0a/0f/f50a0fa0e97e68b634a6d11e1ede09eb.jpg)] bg-cover bg-center max-lg:mt-19 md:shrink-0 lg:h-auto lg:max-w-64"></div>
        {/* //!for this section ensure its heights maches as it was in the original design, and then have funciton for this video player where it expands when user clicks. there fore we do not need a vertical whole layount to que it is video even without that layout we can signal that and later a click and player will expands so it is fine. */}
      </div>
    </section>
  );
}
