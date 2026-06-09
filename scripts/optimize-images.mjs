// Converts the raw pizza video frames (pizza/*.png, ~38 MB) into web-optimized
// WebP frames committed under src/assets/pizza/. Run once after install or
// whenever the source frames change: `npm run optimize:images`.
// The site runtime depends only on the generated .webp files, not on sharp.

import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "pizza");
const outDir = path.join(root, "src", "assets", "pizza");

const WIDTH = 1000;
const QUALITY = 78;

async function run() {
  if (!existsSync(srcDir)) {
    console.error(`✗ Source folder not found: ${srcDir}`);
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir))
    .filter((f) => /\.png$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.error("✗ No PNG frames found in /pizza");
    process.exit(1);
  }

  console.log(`Optimizing ${files.length} frames → ${outDir}`);
  let i = 0;
  for (const file of files) {
    i += 1;
    const num = String(i).padStart(2, "0");
    const out = path.join(outDir, `frame-${num}.webp`);
    await sharp(path.join(srcDir, file))
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    process.stdout.write(`  ✓ frame-${num}.webp\r`);
  }
  console.log(`\n✓ Done — ${files.length} WebP frames written.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
