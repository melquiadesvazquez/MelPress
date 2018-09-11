/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CriticalPlugin } = require('webpack-plugin-critical');
const Dotenv = require('dotenv-webpack');

const page = ({ title, template, chunks, filename }) => {
  return new HtmlWebpackPlugin(
    {
      title,
      template,
      chunks,
      minify: {
        collapseWhitespace: true
      },
      filename
    }
  );
};

const commonConfig = {
  entry: {
    articles: ['babel-polyfill', path.join(__dirname, 'src', 'pages', 'articles', 'index')],
    contact: ['babel-polyfill', path.join(__dirname, 'src', 'pages', 'contact', 'index')]
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv(),
    page({
      title: 'Articles',
      template: path.join(__dirname, 'src', 'pages', 'articles', 'index.html'),
      chunks: ['articles'],
      filename: path.resolve(__dirname, 'dist', 'index.html')
    }),
    page({
      title: 'Contact',
      template: path.join(__dirname, 'src', 'pages', 'contact', 'index.html'),
      chunks: ['contact'],
      filename: path.resolve(__dirname, 'dist', 'contact', 'index.html')
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
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              name: 'assets/[name].[hash].[ext]'
            }
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
      services: path.resolve(__dirname, 'src', 'services')
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
    port: 3000
  }
};

const prodConfig = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new CriticalPlugin({
      src: path.join(__dirname, 'src', 'pages', 'articles', 'index.html'),
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
