const webpack = require('webpack');
const merge = require('webpack-merge');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new ClearWebpackPlugin(['dist']),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
	optimization: {
	    splitChunks: {
	        cacheGroups: {
	            commons: {
	                test: /[\\/]node_modules[\\/]/,
	                name: "common",
	                chunks: "all"
	            }
	        }
	    }
	}
    
});