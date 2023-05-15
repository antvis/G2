import { defineConfig } from 'vite';
import { deepMix } from '@antv/util';

const linkOptions =
  process.env.LINK === true
    ? {
        server: {
          watch: {
            ignored: ['!**/node_modules/@antv/gui/**'],
          },
        },
        optimizeDeps: {
          exclude: ['@antv/gui'],
        },
      }
    : {};

export default defineConfig(
  deepMix(
    {
      root: './__tests__/',
      server: {
        port: 8080,
        open: '/',
      },
    },
    linkOptions,
  ),
);
