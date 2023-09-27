import nodePolyfills from 'rollup-plugin-polyfill-node';
import visualizer from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const isBundleVis = !!process.env.BUNDLE_VIS;

const Bundles = [
  // [input, output, name]
  ['bundle/g2.std.ts', 'dist/g2.min.js', 'G2'],
  ['bundle/g2.lite.ts', 'dist/g2.lite.min.js', 'G2'],
  ['bundle/g2.full.ts', 'dist/g2.full.min.js', 'G2'],
];

export default [
  // Bundle for G2 umd entries.
  ...Bundles.map(([input, file, name], idx) => ({
    input,
    treeshake: {
      preset: 'smallest',
    },
    output: [
      {
        file,
        name,
        format: 'umd',
        sourcemap: false,
        plugins: [isBundleVis && idx === Bundles.length - 1 && visualizer()],
      },
    ],
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      terser(),
    ],
    context: 'window', // Disable 'THIS_IS_UNDEFINED' warnings
  }))
];
