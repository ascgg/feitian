import { Menu } from 'electron'
import * as darwin from './darwin'
import * as linux from './linux'
import * as win32 from './win32'


const MENUS = {
  darwin,
  linux,
  win32
};


export function attachMenuToWindow(app, newWindow) {
  const template = MENUS[process.platform].buildMenuTemplate(app, newWindow);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
