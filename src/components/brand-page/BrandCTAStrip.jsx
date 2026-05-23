import dummyImage from "../../assets/madhu.jpg";
import Icons from "../../assets/spriteIcons.svg?url&no-inline";
export function BrandCTAStrip() {
  const mobile = true;
  // const widthWithoutScrollBar = document.documentElement.clientWidth;
  // console.log(widthWithoutScrollBar);
  return (
    <div className="font-poppins flex shrink-0 gap-x-1.5 px-1.5 pb-1.5">
      <div className="bg-bread relative w-[clamp(232px,60%,450px)] rounded-2xl px-4.5 pt-2 pb-3">
        <button className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-sm bg-black/12 px-2.5 py-1.25">
          <svg className="size-4.5">
            <use href={`${Icons}#double-dots`}></use>
          </svg>
        </button>
        <h6 className="mini-sm:text-center mb-2.5 text-start text-sm font-semibold">
          Testimonials
        </h6>
        <div className="text-xs">
          <span className="mb-2.25 flex items-center gap-x-2.5">
            <div
              className={`h-12 w-13 rounded-xl bg-amber-600 bg-[url(/src/assets/madhu.jpg)] bg-size-[4.5rem] bg-top`}
            ></div>
            <span>
              <p className="mini-sm:whitespace-normal -mb-1 font-semibold whitespace-nowrap">
                Kamla Verma
              </p>
              <p className="text-[10px]">House Wife</p>
            </span>
          </span>
          <p className="line-clamp-2">
            The texture is perfect, and the rotis stay soft for hours. I’ve
            <span>
              {mobile
                ? "..."
                : " switched completely to Sudesh Atta—it feels fresher and more wholesome than anything I’ve used before."}
            </span>
          </p>
        </div>
      </div>
      <span className="bg-bread flex w-[clamp(142px,37.5%,186px)] flex-col rounded-2xl p-4 pt-2">
        <p className="text-sm font-semibold max-[410px]:h-5 max-[410px]:relative max-[410px]:overflow-x-clip max-[410px]:whitespace-nowrap min-[410px]:text-center">
          <span className="max-[410px]:animate-slide max-[410px]:absolute max-[410px]:inline-block max-[410px]:px-2">
            Connect with Us
          </span>
          <span className="max-[410px]:animate-delayed-slide hidden max-[410px]:absolute max-[410px]:inline-block max-[410px]:px-2 max-[410px]:opacity-0">
            Connect with Us
          </span>
        </p>
        <svg className="m-auto size-20 active:opacity-70">
          <use href={`${Icons}#whatsapp-icon`}></use>
        </svg>
      </span>
    </div>
  );
}
