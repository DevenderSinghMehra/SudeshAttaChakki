import { SpriteIcon } from "../../SpriteIcon";

export function BrandFooterContactList({
  phoneNumber,
  mailAdrress,
  locationMapLink,
  LocationName,
}) {
  const listDetails = [
    {
      iconName: "telephone",
      href: `tel:+91 ${phoneNumber}`,
      info: phoneNumber,
    },
    {
      iconName: "mail-envelop",
      href: `mailto:${mailAdrress}`,
      info: mailAdrress,
    },

    {
      iconName: "location-pointer",
      href: locationMapLink,
      info: LocationName,
    },
  ];

  return (
    <div className="max-md:col-span-full">
      <h3 className="mb-2 font-semibold">Contact Us</h3>
      <address className="not-italic">
        <ul className="*:not-last:mb-1">
          {listDetails.map(({ iconName, href, info }, i) => (
            <li key={i}>
              <a
                className="flex items-center gap-x-2 lg:hover:*:size-5"
                target="_blank"
                rel="noopener noreferrer"
                href={href}
              >
                <SpriteIcon
                  className="size-4.5 shrink-0 fill-white"
                  iconName={iconName}
                />
                {info}
              </a>
            </li>
          ))}
        </ul>
      </address>
    </div>
  );
}
