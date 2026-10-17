// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://archiemiller48.github.io/tried-and-tooled/
export default defineConfig({
  site: 'https://archiemiller48.github.io',
  base: '/tried-and-tooled',
  output: 'static',
  // Directory URLs keep the trailing slash GitHub Pages serves for index.html.
  trailingSlash: 'always',
});
