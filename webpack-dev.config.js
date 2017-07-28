const webpackConfig = require('./webpack.config');
const _ = require('lodash');

module.exports = _.merge({
  devtool: 'cheap-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}, webpackConfig);
