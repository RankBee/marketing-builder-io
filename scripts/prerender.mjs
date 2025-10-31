#!/usr/bin/env node
/* Prerender SPA routes using Vite preview + Puppeteer */

import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import http from 'node:http';
import process from 'node:process';
import puppeteer from 'puppeteer';

const PORT = process.env.PRERENDER_PORT || 4173;
const HOST = '127.0.0.1';
const ORIGIN = `http://${HOST}:${PORT}`;
const BUILD_DIR = resolve('build');
const ROUTES_MANIFEST = resolve('netlify/shared/routes.json');

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve2, reject2) => {
        const req = http.get(url, res => {
          res.resume();
          res.on('end', resolve2);
        });
        req.on('error', reject2);
      });
      return;
    } catch {
      await wait(500);
    }
  }
  throw new Error(`Timed out waiting for preview server at ${url}`);
}

async function readRoutes() {
  const raw = await readFile(ROUTES_MANIFEST, 'utf-8');
  const list = JSON.parse(raw);
  if (!Array.isArray(list)) throw new Error('routes.json must be an array');
  return list;
}

function startPreview() {
  const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', [
    'vite',
    'preview',
    '--strictPort',
    '--host',
    '--port',
    String(PORT),
  ], { stdio: 'inherit' });
  return child;
}

function stopPreview(child) {
  if (!child) return;
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/f', '/t']);
    } else {
      child.kill('SIGTERM');
    }
  } catch {}
}

function routeToOutPath(route) {
  if (route === '/' || route === '') return join(BUILD_DIR, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/+$/, '');
  return join(BUILD_DIR, clean, 'index.html');
}

async function ensureDirForFile(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

async function prerender() {
  const routes = await readRoutes();

  const server = startPreview();
  try {
    await waitForServer(`${ORIGIN}/`);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      for (const route of routes) {
        const url = `${ORIGIN}${route}`;
        const page = await browser.newPage();
        try {
          const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
          const status = resp ? resp.status() : 200;
          if (status >= 400) {
            console.warn(`[prerender] Skipping ${route}: HTTP ${status}`);
            await page.close();
            continue;
          }

          // Optional: wait a tick for dynamic client UI to settle
          await wait(200);
  
          const html = await page.evaluate(() => {
            // Strip dev-only overlays if any (shouldn't exist in preview)
            return '<!-- prerendered by scripts/prerender.mjs -->\n' + document.documentElement.outerHTML;
          });

          const outPath = routeToOutPath(route);
          await ensureDirForFile(outPath);
          await writeFile(outPath, html, 'utf-8');
          console.log(`[prerender] Wrote ${outPath}`);
        } catch (e) {
          console.error(`[prerender] Error rendering ${route}:`, e?.message || e);
        } finally {
          await page.close().catch(() => {});
        }
      }
    } finally {
      await browser.close().catch(() => {});
    }
  } finally {
    stopPreview(server);
  }
}

prerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});