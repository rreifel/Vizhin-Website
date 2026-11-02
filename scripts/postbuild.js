import fs from 'fs';
import path from 'path';

const routes = [
  'meddpicc', 
  'marketing-analysis', 
  'strategic-gtm-analysis',
  'strategic-go-to-market-analysis',
  'Partners/Joint_Delivery', 
  'joint-delivery-partners', 
  'Company/About', 
  'login', 
  'request', 
  'portal'
];
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  routes.forEach(route => {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });

    let routeHtml = indexHtml;
    if (route === 'strategic-gtm-analysis' || route === 'strategic-go-to-market-analysis') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Go-to-Market Strategy Analysis | Vizhin Consulting</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Uncover hidden friction in your revenue engine. Vizhin analyzes target verticals, pricing, and buyer personas to realign your sales strategy for growth.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Go-to-Market Strategy Analysis | Vizhin Consulting">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Uncover hidden friction in your revenue engine. Vizhin analyzes target verticals, pricing, and buyer personas to realign your sales strategy for growth.">'
        );
    }

    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
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
