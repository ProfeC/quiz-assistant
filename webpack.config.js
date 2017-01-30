// const plugins = require('webpack-load-plugins')();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require( 'path' );
const validate = require('webpack-validator');
const webpack = require( 'webpack' );
const parts = require('./libs/parts');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public'),
  components: path.join(__dirname, 'app', 'components'),
  data: path.join(__dirname, 'app', 'data'),
  libs: path.join(__dirname, 'app', 'libs'),
  style: path.join(__dirname, 'app', 'scss', 'app.scss'),
  views: path.join(__dirname, 'app', 'views')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.

  entry: {
    // style: PATHS.style,
    app: PATHS.app,
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  // NOTE: Don't remove ' '. Imports without an extension won't work without it.
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: PATHS.app,
      //   loaders: ['babel?cacheDirectory']
      // } ,
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
  case 'watch':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          // filename: '[name].[chunkhash].js',
          filename: '[name].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          // chunkFilename: '[chunkhash].js'
          chunkFilename: '.js'
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
    //   parts.extractSass(PATHS.style),
      // parts.purifyCSS([PATHS.app]),
      parts.loadJSX(PATHS.app),
      parts.lintJSX(PATHS.app)
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
      }),
      parts.loadJSX(PATHS.app),
      parts.lintJSX(PATHS.app)
    );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});
