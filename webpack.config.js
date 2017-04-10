'use strict';
const path = require('path');
const webpack = require('webpack');

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var WebpackStrip = require('strip-loader');

const plugins = [
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
        PRODUCTION: true
    }),
    new HtmlWebpackPlugin({
        template: './index.html'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
        $: "jquery"		// will be added if required
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.js',
        minChunks: 2,
    }),
];

var config = {
    context: path.resolve(__dirname, './src'), // `__dirname` is root of project and `src` is source
    entry: {
        app: './app',
        vendor: ['lodash', 'jquery'],
        styles: './style.less'
    },
    output: {
        filename: './built/[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /b.js/,
                loader: 'exports-loader?hiddenVar'
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader',
                ],
            },
            {
                test: /\.html/,
                use: [
                    'html-loader',
                ],
            },
        ]
    },
    plugins,
    devServer: {
        host: 'localhost',
        port: 8080,
        quiet: true,
    },
};

var webpackConfig = {
    module: {
        loaders: [
            { test: /\.js$/, loader: WebpackStrip.loader('debug', 'console.log') }
        ]
    }
};

if (process.env.NODE_ENV === "production") {
    config.devtool = "source-map";
}

module.exports = config;