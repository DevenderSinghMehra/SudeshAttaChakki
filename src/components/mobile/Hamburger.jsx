import { useState } from "react";
import Icons from "../../assets/spriteIcons.svg?url&no-inline";
export default function Hamburger() {
  const [isClick, setIsClick] = useState(false);
  return (
    <button
      onClick={() => {
        setIsClick(!isClick);
      }}
      className="rounded-md px-2.5 py-2.5 active:bg-black/4"
    >
      <svg className="size-5">
        <use href={`${Icons}${isClick ? "#cross" : "#hamburger"}`}></use>
      </svg>
    </button>
    // <button className="rounded-md px-2.5 py-2.5 *:h-[2.5px] *:w-4.75 *:bg-black active:bg-black/4">
    //   {/* block element height grow with content, no need to do h-fit-content. */}
    //   <div className="mb-0.75"></div>
    //   <div className="mb-0.75"></div>
    //   <div></div>
    // </button>//later make html version of it, it shows compitent, but it looks ugly then svg.
  );
}
