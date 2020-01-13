const webpack = require('webpack');
const resolve = require('path').resolve;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    g2: './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'G2',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: false, // 是否生成stats.json文件
    }),
  ],
  devtool: 'source-map',
};
