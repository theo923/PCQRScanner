/**
 * Packages the Chrome extension into a ZIP file ready for upload
 * to the Chrome Web Store.
 *
 * Run: yarn build
 * Output: dist/pc-qr-scanner.zip
 */

const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const OUTPUT_ZIP = path.join(DIST_DIR, 'pc-qr-scanner.zip');

/** Files/directories to include in the extension package */
const INCLUDE_PATTERNS = [
  'manifest.json',
  'popup.html',
  'popup.js',
  'jsQR.js',
  'icons/icon16.png',
  'icons/icon32.png',
  'icons/icon48.png',
  'icons/icon128.png',
];

function validateRequiredFiles() {
  const missing = INCLUDE_PATTERNS.filter(
    (f) => !fs.existsSync(path.join(ROOT, f))
  );
  if (missing.length > 0) {
    console.error('\nERROR: Missing required files:');
    missing.forEach((f) => console.error(`  - ${f}`));
    console.error('\nRun `yarn icons` first to generate the icon PNGs.\n');
    process.exit(1);
  }
}

async function build() {
  validateRequiredFiles();

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Remove old zip if present
  if (fs.existsSync(OUTPUT_ZIP)) {
    fs.unlinkSync(OUTPUT_ZIP);
  }

  const output = fs.createWriteStream(OUTPUT_ZIP);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('Warning:', err.message);
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  output.on('close', () => {
    const sizeKB = (archive.pointer() / 1024).toFixed(1);
    console.log(`\n✓ Build complete: dist/pc-qr-scanner.zip (${sizeKB} KB)`);
    console.log('\nNext steps:');
    console.log('  1. Go to https://chrome.google.com/webstore/devconsole');
    console.log('  2. Click "New item" and upload dist/pc-qr-scanner.zip');
  });

  archive.pipe(output);

  for (const pattern of INCLUDE_PATTERNS) {
    const fullPath = path.join(ROOT, pattern);
    // Preserve directory structure (e.g. icons/icon16.png)
    archive.file(fullPath, { name: pattern });
    console.log(`  + ${pattern}`);
  }

  await archive.finalize();
}

build().catch((err) => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
