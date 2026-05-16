import Hamburger from "./mobile/Hamburger";
import { Logo } from "./Logo";

export function BrandNavBar() {
  return (
    <nav className="flex items-center justify-between bg-[#FCF5DE] p-4">
      <Logo />
      <Hamburger />
    </nav>
  );
}
