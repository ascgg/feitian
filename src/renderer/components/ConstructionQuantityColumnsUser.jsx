export default class ConstructionQuantityColumnsAdmin {
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
        headerName: '项目分类',
        field: 'projectName',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        width: 150
      },
      {
        headerName: '项目代码',
        field: 'projectCode',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        width: 150
      },
      {
        headerName: '项目名称',
        field: 'name',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        width: 150
      },
      {
        headerName: '计量单位',
        field: 'unit',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'text',
        width: 75
      },
      {
        headerName: '工程数量',
        field: 'amount',
        enableRowGroup: true,
        enablePivot: true,
        filter: 'number',
        width: 100
      },
      {
        headerName: '定额',
        children: [
          {
            headerName: '单价',
            field: 'quotaUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'quotaTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.quotaTotalGetter
          }
        ]
      },
      {
        headerName: '金额',
        children: [
          {
            headerName: '单价',
            field: 'moneyUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'moneyTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.moneyTotalGetter
          }
        ]
      },
      {
        headerName: '主材费',
        children: [
          {
            headerName: '单价',
            field: 'mainUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'mainTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.mainTotalGetter
          }
        ]
      },
      {
        headerName: '人工费',
        children: [
          {
            headerName: '单价',
            field: 'manUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'manTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.manTotalGetter
          }
        ]
      },
      {
        headerName: '材料费',
        children: [
          {
            headerName: '单价',
            field: 'materialUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'materialTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.materialTotalGetter
          }
        ]
      },
      {
        headerName: '机械费',
        children: [
          {
            headerName: '单价',
            field: 'machineUnit',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100
          },
          {
            headerName: '合计',
            field: 'machineTotal',
            enableRowGroup: true,
            enablePivot: true,
            filter: 'number',
            width: 100,
            valueGetter: this.machineTotalGetter
          }
        ]
      }
    ];
  }

  static quotaTotalGetter(params) {
    return (params.data.amount * params.data.quotaUnit).toFixed(2);
  }

  static moneyTotalGetter(params) {
    return (params.data.amount * params.data.moneyUnit).toFixed(2);
  }

  static mainTotalGetter(params) {
    return (params.data.amount * params.data.mainUnit).toFixed(2);
  }

  static manTotalGetter(params) {
    return (params.data.amount * params.data.manUnit).toFixed(2);
  }

  static materialTotalGetter(params) {
    return (params.data.amount * params.data.materialUnit).toFixed(2);
  }

  static machineTotalGetter(params) {
    return (params.data.amount * params.data.machineUnit).toFixed(2);
  }
  
  static quotaTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static moneyTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static mainTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static manTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static materialTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };

  static machineTotalComparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  };
}
