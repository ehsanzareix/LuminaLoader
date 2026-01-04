const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const srcAdapter = path.join(
  repoRoot,
  'src',
  'adapters',
  'vue',
  'LuminaLoader.vue',
);
const destDir = path.join(__dirname, '..', 'src');
const dest = path.join(destDir, 'LuminaLoader.vue');

if (!fs.existsSync(srcAdapter)) {
  console.error('Source adapter not found:', srcAdapter);
  process.exit(1);
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(srcAdapter, dest);
console.log('Copied', srcAdapter, 'to', dest);
