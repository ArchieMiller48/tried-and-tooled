// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { lastmodFor } from './src/lib/contentDates.mjs';
import { generateOgImages } from './src/lib/og.mjs';

function ogImages() {
  return {
    name: 'og-images',
    hooks: {
      'astro:config:setup': () => {
        generateOgImages();
      },
    },
  };
}

// GitHub Pages project site: https://archiemiller48.github.io/tried-and-tooled/
export default defineConfig({
  site: 'https://archiemiller48.github.io',
  base: '/tried-and-tooled',
  output: 'static',
  // Directory URLs keep the trailing slash GitHub Pages serves for index.html.
  trailingSlash: 'always',
  integrations: [
    ogImages(),
    sitemap({
      filter: (page) => !page.includes('/find-your-stack'),
      serialize(item) {
        const day = lastmodFor(item.url);
        if (day) item.lastmod = new Date(`${day}T00:00:00.000Z`);
        return item;
      },
    }),
  ],
});
