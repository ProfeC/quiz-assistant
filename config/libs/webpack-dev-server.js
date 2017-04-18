const webpack = require('webpack');
const path = require( 'path' );

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
			//"errors-only", "minimal", "none", "normal", "verbose"
			stats: 'errors-only',

      // When using inline mode, the console in your DevTools will show you
      // messages e.g. before reloading, before an error or when Hot Module
      // Replacement is enabled. This may be too verbose. Possible values are:
      // none, error, warning or info (default).
      clientLogLevel: 'info',

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
			compress: true,

      // Tell the server where to serve content from. This is only necessary if
      // you want to serve static files. devServer.publicPath will be used to
      // determine where the bundles should be served from, and takes precedence.
      // contentBase: [path.join(__dirname, 'build'), path.join(__dirname, 'app', 'data')],

      // Shows a full-screen overlay in the browser when there are compiler
      // errors or warnings. Disabled by default.
      overlay: {
        warnings: true,
        errors: true
      },

      // Proxying some URLs can be useful when you have a separate API backend
      // development server and you want to send API requests on the same
      // domain.
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          pathRewrite: {'^/api' : '/app/data'}
        }
      },
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
