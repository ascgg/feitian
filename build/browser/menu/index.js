'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachMenuToWindow = attachMenuToWindow;

var _electron = require('electron');

var _darwin = require('./darwin');

var darwin = _interopRequireWildcard(_darwin);

var _linux = require('./linux');

var linux = _interopRequireWildcard(_linux);

var _win = require('./win32');

var win32 = _interopRequireWildcard(_win);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MENUS = {
  darwin: darwin,
  linux: linux,
  win32: win32
};

function attachMenuToWindow(app, newWindow) {
  var template = MENUS[process.platform].buildMenuTemplate(app, newWindow);
  var menu = _electron.Menu.buildFromTemplate(template);
  _electron.Menu.setApplicationMenu(menu);
}