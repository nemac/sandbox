const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Constant with our paths
const paths = {
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
        path: paths.DIST,
        filename: '[name].app.bundle.js',
        chunkFilename: '[id].js',
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
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                            sourceMap: true
                        }
                     },
                     {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [ 'autoprefixer', {}, ],
                                ],
                            },
                        }
                      }
                ]
            },
            {
              test: /\.scss$/,
              use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: path.join(paths.SRC_HTML, 'index.html'),
          filename: path.join(paths.DIST, 'index.html'),
          inject: 'body'
        }),
       new webpack.HotModuleReplacementPlugin(),
    ]
};