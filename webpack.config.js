require('dotenv').config();
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var Dotenv = require('dotenv-webpack');

var config = {
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: './public',
        port: process.env.PORT || 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                    useRelativePath: true,
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader', // ts-loader || awesome-typescript-loader => testing performance alternative
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader', // TODO: test => css-to-mui-loader
                }),
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new Dotenv({ systemvars: true }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new ExtractTextPlugin('./style.css'),
        new OptimizeCssAssetsPlugin(),
    ],
};

module.exports = config;
