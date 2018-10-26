import React, { Component, PropTypes } from 'react'


export default class ProjectEditModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onRealOKClick = this.onRealOKClick.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
    this.onDescInput = this.onDescInput.bind(this);
    this.state = {
      name: this.props.project.name,
      description: this.props.project.description,
      nameEmpty: undefined
    };
  }

  componentDidMount() {
    $(this.refs.projectEditModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        return false;
      }
    }).modal('show');
  }

  componentWillUnmount() {
    $(this.refs.projectEditModal).modal('hide');
  }

  onRealOKClick() {
    const { name, description } = this.state;
    if (name === '') {
      this.setState({ nameEmpty: true });
    } else {
      this.props.onOKClick(this.props.project.id, name, description);
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
      <div className="ui modal" ref="projectEditModal">
        <div className="header">
          修改项目信息
        </div>
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>项目名称</label>
              <div className={`ui input ${nameError}`}>
                <input type="text" name="name" maxLength="64" value={this.state.name} onChange={this.onNameInput} placeholder="项目名称" />
              </div>
            </div>
            <div className="field">
              <label>项目描述</label>
              <textarea rows="3" value={this.state.description} maxLength="255" onChange={this.onDescInput} placeholder="项目描述" />
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
