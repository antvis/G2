const webpack = require('webpack');
const resolve = require('path').resolve;
const pkg = require('./package.json');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    g2: './index.js'
  },
  output: {
    filename: '[name].js',
    library: 'G2_3',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'transform-remove-strict-mode'
            ],
            presets: [
              [
                'env', {
                  loose: true,
                  modules: false
                }
              ]
            ]
          }
        }
      },
      {
        test: /global\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '____G2_VERSION____',
            replace: pkg.version
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
