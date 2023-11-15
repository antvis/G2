import { defineConfig } from 'vite';
import { deepMix } from '@antv/util';

const { LINK, MODULE } = process.env;

if (LINK === '1' && !MODULE) {
  throw new Error(
    `Please specify MODULE, for example: $ MODULE=@antv/component npm run dev:link.`,
  );
}

const linkOptions =
  LINK === '1'
    ? {
        server: {
          watch: {
            ignored: [`!**/node_modules/${MODULE}/**`],
          },
        },
        optimizeDeps: {
          exclude: [`${MODULE}`],
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
      build: { outDir: '../' },
      define: {
        global: {},
      },
    },
    linkOptions,
  ),
);
