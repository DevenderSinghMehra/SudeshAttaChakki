export function BrandWhyChooseTextBox({ isAriaHidden, title, info }) {
  // !text should be little big in large screens take care of it later.
  return (
    <div
      aria-hidden={isAriaHidden}
      className="mb-10 flex last:mb-0 aria-hidden:hidden md:items-center lg:justify-between"
    >
      <div className=" h-fit max-w-151.25">
        <h4 className="font-merriweather text-xl font-bold">
          {title} <br className="sm:hidden" />
        </h4>
        <p className="font-poppins mt-3 text-sm [&>b]:font-semibold">{info}</p>
      </div>
      <div className="ml-3.5 h-51 shrink-0 rounded-sm bg-amber-500 bg-cover bg-center max-lg:w-[max(96px,20vw)] lg:h-45 lg:w-52"></div>
    </div>
  );
}
