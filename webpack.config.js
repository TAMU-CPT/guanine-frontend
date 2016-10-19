var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FileLoader = require('file-loader');

module.exports = {
    entry: ["./js/app.js", "./css/main.scss"],
    output: {
        path: __dirname + "/build",
        filename: "app.js",
        publicPath: "/build"
    },
    module: {
        loaders: [
            { test: /\.(png|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader' },
            { test: /\.(scss|css)$/, loader: "style!css!sass" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
            { test: /node_modules[\\\/]admin-config[\\\/].*\.jsx?$/, loader: 'babel' },
            { test: /\.html$/, loader: 'html' },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new BowerWebpackPlugin()
    ]
};
