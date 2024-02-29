import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import { deepMix } from '@antv/util';
const { LINK, MODULE } = process.env;

if (LINK === '1' && !MODULE) {
  throw new Error(
    `Please specify MODULE, for example: $ MODULE=@antv/component npm run dev:link.`,
  );
}

/**
 * @desc Deeply merge user config into default config
 * @link https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
const baseOptions: UserConfig = {
  root: './__tests__/',
  server: {
    port: 8080,
    open: '/',
  },
  build: { outDir: '../' },
};

/**
 * @desc Link configuration
 * @link https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
const linkOptions: UserConfig = {
  server: {
    watch: {
      ignored: [`!**/node_modules/${MODULE}/**`],
    },
  },
  optimizeDeps: {
    exclude: [`${MODULE}`],
  },
};

/**
 * @desc Vite configuration
 * @link https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig(
  deepMix(baseOptions, LINK === '1' ? linkOptions : {}),
);
