import { CustomSlider } from "../../CustomSlider";
import { OptimizedImg } from "../../OptimizedImg";

export function BrandHeroSlider() {
  return (
    <div className="flex-1">
      <CustomSlider
        defineTransitionDuration="800ms"
        autoPlayDuration={5000}
        imgNameArr={[
          "heroImg-1",
          "heroImg-2",
          "heroImg-3",
          "heroImg-1",
          "heroImg-2",
          "heroImg-3",
        ]}
        isAutoPlayEnabled={true}
        setAxis="X"
      />
    </div>
  );
}
