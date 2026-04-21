/**
 * Generates icon PNGs at required Chrome Web Store sizes
 * from the base SVG: icons/icon.svg
 * Sizes: 16, 48, 128 (required), 32 (optional)
 *
 * Run: yarn icons
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ICONS_DIR = path.resolve(__dirname, '..', 'icons');
const SOURCE_SVG = path.join(ICONS_DIR, 'icon.svg');
const SIZES = [16, 32, 48, 128];

async function generateIcons() {
  if (!fs.existsSync(SOURCE_SVG)) {
    console.error(`ERROR: Source SVG not found at ${SOURCE_SVG}`);
    process.exit(1);
  }

  console.log('Generating icons from:', SOURCE_SVG);

  for (const size of SIZES) {
    const outputPath = path.join(ICONS_DIR, `icon${size}.png`);
    await sharp(SOURCE_SVG)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  ✓ icon${size}.png`);
  }

  console.log('\nAll icons generated successfully.');
}

generateIcons().catch((err) => {
  console.error('Failed to generate icons:', err.message);
  process.exit(1);
});
