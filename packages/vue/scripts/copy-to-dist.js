const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '..', 'src', 'LuminaLoader.vue');
const destination = path.resolve(__dirname, '..', 'dist', 'LuminaLoader.vue');

fs.copyFileSync(source, destination);
console.log('Copied Vue component to dist/LuminaLoader.vue');
