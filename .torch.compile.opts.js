module.exports = {
  babelrc: {
    presets: ['@babel/preset-env'],
    sourceMaps: 'inline',
  },
  extensions: ['.es6', '.es', '.jsx', '.js', '.ts', '.tsx', '.css', '.svg'],
  include: ['src/**', 'lib/**', 'tests/**'],
  exclude: ['bower_components/**', 'node_modules/**'],
  tsconfig: require('./tsconfig.json'),
};
