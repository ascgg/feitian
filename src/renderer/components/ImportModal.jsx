import React, { Component, PropTypes } from 'react'
import Message from './Message.jsx'
import { ipcRenderer } from 'electron'


ipcRenderer.on('selected-directory', function(event, path, base) {
  // const element = document.getElementById('fileName');
  // element.value = base;
  document.getElementById('filePath').innerHTML = path;
});

export default class ImportModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onImportClick = this.onImportClick.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
    this.onCategoryInput = this.onCategoryInput.bind(this);
    this.onRealOKClick = this.onRealOKClick.bind(this);
    this.state = {
      path: '',
      name: '',
      category: '',
      nameEmpty: undefined,
      categoryEmpty: undefined
    }
  }

  componentDidMount() {
    $(this.refs.importModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        return false;
      },
    }).modal('show');
    $(this.refs.categorySelector).dropdown();
  }

  componentWillUnmount() {
    $(this.refs.importModal).modal('hide');
  }

  onImportClick() {
    ipcRenderer.send('open-file-dialog');
  }

  onRealOKClick() {
    const { path, name, category } = this.state;
    if (name === '') {
      if (category === '') {
        this.setState({ nameEmpty: true, categoryEmpty: true });
      } else {
        this.setState({ nameEmpty: true, categoryEmpty: false });
      }
    } else {
      if (category === '') {
        this.setState({ nameEmpty: false, categoryEmpty: true });
      } else {
        this.props.onOKClick(this.refs.file.innerHTML, this.state.name, this.state.category);
      }
    }
  }

  onNameInput(event) {
    this.setState({ name: event.target.value });
  }

  onCategoryInput(event) {
    this.setState({ category: event.target.value });
  }

  render() {
    const { onOKClick, onCancelClick } = this.props;
    const { nameEmpty, categoryEmpty } = this.state;
    let nameError, categoryError;
    if (nameEmpty !== undefined) {
      nameError = nameEmpty ? 'error' : '';
    } else {
      nameError = '';
    }
    if (categoryEmpty !== undefined) {
      categoryError = categoryEmpty ? 'error' : '';
    } else {
      categoryError = '';
    }
    return (
      <div className="ui modal" ref="importModal">
        <div className="header">
          导入表格
        </div>
        <div className="content">
          <div className="ui form">
            <div className="fields">
              <div className="three wide field">
                <label>选择文件</label>
                <div className="ui button" tabIndex="0" onClick={this.onImportClick}>选择文件</div>
              </div>
              <div className="eight wide field">
                <label>表格名称</label>
                <div className={`ui icon input ${nameError}`}>
                  <input ref="name" type="text" maxLength="64" onChange={this.onNameInput} placeholder="表格名称" value={this.state.name} />
                </div>
              </div>
              <div className="five wide field">
                <label>工程类别</label>
                <select ref="categorySelector" className={`ui dropdown ${categoryError}`} onChange={this.onCategoryInput} value={this.state.category}>
                  <option value="">选择工程类别</option>
                  <option value="给排水工程">给排水工程</option>
                  <option value="供电工程">供电工程</option>
                  <option value="供油工程">供油工程</option>
                  <option value="营房工程">营房工程</option>
                  <option value="助航灯光工程">助航灯光工程</option>
                </select>
              </div>
            </div>
          </div>
          <div className="label" id="filePath" ref="file"></div>
        </div>
        <div className="actions">
          <div className="small ui black deny right labeled icon button" tabIndex="0" onClick={onCancelClick}>
            取消
            <i className="ban icon" />
          </div>
          <div className="small ui positive right labeled icon button" tabIndex="0" onClick={this.onRealOKClick}>
            确认
            <i className="checkmark icon" />
          </div>
        </div>
      </div>
    );
  }
}
