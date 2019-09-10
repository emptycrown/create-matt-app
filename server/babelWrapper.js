// Wraps any given script in our babel-register
// Usage: `SCRIPT=<path/to/script> node babelWrapper.js`
//   path should be given from server root repo
process.on('unhandledRejection', e => {
  throw e;
});
process.env.PLATFORM = 'server';

const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const serverDir = path.resolve(rootDir, 'server');

let envPath;
if (process.env.NODE_ENV === 'production') {
  envPath = path.resolve(rootDir, 'prod.env');
} else {
  envPath = path.resolve(rootDir, 'dev.env');
}
require('dotenv').config({ path: envPath });

require('@babel/register')({
  configFile: path.resolve(serverDir, 'babel.config.js'),
  // Apparently we need this to be able to require files in '../'
  ignore: [/node_modules/],
});
require('@babel/polyfill');
require('./' + process.env.SCRIPT);
