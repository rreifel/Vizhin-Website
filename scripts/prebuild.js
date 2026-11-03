import fs from 'fs';
import path from 'path';

const devHtmlPath = path.resolve('index.dev.html');
const indexPath = path.resolve('index.html');

if (fs.existsSync(devHtmlPath)) {
  fs.copyFileSync(devHtmlPath, indexPath);
  console.log('✓ Prepared index.html from index.dev.html for Vite compilation');
} else {
  console.log('✓ index.dev.html not found, using current index.html');
}
