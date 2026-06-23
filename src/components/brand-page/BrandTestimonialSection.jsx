import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandTestimonialTextBox } from "./utility/BrandTestimonialTextBox";

export function BrandTestimonialSection(params) {
  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat px-5 pb-6 min-[480px]:px-10 sm:px-20"
    >
      <BrandSectionTitle
        titleText="What People Think About Us"
        subTitleText="Because good food speaks through people’s trust."
      />
      <div>
        <BrandTestimonialTextBox
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
          userName="Karan Mehta"
          userOccupation="Yound Professional"
          userReview="No stock waiting on shelves. Every batch of flour is ground only when you order it. We don’t chase shortcuts with preservatives or pre-packaged stock. What you get isn’t “as fresh as the farm harvest,” but it is “as fresh as a mill can make”."
        />
      </div>
    </section>
  );
}
