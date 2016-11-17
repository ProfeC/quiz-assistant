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
	scss: path.join(__dirname, 'src', 'scss', 'app.scss'),
	src: path.join(__dirname, 'src')
};

const common = {
	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.

	entry: {
		style: PATHS.scss,
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
				devtool: 'source-map',
				output: {
					path: PATHS.build,
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
			parts.extractStyle(PATHS.scss)
		);
		break;
	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.setupSCSS(PATHS.scss),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

module.exports = validate(config);
