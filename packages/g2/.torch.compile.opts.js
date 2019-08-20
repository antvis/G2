module.exports = {
  babelrc: {
    presets: [
      '@babel/env'
    ],
    sourceMaps: 'inline'
  },
  extensions: ['.es6', '.es', '.jsx', '.js', '.ts'],
  include: [
    'src/**',
    'lib/**',
    '__tests__/**',
  ],
  exclude: [
    'bower_components/**',
    'node_modules/**'
  ]
};
