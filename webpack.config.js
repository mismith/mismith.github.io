var webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		//'webpack-dev-server/client?http://localhost:8080',
		//'webpack/hot/dev-server',
		'./src/main.js',
	],
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	// devServer: {
	// 	contentBase: __dirname + '/dist',
	// 	//hot: true,
	// 	historyApiFallback: true,
	// },
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel'],
				include: __dirname + '/src',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css', 'postcss'),
				include: __dirname + '/src',
			},
		],
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('bundle.css', {allChunks: true}),
	],
	babel: {
		presets: [
			"es2015",
			"react",
			"stage-0",
		],
	},
	postcss: [
		require('postcss-cssnext'),
	],
};