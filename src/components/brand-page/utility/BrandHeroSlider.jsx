import { CustomSlider } from "../../CustomSlider";
export function BrandHeroSlider() {
  const images = [
    "https://picsum.photos/id/10/1200/800",
    "https://picsum.photos/id/29/1200/800",
    "https://picsum.photos/id/1040/1200/800",
    "https://picsum.photos/id/106/1200/800",
    "https://picsum.photos/id/133/1200/800",
    "https://picsum.photos/id/292/1200/800",
  ];

  return <CustomSlider images={images} />;
}
