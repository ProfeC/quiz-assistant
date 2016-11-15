// const plugins = require('webpack-load-plugins')();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require( 'path' );
const validate = require('webpack-validator');
const webpack = require( 'webpack' );

const extractCSS = new ExtractTextPlugin('app.bundle.css');

const PATHS = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build')
};

const common = {
	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.

	entry: {
		app: PATHS.src + '/js/app.js',
		// html: PATHS.src + '/index.html',
		// vendor: ['react']
	},

	output: {
		path: PATHS.build,
		filename: '[name].bundle.js'
	},

	// NOTE: Webpack Development Server
	devServer: {
		contentBase: "build/",
		// compress: true,
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
			// {
			// 	test: /\.scss$/,
			// 	loaders: [
			// 		"style",
			// 		"css?sourceMap",
			// 		"sass?sourceMap"
			// 	]
			// },
			{ test: /\.scss$/i, loader: extractCSS.extract(['css?sourceMap','sass?sourceMap']) }
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
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
			sourceMap: true,
			compress: { warnings: false },
			output: { comments: false }
		}),
		extractCSS
	],

	// NOTE: Sass Loader options
	sassLoader: {
		includePaths: [path.resolve(__dirname, "./src/scss")],
		sourceMap: true
	},

	stats: {
		colors: true
	},

	devtool: 'source-map'
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
	case 'build':
		config = merge(common, {});
		break;
	default:
		config = merge(common, {});
}

module.exports = validate(config);
