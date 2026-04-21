const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PROMO_SVG = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1280" height="800" fill="url(#grad1)" />
  
  <g transform="translate(512, 150)">
    <!-- SVG Icon content scaled up -->
    <rect width="256" height="256" rx="40" fill="#0f172a" />
    <rect x="28" y="28" width="72" height="72" rx="8" fill="none" stroke="#3b82f6" stroke-width="12"/>
    <rect x="48" y="48" width="32" height="32" rx="4" fill="#3b82f6"/>
    <rect x="156" y="28" width="72" height="72" rx="8" fill="none" stroke="#3b82f6" stroke-width="12"/>
    <rect x="176" y="48" width="32" height="32" rx="4" fill="#3b82f6"/>
    <rect x="28" y="156" width="72" height="72" rx="8" fill="none" stroke="#3b82f6" stroke-width="12"/>
    <rect x="48" y="176" width="32" height="32" rx="4" fill="#3b82f6"/>
    <rect x="156" y="156" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="180" y="156" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="204" y="156" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="156" y="180" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="204" y="180" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="180" y="204" width="16" height="16" rx="2" fill="#60a5fa"/>
    <rect x="156" y="204" width="16" height="16" rx="2" fill="#60a5fa"/>
    <line x1="20" y1="128" x2="236" y2="128" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
  </g>

  <text x="640" y="520" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="64" fill="#ffffff" text-anchor="middle">Quick QR Scanner</text>
  <text x="640" y="600" font-family="'Segoe UI', sans-serif" font-size="32" fill="#cbd5e1" text-anchor="middle">Instantly scan QR codes visible on any browser tab.</text>
</svg>
`;

async function generatePromo() {
  const outputPath = path.join(__dirname, '..', 'dist', 'screenshot-1280x800.png');
  
  if (!fs.existsSync(path.join(__dirname, '..', 'dist'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'dist'), { recursive: true });
  }

  await sharp(Buffer.from(PROMO_SVG))
    .png()
    .toFile(outputPath);
    
  console.log('✓ Generated 1280x800 promo image at:', outputPath);
}

generatePromo().catch(err => {
  console.error(err);
  process.exit(1);
});
