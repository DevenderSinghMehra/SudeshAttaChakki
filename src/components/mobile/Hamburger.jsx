export default function Hamburger() {
  return (
    <div className="rounded-md px-2.5 py-2.5 *:h-0.75 *:w-5.25 *:bg-black active:bg-black/4">
      {/* block element height grow with content, no need to do h-fit-content. */}
      <div className="mb-1"></div>
      <div className="mb-1"></div>
      <div></div>
    </div>
  );
}
