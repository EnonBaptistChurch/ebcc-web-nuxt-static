import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [320, 480, 640, 768, 1024, 1280, 1440, 1920];
const rootDir = './public/images';

// Allowed input image extensions
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', '.webp', '.avif'];

function processDirectory(dir) {
  
  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      processDirectory(fullPath);
      return;
    }

    const { name, ext } = path.parse(item);
    const lowerExt = ext.toLowerCase();

    // 1. Skip non-image files based on extension
    if (!validExtensions.includes(lowerExt)) return;

    // 2. Skip files that are already generated output variants (e.g. image-640.webp)
    if (sizes.some(size => name.endsWith(`-${size}`))) return;

    // 3. Check if any resized WebP versions already exist
    const someExists = sizes.some(size => {
      const outputFile = path.join(dir, `${name}-${size}.webp`);
      return fs.existsSync(outputFile);
    });

    if(someExists) {
      return;
    }

    const allExists = sizes.every(size => {
      const outputFile = path.join(dir, `${name}-${size}.webp`);
      return fs.existsSync(outputFile);
    });

    if (allExists) {
      return;
    }

    // 4. Generate WebP variants from the input image
    sizes.forEach(size => {
      const outputFile = path.join(dir, `${name}-${size}.webp`);

      // Skip generating individual size if it already exists
      if (fs.existsSync(outputFile)) return;

      sharp(fullPath)
        .resize(size)
        .webp({ quality: 80 }) // Converts any input format to WebP
        .toFile(outputFile)
        .then(() => console.log(`Generated: ${outputFile}`))
        .catch(err => console.error(`Error processing ${fullPath}:`, err));
    });
  });
}

// Start processing
processDirectory(rootDir);