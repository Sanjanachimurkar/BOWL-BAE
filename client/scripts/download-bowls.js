import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, '../public/bowls');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const BOWL_IMAGES = [
  {
    name: 'bowl-1.webp',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'bowl-2.webp',
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'bowl-3.webp',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'bowl-4.webp',
    url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'bowl-5.webp',
    url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=640&q=80'
  }
];

async function run() {
  console.log('Downloading and optimizing bowl images...');
  for (const item of BOWL_IMAGES) {
    console.log(`Fetching ${item.url}...`);
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`HTTP error ${res.status} for ${item.url}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const outPath = path.join(OUT_DIR, item.name);
    await sharp(buffer)
      .resize(600, 450, { fit: 'cover' })
      .webp({ quality: 80, effort: 4 })
      .toFile(outPath);
    const size = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`Saved ${item.name} (${size} KB)`);
  }
  console.log('All bowl images downloaded and converted to WebP successfully!');
}

run().catch((err) => {
  console.error('Download failed:', err);
  process.exit(1);
});
