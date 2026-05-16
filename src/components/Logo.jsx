export function Logo() {
  return (
    <div className="font-open-sans w-fit">
      {/*though width- fit content is not needed as it will used under flex in navBar, but for rest of that place it may be handly so i am leaving it like this only.  */}
      <span className="mr-2.5 text-4xl font-extrabold tracking-tight">
        SUDESH
      </span>
      <span className="inline-block w-1/6 text-xs/3.75">ATTA CHAKKI</span>
    </div>
  );
}
