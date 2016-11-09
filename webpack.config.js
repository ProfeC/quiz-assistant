var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	entry: {
		app: './src/js/app.js'
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
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [ 'latest', 'react' ]
				}
			} ,
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	stats: {
		colors: true
	},

	devtool: 'source-map'
};
