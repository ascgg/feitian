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
        width: 150,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '地方码',
        field: 'regionCode',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 150,
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
            headerName: '单价',
            field: 'budgetUnit',
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            filter: 'number',
            width: 100,
            cellEditorFramework: NumberCellEditor
          },
          {
            headerName: '合计',
            field: 'budgetTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.budgetTotalGetter,
            comparator: this.budgetTotalComparator
          }
        ]
      },
      {
        headerName: '市场价',
        children: [
          {
            headerName: '单价',
            field: 'marketUnit',
            enableRowGroup: true,
            enablePivot: true,
            editable: true,
            filter: 'number',
            width: 100,
            cellEditorFramework: NumberCellEditor
          },
          {
            headerName: '合计',
            field: 'marketTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.marketTotalGetter,
            comparator: this.marketTotalComparator
          }
        ]
      },
      {
        headerName: '差价',
        children: [
          {
            headerName: '单价',
            field: 'deltaUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.deltaUnitGetter,
            comparator: this.deltaUnitComparator
          },
          {
            headerName: '合计',
            field: 'deltaTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.deltaTotalGetter,
            comparator: this.deltaTotalComparator
          }
        ]
      },
      {
        headerName: '数量/m2',
        field: 'area',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'number',
        editable: true,
        width: 75,
        cellEditorFramework: NumberCellEditor
      },
      {
        headerName: '厂家',
        field: 'vendor',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '品牌',
        field: 'brand',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 100,
        cellEditorFramework: StringCellEditor
      },
      {
        headerName: '备注',
        field: 'note',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        editable: true,
        width: 150,
        cellEditorFramework: StringCellEditor
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