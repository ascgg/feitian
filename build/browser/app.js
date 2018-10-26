'use strict';

var _electron = require('electron');

var _menu = require('./menu');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoUpdater = require('./auto-updater');

var devMode = (process.argv || []).indexOf('--dev') !== -1;

var mainWindow = null;

_electron.ipcMain.on('open-file-dialog', function (event) {
  _electron.dialog.showOpenDialog({
    properties: ['openFile']
  }, function (files) {
    if (files) {
      event.sender.send('selected-directory', files[0], _path2.default.basename(files[0], _path2.default.extname(files[0])));
    }
  });
});

_electron.ipcMain.on('open-save-dialog', function (event) {
  var options = {
    title: '导出数据表文件',
    filters: [{ name: 'Excel 文件', extensions: ['xlsx'] }]
  };
  _electron.dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saved-directory', filename);
  });
});

_electron.ipcMain.on('open-info-dialog', function (event) {
  var options = {
    type: 'info',
    title: '确认删除表格',
    message: '是否要删除当前表格',
    buttons: ['是', '否']
  };
  _electron.dialog.showMessageBox(options, function (index) {
    event.sender.send('info-dialog-selection', index);
  });
});

function initialize() {
  var shouldQuit = makeSingleInstance();
  if (shouldQuit) return _electron.app.quit();

  function createWindow() {
    mainWindow = new _electron.BrowserWindow({
      title: '飞天',
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: '#FFFFF0',
      show: false
    });

    mainWindow.maximize();

    (0, _menu.attachMenuToWindow)(_electron.app, createWindow);

    var entryBasePath = devMode ? 'http://localhost:8080' : 'file://' + _path2.default.resolve(__dirname, '..');
    mainWindow.loadURL(entryBasePath + '/static/index.html');

    mainWindow.on('closed', function () {
      return mainWindow = null;
    });

    mainWindow.on('ready-to-show', function () {
      mainWindow.show();
      mainWindow.focus();
    });

    if (devMode) {
      mainWindow.openDevTools();
    }
  }

  _electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      _electron.app.quit();
    }
  });

  _electron.app.on('ready', function () {
    createWindow(_electron.app);
    autoUpdater.initialize();
  });

  _electron.app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

function makeSingleInstance() {
  if (process.mas) return false;
  return _electron.app.makeSingleInstance(function () {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });
}

switch (process.argv[1]) {
  case '--squirrel-install':
    autoUpdater.createShortcut(function () {
      _electron.app.quit();
    });
    break;
  case '--squirrel-uninstall':
    autoUpdater.removeShortcut(function () {
      _electron.app.quit();
    });
    break;
  case '--squirrel-obsolete':
  case '--squirrel-updated':
    _electron.app.quit();
    break;
  default:
    initialize();
}