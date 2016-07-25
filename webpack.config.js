/**
 * Created by liyuan on 2016/6/5.
 */
// webpack.config.js
var webpack = require('webpack');
var less = require('less');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExtractLessPlugin = new ExtractTextPlugin;

module.exports = {
    entry: path.resolve(__dirname, './entry.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: "style!css!sass"},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
                plugins: [
                    ExtractLessPlugin
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("style.css")
        //压缩打包的文件
        //new webpack.optimize.UglifyJsPlugin({
        //    output: {
        //        comments: false  // remove all comments
        //    },
        //    compress: {
        //        warnings: false
        //    }
        //}),
        //new webpack.DefinePlugin({
        //    'process.env': {
        //        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //    }
        //})
    ]
};