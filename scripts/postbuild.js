import fs from 'fs';
import path from 'path';

const routes = [
  'meddpicc', 
  'marketing-analysis', 
  'revenue-analytics',
  'strategic-gtm-analysis',
  'strategic-go-to-market-analysis',
  'gtm',
  'gtm-tech',
  'gtm-technology-stack-optimization',
  'audit-compliance',
  'sales-governance',
  'audit-readiness',
  'marketing-services',
  'sales-marketing-integration',
  'sales-marketing-alignment',
  'sales-team-accountability',
  'sales-team-kpis',
  'sales-accountability',
  'sales-hiring-strategy',
  'sales-hiring',
  'technology-project-management',
  'project-management',
  'software-selection',
  'Partners/Joint_Delivery', 
  'joint-delivery-partners', 
  'Company/About', 
  'login', 
  'request', 
  'portal',
  'org',
  'ORG'
];
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  routes.forEach(route => {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });

    let routeHtml = indexHtml;
    if (route === 'strategic-gtm-analysis' || route === 'strategic-go-to-market-analysis' || route === 'gtm') {
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
    } else if (route === 'gtm-tech' || route === 'gtm-technology-stack-optimization') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>GTM Technology Stack Optimization | Vizhin Consulting</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Vizhin audits and optimizes CRM, email, revenue operations, and conversation intelligence tools so your GTM stack drives pipeline instead of slowing it down.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="GTM Technology Stack Optimization | Vizhin Consulting">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Vizhin audits and optimizes CRM, email, revenue operations, and conversation intelligence tools so your GTM stack drives pipeline instead of slowing it down.">'
        );
    } else if (route === 'audit-compliance' || route === 'sales-governance' || route === 'audit-readiness') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Sales Governance & Audit Readiness Consulting | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Vizhin prepares sales teams for review by senior managers and boards, verifying partner accountability, access, and audit trails for due diligence.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Sales Governance & Audit Readiness Consulting | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Vizhin prepares sales teams for review by senior managers and boards, verifying partner accountability, access, and audit trails for due diligence.">'
        );
    } else if (route === 'marketing-services' || route === 'sales-marketing-integration' || route === 'sales-marketing-alignment') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Sales & Marketing Alignment Services | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Bridge marketing and sales so every asset feeds your pipeline. Vizhin aligns messaging, testimonials, and campaigns to accelerate deals and revenue.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Sales & Marketing Alignment Services | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Bridge marketing and sales so every asset feeds your pipeline. Vizhin aligns messaging, testimonials, and campaigns to accelerate deals and revenue.">'
        );
    } else if (route === 'marketing-analysis' || route === 'revenue-analytics') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Marketing ROI & Revenue Analytics Consulting | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Stop guessing which marketing drives revenue. Vizhin maps funnel attribution and ROI from first click to closed-won deal, so you can scale what works.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Marketing ROI & Revenue Analytics Consulting | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Stop guessing which marketing drives revenue. Vizhin maps funnel attribution and ROI from first click to closed-won deal, so you can scale what works.">'
        );
    } else if (route === 'sales-team-accountability' || route === 'sales-team-kpis' || route === 'sales-accountability') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Sales Team KPIs & Accountability Framework | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="Shift from activity-driven to outcome-focused sales. Vizhin builds KPIs, pipeline reviews, and accountability structures that help reps consistently hit targets.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Sales Team KPIs & Accountability Framework | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="Shift from activity-driven to outcome-focused sales. Vizhin builds KPIs, pipeline reviews, and accountability structures that help reps consistently hit targets.">'
        );
    } else if (route === 'sales-hiring-strategy' || route === 'sales-hiring') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Sales Hiring Strategy & Recruiting Consulting | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="End bad sales hires and missed quotas. Vizhin builds a metrics-driven vetting, scorecard, and 30-60-90 onboarding system to hire reps who consistently produce.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Sales Hiring Strategy & Recruiting Consulting | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="End bad sales hires and missed quotas. Vizhin builds a metrics-driven vetting, scorecard, and 30-60-90 onboarding system to hire reps who consistently produce.">'
        );
    } else if (route === 'technology-project-management' || route === 'project-management' || route === 'software-selection') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>Technology Project Management & Software Selection | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="De-risk software selection, migration, and implementation. Vizhin provides platform-agnostic oversight so your technology investments deliver value on time.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="Technology Project Management & Software Selection | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="De-risk software selection, migration, and implementation. Vizhin provides platform-agnostic oversight so your technology investments deliver value on time.">'
        );
    } else if (route === 'org' || route === 'ORG') {
      routeHtml = routeHtml
        .replace(/<title>.*?<\/title>/, '<title>ORGVizhin - Workforce Architecture | Coming Soon | Vizhin</title>')
        .replace(
          /<meta name="description" content=".*?"\s*\/?>/,
          '<meta name="description" content="ORGVizhin is coming soon. Dynamic workforce modeling, organizational visualization, and team alignment infrastructure. Request early access at vizhin.co/org.">'
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/?>/,
          '<meta property="og:title" content="ORGVizhin - Workforce Architecture | Coming Soon | Vizhin">'
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/?>/,
          '<meta property="og:description" content="ORGVizhin is coming soon. Dynamic workforce modeling, organizational visualization, and team alignment infrastructure. Request early access at vizhin.co/org.">'
        );
    }

    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
    console.log(`✓ Created static SPA fallback: dist/${route}/index.html`);
  });

  // Unified, production-grade LiteSpeed / Apache .htaccess configuration
  const htaccessContent = `# LiteSpeed / Apache DirectoryIndex and Access Configuration
DirectoryIndex index.html index.htm index.php

# Prevent directory browsing safely
<IfModule mod_autoindex.c>
  Options -Indexes
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Directly allow sitemap.xml and robots.txt
  RewriteRule ^(sitemap\\.xml|robots\\.txt)$ - [L]

  # 2. Redirect uppercase /ORG to canonical /org/
  RewriteRule ^ORG/?$ /org/ [R=301,L]

  # 3. Serve physical files directly if they exist
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # 4. If directory exists and contains an index.html, serve it directly
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^ - [L]

  # 5. Dual root/dist support (when repo root is deployed into public_html)
  RewriteCond %{DOCUMENT_ROOT}/dist/$1 -f
  RewriteRule ^(.*)$ dist/$1 [L]

  RewriteCond %{DOCUMENT_ROOT}/dist/$1/index.html -f
  RewriteRule ^(.*)$ dist/$1/index.html [L]

  RewriteCond %{DOCUMENT_ROOT}/dist/index.html -f
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ dist/index.html [L]

  # 6. Fallback everything else to root index.html (SPA Fallback)
  # Prevents 403 Forbidden on directory requests lacking an index file
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [L]
</IfModule>

# Force correct Content-Types
<Files "sitemap.xml">
  ForceType application/xml
  <IfModule mod_headers.c>
    Header set Content-Type "application/xml; charset=utf-8"
  </IfModule>
</Files>

<Files "robots.txt">
  ForceType text/plain
  <IfModule mod_headers.c>
    Header set Content-Type "text/plain; charset=utf-8"
  </IfModule>
</Files>
`;

  fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent, { encoding: 'utf8', mode: 0o644 });
  console.log('✓ Created dist/.htaccess with DirectoryIndex and robust SPA rules');

  fs.writeFileSync(path.resolve('.htaccess'), htaccessContent, { encoding: 'utf8', mode: 0o644 });
  console.log('✓ Created root .htaccess for dual root/dist deployment compatibility');

  const publicHtaccessPath = path.resolve('public', '.htaccess');
  fs.writeFileSync(publicHtaccessPath, htaccessContent, { encoding: 'utf8', mode: 0o644 });
  console.log('✓ Synchronized public/.htaccess with master configuration');

  // Ensure sitemap.xml and robots.txt are directly in dist
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.vizhin.co/</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/org</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/strategic-gtm-analysis</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/gtm-tech</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/sales-team-accountability</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/sales-hiring-strategy</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/audit-compliance</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/marketing-services</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/marketing-analysis</loc>
  </url>
  <url>
    <loc>https://www.vizhin.co/technology-project-management</loc>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf8');
  console.log('✓ Created dist/sitemap.xml');

  const robotsContent = `User-agent: *
Allow: /
Sitemap: https://www.vizhin.co/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf8');
  console.log('✓ Created dist/robots.txt');
} else {
  console.error('Error: dist/index.html does not exist.');
}
