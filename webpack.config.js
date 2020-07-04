/**
 * This is the base config file.
 * Dev and Prod environments use this file as a starting point for their build config.
 */
/* eslint-disable */
const path = require('path');
const webpack = require('webpack');


const baseConfig = {
    // Add base config options here
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(txt|tmpl.html|html)$/, // the file name ends with .txt or .tmpl.html (html template)
                use: 'raw-loader'
            },
            {
                test: /\.less$/i,
              
                use: [
                    {
                        loader: 'css-to-string-loader' // translates CSS into strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // don't need all the locales for moment.js
    ]
};

    
const customWebComponents = Object.assign({}, baseConfig, {
    name: 'Leaflet Map Web Component',
    entry: {
        "Leaflet-Map-Component": './src/index.js',
    }
});

module.exports = [
    customWebComponents
];