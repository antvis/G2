const webpack = require('webpack');
const {
  resolve
} = require('path');

module.exports = {
  entry: {
    g2: './index.js'
  },
  output: {
    filename: '[name].js',
    library: 'G2',
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
            presets: [
              'es2015',
              'stage-0'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
