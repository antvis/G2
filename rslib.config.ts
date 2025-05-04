import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: 'src/index.ts',
    },
  },
  lib: [
    {
      dts: true,
      format: 'esm',
      output: {
        target: 'web',
      },
    },
    {
      format: 'cjs',
    },
    {
      format: 'umd',
      umdName: 'G2',
      output: {
        distPath: {
          root: './dist/umd',
        },
      },
    },
  ],
  output: {
    sourceMap: true,
    minify: true,
  },
});
