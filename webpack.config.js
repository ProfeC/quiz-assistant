// const plugins = require('webpack-load-plugins')();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require( 'path' );
const validate = require('webpack-validator');
const webpack = require( 'webpack' );
const parts = require('./libs/parts');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  build: path.join(__dirname, 'build'),
  data: path.join(__dirname, 'src', 'data'),
  src: path.join(__dirname, 'src'),
  style: path.join(__dirname, 'src', 'style', 'app.scss')
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

  // NOTE: Don't remove ' '. Imports without an extension won't work without it.
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: PATHS.src,
        loaders: ['babel?cacheDirectory']
      } ,
      {
        test: /\.json$/,
        loader: 'json'
      },
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

process.env.BABEL_ENV = TARGET;
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
        name: 'frameworks',
        entries: ['react', 'react-dom']
      }),
      parts.minify(),
      parts.extractSass(PATHS.style)
      // parts.purifyCSS([PATHS.src])
    );
    break;


  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupSass(PATHS.style),
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
