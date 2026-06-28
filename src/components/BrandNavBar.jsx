import Hamburger from "./mobile/Hamburger";
import { Logo } from "./Logo";

export function BrandNavBar() {
  // !the navBar should become pill when scroll down. and it shoud resize on hover like on this we bpage: https://www.anuragsinghdev.com/-- this will make it look sick for a brand page.
  return (
    <nav className="flex items-center justify-between bg-bread p-4">
      {/* //the x axis padding is not equal on both sides. */}
      <Logo />
      <Hamburger />
    </nav>
  );
}