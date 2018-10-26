import React, { Component, PropTypes } from 'react'


export default class ProjectAddModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onRealOKClick = this.onRealOKClick.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
    this.onDescInput = this.onDescInput.bind(this);
    this.state = {
      name: '',
      description: '',
      nameEmpty: undefined
    };
  }

  componentDidMount() {
    $(this.refs.projectAddModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        // this.onRealOKClick();
        // this.props.onOKClick(this.state.name, this.state.description);
        return false;
      }
    }).modal('show');
  }

  componentWillUnmount() {
    $(this.refs.projectAddModal).modal('hide');
  }

  onRealOKClick() {
    const { name, description } = this.state;
    if (name === '') {
      this.setState({ nameEmpty: true });
    } else {
      this.props.onOKClick(name, description);
    }
  }

  onNameInput(event) {
    this.setState({ name: event.target.value });
  }

  onDescInput(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const { onCancelClick } = this.props;
    const { nameEmpty } = this.state;
    let nameError;
    if (nameEmpty !== undefined) {
      nameError = nameEmpty ? 'error' : '';
    } else {
      nameError = '';
    }
    return (
      <div className="ui modal" ref="projectAddModal">
        <div className="header">
          添加项目
        </div>
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>项目名称</label>
              <div className={`ui input ${nameError}`}>
                <input type="text" maxLength="64" value={this.state.name} onChange={this.onNameInput} placeholder="项目名称" />
              </div>
            </div>
            <div className="field">
              <label>项目描述</label>
              <textarea rows="3" maxLength="255" value={this.state.description} onChange={this.onDescInput} placeholder="项目描述" />
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="small ui black right labeled icon button" tabIndex="0" onClick={onCancelClick}>
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
