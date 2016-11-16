const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('app.bundle.css');

exports.devServer = function(options) {
	return {
		devServer: {
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set
			// HotModuleReplacementPlugin!
			hot: true,
			inline: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env to allow customization.
			//
			// If you use Vagrant or Cloud9, set
			// host: options.host || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: options.host, // Defaults to `localhost`
			port: options.port, // Defaults to 8080

			// Set this if you want to enable gzip compression for assets
			compress: true
		},
		plugins: [
			// Enable multi-pass compilation for enhanced performance
			// in larger projects. Good default.
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	};
}

exports.setupSass = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.scss$/i,
					loader: extractCSS.extract(['css?sourceMap','sass?sourceMap']),
					include: paths
				},
				// {
				// 	test: /\.scss$/,
				// 	loaders: [
				// 		"style",
				// 		"css?sourceMap",
				// 		"sass?sourceMap"
				// 	]
				// },
				// { test: /\.scss$/i, loader: extractCSS.extract(['css?sourceMap','sass?sourceMap']) }
			]
		},
		plugins: [
			extractCSS
		],

		// NOTE: Sass Loader options
		// sassLoader: {
		// 	includePaths: [paths],
		// 	sourceMap: true
		// }
	};
}

exports.minify = function() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				debug: false,
				drop_console: true,
				mangle: false,
				minimize: true,
				sourceMap: true,
				output: {
					comments: false
				},
				compress: {
					warnings: false
				},
			})
		]
	};
}

exports.setFreeVariable = function(key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	};
}

exports.extractBundle = function(options) {
	const entry = {};
	entry[options.name] = options.entries;

	return {
		// Define an entry point needed for splitting.
		entry: entry,
		plugins: [
			// Extract bundle and manifes files. Manifest is needed for reliable caching.
			new webpack.optimize.CommonsChunkPlugin({
				names: [
					options.name, 'manifest'
				]
			})
		]
	};
}
