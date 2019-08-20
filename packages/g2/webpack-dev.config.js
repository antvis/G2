const webpackConfig = require('./webpack.config');
const _ = require('@antv/util');

module.exports = _.deepMix({
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
}, webpackConfig);
