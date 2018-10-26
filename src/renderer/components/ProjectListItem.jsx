import React, { Component, PropTypes } from 'react'


export default class ProjectListItem extends Component {
  static propTypes = {
    onStatisticsClick: PropTypes.func.isRequired,
    onEnterClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    onStatisticsDetailClick: PropTypes.func.isRequired
  };

  render() {
    const { project, onStatisticsClick, onEnterClick, onEditClick, onRemoveClick, onStatisticsDetailClick } = this.props;
    return (
      <div className="card">
        <div className="content">
          <div className="header">
            {project.name}
          </div>
          <div className="ui description">
            {project.description}
          </div>
          <button className="right floated circular ui icon button"
            onClick={() => onStatisticsClick(project)}>
            <i className="list icon" />
          </button>
          <button className="right floated circular ui icon button"
            onClick={() => onStatisticsDetailClick(project)}>
            <i className="table icon" />
          </button>
        </div>
        <div className="extra content">
          <div className="ui three buttons  ">
            <div className="ui basic green button" onClick={() => onEnterClick(project)}>进入</div>
            <div className="ui basic yellow button" onClick={() => onEditClick(project)}>编辑</div>
            <div className="ui basic red button" onClick={() => onRemoveClick(project)}>删除</div>
          </div>
        </div>
      </div>
    );
  }
}
