import React, { Component, PropTypes } from 'react'

import 'semantic-ui/dist/semantic.min.css'
import 'semantic-ui/dist/semantic.min.js'
import 'ag-grid-root/dist/styles/ag-grid.css'
import 'ag-grid-root/dist/styles/theme-blue.css'
import './App.css'


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return (
      <div className="ui">
        { children }
      </div>
    );
  }
}
