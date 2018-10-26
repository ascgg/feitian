import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ProjectFilter from './ProjectFilter.jsx'
import ProjectList from './ProjectList.jsx'
import ProjectAddModal from './ProjectAddModal.jsx'
import ProjectEditModal from './ProjectEditModal.jsx'
import StatisticsModal from './StatisticsModal.jsx'
import StatisticsDetailModal from './StatisticsDetailModal.jsx'
import Message from './Message.jsx'
import { backend } from '../../browser/remote'
const app = require('electron').remote
const dialog = app.dialog
const encryptionHelper = require('../../browser/util/encrypt-decrypt.js');


const STYLES = {
  container: { padding: '10px 100px 50px 100px' }
}


export default class ProjectPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onStatisticsClick = this.onStatisticsClick.bind(this);
    this.onStatisticsOKClick = this.onStatisticsOKClick.bind(this);
    this.onStatisticsExportClick = this.onStatisticsExportClick.bind(this);
    this.onEnterClick = this.onEnterClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onAddOKClick = this.onAddOKClick.bind(this);
    this.onAddCancelClick = this.onAddCancelClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditOKClick = this.onEditOKClick.bind(this);
    this.onEditCancelClick = this.onEditCancelClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onProjectStatisticClick = this.onProjectStatisticClick.bind(this);
    this.filterBack = this.filterBack.bind(this);
    this.onStatisticsDetailClick = this.onStatisticsDetailClick.bind(this);
    this.filterDetailBack = this.filterDetailBack.bind(this);
    this.onStatisticsDetailOKClick = this.onStatisticsDetailOKClick.bind(this);
    this.onStatisticsDetailExportClick = this.onStatisticsDetailExportClick.bind(this);
    this.state = {
      projects: [],
      isAdding: false,
      isEditing: null,
      isCalculating: null,
      result: undefined,
      filterName: '',
      resultDetail: undefined,
    };
  }

  componentWillMount() {
    const func = async () => {
      try {
        let result;
        result = await backend.sync.getProjects();
        if (result !== []) {
          var array = [];
          result.forEach(function (item) {
            const datum = item.get({ plain: true });
            array.push(datum);
          })
          this.setState({ projects: array });
        }
      } catch (error) {
        dialog.showErrorBox('严重错误', '数据库或软件发生了严重错误。');
      }
    }
    func();
  }

  onStatisticsClick(project) {
    // Ready to calculate!
    this.setState({ isCalculating: project.id ,result: { m: null, c: null } });
  }

  onStatisticsDetailClick(project) {
    // Ready to calculate!
    this.setState({ isCalculating: project.id, resultDetail: { m: null, c: null } });
  }

  onProjectStatisticClick(success) {
    // Ready to calculate!
    const { isCalculating } = this.state;
    const placeholder = this;
    const successHelper = function (manMachine, construction) {
      placeholder.setState({ result: { m: manMachine, c: construction } });
      success()
    };
    const errorHelper = function (error) {
      dialog.showErrorBox('错误', error.message);
    };
    const func = async () => {
      await backend.sync.statProject(isCalculating, successHelper, errorHelper);
    };
    func();
  }

  onStatisticsOKClick() {
    // Just close the modal.
    this.setState({ result: null, isCalculating: null })
  }

  onStatisticsDetailOKClick() {
    // Just close the modal.
    this.setState({ resultDetail: null, isCalculating: null })
  }

  filterBack(tableResult) {
    this.setState({ result: tableResult })
  }

  filterDetailBack(tableResult) {
    this.setState({ resultDetail: tableResult })
  }

  onStatisticsExportClick() {
    const { result } = this.state;
    const options = {
      title: '导出统计表文件',
      filters: [
        { name: 'Excel 文件', extensions: ['xlsx'] }
      ]
    }
    dialog.showSaveDialog(options, function (filename) {
      if (filename) {
        try {
          backend.write.exportDetailStatistics(result.m, result.c, filename);
          const successOptions = {
            type: 'info',
            title: '成功',
            message: '导出成功。',
            buttons: ['确认']
          }
          dialog.showMessageBox(successOptions);
        } catch (error) {
          dialog.showErrorBox('错误', '导出错误');
        }
      }
    })
  }

  onStatisticsDetailExportClick() {
    const { resultDetail } = this.state;
    const options = {
      title: '导出统计表文件',
      filters: [
        { name: 'Excel 文件', extensions: ['xlsx'] }
      ]
    }
    dialog.showSaveDialog(options, function (filename) {
      if (filename) {
        try {
          backend.write.exportDetailStatistics(resultDetail.m, resultDetail.c, filename);
          const successOptions = {
            type: 'info',
            title: '成功',
            message: '导出成功。',
            buttons: ['确认']
          }
          dialog.showMessageBox(successOptions);
        } catch (error) {
          dialog.showErrorBox('错误', '导出错误');
        }
      }
    })
  }

  onEnterClick({ id }) {
    this.context.router.push(`/tables/${id}`);
  }
  
  onEditClick(project) {
    this.setState({ isEditing: project.id })
  }

  onEditOKClick(id, name, desc) {
    const placeholder = this;
    const successHelper = function (name, desc) {
      var projects = placeholder.state.projects;
      for (var k = 0; k < projects.length; k++) {
        if (projects[k].id === id) {
          projects[k].name = name;
          projects[k].description = desc;
        }
      }
      placeholder.setState({ projects: projects, isEditing: null });
    }
    const errorHelper = function (error) {
      // placeholder.setState({ isEditing: null });
      dialog.showErrorBox('错误', error.message);
    }
    const func = async () => {
      await backend.sync.editProject(id, name, desc, successHelper, errorHelper);
    }
    func();
  }

  onEditCancelClick() {
    this.setState({ isEditing: null })
  }

  onRemoveClick(project) {
    const { projects } = this.state;
    const errorHelper = function(error) {
      dialog.showErrorBox('错误', error.message);
    }
    const options = {
      type: 'question',
      title: '删除项目',
      message: '是否确定删除此项目与其下的所有表格？',
      buttons: ['否', '是']
    }
    const result = dialog.showMessageBox(options)
    if (result) {
      const func = async () => {
        await backend.sync.removeProject(project.id, errorHelper);
        // Then remove the card from the page.
        const removed = projects.filter(function (item) {
          return item.id !== project.id;
        });
        this.setState({ projects: removed })
      }
      func();
    }
  }

  onAddClick() {
    this.setState({ isAdding: true })
  }

  onAddCancelClick() {
    this.setState({ isAdding: false })
  }

  onAddOKClick(name, desc) {
    const placeholder = this;
    const successHelper = function (item) {
      placeholder.setState({ projects: [...placeholder.state.projects, item], isAdding: false });
    }
    const errorHelper = function (error) {
      placeholder.setState({ isAdding: false });
      dialog.showErrorBox('错误', error.message);
    }
    const func = async () => {
      await backend.sync.createProject(name, desc, successHelper, errorHelper);
    };
    func();
  }

  onFilterChange(event) {
    this.setState({ filter: event.target.value })
  }

  filterProjects(name, projects) {
    const regex = RegExp(name, 'i');
    return projects.filter(project => regex.test(project.name));
  }

  selectedProject() {
    const { isEditing, projects } = this.state;
    return (isEditing !== null ? projects.find(p => p.id === isEditing) : {});
  }

  calculatedProject() {
    const { isCalculating, projects } = this.state;
    return (isCalculating !== null ? projects.find(p => p.id === isCalculating) : {});
  }

  render() {
    const { filter, isAdding, isEditing, isCalculated, isLoading, result, projects, resultDetail } = this.state;
    const filteredProjects = this.filterProjects(filter, projects);
    const selected = this.selectedProject();
    const calculated = this.calculatedProject();

    return (
      <div>
        <div className="ui secondary menu">
          <div className="right menu">
            <Link to='/' activeClassName="item" activeStyle={{ color: 'teal' }}>
              <i className="sign out icon" />
              登出
            </Link>
          </div>
        </div>
        <div style={STYLES.container}>
          <ProjectFilter onFilterChange={this.onFilterChange} onAddClick={this.onAddClick} />
          <ProjectList projects={filteredProjects}
            onStatisticsClick={this.onStatisticsClick}
            onEnterClick={this.onEnterClick}
            onEditClick={this.onEditClick}
            onRemoveClick={this.onRemoveClick}
            onStatisticsDetailClick={this.onStatisticsDetailClick} />
          {
            isAdding && <ProjectAddModal onOKClick={this.onAddOKClick} onCancelClick={this.onAddCancelClick} />
          }
          {
            isEditing && <ProjectEditModal project={selected} onOKClick={this.onEditOKClick} onCancelClick={this.onEditCancelClick} />
          }
          {
            result && <StatisticsModal project={calculated} onOKClick={this.onStatisticsOKClick} onExportClick={this.onStatisticsExportClick} result={result} isCalculating={this.state.isCalculating} recoverClick={this.onProjectStatisticClick} filterInfBack={this.filterBack} />
          }
          {
            resultDetail && <StatisticsDetailModal project={calculated} onOKClick={this.onStatisticsDetailOKClick} onExportDetailClick={this.onStatisticsDetailExportClick} result={resultDetail} isCalculating={this.state.isCalculating} filterInfBack={this.filterDetailBack} />
          }
        </div>
      </div>
    );
  }
}
