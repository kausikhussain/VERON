import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('c:/Users/kausi/Desktop/VERON/VERON/public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

// Target directory mapping
const MAPPINGS = [
  { source: 'cargos', target: 'men/cargos' },
  { source: 'Categories', target: 'categories' },
  { source: 'cotton pants', target: 'men/jeans' },
  { source: 'googles', target: 'men/sunglasses' },
  { source: 'pants', target: 'men/pants' },
  { source: 'POLO tees', target: 'men/polos' },
  { source: 'purse', target: 'women/handbags' },
  { source: 'Shirts', target: 'men/shirts' },
  { source: 'shoes', target: 'men/shoes' },
  { source: 'Taxude', target: 'men/jackets' },
  { source: 'tees', target: 'men/tshirts' },
  { source: 'watch', target: 'men/watches' }
];

function sanitizeFilename(filename) {
  const ext = path.extname(filename);
  let name = path.basename(filename, ext);
  // Clean special characters, URL encoded strings, brackets, etc.
  name = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (!name) name = 'asset-' + Math.random().toString(36).substring(2, 8);
  return `${name}${ext.toLowerCase()}`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);

  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      processDirectory(srcPath, path.join(destDir, sanitizeFilename(item)));
    } else {
      const cleanName = sanitizeFilename(item);
      const destPath = path.join(destDir, cleanName);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${item} -> ${destPath}`);
    }
  }
}

// 1. Move video to public/assets/videos/landing-video.mp4
const videoSrc = path.join(PUBLIC_DIR, 'Landing video.mp4');
const videoDestDir = path.join(ASSETS_DIR, 'videos');
ensureDir(videoDestDir);
if (fs.existsSync(videoSrc)) {
  fs.copyFileSync(videoSrc, path.join(videoDestDir, 'landing-video.mp4'));
  console.log('Video copied to public/assets/videos/landing-video.mp4');
}

// 2. Map all folders
for (const map of MAPPINGS) {
  const srcDir = path.join(PUBLIC_DIR, map.source);
  const destDir = path.join(ASSETS_DIR, map.target);
  processDirectory(srcDir, destDir);
}

console.log('Asset reorganization complete!');
