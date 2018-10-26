export function buildMenuTemplate(app, newWindow) {
  const name = app.getName();
  return [
    {
      label: name,
      submenu: [
        {
          label: `关于 ${name}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '服务',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `隐藏 ${name}`,
          accelerator: 'Cmd+H',
          role: 'hide'
        },
        {
          label: '隐藏 其他',
          accelerator: 'Cmd+Shift+H',
          role: 'hideothers'
        },
        {
          label: '显示 所有',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: `退出 ${name}`,
          accelerator: 'Cmd+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: '文件',
      submenu: [
        {
          label: '新表格',
          accelerator: 'Cmd+T',
          click: (item, win) => win.webContents.send('fei-tian:new-table')
        },
        {
          type: 'separator'
        },
        {
          label: '导入表格',
          accelerator: 'Cmd+Shift+N',
          click: (item, win) => win.webContents.send('fei-tian:import-table')
        },
        {
          label: '删除表格',
          accelerator: 'Cmd+Shift+D',
          click: (item, win) => win.webContents.send('fei-tian:delete-table')
        },
        {
          type: 'separator'
        },
        {
          label: '输出表格',
          accelerator: 'Cmd+E',
          click: (item, win) => win.webContents.send('fei-tian:export')
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '剪切',
          accelerator: 'Cmd+X',
          role: 'cut'
        },
        {
          label: '复制',
          accelerator: 'Cmd+C',
          role: 'copy'
        },
        {
          label: '粘贴',
          accelerator: 'Cmd+V',
          role: 'paste'
        },
        {
          type: 'separator'
        },
        {
          label: '添加行',
          accelerator: 'Cmd+J',
          click: (item, win) => win.webContents.send('fei-tian:add-row')
        },
        {
          label: '删除行',
          accelerator: 'Cmd+K',
          click: (item, win) => win.webContents.send('fei-tian:remove-row')
        }
      ]
    },
    {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Cmd+M',
          role: 'minimize'
        },
        {
          label: '关闭',
          role: 'close'
        },
        {
          label: '进入全屏模式',
          accelerator: 'Ctrl+Cmd+F',
          click: function (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          }
        }
      ]
    }
  ];
}
