"use strict";

const webpack = require('webpack');
const path = require('path');

const build = process.env.BUILD;

let entry = ['./app/index.js'];

if (build === 'dev') {
    entry.unshift('webpack/hot/only-dev-server');
    entry.unshift('webpack-dev-server/client?http://0.0.0.0:8080');
}

module.exports = {
    entry: entry,
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [require.resolve('babel-preset-es2015')]
                }
            },

            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }

             ]
    },
    devServer: {
        contentBase: "./",
        noInfo: false, //  --no-info option
        hot: true,
        inline: true,
        filename: "public/bundle.js"
    },
    node: {
      fs: "empty"
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
};