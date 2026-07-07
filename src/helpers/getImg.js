const images = import.meta.glob("/src/assets/images/**/*.{webp,avif,png}", {
  eager: true,
  import: "default",
});

const pixels = [400, 640, 768, 1024];
export function getImg(imgName) {
  const src = images[`/src/assets/images/${imgName}/${imgName}.webp`];
  const srcSetArr = [];
  for (const px of pixels) {
    const path = `${images[`/src/assets/images/${imgName}/srcset/${imgName}-${px}w.webp`]} ${px}w`;
    srcSetArr.push(path);
  } //i am going with this one only because it is very readable and because here i am dealing with less data so i can focus on redablity more. then performace by as anyway the performance difference is almost neglegible this will be done in milliseconds.

  /*  const srcSetArr = [
    `${images[`/src/assets/images/${imgName}/srcset/${imgName}-400w.webp`]} 400w`,
    `${images[`/src/assets/images/${imgName}/srcset/${imgName}-640w.webp`]} 640w`,
    `${images[`/src/assets/images/${imgName}/srcset/${imgName}-768w.webp`]} 768w`,
    `${images[`/src/assets/images/${imgName}/srcset/${imgName}-1024w.webp`]} 1024w`,
  ];
 */
  return { src, srcSetStr: srcSetArr.join(", ") };
}
