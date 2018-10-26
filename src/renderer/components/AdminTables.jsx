import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx'
import ImportModal from './ImportModal.jsx'
import TableModal from './TableModal.jsx'
import TwoModal from './TwoModal.jsx'
import { backend } from '../../browser/remote'
import ManMachineColumnsAdmin from './ManMachineColumnsAdmin.jsx'
import ConstructionQuantityColumnsAdmin from './ConstructionQuantityColumnsAdmin.jsx'
import EditableGrid from './EditableGrid.jsx'
import Message from './Message.jsx'
import MenuHandler from '../menu-handler'
const app = require('electron').remote
const dialog = app.dialog


export default class AdminTables extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    onFileClick: PropTypes.func,
    onTableClick: PropTypes.func,
    onTrashClick: PropTypes.func,
    onExportClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onImportOKClick: PropTypes.func,
    onImportCancelClick: PropTypes.func,
    onCreateOKClick: PropTypes.func,
    onCreateCancelClick: PropTypes.func,
    onAddRowClick: PropTypes.func,
    onRemoveRowClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onFileClick = this.onFileClick.bind(this);
    this.onTableClick = this.onTableClick.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onImportOKClick = this.onImportOKClick.bind(this);
    this.onImportCancelClick = this.onImportCancelClick.bind(this);
    this.onCreateOKClick = this.onCreateOKClick.bind(this);
    this.onCreateCancelClick = this.onCreateCancelClick.bind(this);
    this.onAddRowClick = this.onAddRowClick.bind(this);
    this.onRemoveRowClick = this.onRemoveRowClick.bind(this);
    this.state = {
      data: null,
      table: undefined, // Should contain name and category.
      isImporting: false,
      isCreating: false,
      isLoading: false
    };
    this.menuHandler = new MenuHandler();
  }

  setMenus() {
    this.menuHandler.setMenus({
      'fei-tian:new-table': () => this.onTableClick(),
      'fei-tian:import-table': () => this.onFileClick(),
      'fei-tian:delete-table': () => this.onTrashClick(),
      'fei-tian:export': () => this.onExportClick(),
      'fei-tian:add-row': () => this.onAddRowClick(),
      'fei-tian:remove-row': () => this.onRemoveRowClick()
    });
  }

  componentDidMount() {
    this.setMenus();
  }

  componentWillMount() {
    const { id } = this.props.params;
    const func = async () => {
      let result;
      let project;
      let water = [];
      let electric = [];
      let oil = [];
      let barrack = [];
      let light = [];
      result = await backend.sync.getTablesInProject(id);
      project = await backend.sync.getProjectById(id);
      // Now the array is not formatted, extract information.
      result.forEach(function (item) {
        const datum = item.get({ plain: true });
        const simpleName = datum.name.slice(0, -(1 + String(id).length))
        if (datum.category === '给排水工程') {
          water.push({ key: datum.id, category: datum.category, name: simpleName });
        } else if (datum.category === '供电工程') {
          electric.push({ key: datum.id, category: datum.category, name: simpleName });
        } else if (datum.category === '供油工程') {
          oil.push({ key: datum.id, category: datum.category, name: simpleName });
        } else if (datum.category === '营房工程') {
          barrack.push({ key: datum.id, category: datum.category, name: simpleName });
        } else if (datum.category === '助航灯光工程') {
          light.push({ key: datum.id, category: datum.category, name: simpleName });
        } else {
          // Do nothing.
        }
      });
      // State will be an array, empty or with elements.
      this.setState({ listWater: water });
      this.setState({ listElectric: electric });
      this.setState({ listOil: oil });
      this.setState({ listBarrack: barrack });
      this.setState({ listLight: light });
      this.setState({ project: project.get({ plain: true }) });
    };
    func();
  }

  onFileClick() {
    this.setState({ isImporting: true });
  }

  onTableClick() {
    this.setState({ isCreating: true });
  }

  onTrashClick() {
  	const placeholder = this;
    const { table } = this.state;
    const { id } = this.props.params;
    const errorHelper = function(error) {
      dialog.showErrorBox('错误', error.message);
    };
    if (table) {
    	const options = {
        type: 'question',
        title: '删除表格',
        message: '是否确定删除当前表格？',
        buttons: ['否', '是']
      }
      const result = dialog.showMessageBox(options);
      if (result) {
		    const func = async () => {
          await backend.sync.removeTable(table.name, id, errorHelper);
          // Then remove this table from the menu, and clear out the screen.
          switch (table.category) {
         	  case '给排水工程':
           	  const waterArray = this.state.listWater.filter(function (item) {
                return item.name !== table.name;
              });
              this.setState({ listWater: waterArray });
           	  break;
         	  case '供电工程':
              const electricArray = this.state.listElectric.filter(function (item) {
                return item.name !== table.name;
           	  });
           	  this.setState({ listElectric: electricArray });
           	  break;
         	  case '供油工程':
           	  const oilArray = this.state.listOil.filter(function (item) {
             	  return item.name !== table.name;
           	  });
           	  this.setState({ listOil: oilArray });
           	  break;
         	  case '营房工程':
           	  const barrackArray = this.state.listBarrack.filter(function (item) {
             	  return item.name !== table.name;
           	  });
           	  this.setState({ listBarrack: barrackArray });
           	  break;
         	  case '助航灯光工程':
           	  const lightArray = this.state.listLight.filter(function (item) {
             	  return item.name !== table.name;
           	  });
           	  this.setState({ listLight: lightArray });
           	  break;
         	  default:
           	  // Do nothing.
       	  }
       	  $('.ui.dropdown').dropdown('restore default text');
       	  this.setState({ data: null, table: undefined });
          const successOptions = {
            type: 'info',
            title: '成功',
            message: '删除表格成功。',
            buttons: ['确认']
          };
          dialog.showMessageBox(successOptions);
     	  };
   	    func();
   	  }
    } else {
    	const errorOptions = {
      	type: 'info',
        title: '操作提示',
        message: '未选定表格，请先选择需要删除的表格。',
        buttons: ['确认']
      }
      dialog.showMessageBox(errorOptions)
    }
  }

  onExportClick() {
    const { data, table } = this.state;
    const options = {
      title: '导出数据表文件',
      filters: [
        { name: 'Excel 文件', extensions: ['xlsx'] }
      ]
    }
    if (data) {
      dialog.showSaveDialog(options, function(filename) {
        if (filename) {
          backend.write.exportExcelTable(data, table.name, filename)
          const successOptions = {
            type: 'info',
            title: '成功',
            message: '导出成功。',
            buttons: ['确认']
          }
          dialog.showMessageBox(successOptions);
        }
      })
    } else {
      const errorOptions = {
        type: 'info',
        title: '操作提示',
        message: '未选定表格，请先选择需要导出的表格。',
        buttons: ['确认']
      }
      dialog.showMessageBox(errorOptions)
    }
  }

  onItemClick(name, category) {
    const placeholder = this;
    const { id } = this.props.params;
    const successHelper = function (data) {
      placeholder.setState({ table: { name: name, category: category }, data: data, isLoading: false });
    };
    const func = async () => {
      this.setState({ data: null, table: null, isLoading: true });
      await backend.sync.getTable(name, id, successHelper);
    };
    func();
  }

  onImportOKClick(path, name, category) {
    // Start to import table, and jump to the imported table.
    const placeholder = this;
    const { id } = this.props.params;
    const successHelper = function(id, category, type) {
      switch (category) {
        case '给排水工程':
          placeholder.setState({ listWater: [...placeholder.state.listWater, {key: id, category: category, name: name + '_' + type }] });
          break;
        case '供电工程':
          placeholder.setState({ listElectric: [...placeholder.state.listElectric, {key: id, category: category, name: name + '_' + type }] });
          break;
        case '供油工程':
          placeholder.setState({ listOil: [...placeholder.state.listOil, {key: id, category: category, name: name + '_' + type }] });
          break;
        case '营房工程':
          placeholder.setState({ listBarrack: [...placeholder.state.listBarrack, {key: id, category: category, name: name + '_' + type }] });
          break;
        case '助航灯光工程':
          placeholder.setState({ listLight: [...placeholder.state.listLight, {key: id, category: category, name: name + '_' + type }] });
          break;
        default:
          // Do nothing.
          break;
      }
    };
    const func = async () => {
    	let data;
      const name1 = name + '_人材机';
      const name2 = name + '_工程量';
      data = await backend.read.importExcelTable(path);
      if (data.data1 !== undefined) {
        await backend.sync.importTable(data.data1, name1, category, '人材机', id, successHelper);
      }
      if (data.data2 !== undefined) {
        await backend.sync.importTable(data.data2, name2, category, '工程量', id, successHelper);
      }
      if (data.man !== undefined) {
        await backend.sync.importTable(data.man, name1, category, '人材机', id, successHelper);
      }
      if (data.quantity !== undefined) {
        await backend.sync.importTable(data.quantity, name2, category, '工程量', id, successHelper);
      }
      if (data.error !== undefined) {
      	this.setState({ isImporting: false });
        dialog.showErrorBox('错误', data.error);
      } else {
	      this.setState({ isImporting: false });
        const successOptions = {
          type: 'info',
          title: '成功',
          message: '导入成功。',
          buttons: ['确认']
        }
        dialog.showMessageBox(successOptions);
	    }
    };
    if (path === '') {
      this.setState({ isImporting: false });
      dialog.showErrorBox('错误', '请选择正确的路径。');
    } else {
      func();
    }
  }

  onImportCancelClick() {
    // Do nothing.
    this.setState({ isImporting: false });
  }

  onCreateOKClick(name, category, type) {
    // Create a brand new table.
    const placeholder = this;
    const projectId = this.props.params.id;
    const successHelper = function(id, data, name, category, type) {
      const successOptions = {
        type: 'info',
        title: '成功',
        message: '创建表格成功',
        buttons: ['确认']
      };
      switch (category) {
        case '给排水工程':
          placeholder.setState({listWater: [...placeholder.state.listWater, {key: id, category: category, name: name + '_' + type}]});
          if (!placeholder.state.data) {
            placeholder.setState({ data: [data], table: { name: name + '_' + type, category: category } });
          }
          placeholder.setState({ isCreating: false });
          dialog.showMessageBox(successOptions);
          break;
        case '供电工程':
          placeholder.setState({listElectric: [...placeholder.state.listElectric, {key: id, category: category, name: name + '_' + type}]});
          if (!placeholder.state.data) {
            placeholder.setState({ data: [data], table: { name: name + '_' + type, category: category } });
          }
          placeholder.setState({ isCreating: false });
          dialog.showMessageBox(successOptions);
          break;
        case '供油工程':
          placeholder.setState({listOil: [...placeholder.state.listOil, {key: id, category: category, name: name + '_' + type}]});
          if (!placeholder.state.data) {
            placeholder.setState({ data: [data], table: { name: name + '_' + type, category: category } });
          }
          placeholder.setState({ isCreating: false });
          dialog.showMessageBox(successOptions);
          break;
        case '营房工程':
          placeholder.setState({listBarrack: [...placeholder.state.listBarrack, {key: id, category: category, name: name + '_' + type}]});
          if (!placeholder.state.data) {
            placeholder.setState({ data: [data], table: { name: name + '_' + type, category: category } });
          }
          placeholder.setState({ isCreating: false });
          dialog.showMessageBox(successOptions);
          break;
        case '助航灯光工程':
          placeholder.setState({listLight: [...placeholder.state.listLight, {key: id, category: category, name: name + '_' + type}]});
          if (!placeholder.state.data) {
            placeholder.setState({ data: [data], table: { name: name + '_' + type, category: category } });
          }
          placeholder.setState({ isCreating: false });
          dialog.showMessageBox(successOptions);
          break;
        default:
          // Do nothing.
      }
    };
    const errorHelper = function(error) {
      placeholder.setState({ isCreating: false });
      dialog.showErrorBox('错误', error.message);
    };
    const func = async () => {
    	await backend.sync.createTable(name, category, type, projectId, successHelper, errorHelper);
      // Then set menu selection to the newly created table!
      if (!this.state.data) {
        $('.ui.dropdown').dropdown('set text', name + '_' + type);
      }
    };
    func();
  }

  onCreateCancelClick() {
    // Do nothing.
    this.setState({ isCreating: false });
  }

  onAddRowClick() {
    const { data, table } = this.state;
    const { id } = this.props.params;
    // Check whether data is present.
    if (data) {
      const errorHelper = function (error) {
        // Do nothing...
      };
      const func = async () => {
        await backend.sync.addRowTable(table.name, id, this.refs.grid.onAddRow, errorHelper);
      };
      func();
    } else {
      const errorOptions = {
        type: 'info',
        title: '操作提示',
        message: '未选定表格，请先选择需要插入行的表格',
        buttons: ['确认']
      }
    	dialog.showMessageBox(errorOptions)
    }
  }

  onRemoveRowClick() {
    const { data, table } = this.state;
    const { id } = this.props.params;
    if (data) {
      // Get removing rows.
      const removing = this.refs.grid.onRemoveRow();
      // And remove them.
      const errorHelper = function (error) {
        // Do nothing...
      };
      const func = async () => {
        await backend.sync.removeRowTable(table.name, id, removing, errorHelper);
      };
      func();
    } else {
      const errorOptions = {
        type: 'info',
        title: '操作提示',
        message: '未选定表格，请先选择需要删除行的表格',
        buttons: ['确认']
      }
    	dialog.showMessageBox(errorOptions)
    }
  }

  render() {
    const { isImporting, isCreating, isLoading, data, table, project,
      listWater, listElectric, listOil, listBarrack, listLight } = this.state;
    return (
      <div>
        <Header onItemClick={this.onItemClick} onFileClick={this.onFileClick} onTableClick={this.onTableClick}
                onTrashClick={this.onTrashClick} onExportClick={this.onExportClick} onPrintClick={this.onPrintClick}
                onAddRowClick={this.onAddRowClick} onRemoveRowClick={this.onRemoveRowClick}
                listWater={listWater} listElectric={listElectric} listOil={listOil}
                listBarrack={listBarrack} listLight={listLight} />

        {
          project && <h1 className="ui centered header" style={{paddingTop: '70px'}}>项目名称：{project.name}</h1>
        }
        <div className="ui content">
          {
            isLoading ? <div className="ui active centered text loader">加载中</div> : (data && <EditableGrid ref="grid" columnDefinition={table.name.includes('人材机') ? ManMachineColumnsAdmin.createColumns() : ConstructionQuantityColumnsAdmin.createColumns()}
                                  data={data} name={table.name} params={this.props.params} />)
          }
        </div>
        {
          isImporting && <ImportModal onOKClick={this.onImportOKClick} onCancelClick={this.onImportCancelClick} />
        }
        {
          isCreating && <TableModal onOKClick={this.onCreateOKClick} onCancelClick={this.onCreateCancelClick} />
        }
      </div>
    );
  }
}
