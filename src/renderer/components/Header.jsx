import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
/* import { ipcRenderer } from 'electron' */


// Get from dialog.
/*
ipcRenderer.on('info-dialog-selection', function(event, index) {
  return index === 0;
}); */


export default class Header extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    onFileClick: PropTypes.func.isRequired,
    onTableClick: PropTypes.func.isRequired,
    onTrashClick: PropTypes.func.isRequired,
    onExportClick: PropTypes.func.isRequired,
    onAddRowClick: PropTypes.func.isRequired,
    onRemoveRowClick: PropTypes.func.isRequired,
    listWater: PropTypes.array,
    listElectric: PropTypes.array,
    listOil: PropTypes.array,
    listBarrack: PropTypes.array,
    listLight: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const placeholder = this;
    $(this.refs.mainDrop).dropdown(
      // { onChange: function (value, text, $selected) { console.log('value ' + value + ' text ' + text); } }
    );
    $.fn.dropdown.settings.message.noResults = '找不到结果';
    /*
    $.fn.search.settings.templates.message = function (message, type) {
      var html = '';
      if (message !== undefined && type !== undefined) {
        html += '' + '<div className="message ' + type + '">';
        if (type == 'empty') {
          html += '' + '<div className="header">找不到结果</div>'
          + '<div className="description">' + message + '</div>';
        } else {
          html += '' + '<div className="description">' + message + '</div>'
        }
        html += '</div>';
      }
      return html;
    };
    */
  }

  render() {
    const { listWater, listElectric, listOil, listBarrack, listLight } = this.props;
    const { onItemClick, onFileClick, onTableClick, onTrashClick, onAddRowClick, onRemoveRowClick, onExportClick } = this.props;
    return (
      <div className="ui top fixed inverted labeled eight item icon menu">
        <div className="ui pointing scrolling dropdown link item" ref="mainDrop">
          <i className="database icon" />
          <span className="text">总览</span>
          <div className="menu">
            <div className="ui search icon input">
              <i className="search icon" />
              <input type="text" name="search" placeholder="搜索..." />
            </div>
            <div className="divider"></div>
            <div className="header">
              给排水工程
            </div>
            {
          		listWater !== undefined && listWater.length !== 0 && listWater.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)
            }
            <div className="divider"></div>
            <div className="header">
              供电工程
            </div>
            {
          		listElectric !== undefined && listElectric.length !== 0 && listElectric.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)
            }
            <div className="divider"></div>
            <div className="header">
              供油工程
            </div>
            {
              listOil !== undefined && listOil.length !== 0 && listOil.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)
            }
            <div className="divider"></div>
            <div className="header">
              营房工程
            </div>
            {
              listBarrack !== undefined && listBarrack.length !== 0 && listBarrack.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)
            }
            <div className="divider"></div>
            <div className="header">
              助航灯光工程
            </div>
            {
              listLight !== undefined && listLight.length !== 0 && listLight.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)
            }
          </div>
        </div>
        <a className="item" onClick={onFileClick}>
          <i className="file excel outline icon" />
          导入
        </a>
        <a className="item" onClick={onTableClick}>
          <i className="table icon" />
          创建
        </a>
        <a className="item" onClick={onAddRowClick}>
          <i className="add icon" />
          插入行
        </a>
        <a className="item" onClick={onRemoveRowClick}>
          <i className="minus icon" />
          删除行
        </a>
        <a className="item" onClick={onTrashClick}>
          <i className="trash outline icon" />
          删除
        </a>
        <a className="item" onClick={onExportClick}>
          <i className="file text outline icon" />
          导出
        </a>
        <Link to='/tables' activeClassName="item">
          <i className="sign out icon" />
          返回
        </Link>
      </div>
    );
    /*
    return (
      <div className="ui top fixed inverted labeled eight item icon menu">
        <div className="ui pointing dropdown link item" ref="mainDrop">
          <i className="database icon" />
          <span className="text">总览</span>
          <div className="menu">
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              给排水工程
              <div className="menu">
                { (listWater === undefined || listWater.length === 0) ? <div className="disabled item">空</div> : listWater.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              供电工程
              <div className="menu">
                { (listElectric === undefined || listElectric.length === 0) ? <div className="disabled item">空</div> : listElectric.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              供油工程
              <div className="menu">
                { (listOil === undefined || listOil.length === 0) ? <div className="disabled item">空</div> : listOil.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              营房工程
              <div className="menu">
                { (listBarrack === undefined || listBarrack.length === 0) ? <div className="disabled item">空</div> : listBarrack.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              助航灯光工程
              <div className="menu">
                { (listLight === undefined || listLight.length === 0) ? <div className="disabled item">空</div> : listLight.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div>)}
              </div>
            </div>
          </div>
        </div>
        <a className="item" onClick={onFileClick}>
          <i className="file excel outline icon" />
          导入
        </a>
        <a className="item" onClick={onTableClick}>
          <i className="table icon" />
          创建
        </a>
        <a className="item" onClick={onAddRowClick}>
          <i className="add icon" />
          插入行
        </a>
        <a className="item" onClick={onRemoveRowClick}>
          <i className="minus icon" />
          删除行
        </a>
        <a className="item" onClick={onTrashClick}>
          <i className="trash outline icon" />
          删除
        </a>
        <a className="item" onClick={onExportClick}>
          <i className="file text outline icon" />
          导出
        </a>
        <Link to='/' activeClassName="item">
          <i className="sign out icon" />
          登出
        </Link>
      </div>
    );
    */
  }
}
