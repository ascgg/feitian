import React from 'react'
import { Link } from 'react-router'
import { ipcRenderer } from 'electron'


// Get from dialog.
ipcRenderer.on('info-dialog-selection', function(event, index) {
  return index === 0;
});

export default class Sidebar extends React.Component {
  static propTypes = {
    onFileClick: React.PropTypes.func.isRequired,
    onTableClick: React.PropTypes.func.isRequired,
    onTrashClick: React.PropTypes.func.isRequired,
    onPrintClick: React.PropTypes.func.isRequired
  };

  render() {
    const { onFileClick, onTableClick, onTrashClick, onPrintClick } = this.props;
    return (
      <div className="ui inverted labeled five item icon bottom fixed menu">
        <a className="item" onClick={onFileClick}>
          <i className="file excel outline icon" />
          导入
        </a>
        <a className="item" onClick={onTableClick}>
          <i className="table icon" />
          创建
        </a>
        <a className="item" onClick={onTrashClick}>
          <i className="trash outline icon" />
          删除
        </a>
        <a className="item" onClick={onPrintClick}>
          <i className="print icon" />
          打印
        </a>
        <Link to='/' activeClassName="item">
          <i className="sign out icon" />
          登出
        </Link>
      </div>
    );
  }
}
