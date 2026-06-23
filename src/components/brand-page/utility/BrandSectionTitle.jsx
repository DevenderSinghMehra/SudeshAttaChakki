export function BrandSectionTitle({ titleText, subTitleText }) {
  return (
    <>
      <h1 className="font-merriweather pt-8 text-center text-3xl md:text-4xl font-bold">
        {titleText}
      </h1>
      {subTitleText && <p className="text-center mt-1.25 md:mt-2">{subTitleText}</p>}
    </>
  );
}
