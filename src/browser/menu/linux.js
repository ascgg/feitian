export function buildMenuTemplate(app, newWindow) {
  const name = app.getName();
  return [
    {
      label: '文件',
      submenu: [
        {
          label: '新表格',
          accelerator: 'Ctrl+T',
          click: (item, win) => win.webContents.send('fei-tian:new-table')
        },
        {
          type: 'separator'
        },
        {
          label: '导入表格',
          accelerator: 'Ctrl+Shift+N',
          click: (item, win) => win.webContents.send('fei-tian:import-table')
        },
        {
          label: '删除表格',
          accelerator: 'Ctrl+Shift+D',
          click: (item, win) => win.webContents.send('fei-tian:delete-table')
        },
        {
          type: 'separator'
        },
        {
          label: '输出表格',
          accelerator: 'Ctrl+E',
          click: (item, win) => win.webContents.send('fei-tian:export')
        },
        {
        	type: 'separator'
        },
        {
        	label: '退出',
        	accelerator: 'Ctrl+Q',
        	click: () => app.quit()
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '剪切',
          accelerator: 'Ctrl+X',
          role: 'cut'
        },
        {
          label: '复制',
          accelerator: 'Ctrl+C',
          role: 'copy'
        },
        {
          label: '粘贴',
          accelerator: 'Ctrl+V',
          role: 'paste'
        },
        {
          type: 'separator'
        },
        {
          label: '添加行',
          accelerator: 'Ctrl+J',
          click: (item, win) => win.webContents.send('fei-tian:add-row')
        },
        {
          label: '删除行',
          accelerator: 'Ctrl+K',
          click: (item, win) => win.webContents.send('fei-tian:remove-row')
        }
      ]
    }
  ];
}
