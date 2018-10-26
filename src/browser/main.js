var path = require('path');

var devMode = (process.argv || []).indexOf('--dev') !== -1;

if (devMode) {
  require('babel-register');
}

require('babel-polyfill');

require('./app');
