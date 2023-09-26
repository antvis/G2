import nodePolyfills from 'rollup-plugin-polyfill-node';
import visualizer from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const isBundleVis = !!process.env.BUNDLE_VIS;

const Plugins = () => [
  nodePolyfills(),
  resolve(),
  commonjs(),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];

export default [
  {
    input: 'src/index.ts',
    treeshake: {
      preset: 'smallest',
    },
    output: [
      {
        file: 'dist/g2.min.js',
        name: 'G2',
        format: 'umd',
        sourcemap: false,
      },
    ],
    plugins: Plugins(),
    context: 'window', // Disable 'THIS_IS_UNDEFINED' warnings
  },
  {
    input: 'src/index.lite.ts',
    treeshake: {
      preset: 'smallest',
    },
    output: [
      {
        file: 'dist/g2.lite.min.js',
        name: 'G2',
        format: 'umd',
        sourcemap: false,
      },
    ],
    plugins: Plugins(),
    context: 'window', // Disable 'THIS_IS_UNDEFINED' warnings
  },
  {
    input: 'src/index.full.ts',
    treeshake: {
      preset: 'smallest',
    },
    output: [
      {
        file: 'dist/g2.full.min.js',
        name: 'G2',
        format: 'umd',
        sourcemap: false,
        plugins: [isBundleVis && visualizer()],
      },
    ],
    plugins: Plugins(),
    context: 'window', // Disable 'THIS_IS_UNDEFINED' warnings
  }
];
