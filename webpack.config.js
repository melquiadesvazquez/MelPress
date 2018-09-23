const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CriticalPlugin } = require('webpack-plugin-critical');
// Without the line below, dotenv-webpack module doesn't work properly on some pages
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/.env') }); // eslint-disable-line
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const page = ({
  title, template, chunks, filename
}) => (
  new HtmlWebpackPlugin(
    {
      title,
      template,
      chunks,
      minify: {
        collapseWhitespace: true
      },
      filename
    }
  )
);

const commonConfig = {
  entry: {
    posts: ['@babel/polyfill', 'whatwg-fetch', path.join(__dirname, 'src', 'pages', 'posts', 'index')],
    post: ['@babel/polyfill', 'whatwg-fetch', path.join(__dirname, 'src', 'pages', 'post', 'index')]
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv(),
    page({
      title: 'Posts',
      template: path.join(__dirname, 'src', 'pages', 'posts', 'index.html'),
      chunks: ['posts'],
      filename: path.resolve(__dirname, 'dist', 'index.html')
    }),
    page({
      title: 'Post',
      template: path.join(__dirname, 'src', 'pages', 'post', 'index.html'),
      chunks: ['post'],
      filename: path.resolve(__dirname, 'dist', 'post', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/assets/',
              outputPath: 'assets/'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.(html|ejs)$/,
        use: ['html-loader', 'ejs-html-loader']
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      data: path.resolve(__dirname, 'src', 'data'),
      services: path.resolve(__dirname, 'src', 'services'),
      pages: path.resolve(__dirname, 'src', 'pages')
    }
  },
  devtool: 'source-map'
};

const devConfig = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    overlay: true,
    https: process.env.PROTOCOL === 'https',
    host: process.env.HOST,
    port: process.env.PORT
  }
};


const prodConfig = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(
        {
          cssProcessorOptions: { map: { inline: false } }
        }
      ),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new CriticalPlugin({
      src: path.join(__dirname, 'src', 'pages', 'posts', 'index.html'),
      inline: true,
      minify: true,
      dest: path.join(__dirname, 'dist', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = (env, argv) => (
  argv.mode === 'development'
    ? merge(commonConfig, devConfig)
    : merge(commonConfig, prodConfig)
);
