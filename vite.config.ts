import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function seoFilesPlugin(): Plugin {
  return {
    name: 'seo-files-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/sitemap.xml') {
          const filePath = path.resolve(__dirname, 'public/sitemap.xml');
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(fs.readFileSync(filePath, 'utf8'));
            return;
          }
        }
        if (url === '/robots.txt') {
          const filePath = path.resolve(__dirname, 'public/robots.txt');
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(fs.readFileSync(filePath, 'utf8'));
            return;
          }
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/sitemap.xml') {
          const filePath = path.resolve(__dirname, 'dist/sitemap.xml');
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(fs.readFileSync(filePath, 'utf8'));
            return;
          }
        }
        if (url === '/robots.txt') {
          const filePath = path.resolve(__dirname, 'dist/robots.txt');
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(fs.readFileSync(filePath, 'utf8'));
            return;
          }
        }
        next();
      });
    }
  };
}

function devServerHtmlPlugin(): Plugin {
  return {
    name: 'dev-server-html',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/' || url === '/index.html') {
          const devPath = path.resolve(__dirname, 'index.dev.html');
          if (fs.existsSync(devPath)) {
            req.url = '/index.dev.html';
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [devServerHtmlPlugin(), react(), tailwindcss(), seoFilesPlugin()],
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
