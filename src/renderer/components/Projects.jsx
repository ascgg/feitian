import React, { Component, PropTypes } from 'react'


export default class Projects extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return (
      <div className="ui">
        {children}
      </div>
    );
  }
}
