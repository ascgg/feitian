import React, { Component, PropTypes } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { backend } from '../../browser/remote'


export default class EditableGrid extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    columnDefinition: PropTypes.array,
    data: PropTypes.array,
    name: PropTypes.string
    // onGridValueEdit: PropTypes.func.isRequired,
    // onGridRowEdit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onGridReady = this.onGridReady.bind(this);
    this.generateSummary = this.generateSummary.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onRemoveRow = this.onRemoveRow.bind(this);
    this.state = {
      showGrid: true,
      showToolPanel: false,
      columnDefs: this.props.columnDefinition,
      rowData: this.props.data,
      icons: {
        columnRemoveFromGroup: '<i class="remove icon"></i>',
        filter: '<i class="filter icon"></i>',
        sortAscending: '<i class="sort ascending icon"></i>',
        sortDescending: '<i class="sort descending icon"></i>',
        groupExpanded: '<i class="plus square icon"></i>',
        groupContracted: '<i class="minus square icon"></i>',
        columnGroupOpened: '<i class="plus square outline icon"></i>',
        columnGroupClosed: '<i class="minus square outline icon"></i>'
      }
    };

    this.gridOptions = {
      id: this.props.params.id,
      p: this,
      name: this.props.name,
      getRowStyle: function (params) {
        if (params.node.floating) {
          return { 'font-weight': 'bold' };
        }
      },
      rowSelection: 'single',
      floatingTopRowData: this.generateSummary(),
      localeText: {
        page: '页面',
        more: '更多',
        to: '到',
        of: '属于',
        next: '后一页',
        previous: '前一页',
        last: '最后一页',
        first: '第一页',
        loadingOoo: '载入...',
        selectAll: '全选',
        searchOoo: '搜索...',
        blanks: '空白',
        filterOoo: '筛选...',
        applyFilter: '应用筛选',
        equals: '等于',
        notEqual: '不等于',
        lessThan: '小于',
        lessThanOrEqual: '小于等于',
        greaterThan: '大于',
        greaterThanOrEqual: '大于等于',
        contains: '包含',
        notEquals: '不等于',
        startsWith: '由...起始',
        endsWith: '由...结尾',
        // the header of the default group column
        group: '组',
        // tool panel
        columns: '列',
        rowGroupColumns: '行组列',
        rowGroupColumnsEmptyMessage: '行组列为空',
        valueColumns: '值列',
        pivotMode: '轴模式',
        groups: '群组',
        values: '值',
        pivots: '轴',
        valueColumnsEmptyMessage: '值列为空',
        pivotColumnsEmptyMessage: '轴列为空',
        // other
        noRowsToShow: '空',
        // standard menu
        copy: '复制',
        ctrlC: 'Ctrl + C',
        paste: '粘贴',
        ctrlV: 'Ctrl + V'
      },
      onCellValueChanged: function (event) {
        const projectId = this.id;
        const name = this.name;
        // Firstly check whether changed, if not, do nothing.
        if (event.oldValue !== event.newValue) {
          // Then if the column is number based, check whether the new value is NaN, if true, signal error and do nothing to database, restore old value.
          const field = event.colDef.field;
          const template = ['budgetUnit', 'marketUnit', 'amount', 'quotaUnit', 'moneyUnit', 'mainUnit', 'manUnit', 'materialUnit', 'machineUnit', 'area'];
          const errorHandler = function(error) {

          };
          const func = async (type) => {
            var v = {};
            switch (type) {
              case 'num':
                v[field] = Number(event.newValue);
                await backend.sync.editTable(name, event.node.data.id, v, projectId, errorHandler);
                break;
              case 'str':
                v[field] = event.newValue;
                await backend.sync.editTable(name, event.node.data.id, v, projectId, errorHandler);
                break;
              default:
              // Can't be here.
            }
          };
          if (template.includes(field)) {
            // Then it should be a number.
            if (isNaN(Number(event.newValue))) {
              // Oops, the format is not a number.
              const placeholder = this;
              this.api.showNoRowsOverlay();
              setTimeout(function () {
                placeholder.api.hideOverlay();
              }, 1000);
              event.node.setDataValue(event.colDef, event.oldValue);
            } else {
              // All passed, sync the data with all generated rows.
              this.api.refreshRows([event.node]);
              this.p.api.setFloatingTopRowData(this.p.generateSummary());
              func('num');
            }
          } else {
            // Don't need to check format, directly update the database!
            func('str');
          }
        }
      },
      overlayNoRowsTemplate: '<span style="padding: 10px; border: 5px; background: lightgoldenrodyellow">数据格式错误</span>'
    };
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.setColumnVisible('id', false);
  }

  onAddRow(data) {
    // Generate new data in database, get it and add it to the grid.
    this.api.addItems(data);
    this.api.setFloatingTopRowData(this.generateSummary());
  }

  onRemoveRow() {
    // Get selected, remove it from grid and update floating rows, then remove it from database.
    const { rowData } = this.state;
    const selected = this.api.getSelectedNodes();
    const indices = [];
    const selection = [];
    selected.forEach(function (item) {
      selection.push(item.data.id);
      indices.push(rowData.findIndex(function (v) { return v.id === item.data.id; }));
    });
    indices.forEach(function (item) {
      rowData.splice(item, 1);
    });
    this.api.removeItems(selected);
    this.api.setFloatingTopRowData(this.generateSummary());
    return selection;
  }

  generateSummary() {
    const { rowData } = this.state;
    if (rowData[0].projectName !== undefined) {
      var result = [];
      rowData.forEach(function (item) {
        const index = result.findIndex(function (v) { return v.projectName === item.projectName; });
        if (index !== -1) {
          // The pile is present, increment them.
          result[index].quotaUnit += item.quotaUnit * item.amount;
          result[index].moneyUnit += item.moneyUnit * item.amount;
          result[index].mainUnit += item.mainUnit * item.amount;
          result[index].manUnit += item.manUnit * item.amount;
          result[index].materialUnit += item.materialUnit * item.amount;
          result[index].machineUnit += item.machineUnit * item.amount;
        } else {
          // The pile is not present, create a new one.
          result.push({
            projectName: item.projectName,
            projectCode: '',
            name: '',
            unit: '',
            amount: 1,
            quotaUnit: item.quotaUnit * item.amount,
            moneyUnit: item.moneyUnit * item.amount,
            mainUnit: item.mainUnit * item.amount,
            manUnit: item.manUnit * item.amount,
            materialUnit: item.materialUnit * item.amount,
            machineUnit: item.machineUnit * item.amount
          });
        }
      });
      var quotaTotal = 0;
      var moneyTotal = 0;
      var mainTotal = 0;
      var manTotal = 0;
      var materialTotal = 0;
      var machineTotal = 0;
      result.forEach(function (item) {
        quotaTotal += item.quotaUnit;
        moneyTotal += item.moneyUnit;
        mainTotal += item.mainUnit;
        manTotal += item.manUnit;
        materialTotal += item.materialUnit;
        machineTotal += item.machineUnit;
      });
      result.push({
        projectName: '合计',
        projectCode: '',
        name: '',
        unit: '',
        amount: 1,
        quotaUnit: quotaTotal.toFixed(2),
        moneyUnit: moneyTotal.toFixed(2),
        mainUnit: mainTotal.toFixed(2),
        manUnit: manTotal.toFixed(2),
        materialUnit: materialTotal.toFixed(2),
        machineUnit: machineTotal.toFixed(2)
      });
      return result;
    } else {
      var manBudgetSummary = 0;
      var machineBudgetSummary = 0;
      var materialBudgetSummary = 0;
      var mainBudgetSummary = 0;
      var manMarketSummary = 0;
      var machineMarketSummary = 0;
      var materialMarketSummary = 0;
      var mainMarketSummary = 0;
      rowData.forEach(function (item) {
        const { category } = item;
        switch (category) {
          case '人工':
            manBudgetSummary += item.budgetUnit * item.amount;
            manMarketSummary += item.marketUnit * item.amount;
            break;
          case '机械':
            machineBudgetSummary += item.budgetUnit * item.amount;
            machineMarketSummary += item.marketUnit * item.amount;
            break;
          case '材料':
            materialBudgetSummary += item.budgetUnit * item.amount;
            materialMarketSummary += item.marketUnit * item.amount;
            break;
          case '主材':
            mainBudgetSummary += item.budgetUnit * item.amount;
            mainMarketSummary += item.marketUnit * item.amount;
            break;
          default:
          // Do nothing.
        }
      });
      const budgetSummary = manBudgetSummary + machineBudgetSummary + materialBudgetSummary + mainBudgetSummary;
      const marketSummary = manMarketSummary + machineMarketSummary + materialMarketSummary + mainMarketSummary;
      return [
        {
          category: '人工',
          name: '人工汇总',
          amount: 1,
          budgetUnit: manBudgetSummary.toFixed(2),
          marketUnit: manMarketSummary.toFixed(2)
        },
        {
          category: '机械',
          name: '机械汇总',
          amount: 1,
          budgetUnit: machineBudgetSummary.toFixed(2),
          marketUnit: machineMarketSummary.toFixed(2)
        },
        {
          category: '材料',
          name: '材料汇总',
          amount: 1,
          budgetUnit: materialBudgetSummary.toFixed(2),
          marketUnit: materialMarketSummary.toFixed(2)
        },
        {
          category: '主材',
          name: '主材汇总',
          amount: 1,
          budgetUnit: mainBudgetSummary.toFixed(2),
          marketUnit: mainMarketSummary.toFixed(2)
        },
        {
          category: '合计',
          name: '费用汇总',
          amount: 1,
          budgetUnit: budgetSummary.toFixed(2),
          marketUnit: marketSummary.toFixed(2)
        }
      ]
    }
  }

  render() {
    const { icons } = this.state;
    return (
      <div className="ag-blue" style={{height: 700}}>
        <AgGridReact gridOptions={this.gridOptions} onGridReady={this.onGridReady} icons={icons}
                     columnDefs={this.state.columnDefs} rowData={this.state.rowData} enableColResize="true"
                     enableSorting="true" enableFilter="true" groupHeaders="true" />
      </div>
    );
  }
}
