import React, { Component, PropTypes } from 'react'
import UserHeader from './UserHeader.jsx'
// import ImportModal from './ImportModal.jsx'
// import TableModal from './TableModal.jsx'
// import TwoModal from './TwoModal.jsx'
import { backend } from '../../browser/remote'
import ManMachineColumnsUser from './ManMachineColumnsUser.jsx'
import ConstructionQuantityColumnsUser from './ConstructionQuantityColumnsUser.jsx'
import ReadOnlyGrid from './ReadOnlyGrid.jsx'
import Message from './Message.jsx'
import MenuHandler from '../menu-handler'


export default class UserTables extends Component {
  static propTypes = {
    // onFileClick: PropTypes.func,
    // onTableClick: PropTypes.func,
    // onTrashClick: PropTypes.func,
    onExportClick: PropTypes.func,
    onItemClick: PropTypes.func,
    // onImportOKClick: PropTypes.func,
    // onImportCancelClick: PropTypes.func,
    // onCreateOKClick: PropTypes.func,
    // onCreateCancelClick: PropTypes.func,
    // onDeleteOKClick: PropTypes.func,
    // onDeleteCancelClick: PropTypes.func,
    // onAddRowClick: PropTypes.func,
    // onRemoveRowClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    // this.onFileClick = this.onFileClick.bind(this);
    // this.onTableClick = this.onTableClick.bind(this);
    // this.onTrashClick = this.onTrashClick.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    // this.onImportOKClick = this.onImportOKClick.bind(this);
    // this.onImportCancelClick = this.onImportCancelClick.bind(this);
    // this.onCreateOKClick = this.onCreateOKClick.bind(this);
    // this.onCreateCancelClick = this.onCreateCancelClick.bind(this);
    // this.onDeleteOKClick = this.onDeleteOKClick.bind(this);
    // this.onDeleteCancelClick = this.onDeleteCancelClick.bind(this);
    // this.onAddRowClick = this.onAddRowClick.bind(this);
    // this.onRemoveRowClick = this.onRemoveRowClick.bind(this);
    this.state = {
      data: null,
      table: undefined, // Should contain name and category.
      // isImporting: false,
      // isCreating: false,
      // isDeleting: false,
      error: null,
      loading: false
    };
    this.menuHandler = new MenuHandler();
  }
  
  setMenus() {
    this.menuHandler.setMenus({
      // 'fei-tian:new-table': () => this.onTableClick(),
	    // 'fei-tian:import-table': () => this.onFileClick(),
      // 'fei-tian:delete-table': () => this.onTrashClick(),
      'fei-tian:export': () => this.onExportClick()
      // 'fei-tian:add-row': () => this.onAddRowClick(),
      // 'fei-tian:remove-row': () => this.onRemoveRowClick()
    });
  }

  componentDidMount() {
    this.setMenus();
  }

