const path = require('path');
const merge = require('webpack-merge');
const dotEnv = require('dotenv-webpack');

const root = path.resolve(__dirname, '..', '..');
require('dotenv').config({ path: path.resolve(root, 'dev.env') });

const baseConfig = require('./base.config.js');
module.exports = merge(baseConfig, {
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  // devtool: 'inline-source-map',
  mode: 'development',
  plugins: [new dotEnv({ path: path.join(root, 'dev.env') })],
});
