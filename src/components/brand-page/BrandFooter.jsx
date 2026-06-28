import { Logo } from "../Logo";
import { getImg } from "/src/helpers/getImg";
import mudPaper from "/src/assets/mudPaper.webp";
import { BrandFooterList } from "./utility/BrandFooterList";
import { BrandFooterContactList } from "./utility/BrandFooterContactList";
import { SpriteIcon } from "../SpriteIcon";
import { OptimizedImg } from "./OptimizedImg";

export function BrandFooter(params) {
  // !this is a design convery i was liking the bg with sky, from the image but earlier i designed it differenly now suddenly i do no want to change teh design decision plus the impacts get less maybe it can be helpfull though sky brings in space makes thing feel lightly but it might nog well with the layout. think about this later.

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
      <div className="h-44 overflow-hidden bg-[#556B2F]">
        {/* <span
          style={{ backgroundImage: `url(${cropFieldBg})` }}
          className="absolute inset-0 bg-cover bg-center opacity-30"
        ></span> */}
        {/* <img
          className="size-full object-cover object-top opacity-50"
          src={cropFieldBg.src}
          alt="cropFieldBg"
          srcset={cropFieldBg.srcSetStr}
          sizes="100vw"
        /> */}

        <OptimizedImg
          imgName="cropFieldBackground"
          className="size-full object-cover object-top opacity-50"
          sizes="100vw"
        />
      </div>

      <div className="bg-[#4A2B1F] px-6 pt-7 text-white">
        <div className="font-poppins mx-auto mt-5 grid border-b border-white/40 pb-4 max-lg:gap-y-8 min-[380px]:grid-cols-2 md:grid-cols-3 lg:mt-10 lg:max-w-5xl lg:grid-cols-4 lg:pb-12">
          <div className="max-lg:col-span-full">
            <Logo isSlogan={true} />
            <div className="mt-3 flex gap-x-3">
              {socialLinks.map(({ href, iconName }, i) => (
                <a
                  key={i}
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
