/**
 * Проверка vercel.json и ключевых полей next.config.js (без артефакта out/).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function fail(message) {
  console.error('validate-vercel-config:', message);
  process.exit(1);
}

const vercelPath = path.join(root, 'vercel.json');
let vercel;
try {
  vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
} catch (err) {
  fail(`vercel.json: ${err.message}`);
}

if (vercel.cleanUrls !== true) {
  fail('vercel.json: ожидается cleanUrls: true');
}

if (!Array.isArray(vercel.headers) || vercel.headers.length === 0) {
  fail('vercel.json: ожидается непустой массив headers');
}

const block = vercel.headers[0];
if (!block?.source) {
  fail('vercel.json: у первого блока headers должен быть source');
}

if (!Array.isArray(block.headers) || block.headers.length === 0) {
  fail('vercel.json: у первого блока ожидается непустой массив headers');
}

const byKey = new Map(block.headers.map((h) => [h.key, h.value]));
for (const key of [
  'X-Frame-Options',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Content-Security-Policy',
]) {
  if (!byKey.has(key)) {
    fail(`vercel.json: нет заголовка ${key}`);
  }
}

const csp = byKey.get('Content-Security-Policy');
if (typeof csp !== 'string' || !csp.includes('formspree.io')) {
  fail('vercel.json: CSP должен разрешать Formspree (formspree.io)');
}

const nextPath = path.join(root, 'next.config.js');
const nextSrc = fs.readFileSync(nextPath, 'utf8');
if (!/output\s*:\s*['"]export['"]/.test(nextSrc)) {
  fail('next.config.js: ожидается output: "export"');
}
if (!/trailingSlash\s*:\s*true/.test(nextSrc)) {
  fail('next.config.js: ожидается trailingSlash: true');
}
if (!/unoptimized\s*:\s*true/.test(nextSrc)) {
  fail('next.config.js: ожидается images.unoptimized: true');
}

console.log('validate-vercel-config: OK');
