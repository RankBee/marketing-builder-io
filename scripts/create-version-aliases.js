#!/usr/bin/env node
/**
 * Creates symlinks in node_modules for versioned package imports.
 * Builder.io generates imports like "@radix-ui/react-slot@1.1.2"
 * which Node.js can't resolve. This script creates symlinks so both
 * webpack (client) and Node.js require() (server SSR) can find them.
 */
const fs = require('fs');
const path = require('path');

const aliases = {
  'vaul@1.1.2': 'vaul',
  'sonner@2.0.3': 'sonner',
  'recharts@2.15.2': 'recharts',
  'react-resizable-panels@2.1.7': 'react-resizable-panels',
  'react-hook-form@7.55.0': 'react-hook-form',
  'react-day-picker@8.10.1': 'react-day-picker',
  'next-themes@0.4.6': 'next-themes',
  'lucide-react@0.487.0': 'lucide-react',
  'input-otp@1.4.2': 'input-otp',
  'embla-carousel-react@8.6.0': 'embla-carousel-react',
  'cmdk@1.1.1': 'cmdk',
  'class-variance-authority@0.7.1': 'class-variance-authority',
  '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
  '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
  '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
  '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
  '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
  '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
  '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
  '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
  '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
  '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
  '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
  '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
  '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
  '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
  '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
  '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
  '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
  '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
  '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
  '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
  '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
  '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
  '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
};

const nodeModules = path.resolve(__dirname, '..', 'node_modules');

for (const [versioned, real] of Object.entries(aliases)) {
  const target = path.join(nodeModules, real);
  const link = path.join(nodeModules, versioned);

  // Skip if target doesn't exist
  if (!fs.existsSync(target)) {
    console.warn(`⚠ Target not found: ${real}`);
    continue;
  }

  // Create parent dir for scoped packages (e.g., @radix-ui/)
  const linkDir = path.dirname(link);
  if (!fs.existsSync(linkDir)) {
    fs.mkdirSync(linkDir, { recursive: true });
  }

  // Remove existing symlink/dir if present
  try {
    const stat = fs.lstatSync(link);
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      fs.rmSync(link, { recursive: true, force: true });
    }
  } catch (e) {
    // doesn't exist, that's fine
  }

  fs.symlinkSync(target, link, 'junction');
  console.log(`✓ ${versioned} → ${real}`);
}

console.log('Done creating version aliases.');
