import React, { Component, PropTypes } from 'react'
import { debounce } from 'lodash'


export default class ProjectFilter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    this.delayedCallback = debounce(this.props.onFilterChange, 200);
  }

  onFilterChange(event) {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    const { onAddClick } = this.props;
    return (
      <div className="ui action left icon input fluid"
        style={{ marginBottom: '1em', fontSize: '1em' }}>
        <i className="search icon" />
        <input type="text" placeholder="搜索项目..." onChange={this.onFilterChange} />
        <button className="ui button teal" onClick={() => onAddClick()}>添加项目</button>
      </div>
    );
  }
}
