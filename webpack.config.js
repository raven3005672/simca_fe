const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        // index: path.resolve(__dirname, 'src/index.js'),
        index: path.resolve(__dirname, 'src/index.tsx')
    },
    output: {
        filename: '[name]@[chunkhash].js',
        // filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // devtool: 'source-map',
    devServer: {
        // inline: true,       // 打包后加入一个websocket客户端
        // hot: true,          // 热加载
        contentBase: path.resolve(__dirname, 'dist'),
        port: '3000',
        host: 'localhost',
        // compress: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {              // 抽离自己写的公共代码
                    chunks: 'initial',
                    name: 'common',     // 打包后的文件名，任意命名
                    minChunks: 2,       // 最小引用2次
                    minSize: 0          // 只要超出0字节就生成一个新包
                },
                vendor: {                       // 抽离第三方插件
                    test: /node_modules/,       // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',             // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                }
            }
        },
        minimizer: [
            new UglifyWebpackPlugin({
                parallel: 4
            }),
            new OptimizeCssAssetsWebpackPlugin(),
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/react'
                            ],
                            plugins: [
                                require('@babel/plugin-proposal-object-rest-spread'),
                                [require('@babel/plugin-proposal-decorators'), {"legacy": true}]
                            ]
                        }
                    },
                    'ts-loader'
                ]
            },
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader'
            // },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/react'
                            ],
                            plugins: [
                                require('@babel/plugin-proposal-object-rest-spread'),
                                [require('@babel/plugin-proposal-decorators'), {"legacy": true}]
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                // query 为loader添加额外的设置选项
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'less-loader'
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|wvg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ]
}