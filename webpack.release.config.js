/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = common.map((pack) => merge(pack, {
    mode: 'production',
    plugins: [
        new MinifyPlugin({
            removeConsole: true
        })
    ],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    output: {
        filename: '[name].min.js',
    }
}));