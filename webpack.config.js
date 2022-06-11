const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/entry.tsx',
  // devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: path.resolve('node_modules', 'react'),
      'react-dom': path.resolve('node_modules', 'react-dom')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'}
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      favicon: path.resolve('public','favicon.ico')
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        toplevel: true, // 最高级别，删除无用代码
    }
    })],
  },
}
