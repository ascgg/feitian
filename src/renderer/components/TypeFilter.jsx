import React, { Component } from 'react';


const TYPE_NAMES = ['全体', '人工', '机械', '材料', '主材'];

export default class TypeFilter extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: TYPE_NAMES[0]
    }
  }

  doesFilterPass(params) {
    const value = this.props.valueGetter(params);
    
    switch (this.state.selected) {
      case TYPE_NAMES[1]:
        return value === '人工';
      case TYPE_NAMES[2]:
        return value === '机械';
      case TYPE_NAMES[3]:
        return value === '材料';
      case TYPE_NAMES[4]:
        return value === '主材';
      default:
        return true;
    }
  }

  isFilterActive() {
    return this.state.selected !== TYPE_NAMES[0];
  }

  onButtonPressed(name) {
    const newState = { selected: name }
    this.setState(newState, this.props.filterChangedCallback);
  }

  render() {
    var rows = []
    TYPE_NAMES.forEach((name) => {
      const selected = this.state.selected === name;
      rows.push(
        <div key={name}>
          <label style={{paddingLeft: 10}}>
            <input type="radio" checked={selected} name={Math.random()} onChange={this.onButtonPressed.bind(this, name)} />
            <span style={{paddingLeft: 10}}>{name}</span>
          </label>
        </div>
      );
    });

    return (
      <div>
        <div style={{textAlign: 'center', background: 'lightblue', width: '100px', display: 'block', borderBottom: '1px solid blue'}}>
          <b>类别筛选</b>
        </div>
        {rows}
      </div>
    );
  }
}
