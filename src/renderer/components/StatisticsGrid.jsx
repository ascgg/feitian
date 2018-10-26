import React, { Component, PropTypes } from 'react'
import { AgGridReact } from 'ag-grid-react'


export default class StatisticsGrid extends Component {
  static propTypes = {
    columnDefinition: PropTypes.array,
    data: PropTypes.array,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onGridReady = this.onGridReady.bind(this);
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
    	name: this.props.name,
    	localeText: {
        page: '页面',
        more: '更多',
        to: '到',
        of: '属于',
        next: '后一页',
        previous: '前一页',
        last: '最后一页',
        first: '第一页',
        loadingOoo: '空',
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
      }
    };
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.setColumnVisible('id', false);
  }

  render() {
    const { icons } = this.state;
    return (
      <div className="ag-blue" style={{height: 200}}>
        <AgGridReact gridOptions={this.gridOptions} onGridReady={this.onGridReady} icons={icons} columnDefs={this.state.columnDefs} rowData={this.props.data} enableColResize="true" enableSorting="true" enableFilter="true" groupHeaders="true" />
      </div>
    );
  }
}
