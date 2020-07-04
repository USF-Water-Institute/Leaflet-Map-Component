/* eslint-disable */

const merge = require('webpack-merge');
const common = require('./webpack.config.js');


module.exports = common.map(pack => merge(pack, {
    mode: 'development',
    devtool: 'source-map',
}));
