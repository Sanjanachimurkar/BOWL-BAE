import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const cutoutsDir = 'd:/BOWL BAE/client/public/cutouts';
const publicDir = 'd:/BOWL BAE/client/public';

async function processDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && !f.endsWith('.min.png'));
  console.log(`Processing ${files.length} images in ${dir}...`);

  let totalBefore = 0;
  let totalWebp = 0;

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const baseName = path.parse(file).name;
    const webpPath = path.join(dir, `${baseName}.webp`);
    
    const beforeSize = fs.statSync(inputPath).size;
    totalBefore += beforeSize;

    const isLarge = file.includes('bowl') || file.includes('salad') || file.includes('assembled') || file.includes('bounty');
    const targetWidth = isLarge ? 700 : 320;

    // 1. Generate ultra-optimized WebP
    await sharp(inputPath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    totalWebp += webpSize;

    // 2. Also optimize PNG in-place (compressed 8-bit palette png for full backwards compatibility)
    const tempPngPath = path.join(dir, `${baseName}.temp.png`);
    await sharp(inputPath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toFile(tempPngPath);

    // Replace original large PNG with the optimized one
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPngPath, inputPath);

    const newPngSize = fs.statSync(inputPath).size;

    console.log(
      `✓ ${file.padEnd(30)} ${(beforeSize / 1024).toFixed(1).padStart(7)} KB -> WebP: ${(webpSize / 1024).toFixed(1).padStart(6)} KB | PNG: ${(newPngSize / 1024).toFixed(1).padStart(6)} KB`
    );
  }

  const saved = totalBefore - totalWebp;
  console.log(`\nDirectory total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> WebP: ${(totalWebp / 1024 / 1024).toFixed(2)} MB (${((saved / totalBefore) * 100).toFixed(1)}% total savings)\n`);
}

async function run() {
  await processDirectory(cutoutsDir);
  await processDirectory(publicDir);
  console.log('🎉 All image assets optimized successfully!');
}

run().catch(console.error);
