import nodePolyfills from 'rollup-plugin-polyfill-node';
import visualizer from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const isBundleVis = !!process.env.BUNDLE_VIS;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/g2.min.js',
      name: 'G2',
      format: 'umd',
      sourcemap: false,
      // 私有插件
      plugins: [isBundleVis && visualizer()],
    },
    {
      file: 'dist/g2-lite.min.js',
      name: 'G2',
      format: 'umd',
      sourcemap: false,
      globals: {
        '@antv/g': 'window.G',
        '@antv/g-canvas': 'window.G.Canvas2D',
      },
    },
  ],
  plugins: [
    nodePolyfills(),
    resolve(),
    commonjs(),
    typescript({
      exclude: 'node_modules/**',
      useTsconfigDeclarationDir: true,
      extensions: ['.js', '.ts'],
    }),
    terser(),
  ],
  context: 'window', // Disable 'THIS_IS_UNDEFINED' warnings
};
