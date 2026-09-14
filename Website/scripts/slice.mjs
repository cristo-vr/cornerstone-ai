// usage: node slice.mjs <in.png> <outPrefix> <sliceHeight>
import sharp from "sharp";
const [inp, prefix, hStr] = process.argv.slice(2);
const h = Number(hStr);
const img = sharp(inp);
const { width, height } = await img.metadata();
let n = 0;
for (let y = 0; y < height; y += h) {
  const sh = Math.min(h, height - y);
  await sharp(inp).extract({ left: 0, top: y, width, height: sh }).toFile(`${prefix}-${String(n).padStart(2, "0")}.png`);
  n++;
}
console.log(`${n} slices of ${width}x${h} from ${height}`);
