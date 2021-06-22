const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  output: {
    path: __dirname + '/public',
    filename: 'build/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {test: /\.ts?$/, loader: 'ts-loader'},
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: true,
          modules: true
        }
      }
    ]
  }
};
