import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetsDir = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-portfolio",
  "assets",
);

const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".png"));
const byKey = Object.fromEntries(
  files.map((f) => {
    const m = f.match(/(\d{6})-/);
    return [m?.[1] ?? f, path.join(assetsDir, f)];
  }),
);

const map = {
  "ai-education-platform": byKey["160440"],
  dentline: byKey["174221"],
  "kvadrat-renovation": byKey["175925"],
  "vector-logistics": byKey["182652"],
};

const TARGET_WIDTH = 2000; // retina-friendly display width

for (const [slug, src] of Object.entries(map)) {
  if (!src || !fs.existsSync(src)) {
    throw new Error(`Missing screenshot for ${slug}: ${src}`);
  }

  const dir = path.join("public", "works", slug);
  fs.mkdirSync(dir, { recursive: true });

  const meta = await sharp(src).metadata();
  const srcW = meta.width ?? 1000;
  const srcH = meta.height ?? 600;
  const scale = Math.max(1, TARGET_WIDTH / srcW);
  const outW = Math.round(srcW * scale);
  const outH = Math.round(srcH * scale);

  const base = sharp(src).resize(outW, outH, {
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false,
  });

  // High-quality WebP + PNG fallback for max clarity
  await base
    .clone()
    .webp({ quality: 95, effort: 6, smartSubsample: true })
    .toFile(path.join(dir, "cover.webp"));

  await base
    .clone()
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(dir, "cover.png"));

  await base
    .clone()
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(dir, "desktop-01.webp"));

  await base
    .clone()
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(dir, "desktop-02.webp"));

  // Mobile: contain full screenshot on light canvas (no aggressive crop)
  const mobileW = 900;
  const mobileH = 1200;
  await sharp(src)
    .resize(mobileW, mobileH, {
      fit: "contain",
      background: { r: 247, g: 247, b: 245, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 92 })
    .toFile(path.join(dir, "mobile-01.webp"));

  // Write meta for UI aspect-ratio
  fs.writeFileSync(
    path.join(dir, "meta.json"),
    JSON.stringify({ width: outW, height: outH, sourceWidth: srcW, sourceHeight: srcH }, null, 2),
  );

  console.log(`${slug}: ${srcW}x${srcH} -> ${outW}x${outH}`);
}

fs.rmSync(path.join("public", "works", "formwood"), { recursive: true, force: true });
console.log("done");
