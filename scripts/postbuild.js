import fs from 'fs';
import path from 'path';

const routes = ['meddpicc', 'marketing-analysis', 'login', 'request', 'portal'];
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  routes.forEach(route => {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml, 'utf8');
    console.log(`✓ Created static SPA fallback: dist/${route}/index.html`);
  });

  // Ensure .htaccess with full rewrite rules is in dist
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Forward /ORG and /org requests directly to /org/
  RewriteCond %{REQUEST_URI} !^/org/
  RewriteRule ^ORG/?$ /org/ [R=301,NC,L]

  # 2. Forward /ORG/<path> directly to /org/<path>
  RewriteCond %{REQUEST_URI} !^/org/
  RewriteRule ^ORG/(.*)$ /org/$1 [R=301,NC,L]

  # 3. Forward /ORGdemo directly to /org/ORGdemo
  RewriteCond %{REQUEST_URI} !^/org/
  RewriteRule ^ORGdemo/?$ /org/ORGdemo [R=301,NC,L]

  # 4. Standard SPA rewrite for the root Vizhin marketing website
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;
  fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent, 'utf8');
  console.log('✓ Created dist/.htaccess with /ORG rewrite rules');
} else {
  console.error('Error: dist/index.html does not exist.');
}
