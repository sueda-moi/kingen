/* eslint-disable @typescript-eslint/no-require-imports */

// scripts/zip.cjs
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, '../sendContactForm.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Created zip: ${archive.pointer()} total bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// ✅ 改这里：直接压缩根目录（包含 index.js + node_modules）
archive.file(path.join(__dirname, '../dist/index.js'), { name: 'index.js' });
archive.directory(path.join(__dirname, '../node_modules'), 'node_modules');
archive.file(path.join(__dirname, '../package.json'), { name: 'package.json' });

archive.finalize();

