import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    analyzer({
      analyzerMode: 'static',
      fileName: 'bundle-stats.html',
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
});
