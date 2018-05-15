const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/assets/js/index.js'
	},
	output: {
		filename: './static/js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
	    alias: {
	        easeljs: path.join(__dirname,'src') + '/assets/lib/easeljs-0.8.2.combined.js',
	    	preloadjs: path.join(__dirname,'src')+ '/assets/lib/preloadjs-0.6.2.combined.js',
	    	soundjs: path.join(__dirname,'src')+ '/assets/lib/soundjs-0.6.2.combined.js', 
	    	tweenjs: path.join(__dirname,'src')+ '/assets/lib/tweenjs-0.6.2.combined.js'
	    }
	},
	plugins: [
		new ExtractTextPlugin({
	     	filename: './static/css/style.css'
	    }),
	    new HtmlWebpackPlugin({
			title: '花语月',
	        filename: 'index.html',
	        template: 'src/index.html',
	        inject: 'body', 
	        chunks: ['index'] 
	    }),
    ],
	module:{
		rules: [
			{
				test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		            fallback: "style-loader",
		            use: "css-loader"
		        })
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
		          	fallback: 'style-loader',
		          	use: [
			          	'css-loader', 
			          	'sass-loader'
		          	]
		        })
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader:'file-loader',
						options: {
					        outputPath: 'static',
					        publicPath: '../images',
					        name: '[name].[ext]',
					        useRelativePath: true
					    }
					}
				]
			},
			{
		        test: /\.json$/,
		        use: [
		        	'json-loader'
		        ]
		    }
		]
	}
}