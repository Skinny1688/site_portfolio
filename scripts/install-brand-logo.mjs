import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "assets", "fff9882a-0145-4e91-a471-098875da1dfa.svg");
const brandDir = path.join(root, "public", "brand");
const ogDir = path.join(root, "public", "og");

fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });

const raw = fs.readFileSync(source, "utf8");

// Normalize for web usage while keeping the original artwork
const webSvg = raw
  .replace(/<!DOCTYPE[\s\S]*?>/i, "")
  .replace(
    /width="1254\.000000pt" height="1254\.000000pt"/,
    'width="512" height="512"',
  );

const logoPath = path.join(brandDir, "nkt-studio-logo.svg");
const markPath = path.join(brandDir, "nkt-studio-mark.svg");
const faviconSvgPath = path.join(brandDir, "favicon.svg");

fs.writeFileSync(logoPath, webSvg);
fs.writeFileSync(markPath, webSvg);
fs.writeFileSync(faviconSvgPath, webSvg);

// Raster favicons / apple touch
await sharp(Buffer.from(webSvg))
  .resize(180, 180, { fit: "contain", background: { r: 247, g: 247, b: 245, alpha: 1 } })
  .png()
  .toFile(path.join(brandDir, "apple-touch-icon.png"));

await sharp(Buffer.from(webSvg))
  .resize(32, 32, { fit: "contain", background: { r: 247, g: 247, b: 245, alpha: 1 } })
  .png()
  .toFile(path.join(brandDir, "favicon-32.png"));

// Open Graph 1200×630 — brand background + centered logo
const ogW = 1200;
const ogH = 630;
const logoSize = 340;

const logoPng = await sharp(Buffer.from(webSvg))
  .resize(logoSize, logoSize, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const bg = await sharp({
  create: {
    width: ogW,
    height: ogH,
    channels: 3,
    background: { r: 247, g: 247, b: 245 },
  },
})
  .png()
  .toBuffer();

await sharp(bg)
  .composite([
    {
      input: logoPng,
      left: Math.round((ogW - logoSize) / 2),
      top: Math.round((ogH - logoSize) / 2),
    },
  ])
  .png()
  .toFile(path.join(ogDir, "nkt-studio-cover.png"));

console.log("Installed brand logo + OG cover");
