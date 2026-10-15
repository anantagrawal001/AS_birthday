import sharp from 'sharp';
import path from 'path';

const svgBuffer = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#151316"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#D4AF8E" stroke-width="2" stroke-opacity="0.3"/>
  <circle cx="600" cy="240" r="70" fill="#8B4757" fill-opacity="0.25" stroke="#D4AF8E" stroke-width="1.5"/>
  <text x="600" y="268" font-family="Georgia, serif" font-size="76" fill="#D4AF8E" text-anchor="middle">A</text>
  <text x="600" y="380" font-family="Georgia, serif" font-size="52" letter-spacing="8" fill="#FFF9F2" text-anchor="middle">AANYA</text>
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="24" letter-spacing="4" fill="#C4A69D" text-anchor="middle">A BIRTHDAY KEEPSAKE</text>
</svg>
`);

const outputPath = path.join(process.cwd(), 'public', 'og-preview.jpg');

sharp(svgBuffer)
  .jpeg({ quality: 90 })
  .toFile(outputPath)
  .then(() => console.log('Successfully generated public/og-preview.jpg'))
  .catch((err) => console.error(err));
