import { ipcRenderer } from 'electron'


export default class MenuHandler {
  setMenus(commands) {
    if (this.commands) {
      this.removeAllMenus();
    }

    Object.keys(commands).forEach(command => ipcRenderer.on(command, commands[command]));
  }

  removeAllMenus() {
    Object.keys(this.commands).forEach(command => ipcRenderer.removeListener(command, this.commands[command]));

    this.commands = null;
  }
}
