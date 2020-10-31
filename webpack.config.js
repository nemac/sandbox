const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    DISTSRC: path.resolve(__dirname, 'dist/src'),
    SRC: path.resolve(__dirname, 'src'),
    SRC_HTML: path.resolve(__dirname, 'src')
};

module.exports = {
    entry: {
      index: path.join(paths.SRC, 'index.js'),
      // SandboxControls: path.join(paths.SRC, 'SandboxControls.js'),
      // SandboxGeneratePlotData: path.join(paths.SRC, 'SandboxGeneratePlotData.js'),
      // SandboxPlotRegion: path.join(paths.SRC, 'SandboxPlotRegion.js'),
      // SandboxHumanReadable: path.join(paths.SRC, 'SandboxHumanReadable.js'),
      // SandboxSlider: path.join(paths.SRC, 'SandboxSlider.js'),
      // SandboxSelector: path.join(paths.SRC, 'SandboxSelector.js'),
      // SandboxDataCheck: path.join(paths.SRC, 'SandboxDataCheck.js')
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
                loader: 'babel-loader',
                exclude: /node_modules/
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