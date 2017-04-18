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

// exports.lintJSX = function(include) {
//   return {
//     module: {
//       preLoaders: [
//         {
//           test: /\.(js|jsx)$/,
//           loaders: ['eslint'],
//           include: include
//         }
//       ]
//     }
//   };
// }

exports.loadTSX = function(include) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          include: include,
          exclude: '/node_modules'
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
