import React, { Component, PropTypes } from 'react'
import Message from './Message.jsx'
import StatisticsGrid from './StatisticsGrid.jsx'
import ConstructionStatistics from './ConstructionStatistics.jsx'
import ManMachineStatistics from './ManMachineStatistics.jsx'
import { backend } from '../../browser/remote'


export default class StatisticsModal extends Component {
  static propTypes = {
    onOKClick: PropTypes.func.isRequired,
    recoverClick: PropTypes.func.isRequired,
    filterInfBack: PropTypes.func,
    onExportClick: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,
    isCalculating: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tableResult: [],
      tables: [],
      filterName: ''
    };
    this.nameInput = this.nameInput.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onRecoverClick = this.onRecoverClick.bind(this);
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
    $(this.refs.select).dropdown();
    this.onFilterClick();
  }

  componentWillUnmount() {
    $(this.refs.statModal).modal('hide');
  }

  nameInput(event) {
    const e = this.refs.select;
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
    this.setState({ filterName: result })
  }

  onRecoverClick() {
    const placeholder = this;
    const success = () => {
      this.setState({ tableResult: this.props.result });
    };
    const func = () => {
      this.props.recoverClick(success);
    };
    func();
    const selected = () => {
      var arr = [];
      for (var i in placeholder.state.list) {
        arr.push(placeholder.state.list[i].name);
      }
      return arr;
    };
    $(this.refs.select).dropdown('set selected', selected());
  }

  onFilterClick() {
    const { isCalculating } = this.props;
    const { filterName } = this.state;
    const placeholder = this;
    const successHelper = function (manMachine, construction) {
      placeholder.setState({ tableResult: { m: manMachine, c: construction } });
      placeholder.props.filterInfBack(placeholder.state.tableResult);
    };
    const errorHelper = function (error) {
      dialog.showErrorBox('错误', error.message);
    };
    const func = async () => {
      await backend.sync.statFilterProject(isCalculating, successHelper, errorHelper, filterName);
    };
    func();
  }

  render() {
    const {  project, onOKClick, onExportClick } = this.props;
    const { list, tableResult } = this.state;

    return (
      <div className="ui modal" ref="statModal">
        <h1 className="ui header">
          {project.name} 项目统计情况
        </h1>
        <div className="content">
          <div className="ui dividing header">项目统计筛选</div>
          <select multiple="multiple"  className="ui multiple search fluid normal dropdown " ref="select" onChange={this.nameInput}>
            <option value="">项目</option>
              {
                list !== undefined && list.length !== 0 && list.map(item => <option className="item" key={item.key} value={item.name} >{item.name}</option>)
              }
          </select>
        </div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="small ui positive right floated right labeled icon button" tabIndex="0" ref="confirm" onClick={this.onFilterClick}>
            确定
            <i className="checkmark icon" />
          </div>
          <div className="small ui positive right floated right labeled icon button" tabIndex="0" ref="total" onClick={this.onRecoverClick} style={{margin:'0px 9px'}}>
            全部
            <i className="checkmark icon" />
          </div>
        </div>
        <div className="content">
          <h3 className="ui dividing header">
            人材机汇总
          </h3>
          <StatisticsGrid columnDefinition={ManMachineStatistics.createColumns()} data={tableResult.m} name="人材机汇总" />
          <h3 className="ui dividing header">
            工程量清单
          </h3>
          <StatisticsGrid columnDefinition={ConstructionStatistics.createColumns()} data={tableResult.c} name="工程量清单"/>
        </div>
        <div className="actions">
          <div className="small ui yellow right labeled icon button" tabIndex="0" onClick={onExportClick}>
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
