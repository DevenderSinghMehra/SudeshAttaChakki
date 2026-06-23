import { SpriteIcon } from "../../SpriteIcon";

export function BrandTestimonialTextBox({
  bgClassName='bg-maroom',
  isQuoteVisible = false,
  userName,
  userOccupation,
  userReview,
  isTextBlack = false,
}) {
  return (
    <div
      className={`relative rounded-xl ${bgClassName} px-5 py-3.75 ${isTextBlack ? "text-black" : "text-white"} `}
    >
      {isQuoteVisible && (
        <SpriteIcon
          className="absolute -top-1 right-0 size-28 fill-[#FCF5DE]/50"
          iconName="double-quotes"
        />
      )}
      <span className="flex items-center">
        <span className="mr-5 inline-block h-14 w-14.25 rounded-[10px] bg-amber-500"></span>
        <div className="">
          <h6 className="font-merriweather font-bold">{userName}</h6>
          <p className="font-poppins text-xs">{userOccupation}</p>
        </div>
      </span>
      <p className="font-poppins mt-4 text-sm [&>b]:font-semibold">
        {userReview}
      </p>
    </div>
  );
}
