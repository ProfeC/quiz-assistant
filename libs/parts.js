const webpack = require('webpack');
const path = require( 'path' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

exports.devServer = function(options) {
	return {
		devServer: {
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set
			// HotModuleReplacementPlugin!
			// hot: true,
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

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          options.name, 'manifest'
        ]
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/i,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
          include: paths
        },
      ]
    },
    plugins: [
      // new ExtractTextPlugin('[name].[chunkhash].css')
      new ExtractTextPlugin('[name].css')
    ]
  };
}

exports.extractSass = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/i,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
          // loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: [
              path.join(__dirname, 'node_modules/foundation-sites/scss/'),
              paths
          ]
        },
      ]
    },
    plugins: [
      // new ExtractTextPlugin('[name].[chunkhash].css')
      new ExtractTextPlugin('[name].css')
    ]
  };
}

exports.lintJSX = function(include) {
  return {
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['eslint'],
          include: include
        }
      ]
    }
  };
}

exports.loadJSX = function(include) {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          // Enable caching for extra performance
          loaders: ['babel?cacheDirectory'],
          include: include
        }
      ]
    }
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

// exports.purifyCSS = function(paths) {
//  return {
//    plugins: [
//      new PurifyCSSPlugin({
//        basePath: process.cwd(),
//        // `paths` is used to point PurifyCSS to files not
//        // visible to Webpack. You can pass glob patterns
//        // to it.
//        paths: paths
//      })
//    ]
//  };
// }

exports.setupCSS = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: paths
				}
			]
		}
	};
}

exports.setupSass = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loaders: ['style', 'css', 'sass'],
					include: paths
				}
			]
		}
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
