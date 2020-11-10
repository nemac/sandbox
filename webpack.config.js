const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Constant with our paths
const paths = {
  DISTSCRIPTS: path.resolve(__dirname, 'dist/scripts'),
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src/scripts'),
  SRC_HTML: path.resolve(__dirname, 'src/html')
};

module.exports = {
    entry: {
      index: path.join(paths.SRC, 'index.js'),
    },
    performance: {
       hints: "warning",
       maxEntrypointSize: 100000,
       maxAssetSize: 100000
    },
    output: {
        // path: paths.DISTSCRIPTS,
        filename: 'scripts/[name].app.bundle.js',
        chunkFilename: 'scripts/[id].js',
        publicPath: ''
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                  "postcss-loader"
                ]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename:  path.join('css/style.[contenthash].css'),
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: path.join(paths.SRC_HTML, 'index.html'),
          filename: path.join(paths.DIST, 'index.html'),
          inject: 'body',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
       new webpack.HotModuleReplacementPlugin(),
    ]
};