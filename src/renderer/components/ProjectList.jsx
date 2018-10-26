import React, { Component, PropTypes } from 'react'
import ProjectListItem from './ProjectListItem.jsx'
import Message from './Message.jsx'


require('./ProjectList.scss');


export default class ProjectList extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    onStatisticsClick: PropTypes.func.isRequired,
    onEnterClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onStatisticsDetailClick: PropTypes.func.isRequired
  };

  groupItemsInRows(items) {
    const itemsPerRow = 4
    return items.reduce((rows, item, index) => {
      const position = Math.floor(index / itemsPerRow)
      if (!rows[position]) {
        rows[position] = []
      }

      rows[position].push(item);
      return rows;
    }, []);
  }

  render() {
    const { projects, onStatisticsClick, onEnterClick, onEditClick, onRemoveClick, onStatisticsDetailClick } = this.props;

    if (!projects.length) {
      return <Message type="info" message="空" />;
    }

    return (
      <div id="project-list">
        {this.groupItemsInRows(projects).map((row, index) =>
          <div key={index} className="ui cards">
            {row.map(project =>
              <ProjectListItem key={project.id}
                onStatisticsClick={() => onStatisticsClick(project)}
                onEnterClick={() => onEnterClick(project)}
                onEditClick={() => onEditClick(project)}
                onRemoveClick={() => onRemoveClick(project)}
                project={project}
                onStatisticsDetailClick={() => onStatisticsDetailClick(project)} />
            )}
          </div>
        )}
      </div>
    );
  }
}