  componentWillMount() {
    const func = async () => {
      try {
        let result;
        let water = [];
        let electric = [];
        let oil = [];
        let barrack = [];
        let light = [];
        result = await backend.sync.getTables();
        // Now the array is not formatted, extract information.
        result.forEach(function (item) {
          if (item.dataValues.category === '给排水工程') {
            water.push({ key: item.dataValues.id, category: item.dataValues.category, name: item.dataValues.name });
          } else if (item.dataValues.category === '供电工程') {
            electric.push({ key: item.dataValues.id, category: item.dataValues.category, name: item.dataValues.name });
          } else if (item.dataValues.category === '供油工程') {
            oil.push({ key: item.dataValues.id, category: item.dataValues.category, name: item.dataValues.name });
          } else if (item.dataValues.category === '营房工程') {
            barrack.push({ key: item.dataValues.id, category: item.dataValues.category, name: item.dataValues.name });
          } else if (item.dataValues.category === '助航灯光工程') {
            light.push({ key: item.dataValues.id, category: item.dataValues.category, name: item.dataValues.name });
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
      } catch (error) {
        this.setState({ error: new Error('加载错误:' + error) });
      }
    };
    func();
  }

	/*
  onFileClick() {
    this.setState({ isImporting: true });
  }

  onTableClick() {
    this.setState({ isCreating: true });
  }

  onTrashClick() {
    const { table } = this.state;
    if (table) {
      this.setState({ isDeleting: true });
    }
  }
  */

  onExportClick() {
    const { data, table } = this.state;
    const placeholder = this;
    this.setState({ success: null, error: null })
    const options = {
      title: '导出数据表文件',
      filters: [
        { name: 'Excel 文件', extensions: ['xlsx'] }
      ]
    }
    if (data) {
      dialog.showSaveDialog(options, function(filename) {
        try {
          if (filename) {
            backend.write.exportExcelTable(data, table.name, filename)
            placeholder.setState({ success: '导出成功' })
          }
        } catch (error) {
          placeholder.setState({ error: error })
        }
      })
    } else {
      const errorOptions = {
        type: 'info',
        title: '操作提示',
        message: '未选定表格，请先选择需要导出的表格',
        buttons: ['确认']
      }
      dialog.showMessageBox(errorOptions)
    }
  }
  
  onItemClick(name, category) {
    const placeholder = this;
    const helper = function(data) {
      placeholder.setState({ table: { name: name, category: category }, data: data });
    };
    const errorHelper = function(error) {
      placeholder.setState({ error: error });
    };
    const func = async () => {
      try {
        this.setState({ data: null, table: null, loading: true });
        await backend.sync.getTable(name, helper);
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ error: new Error('读取错误') });
      }
    };
    func();
  }

	/*
  onImportOKClick(path, name, category) {
    // Start to import table, and jump to the imported table.
    const placeholder = this;
    const helper = function(id, category, type) {
      switch (category) {
        case '给排水工程':
          placeholder.setState({listWater: [...placeholder.state.listWater, {key: id, category: category, name: name + '_' + type}]});
          break;
        case '供电工程':
          placeholder.setState({listElectric: [...placeholder.state.listElectric, {key: id, category: category, name: name + '_' + type}]});
          break;
        case '供油工程':
          placeholder.setState({listOil: [...placeholder.state.listOil, {key: id, category: category, name: name + '_' + type}]});
          break;
        case '营房工程':
          placeholder.setState({listBarrack: [...placeholder.state.listBarrack, {key: id, category: category, name: name + '_' + type}]});
          break;
        case '助航灯光工程':
          placeholder.setState({listLight: [...placeholder.state.listLight, {key: id, category: category, name: name + '_' + type}]});
          break;
        default:
          // Do nothing.
          placeholder.setState({ importError: new Error('表格类别无效') });
          break;
      }
    };
    const errorHelper = function(error) {
      placeholder.setState({ importError: error });
    };
    const func = async () => {
      try {
        let data;
        const name1 = name + '_人材机';
        const name2 = name + '_工程量';
        data = backend.read.importExcelTable(path, errorHelper);
        if (data.data1 !== undefined) {
          await backend.sync.importTable(data.data1, name1, category, '人材机', helper, errorHelper);
        }
        if (data.data2 !== undefined) {
          await backend.sync.importTable(data.data2, name2, category, '工程量', helper, errorHelper);
        }
        if (data.man !== undefined) {
          await backend.sync.importTable(data.man, name1, category, '人材机', helper, errorHelper);
        }
        if (data.quantity !== undefined) {
          await backend.sync.importTable(data.quantity, name2, category, '工程量', helper, errorHelper);
        }
        this.setState({ isImporting: false });
      } catch (error) {
        this.setState({ isImporting: false, importError: error });
      }
    };
    func();
  }

  onImportCancelClick() {
    // Do nothing.
    this.setState({ isImporting: false });
  }

  onCreateOKClick(name, category, type) {
    // Create a brand new table.
    const placeholder = this;
    const helper = function(id, data, category, type) {
      switch (category) {
        case '给排水工程':
          placeholder.setState({listWater: [...placeholder.state.listWater, {key: id, category: category, name: name + '_' + type}]});
          placeholder.setState({ data: [data] });
          break;
        case '供电工程':
          placeholder.setState({listElectric: [...placeholder.state.listElectric, {key: id, category: category, name: name + '_' + type}]});
          placeholder.setState({ data: [data] });
          break;
        case '供油工程':
          placeholder.setState({listOil: [...placeholder.state.listOil, {key: id, category: category, name: name + '_' + type}]});
          placeholder.setState({ data: [data] });
          break;
        case '营房工程':
          placeholder.setState({listBarrack: [...placeholder.state.listBarrack, {key: id, category: category, name: name + '_' + type}]});
          placeholder.setState({ data: [data] });
          break;
        case '助航灯光工程':
          placeholder.setState({listLight: [...placeholder.state.listLight, {key: id, category: category, name: name + '_' + type}]});
          placeholder.setState({ data: [data] });
          break;
        default:
          // Do nothing.
      }
    };
    const errorHelper = function(error) {
      placeholder.setState({ createError: error });
    };
    const func = async () => {
      try {
        await backend.sync.createTable(name, category, type, helper, errorHelper);
        // Then set menu selection to the newly created table!
        $('.ui.dropdown').dropdown('set text', name + '_' + type);
        // And go on.
        this.setState({ table: { name: name + '_' + type, category: category }});
        this.setState({ isCreating: false });
      } catch (error) {
        this.setState({ isCreating: false, createError: error });
      }
    };
    func();
  }

  onCreateCancelClick() {
    // Do nothing.
    this.setState({ isCreating: false });
  }

  onDeleteOKClick() {
    // Delete current table.
    const placeholder = this;
    const { table } = this.state;
    const errorHelper = function(error) {
      placeholder.setState({ deleteError: error });
    };
    const func = async () => {
      try {
        await backend.sync.removeTable(table.name, errorHelper);
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
        this.setState({ isDeleting: false });
      } catch (error) {
        this.setState({ isDeleting: false, deleteError: error });
      }
    };
    func();
  }

  onDeleteCancelClick() {
    // Do nothing.
    this.setState({ isDeleting: false });
  }
  */
  
  render() {
    const { success, error, data, table, loading,
      listWater, listElectric, listOil, listBarrack, listLight } = this.state;
    return (
      <div>
        <UserHeader onItemClick={this.onItemClick} onExportClick={this.onExportClick} listWater={listWater} listElectric={listElectric} listOil={listOil}
                    listBarrack={listBarrack} listLight={listLight} />
                    
  			<div className="ui content" style={{paddingTop: '80px'}}>
          <div className="ui fluid two steps">
            <div className="step">
              <i className="database icon" />
              <div className="content">
                <div className="title">选择</div>
                <div className="description">选择已导入到数据库的表格</div>
              </div>
            </div>
            <div className="step">
              <i className="file outline icon" />
              <div className="content">
                <div className="title">导出</div>
                <div className="description">导出数据库中的标准格式</div>
              </div>
            </div>
          </div>
          {
            success && <Message closable title='成功' message={success} type="success" />
          }
          {
            error && <Message closable title='错误' message={error.message} type="error" />
          }
          {
            loading && <div className="ui active centered inline text loader">加载中</div>
          }
          {
            data && <ReadOnlyGrid ref="grid" columnDefinition={table.name.includes('人材机') ? ManMachineColumnsUser.createColumns() : ConstructionQuantityColumnsUser.createColumns()}
                                  data={data} name={table.name} />
          }
        </div>
      </div>
    );
  }
}
