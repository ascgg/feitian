import React, { Component, PropTypes } from 'react'
import Message from './Message.jsx'


export default class TableModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onNameInput = this.onNameInput.bind(this);
    this.onCategoryInput = this.onCategoryInput.bind(this);
    this.onTypeInput = this.onTypeInput.bind(this);
    this.onRealOKClick = this.onRealOKClick.bind(this);
    this.state = {
      name: '',
      category: '',
      type: '',
      nameEmpty: undefined,
      categoryEmpty: undefined,
      typeEmpty: undefined
    }
  }

  componentDidMount() {
    $(this.refs.tableModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        // this.props.onOKClick(this.state.name, this.state.category, this.state.type);
        return false;
      },
    }).modal('show');
    $(this.refs.categorySelector).dropdown();
    $(this.refs.typeSelector).dropdown();
  }

  componentWillUnmount() {
    $(this.refs.tableModal).modal('hide');
  }
  
  onRealOKClick() {
    const { name, category, type } = this.state;
    if (name === '') {
      if (category === '') {
        if (type === '') {
          this.setState({ nameEmpty: true, categoryEmpty: true, typeEmpty: true });
        } else {
          this.setState({ nameEmpty: true, categoryEmpty: true, typeEmpty: false });
        }
      } else {
        if (type === '') {
          this.setState({ nameEmpty: true, categoryEmpty: false, typeEmpty: true });
        } else {
          this.setState({ nameEmpty: true, categoryEmpty: false, typeEmpty: false });
        }
      }
    } else {
      if (category === '') {
        if (type === '') {
          this.setState({ nameEmpty: false, categoryEmpty: true, typeEmpty: true });
        } else {
          this.setState({ nameEmpty: false, categoryEmpty: true, typeEmpty: false });
        }
      } else {
        if (type === '') {
          this.setState({ nameEmpty: false, categoryEmpty: false, typeEmpty: true });
        } else {
          this.props.onOKClick(name, category, type);
        }
      }
    }
  }

  onNameInput(event) {
    this.setState({ name: event.target.value });
  }

  onCategoryInput(event) {
    this.setState({ category: event.target.value });
  }

  onTypeInput(event) {
    this.setState({ type: event.target.value });
  }

  render() {
    const { onCancelClick } = this.props;
    const { nameEmpty, categoryEmpty, typeEmpty } = this.state;
    let nameError, categoryError, typeError;
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
    if (typeEmpty !== undefined) {
      typeError = typeEmpty ? 'error' : '';
    } else {
      typeError = '';
    }
    return (
      <div className="ui modal" ref="tableModal">
        <div className="header">
          创建新表格
        </div>
        <div className="content">
          <div className="ui form">
            <div className="fields">
              <div className="six wide field">
                <div className={`ui icon input ${nameError}`}>
                  <input type="text" placeholder="表格名称" maxLength="64" onChange={this.onNameInput} />
                </div>
              </div>
              <div className="five wide field">
                <select ref="categorySelector" className={`ui dropdown ${categoryError}`} onChange={this.onCategoryInput}>
                  <option value="">选择工程类别</option>
                  <option value="给排水工程">给排水工程</option>
                  <option value="供电工程">供电工程</option>
                  <option value="供油工程">供油工程</option>
                  <option value="营房工程">营房工程</option>
                  <option value="助航灯光工程">助航灯光工程</option>
                </select>
              </div>
              <div className="five wide field">
                <select ref="typeSelector" className={`ui dropdown ${typeError}`} onChange={this.onTypeInput}>
                  <option value="">选择表格类别</option>
                  <option value="人材机">人材机汇总</option>
                  <option value="工程量">工程量清单</option>
                </select>
              </div>
            </div>
          </div>
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
