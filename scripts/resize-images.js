import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [320, 480, 640, 768, 1024, 1280, 1440, 1920];

const rootDir = './public/images';

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recurse into child folder
      processDirectory(fullPath);
      return;
    }

    const name = path.parse(item).name;
    const ext = path.parse(item).ext.toLowerCase();

    // Skip non-image files (optional safety)
    if (!['.webp'].includes(ext)) return;

    // Skip files that are already resized (e.g., image-640.webp)
    if (sizes.some(size => name.endsWith(`-${size}`))) return;

    // Check if any resized version already exists in the SAME folder
    const alreadyExists = sizes.some(size => {
      const outputFile = path.join(dir, `${name}-${size}.webp`);
      return fs.existsSync(outputFile);
    });

    if (alreadyExists) {
      console.log(`Skipping ${fullPath} (variants already exist)`);
      return;
    }

    // Generate new resized variants
    sizes.forEach(size => {
      sharp(fullPath)
        .resize(size)
        .toFile(path.join(dir, `${name}-${size}.webp`))
        .then(() => console.log(`Generated ${path.join(dir, `${name}-${size}.webp`)}`))
        .catch(err => console.error(err));
    });
  });
}

// Run starting from the root images directory
processDirectory(rootDir);
