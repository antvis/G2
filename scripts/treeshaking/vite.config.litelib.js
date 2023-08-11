import { visualizer } from 'rollup-plugin-visualizer';
import gzip from 'rollup-plugin-gzip';
import { defineConfig } from 'vite';
import config from './vite.config.js';

export default defineConfig({
  ...config,
  root: './litelib',
  plugins: [
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './litelib/stats.html', // will be saved in project's root
    }),
    gzip(),
  ],
});
