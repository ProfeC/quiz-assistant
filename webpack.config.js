var webpack = require( 'webpack' );
var path = require( 'path' );
// var plugins = require('webpack-load-plugins')();

module.exports = {
	context: path.join(__dirname, './src'),
	entry: {
		app: './js/app.js',
		html: './index.html',
		vendor: ['react']
	},

	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].bundle.js'
	},

	// NOTE: Webpack Development Server
	devServer: {
		contentBase: "build/",
		compress: true,
		clientLogLevel: "info"
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'latest', 'react' ]
				}
			} ,
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.html$/,
				loader: 'file',
				query: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.css$/,
				loaders: [
					'style',
					'css'
				]
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.resolve('./src')
		]
	},
	plugins: [
		// new webpack.LoaderOptionsPlugin({
		// 	minimize: true,
		// 	debug: false
		// }),
		new webpack.optimize.UglifyJsPlugin({
			debug: false,
			mangle: false,
			minimize: true,
			sourceMap: false,
			compress: { warnings: false },
			output: { comments: false }
		})
	],

	stats: {
		colors: true
	},

	devtool: 'source-map'
};
