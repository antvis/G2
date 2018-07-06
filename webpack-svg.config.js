const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    'g2-svg': './src/index.js'
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
        test: /global\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: 'renderer\:\ \'canvas\'',
            replace: 'renderer\:\ \'svg\''
          }
        }
      },
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
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
