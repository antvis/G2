module.exports = {
  babelrc: {
    presets: [
      'es2015',
      'stage-0'
    ],
    sourceMaps: 'inline'
  },
  extensions: ['.js'],
  include: [
    'node_modules/**/src/gl-matrix/**/*.js '
  ],
  exclude: [
    'bower_components/**/*.js',
  ]
}
