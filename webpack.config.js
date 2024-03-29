const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

// Constant with our paths
const paths = {
  DISTSCRIPTS: path.resolve(__dirname, 'dist/scripts'),
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src/scripts'),
  SRC_HTML: path.resolve(__dirname, 'src/html')
};

module.exports = {
    devServer: {
      static: {
         directory: path.resolve(__dirname, 'sandboxdata/TSU_Sandbox_Datafiles'),
         publicPath: '/sandboxdata/TSU_Sandbox_Datafiles'
      }
     },
    entry: {
      index: path.join(paths.SRC, 'index.js'),
      SandboxPlotRegion: './src/scripts/SandboxPlotRegion.js',
    },
    mode: 'production',
    performance: {
       hints: false,
       maxEntrypointSize: 512000,
       maxAssetSize: 512000
    },
    output: {
        // path: paths.DISTSCRIPTS,
        filename: 'scripts/[name].app.bundle.js',
        chunkFilename: 'scripts/[name].js',
        publicPath: ''
    },
    optimization: {
      moduleIds: 'size',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            // name: 'vendors',
            chunks: 'all',
          },
        },
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
          filename:  path.join('css/style.[name].css'),
          chunkFilename: "[name].css"
        }),
        new Dotenv(),
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