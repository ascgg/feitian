'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.auth = exports.sync = exports.read = undefined;

var _read = require('./read');

var read = _interopRequireWildcard(_read);

var _sync = require('./sync');

var sync = _interopRequireWildcard(_sync);

var _auth = require('./auth');

var auth = _interopRequireWildcard(_auth);

var _write = require('./write');

var write = _interopRequireWildcard(_write);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.read = read;
exports.sync = sync;
exports.auth = auth;
exports.write = write;