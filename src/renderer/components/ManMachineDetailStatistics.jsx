import StringCellEditor from './StringCellEditor.jsx'
import NumberCellEditor from './NumberCellEditor.jsx'
import TypeFilter from './TypeFilter.jsx'


export default class ManMachineColumnsAdmin {
  static createColumns() {
    return [
      {
        headerName: '序号',
        field: 'id',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'number',
        width: 75
      },
      {
        headerName: '分类',
        field: 'category',
        enableRowGroup: true,
        enablePivot: true,
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor,
        filterFramework: TypeFilter
      },
      {
        headerName: '编码',
        field: 'code',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '地方码',
        field: 'regionCode',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '名称',
        field: 'name',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 150,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '规格',
        field: 'form',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '单位',
        field: 'unit',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 75,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '数量',
        field: 'amount',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'number',
        editable: true,
        width: 100,
        cellEditorFramework: NumberCellEditor
      },
      {
        headerName: '预算价',
        children: [
          {
            headerName: '合计',
            field: 'budgetTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
          }
        ]
      },
      {
        headerName: '市场价',
        children: [
          {
            headerName: '合计',
            field: 'marketTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
          }
        ]
      },
      {
        headerName: '差价',
        children: [
          {
            headerName: '合计',
            field: 'deltaTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
          }
        ]
      }
    ];
  }

  static budgetTotalGetter(params) {
    return (params.data.amount * params.data.budgetUnit).toFixed(2);
  }

  static marketTotalGetter(params) {
    return (params.data.amount * params.data.marketUnit).toFixed(2);
  }

  static deltaUnitGetter(params) {
    return (Math.abs(params.data.budgetUnit - params.data.marketUnit)).toFixed(2);
  }

  static deltaTotalGetter(params) {
    return (params.data.amount * Math.abs(params.data.budgetUnit - params.data.marketUnit)).toFixed(2);
  }

  static budgetTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static marketTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static deltaTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static deltaUnitComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };
}
