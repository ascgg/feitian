'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildMenuTemplate = buildMenuTemplate;
function buildMenuTemplate(app, newWindow) {
  var name = app.getName();
  return [{
    label: '文件',
    submenu: [{
      label: '新表格',
      accelerator: 'Ctrl+T',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:new-table');
      }
    }, {
      type: 'separator'
    }, {
      label: '导入表格',
      accelerator: 'Ctrl+Shift+N',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:import-table');
      }
    }, {
      label: '删除表格',
      accelerator: 'Ctrl+Shift+D',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:delete-table');
      }
    }, {
      type: 'separator'
    }, {
      label: '输出表格',
      accelerator: 'Ctrl+E',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:export');
      }
    }, {
      type: 'separator'
    }, {
      label: '退出',
      accelerator: 'Ctrl+Q',
      click: function click() {
        return app.quit();
      }
    }]
  }, {
    label: '编辑',
    submenu: [{
      label: '剪切',
      accelerator: 'Ctrl+X',
      role: 'cut'
    }, {
      label: '复制',
      accelerator: 'Ctrl+C',
      role: 'copy'
    }, {
      label: '粘贴',
      accelerator: 'Ctrl+V',
      role: 'paste'
    }, {
      type: 'separator'
    }, {
      label: '添加行',
      accelerator: 'Ctrl+J',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:add-row');
      }
    }, {
      label: '删除行',
      accelerator: 'Ctrl+K',
      click: function click(item, win) {
        return win.webContents.send('fei-tian:remove-row');
      }
    }]
  }];
}