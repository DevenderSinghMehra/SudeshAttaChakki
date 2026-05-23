import Hamburger from "./mobile/Hamburger";
import { Logo } from "./Logo";

export function BrandNavBar() {
  return (
    <nav className="flex items-center justify-between bg-bread p-4">
      {/* //the x axis padding is not equal on both sides. */}
      <Logo />
      <Hamburger />
    </nav>
  );
}