const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MAX_PNG_SIZE_KB = 500;
const MAX_WEBP_SIZE_KB = 200;

async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  
  if (!fs.existsSync(publicDir)) {
    console.log('No public/images directory found');
    return;
  }

  const files = fs.readdirSync(publicDir);
  let optimized = 0;

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const stats = fs.statSync(filePath);
    
    if (!stats.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    const sizeKB = Math.round(stats.size / 1024);
    const baseName = path.basename(file, ext);

    // Convert large PNGs to WebP
    if (ext === '.png' && sizeKB > MAX_PNG_SIZE_KB) {
      console.log(`⚠️  ${file} is ${sizeKB}KB (exceeds ${MAX_PNG_SIZE_KB}KB)`);
      const webpPath = path.join(publicDir, `${baseName}.webp`);
      
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const webpStats = fs.statSync(webpPath);
      const webpSizeKB = Math.round(webpStats.size / 1024);
      console.log(`✓ Created ${baseName}.webp (${webpSizeKB}KB)`);
      optimized++;
    }

    // Compress large WebP files
    if (ext === '.webp' && sizeKB > MAX_WEBP_SIZE_KB) {
      console.log(`⚠️  ${file} is ${sizeKB}KB (exceeds ${MAX_WEBP_SIZE_KB}KB)`);
      const tempPath = path.join(publicDir, `${baseName}-temp.webp`);
      
      await sharp(filePath)
        .webp({ quality: 75 })
        .toFile(tempPath);
      
      const tempStats = fs.statSync(tempPath);
      const newSizeKB = Math.round(tempStats.size / 1024);
      
      // Only replace if we achieved compression
      if (newSizeKB < sizeKB) {
        fs.renameSync(tempPath, filePath);
        console.log(`✓ Compressed ${file} (${sizeKB}KB → ${newSizeKB}KB)`);
        optimized++;
      } else {
        fs.unlinkSync(tempPath);
        console.log(`⚠️  Could not compress ${file} further`);
      }
    }
  }

  if (optimized === 0) {
    console.log('✓ All images are already optimized');
  } else {
    console.log(`\n✓ Optimized ${optimized} image(s)`);
  }
}

optimizeImages().catch(console.error);
