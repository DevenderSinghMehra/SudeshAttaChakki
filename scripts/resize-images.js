//i have nto written this code.//!later come to understand this code and learn to use this tool well.it is a high ROI Tool.
//!later add logic to skip images that have already been generated.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const widths = [400, 640, 768, 1024];

const inputDir = path.join(__dirname, "../images-to-resize");
const outputRoot = path.join(__dirname, "../src/assets/images");

async function processImages() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);

    if (!fs.statSync(inputPath).isFile()) continue;

    const { name } = path.parse(file);

    // hero/
    const imageDir = path.join(outputRoot, name);

    // hero/srcset/
    const srcsetDir = path.join(imageDir, "srcset");

    fs.mkdirSync(srcsetDir, { recursive: true });

    // Generate the default image (src)
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(path.join(imageDir, `${name}.webp`));

    // Generate responsive images
    for (const width of widths) {
      await sharp(inputPath)
        .resize({ width })
        .webp({ quality: 80 })
        .toFile(
          path.join(srcsetDir, `${name}-${width}w.webp`)
        );
    }

    console.log(`✔ ${name}`);
  }

  console.log("\n✅ Done!");
}

processImages().catch(console.error);