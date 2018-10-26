import React, { Component, PropTypes } from 'react'
import Message from './Message.jsx'
import StatisticsGrid from './StatisticsGrid.jsx'
import ConstructionDetailStatistics from './ConstructionDetailStatistics.jsx'
import ManMachineDetailStatistics from './ManMachineDetailStatistics.jsx'
import { backend } from '../../browser/remote'
const app = require('electron').remote
const dialog = app.dialog

export default class StatisticsModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    filterInfBack: PropTypes.func,
    onExportDetailClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,
    isCalculating: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tableResult: [],
      tables: [],
      filterName1: '',
      filterName2: '',
      filterName: '',
      data1: [],
      data2: [],
      sub1: [],
      sub2: [],
      common1: [],
      unique1: []
    };
    this.manMachineNameInput = this.manMachineNameInput.bind(this);
    this.manMachineNameSubInput = this.manMachineNameSubInput.bind(this);
    this.constructionNameInput = this.constructionNameInput.bind(this);
    this.constructionNameSubInput = this.constructionNameSubInput.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  componentWillMount() {
    const id  = this.props.isCalculating;
    const func = async () => {
        let result;
        let project;
        let water = [];
        let electric = [];
        let oil = [];
        let barrack = [];
        let light = [];
        result = await backend.sync.getTablesInProject(id);
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
        this.setState({ list: [...this.state.listWater, ...this.state.listElectric, ...this.state.listOil, ...this.state.listBarrack, ...this.state.listLight] })
    };
    func();
  }

  componentDidMount() {
    $(this.refs.statModal).modal({
      closable: false,
      detachable: false,
      autofocus: false,
      onApprove: () => {
        this.props.onOKClick();
        return false;
      }
    }).modal('show');
    $(this.refs.select1).dropdown();
    $(this.refs.select2).dropdown();
    $(this.refs.select3).dropdown();
    $(this.refs.select4).dropdown();
    this.onFilterClick();
  }

  componentWillUnmount() {
    $(this.refs.statModal).modal('hide');
  }

  manMachineNameInput() {
    const { isCalculating } = this.props;
    const e = this.refs.select1;
    let result = [];
    const placeholder = this;
    function getSelectValues(select) {
      let options = select && select.options;
      let opt;
      for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      return result;
    }
    getSelectValues(e);
    const errorHelper = function (error) {
      dialog.showErrorBox('错误', error.message);
    };
    const successHelper1 = function (unique1) {
      placeholder.setState({ data1: [...unique1] });
      placeholder.setState({ filterName1: [...placeholder.state.filterName2, ...result] });
      placeholder.setState({ filterName: [...placeholder.state.filterName1] });
      $(placeholder.refs.select2).dropdown('clear');
    };
    const successHelper2 = function (nameFilter2) {

    };
    const func = async () => {
      await backend.sync.selectValueGetter(isCalculating, successHelper1, successHelper2, errorHelper, result)
    };
    func();
  }

  manMachineNameSubInput() {
    const e = this.refs.select2;
    let result = [];
    const placeholder = this;
    function getSelectValues(select) {
      let options = select && select.options;
      let opt;
      for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if(opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      return result;
    }
    getSelectValues(e);
    placeholder.setState({ sub1: [...result] });
  }

  constructionNameInput() {
    const { isCalculating } = this.props;
    const e = this.refs.select3;
    const placeholder = this;
    let result = [];
    function getSelectValues(select) {
      let options = select && select.options;
      let opt;
      for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      return result;
    }
    getSelectValues(e);
    const errorHelper = function (error) {
      dialog.showErrorBox('错误', error.message);
    };
    const successHelper1 = function (nameFilter1) {

    };
    const successHelper2 = function (nameFilter2) {
      placeholder.setState({ data2: [...nameFilter2] });
      placeholder.setState({ filterName2: [...placeholder.state.filterName1, ...result] });
      placeholder.setState({ filterName: [...placeholder.state.filterName2] });
      $(placeholder.refs.select4).dropdown('clear');
    };
    const func = async () => {
      await backend.sync.selectValueGetter(isCalculating, successHelper1, successHelper2, errorHelper, result)
    };
    func();
  }

  constructionNameSubInput() {
    const e = this.refs.select4;
    let result = [];
    const placeholder = this;
    function getSelectValues(select) {
      let options = select && select.options;
      let opt;
      for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if(opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      return result;
    }
    getSelectValues(e);
    placeholder.setState({ sub2: [...result] });
  }

  onFilterClick() {
    const { isCalculating } = this.props;
    const { filterName, sub1, sub2 } = this.state;
    const placeholder = this;
    const successHelper = function (manMachine, construction) {
      placeholder.setState({ tableResult: { m: manMachine, c: construction } });
      placeholder.props.filterInfBack(placeholder.state.tableResult);
    };
    const errorHelper = function (error) {
      dialog.showErrorBox('错误', error.message);
    };
    const func = async () => {
      await backend.sync.getDetailTable(isCalculating, successHelper, errorHelper, filterName, sub1, sub2);
    };
    func();
  }

  render() {
    const {  project, onOKClick, onExportDetailClick } = this.props;
    const { list, tableResult, data1, data2 } = this.state;

    return (
      <div className="ui modal" ref="statModal">
        <h1 className="ui header">
          {project.name} 子项目统计情况
        </h1>
        <div className="content">
          <div className="ui dividing header">子项目筛选</div>
          <div style={{ margin:'0 0 5px 0' }}>
            <select multiple="multiple"  className="ui multiple fluid search normal dropdown " ref="select1" onChange={this.manMachineNameInput}>
              <option value="">人材机</option>
                {
                  list !== undefined && list.length !== 0 && list.map(item => (item.name).includes('人材机') ? <option className="item" key={item.key} value={item.name} >{item.name}</option> : null)
                }
            </select>
          </div>
          <div style={{ margin:'0 0 5px 0' }}>
            <select multiple="multiple"  className="ui multiple fluid search normal dropdown " ref="select2" onChange={this.manMachineNameSubInput}>
              <option value="">人材机子项目</option>
                {
                  data1 !== undefined && data1.length !== 0 && data1.map((item, i) => <option className="item" key={i} value={item} >{item}</option>)
                }
            </select>
          </div>
          <div style={{ margin:'0 0 5px 0' }}>
            <select multiple="multiple"  className="ui multiple fluid search normal dropdown " ref="select3" onChange={this.constructionNameInput}>
              <option value="">工程量</option>
                {
                  list !== undefined && list.length !== 0 && list.map(item => (item.name).includes('工程量') ? <option className="item" key={item.key} value={item.name} >{item.name}</option> : null)
                }
            </select>
          </div>
          <div>
            <select multiple="multiple"  className="ui multiple fluid search normal dropdown " ref="select4" onChange={this.constructionNameSubInput}>
              <option value="">工程量子项目</option>
                {
                  data2 !== undefined && data2.length !== 0 && data2.map((item, i) => <option className="item" key={i} value={item} >{item}</option>)
                }
            </select>
          </div>
        </div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="small ui positive right floated right labeled icon button" tabIndex="0" onClick={this.onFilterClick}>
            确定
            <i className="checkmark icon" />
          </div>
        </div>
        <div className="content">
          <h3 className="ui dividing header">
            人材机汇总
          </h3>
          <StatisticsGrid columnDefinition={ManMachineDetailStatistics.createColumns()} data={tableResult.m} name="人材机汇总" />
          <h3 className="ui dividing header">
            工程量清单
          </h3>
          <StatisticsGrid columnDefinition={ConstructionDetailStatistics.createColumns()} data={tableResult.c} name="工程量清单"/>
        </div>
        <div className="actions">
          <div className="small ui yellow right labeled icon button" tabIndex="0" onClick={onExportDetailClick}>
            输出
            <i className="print icon" />
          </div>
          <div className="small ui positive right labeled icon button" tabIndex="0" onClick={onOKClick}>
            关闭
            <i className="checkmark icon" />
          </div>
        </div>
      </div>
    );
  }
}
