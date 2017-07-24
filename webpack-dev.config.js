const _ = require('lodash');
const webpackConfig = require('./webpack.config');

module.exports = _.assign({}, webpackConfig, {
  devtool: 'cheap-source-map'
});
