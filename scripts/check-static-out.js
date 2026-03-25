/**
 * Проверка структуры каталога out/ после `npm run build` (trailingSlash + not-found).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const required = ['out/index.html', 'out/404/index.html'];

for (const rel of required) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    console.error('check-static-out: отсутствует', rel);
    process.exit(1);
  }
}

console.log('check-static-out: OK');
