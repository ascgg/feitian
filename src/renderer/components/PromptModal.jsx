import React, { Component, PropTypes } from 'react'


export default class PromptModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string
  };

  componentDidMount() {
    $(this.refs.promptModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        this.props.onOKClick(this.refs.text.value);
        return false;
      },
    }).modal('show');
  }

  componentWillUnmount() {
    $(this.refs.promptModal).modal('hide');
  }

  render() {
    const { title, message, type } = this.props;

    return (
      <div className="ui modal" ref="promptModal">
        <div className="header">
          {title}
        </div>
        <div className="content">
          {message}
          <div className="ui fluid icon input">
            <input ref="text" type={type} />
          </div>
        </div>
        <div className="actions">
          <div className="small ui black deny right labeled icon button" tabIndex="0">
            Cancel
            <i className="ban icon"></i>
          </div>
          <div className="small ui positive right labeled icon button" tabIndex="0">
            Ok
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
