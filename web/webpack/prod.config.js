const path = require('path');
const merge = require('webpack-merge');
const DotEnv = require('dotenv-webpack');

const root = path.resolve(__dirname, '..', '..');

require('dotenv').config({ path: path.resolve(root, 'prod.env') });

const baseConfig = require('./base.config.js');
module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    // TODO: Sentry
    new DotEnv({ path: path.join(root, 'prod.env') }),
  ],
});
