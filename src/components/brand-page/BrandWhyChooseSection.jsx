import { useState } from "react";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import { BrandWhyChooseTextBox } from "./utility/BrandWhyChooseTextBox";

export function BrandWhyChooseSection(params) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat px-5 pb-6 min-[480px]:px-10 sm:px-20"
    >
      <BrandSectionTitle
        titleText="Why Choose Us"
        subTitleText="we ensure your nourishment remains clean, authentic, and trustworthy."
      />
      <div className="bg-cream mx-auto mt-7 max-w-240 px-4 py-5 transition-all min-[480px]:px-6 min-[480px]:pt-7 lg:px-8.5 lg:pt-8">
        <BrandWhyChooseTextBox
          title={
            <>
              Freshness,
              <br className="sm:hidden" /> The honest way
            </>
          }
          info={
            <>
              <b>No stock waiting on shelves.</b> Every batch of flour is ground
              only when you order it. We don’t chase shortcuts with
              preservatives or pre-packaged stock. What you get isn’t{" "}
              <q>
                as fresh as the farm harvest, but it is as fresh as a mill can
                make
              </q>
              .
              <br />
              <b>— a real difference you taste in every roti</b>
            </>
          }
        />
        <BrandWhyChooseTextBox
          title={
            <>
              No Pre-Packaged,
              <br className="sm:hidden" /> Compromise
            </>
          }
          info={
            <>
              <b>No dusty bags lying for months.</b> We keep no inventory. Your
              flour doesn’t begin its journey until you ask for it. That means
              it comes to your kitchen without losing freshness in storage.
              <br />
              <b>— we ground only when you ask for it</b>
            </>
          }
        />
        {isReadMore && (
          <>
            <BrandWhyChooseTextBox
              title={
                <>
                  Fresh & Hassle-Free,
                  <br className="sm:hidden" /> Delivery
                </>
              }
              info={
                <>
                  <b>Heavy bags, light on you.</b> We know atta can be tough to
                  carry, especially for elders and homemakers. That’s why we
                  chose to decide freshly milled flour straight to your
                  doorstep. <q>No more lifting, no more trips.</q>
                  <br />
                  <b>
                    — just clean, authentic, and fresh nourishment delivered
                    with care
                  </b>
                </>
              }
            />
            <BrandWhyChooseTextBox
              title={
                <>
                  Always Learning,
                  <br className="sm:hidden" /> Always listening
                </>
              }
              info={
                <>
                  <b>Your health and satisfaction guide us.</b> From
                  personalized mixes to home delivery, everything is built with
                  you in mind.{" "}
                  <q>
                    We may not be perfect and we don’t want to pretend we are
                  </q>
                  <br />
                  <b>
                    — instead, we promise to keep listening, improving, and
                    evolving with your needs.
                  </b>
                </>
              }
            />
          </>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="font-poppins rounded-md bg-black/12 px-3 py-2 text-sm active:bg-black/20"
          >
            Read More
          </button>
        </div>
      </div>
    </section>
  );
}
