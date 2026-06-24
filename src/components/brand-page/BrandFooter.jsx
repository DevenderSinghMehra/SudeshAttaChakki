import { Logo } from "../Logo";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandFooterList } from "./utility/BrandFooterList";
import { BrandFooterContactList } from "./utility/BrandFooterContactList";
import { SpriteIcon } from "../SpriteIcon";

export function BrandFooter(params) {
  const socialLinks = [
    { href: "https://www.facebook.com/", iconName: "facebook" },
    { href: "https://wa.me/919876543210?text=Hello", iconName: "whatsapp" },
    { href: "https://www.instagram.com/", iconName: "instagram" },
  ];

  return (
    <footer
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat"
    >
      <div className="h-[30%] bg-green-700"></div>
      <div className="h-[70%] bg-[#4A2B1F] px-6 pt-7 text-white">
        <div className="font-poppins mx-auto mt-5 grid grid-cols-2 border-b border-white/40 pb-4 max-lg:gap-y-8 md:grid-cols-3 lg:mt-10 lg:max-w-5xl lg:grid-cols-4 lg:pb-12">
          <div className="max-lg:col-span-3 max-md:col-span-2">
            <Logo isSlogan={true} />
            <div className="mt-3 flex gap-x-3">
              {socialLinks.map(({ href, iconName }) => (
                <a
                  href={href}
                  className="size-9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpriteIcon
                    className="size-7.5 shrink-0 fill-white lg:hover:size-8"
                    iconName={iconName}
                  />
                </a>
              ))}
            </div>
          </div>

          <BrandFooterList
            heading="Quick Links"
            listArr={["Who We Are", "Products", "Why Choose Us", "Contact Us"]}
          />
          <BrandFooterList
            heading="Help"
            listArr={[
              "FAQ",
              "Shipping & Delivery",
              "Returns & Refunds",
              "Privacy Policy",
            ]}
          />

          <BrandFooterContactList
            phoneNumber="1234567890"
            mailAdrress="hello@example.com"
            LocationName="Dwarka, New-Delhi"
            locationMapLink="https://share.google/awFdRyshOsgl8PMb4"
          />
        </div>
        <p className="py-1.5 text-center text-xs font-semibold text-white/80">
          ©2024 Sudesh Atta Chakki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
