import React, { Component, PropTypes } from 'react'


export default class Message extends Component {
  static propTypes = {
    closable: PropTypes.bool,
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    formatted: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.appear = this.appear.bind(this);
  }

  onClose() {
    $(this.refs.message).transition('fade');
  }

  appear() {
    $(this.refs.message).transition('show');
    setTimeout(this.onClose, 3000);
  }

  render() {
    const { closable, type, title, message, formatted } = this.props;
    return (
      <div ref="message" className={`ui message ${type || ''}`}>
        { closable && <i className="close icon" onClick={this.onClose}></i> }
        { title && <div className="header">{title}</div> }
        { message && formatted ? <pre>{message}</pre> : <p>{message}</p> }
      </div>
    );
  }
}
