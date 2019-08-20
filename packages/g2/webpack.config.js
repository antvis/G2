const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
  entry: {
    g2: './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'G2',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist/'),
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  performance: {
    hints: false
  },
  devtool: 'source-map',
};
