import React, { Component, PropTypes } from 'react'


const STYLE = {
  footer: { minHeight: '30px' }
}


export default class Footer extends Component {
  static propTypes = {
    isCalculating: PropTypes.bool.isRequired
  };

  render() {
    const { isCalculating } = this.props;
    const active = isCalculating ? 'active' : '';
    return (
      <div className="ui bottom fixed menu borderless" style={STYLE.footer}>
        <div className={`ui ${active} inline mini text loader`}>
          统计中
        </div>
      </div>
    );
  }
}
