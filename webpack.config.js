const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const chunkPositions = {
  manifest: 0,
  vendor: 1,
  app: 2
};

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'app/app.js')
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: ['css-loader'] })
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          { loader:'url-loader', options: { limit: 8192, name: 'assets/images/[hash].[ext]' } }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          { loader:'url-loader', options: { limit: 8192, name: 'assets/fonts/[hash].[ext]' } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      hash: true,
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: (a, b) => chunkPositions[a.names[0]] - chunkPositions[b.names[0]]
    }),

    // Extract Webpack's bootstrap and use only in the entries specified in chunks[]
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['app'],
    }),

    // Move all third-party modules to vendor bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
      chunks: ['app'],
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })

  ],
  devtool: 'source-map'
};
