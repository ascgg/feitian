import React, { Component, PropTypes } from 'react'
import Message from './Message.jsx'


export default class TwoModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string
  };

  componentDidMount() {
    $(this.refs.twoModal).modal({
      closable: false,
      detachable: false,
      onDeny: () => {
        this.props.onCancelClick();
        return true;
      },
      onApprove: () => {
        this.props.onOKClick();
        return false;
      },
    }).modal('show');
  }

  componentWillUnmount() {
    $(this.refs.twoModal).modal('hide');
  }

  render() {
    const { title, message } = this.props;

    return (
      <div className="ui modal" ref="twoModal">
        <div className="header">
          {title}
        </div>
        <div className="content">
          {message}
        </div>
        <div className="actions">
          <div className="small ui black deny right labeled icon button" tabIndex="0">
            取消
            <i className="ban icon"></i>
          </div>
          <div className="small ui positive right labeled icon button" tabIndex="0">
            确认
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
