import gzip from 'rollup-plugin-gzip';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import config from './vite.config.js';

export default defineConfig({
  ...config,
  root: './corelib',
  plugins: [
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './corelib/stats.html', // will be saved in project's root
    }),
    gzip(),
  ],
});
