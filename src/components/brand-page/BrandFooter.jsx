import { Logo } from "../Logo";
import mudPaper from "/src/assets/mudPaper.webp";
import { BrandFooterList } from "./utility/BrandFooterList";
import { BrandFooterContactList } from "./utility/BrandFooterContactList";
import { SpriteIcon } from "../SpriteIcon";
import { OptimizedImg } from "../OptimizedImg";
import { RippleEffect } from "../RippleEffect";

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
      className="bg-repeat text-white"
    >
      <div className="relative overflow-clip bg-[#556B2F]">
        <OptimizedImg
          imgName="cropFieldBackground"
          className="absolute inset-0 size-full object-cover object-top opacity-50"
          isAriaHidden={true}
          isDraggable={false}
        />
        <OptimizedImg
          imgName="crop"
          className="absolute -bottom-10 -left-4 z-10 size-40 sm:size-40 lg:-bottom-15 lg:-left-5 lg:size-50"
          sizes="50vw"
          isAriaHidden={true}
          isDraggable={false}
        />
        <OptimizedImg
          imgName="crop"
          className="absolute -right-4 -bottom-12 z-10 size-40 scale-x-[-1] max-[370px]:hidden min-[468px]:size-50 md:size-55 lg:-right-5 lg:-bottom-15 lg:size-60"
          sizes="50vw"
          isAriaHidden={true}
          isDraggable={false}
        />
        <div className="relative z-50 mx-auto px-6 pt-12 pb-16 min-[850px]:justify-around sm:w-fit md:flex md:w-auto md:max-w-7xl md:items-center md:gap-x-8">
          <div className="font-merriweather not-last:text-shadow-[8px_3px_4px_#00000040]">
            <h1 className="max-w-83 text-3xl">
              Ready to experience freshness in every roti?
            </h1>
            <p className="font-poppins mt-1 text-lg/tight max-md:max-w-76">
              Choose your atta today and taste the difference.
            </p>
          </div>
          <button className="bg-golden-amber relative mt-6 flex items-center rounded-md px-4.5 py-3 shadow-[0px_4px_4px_#00000040]">
            <span className="font-poppins text-base font-semibold">
              CHOOSE YOUR ATTA
            </span>
            <SpriteIcon
              className="ml-2 size-4.5 stroke-white"
              iconName="arow-right"
            />
            <RippleEffect
              borderRadius="rounded-md"
              rippleBg="bg-white/30"
              rippleEndSize="20"
            />
          </button>
        </div>
      </div>

      <div className="bg-[#4A2B1F] px-6 pt-7">
        <div className="font-poppins mx-auto mt-5 grid border-b border-white/40 pb-4 max-lg:gap-y-8 min-[380px]:grid-cols-2 md:grid-cols-3 lg:mt-10 lg:max-w-5xl lg:grid-cols-4 lg:pb-12">
          <div className="max-lg:col-span-full">
            <Logo isSlogan={true} />
            <ul className="mt-2 flex gap-x-1.5">
              {socialLinks.map(({ href, iconName }, i) => (
                <li
                  key={i}
                  className="lg:transition-color relative cursor-pointer rounded-md p-1.25 lg:transition-transform lg:duration-100 lg:hover:scale-110 lg:hover:bg-white/8"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SpriteIcon
                      className="size-7.5 shrink-0 fill-white"
                      iconName={iconName}
                    />
                    {/* <RippleEffect
                      borderRadius="rounded-md"
                      rippleBg="bg-white/30"
                      rippleEndSize="20"
                    /> */}
                  </a>
                </li>
              ))}
            </ul>
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
            locationMapLink="https://www.google.com/maps/dir//Sudesh%20Aata%20Chakki,%20LG-3,%20G-60,%20Mandir%20Marg,%20Kali%20Nagar,%20Block%20H,%20Mahavir%20Enclave%20Part%201,%20Mahavir%20Enclave,%20New%20Delhi,%20Delhi,%20110045"
          />
        </div>
        <p className="py-1.5 text-center text-xs font-semibold text-white/80">
          ©2024 Sudesh Atta Chakki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
