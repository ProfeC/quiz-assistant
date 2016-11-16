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
	scss: path.join(__dirname, 'src', 'scss'),
	src: path.join(__dirname, 'src')
};

const common = {
	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.

	entry: {
		app: PATHS.src + '/js',
		// style: PATHS.scss + '/app.scss',
		// html: PATHS.src + '/index.html',
		vendor: ['react', 'react-dom']
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

	// resolve: {
	// 	extensions: ['', '.js', '.jsx'],
	// 	modules: [
	// 		path.resolve('./src'),
	// 		'node_modules'
	// 	]
	// },

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
		config = merge(
			common,
			{
				devtool: 'source-map'
			},
			parts.setFreeVariable(
				'process.env.NODE_ENV',
				'production'
			),
			parts.minify(),
			parts.setupSass(PATHS.src)
		);
		break;
	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.setupSass(PATHS.scss),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

module.exports = validate(config);
