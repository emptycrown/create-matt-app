const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const R = require('ramda');

const root = path.resolve(__dirname, '..', '..');
const webPath = path.resolve(root, 'web');
const distPath = path.resolve(webPath, 'dist');
const themeVariables = lessToJs(
  fs.readFileSync(path.join(webPath, 'styles', 'antd-theme.less'), 'utf8')
);

module.exports = {
  context: root,
  entry: ['@babel/polyfill', './web/app/index.js'],
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath: '/dist/',
  },
  resolve: {
    modules: [
      root,
      path.resolve(root, 'node_modules'),
      path.resolve(webPath, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // Uses babel.config.js in webPath
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.join(webPath, 'babel.config.js'),
            plugins: [['import', { libraryName: 'antd', style: true }]],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          // TODO: do we need style-loader, css-loader?
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
              root,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss')(
                  path.resolve(webPath, 'styles', 'tailwind.config.js')
                ),
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PLATFORM: 'web',
    }),
    new HtmlWebpackPlugin({
      filename: path.relative(__dirname, path.resolve(distPath, '_index.html')),
      template: path.resolve(webPath, 'index.ejs'),
      templateParameters: {
        ...R.pick(
          [
            /* TODO: add env vars to substitute in index.ejs */
          ],
          process.env
        ),
      },
      hash: true,
    }),
  ],
  node: {
    fs: 'empty',
  },
};
