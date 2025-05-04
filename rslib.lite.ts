import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: 'bundle/g2.lite.ts',
    },
  },
  lib: [
    {
      format: 'umd',
      umdName: 'G2',
      output: {
        distPath: {
          root: './dist/lite',
        },
      },
    },
  ],
  output: {
    sourceMap: true,
    minify: true,
  },
});
