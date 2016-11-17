// const plugins = require('webpack-load-plugins')();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require( 'path' );
const validate = require('webpack-validator');
const webpack = require( 'webpack' );

const parts = require('./src/libs/parts');

const PATHS = {
	build: path.join(__dirname, 'build'),
	data: path.join(__dirname, 'src', 'data'),
	style: [
		path.join(__dirname, 'src', 'style', 'app.css')
	],
	src: path.join(__dirname, 'src')
};

const common = {
	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.

	entry: {
		style: PATHS.style,
		app: PATHS.src + '/js',
	},

	output: {
		path: PATHS.build,
		filename: '[name].js'
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
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin ({
			title: 'Spelling Quiz Assistant'
		})
	],

	stats: {
		colors: true
	},
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
	case 'build':
	case 'stats':
		config = merge(
			common,
			{
				devtool: 'source-map',
				output: {
					path: PATHS.build,
					publicPath: '/quiz-assistant/',
					filename: '[name].[chunkhash].js',
					// This is used for require.ensure. The setup
					// will work without but this is useful to set.
					chunkFilename: '[chunkhash].js'
				}
			},
			parts.clean(PATHS.build),
			parts.setFreeVariable(
				'process.env.NODE_ENV',
				'production'
			),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react', 'react-dom']
			}),
			parts.minify(),
			parts.extractCSS(PATHS.style),
			parts.purifyCSS([PATHS.src])
		);
		break;


	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.setupCSS(PATHS.style),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
	quiet: true
});
