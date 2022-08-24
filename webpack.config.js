const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    //filename: 'bundle.js',
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean:true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
    }), 
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css"
    })
  ],
  mode: 'development',
  devServer: {
    port: 8080,
    watchFiles: ['src/**/*'],
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            },
        },
        generator: {
            filename: 'images/[contenthash][ext][query]',
        },
       },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};