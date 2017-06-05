module.exports = (webpackConfig) => {
  Object.assign(webpackConfig.output, {
    library: 'G2',
    libraryTarget: 'umd',
    umdNamedDefine: true
  })
  return webpackConfig
}
