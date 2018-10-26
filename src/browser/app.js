import { app, dialog, ipcMain, BrowserWindow } from 'electron'
import { attachMenuToWindow } from './menu'
import path from 'path'
const autoUpdater = require('./auto-updater')


const devMode = (process.argv || []).indexOf('--dev') !== -1;

var mainWindow = null

ipcMain.on('open-file-dialog', function(event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function(files) {
    if (files) {
      event.sender.send('selected-directory', files[0], path.basename(files[0], path.extname(files[0])))
    }
  })
});

ipcMain.on('open-save-dialog', function(event) {
  const options = {
    title: '导出数据表文件',
    filters: [
      { name: 'Excel 文件', extensions: ['xlsx'] }
    ]
  }
  dialog.showSaveDialog(options, function(filename) {
    event.sender.send('saved-directory', filename)
  })
})

ipcMain.on('open-info-dialog', function(event) {
  const options = {
    type: 'info',
    title: '确认删除表格',
    message: '是否要删除当前表格',
    buttons: ['是', '否']
  };
  dialog.showMessageBox(options, function(index) {
    event.sender.send('info-dialog-selection', index)
  })
});

function initialize() {
  const shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()
  
  function createWindow() {
  	mainWindow = new BrowserWindow({
    	title: '飞天',
    	width: 1024,
    	height: 768,
    	minWidth: 800,
    	minHeight: 600,
      backgroundColor: '#FFFFF0',
      show: false
  	});

  	mainWindow.maximize();

  	attachMenuToWindow(app, createWindow);

  	const entryBasePath = devMode ? 'http://localhost:8080' : ('file://' + path.resolve(__dirname, '..'));
  	mainWindow.loadURL(entryBasePath + '/static/index.html');

  	mainWindow.on('closed', () => mainWindow = null);

    mainWindow.on('ready-to-show', function () {
      mainWindow.show();
      mainWindow.focus();
    });

    if (devMode) {
      mainWindow.openDevTools();
    }
	}
	
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('ready', () => {
  	createWindow(app)
  	autoUpdater.initialize()
  });
  
  app.on('activate', () => {
  	if (mainWindow === null) {
  		createWindow()
  	}
  });
}

function makeSingleInstance() {
  if (process.mas) return false
  return app.makeSingleInstance(function () {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  })
}

switch (process.argv[1]) {
  case '--squirrel-install':
    autoUpdater.createShortcut(function () { app.quit() })
    break
  case '--squirrel-uninstall':
    autoUpdater.removeShortcut(function () { app.quit() })
    break
  case '--squirrel-obsolete':
  case '--squirrel-updated':
    app.quit()
    break
  default:
    initialize()
}
