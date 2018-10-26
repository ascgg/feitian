'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.exportStatistics = exportStatistics;
exports.exportDetailStatistics = exportDetailStatistics;
exports.exportExcelTable = exportExcelTable;

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function sheetFromArrayOfManMachine(data) {
  var length = (0, _keys2.default)(data).length;
  var ws = {};
  var range = { s: { c: 0, r: 0 }, e: { c: 16, r: length + 5 } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '类别', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '编码', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '地方码', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '规格', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '单位', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '数量', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '预算价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: 0 })] = { v: '预算价总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 9, r: 0 })] = { v: '市场价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: 0 })] = { v: '市场价总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 11, r: 0 })] = { v: '差价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: 0 })] = { v: '差价总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 13, r: 0 })] = { v: '数量/m2', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: 0 })] = { v: '品牌', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 15, r: 0 })] = { v: '厂家', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 16, r: 0 })] = { v: '备注', t: 's' };

  // Now load everything into the worksheet.
  var manBudgetSummary = 0;
  var manMarketSummary = 0;
  var machineBudgetSummary = 0;
  var machineMarketSummary = 0;
  var materialBudgetSummary = 0;
  var materialMarketSummary = 0;
  var mainBudgetSummary = 0;
  var mainMarketSummary = 0;
  for (var R = 0; R != length; R++) {
    var category = data[R].category;
    var cellCategory = { v: category, t: 's' };
    var cellCategoryRef = _xlsx2.default.utils.encode_cell({ c: 0, r: R + 1 });
    ws[cellCategoryRef] = cellCategory;
    var cellCode = { v: data[R].code, t: 's' };
    var cellCodeRef = _xlsx2.default.utils.encode_cell({ c: 1, r: R + 1 });
    ws[cellCodeRef] = cellCode;
    var cellRegionCode = { v: data[R].regionCode, t: 's' };
    var cellRegionCodeRef = _xlsx2.default.utils.encode_cell({ c: 2, r: R + 1 });
    ws[cellRegionCodeRef] = cellRegionCode;
    var cellName = { v: data[R].name, t: 's' };
    var cellNameRef = _xlsx2.default.utils.encode_cell({ c: 3, r: R + 1 });
    ws[cellNameRef] = cellName;
    var cellForm = { v: data[R].form, t: 's' };
    var cellFormRef = _xlsx2.default.utils.encode_cell({ c: 4, r: R + 1 });
    ws[cellFormRef] = cellForm;
    var cellUnit = { v: data[R].unit, t: 's' };
    var cellUnitRef = _xlsx2.default.utils.encode_cell({ c: 5, r: R + 1 });
    ws[cellUnitRef] = cellUnit;
    var cellAmount = { v: data[R].amount, t: 'n' };
    var cellAmountRef = _xlsx2.default.utils.encode_cell({ c: 6, r: R + 1 });
    ws[cellAmountRef] = cellAmount;
    var cellBudgetUnit = { v: data[R].budgetUnit, t: 'n' };
    var cellBudgetUnitRef = _xlsx2.default.utils.encode_cell({ c: 7, r: R + 1 });
    ws[cellBudgetUnitRef] = cellBudgetUnit;
    var budgetTotal = Number((data[R].amount * data[R].budgetUnit).toFixed(2));
    var cellBudgetTotal = { v: budgetTotal, t: 'n' };
    var cellBudgetTotalRef = _xlsx2.default.utils.encode_cell({ c: 8, r: R + 1 });
    ws[cellBudgetTotalRef] = cellBudgetTotal;
    var cellMarketUnit = { v: data[R].marketUnit, t: 'n' };
    var cellMarketUnitRef = _xlsx2.default.utils.encode_cell({ c: 9, r: R + 1 });
    ws[cellMarketUnitRef] = cellMarketUnit;
    var marketTotal = Number((data[R].amount * data[R].marketUnit).toFixed(2));
    var cellMarketTotal = { v: marketTotal, t: 'n' };
    var cellMarketTotalRef = _xlsx2.default.utils.encode_cell({ c: 10, r: R + 1 });
    ws[cellMarketTotalRef] = cellMarketTotal;
    switch (category) {
      case '人工':
        manBudgetSummary += budgetTotal;
        manMarketSummary += marketTotal;
        break;
      case '机械':
        machineBudgetSummary += budgetTotal;
        machineMarketSummary += marketTotal;
        break;
      case '材料':
        materialBudgetSummary += budgetTotal;
        materialMarketSummary += marketTotal;
        break;
      case '主材':
        mainBudgetSummary += budgetTotal;
        mainMarketSummary += marketTotal;
        break;
      default:
    }
    var delta = Math.abs(data[R].budgetUnit - data[R].marketUnit).toFixed(2);
    var cellDeltaUnit = { v: delta, t: 'n' };
    var cellDeltaUnitRef = _xlsx2.default.utils.encode_cell({ c: 11, r: R + 1 });
    ws[cellDeltaUnitRef] = cellDeltaUnit;
    var cellDeltaTotal = { v: Number((data[R].amount * delta).toFixed(2)), t: 'n' };
    var cellDeltaTotalRef = _xlsx2.default.utils.encode_cell({ c: 12, r: R + 1 });
    ws[cellDeltaTotalRef] = cellDeltaTotal;
    var cellArea = { v: data[R].area, t: 'n' };
    var cellAreaRef = _xlsx2.default.utils.encode_cell({ c: 13, r: R + 1 });
    ws[cellAreaRef] = cellArea;
    var cellBrand = { v: data[R].brand, t: 's' };
    var cellBrandRef = _xlsx2.default.utils.encode_cell({ c: 14, r: R + 1 });
    ws[cellBrandRef] = cellBrand;
    var cellVendor = { v: data[R].vendor, t: 's' };
    var cellVendorRef = _xlsx2.default.utils.encode_cell({ c: 15, r: R + 1 });
    ws[cellVendorRef] = cellVendor;
    var cellNote = { v: data[R].note, t: 's' };
    var cellNoteRef = _xlsx2.default.utils.encode_cell({ c: 16, r: R + 1 });
    ws[cellNoteRef] = cellNote;
  }

  // And then the conclusion rows.
  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + 1 })] = { v: '人工汇总', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + 1 })] = { v: manBudgetSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + 1 })] = { v: manMarketSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + 1 })] = { v: Math.abs(manBudgetSummary - manMarketSummary), t: 'n' };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + 2 })] = { v: '机械汇总', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + 2 })] = { v: machineBudgetSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + 2 })] = { v: machineMarketSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + 2 })] = { v: Math.abs(machineBudgetSummary - machineMarketSummary), t: 'n' };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + 3 })] = { v: '材料汇总', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + 3 })] = { v: materialBudgetSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + 3 })] = { v: materialMarketSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + 3 })] = { v: Math.abs(materialBudgetSummary - materialMarketSummary), t: 'n' };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + 4 })] = { v: '主材汇总', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + 4 })] = { v: mainBudgetSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + 4 })] = { v: mainMarketSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + 4 })] = { v: Math.abs(mainBudgetSummary - mainMarketSummary), t: 'n' };

  var totalBudgetSummary = manBudgetSummary + machineBudgetSummary + materialBudgetSummary + mainBudgetSummary;
  var totalMarketSummary = manMarketSummary + machineMarketSummary + materialMarketSummary + mainMarketSummary;
  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + 5 })] = { v: '总计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + 5 })] = { v: totalBudgetSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + 5 })] = { v: totalMarketSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + 5 })] = { v: Math.abs(totalBudgetSummary - totalMarketSummary), t: 'n' };

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function sheetFromArrayOfConstruction(data) {
  var length = (0, _keys2.default)(data).length;
  var ws = {};
  var types = {};
  var typesNumber = 0;
  var range = { s: { c: 0, r: 0 }, e: { c: 16, r: 0 } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '总项名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '项目编号', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '项目名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '计量单位', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '工程数量', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '定额单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '定额总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '金额单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: 0 })] = { v: '金额总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 9, r: 0 })] = { v: '主材费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: 0 })] = { v: '主材费总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 11, r: 0 })] = { v: '人工费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: 0 })] = { v: '人工费总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 13, r: 0 })] = { v: '材料费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: 0 })] = { v: '材料费总价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 15, r: 0 })] = { v: '机械费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 16, r: 0 })] = { v: '机械费总价', t: 's' };

  for (var R = 0; R != length; R++) {
    var projectName = data[R].projectName;
    // If the project is new, create a new slot
    if (types[projectName] === undefined) {
      types[projectName] = [0, 0, 0, 0, 0, 0];
      typesNumber += 1;
    }
    var cellProjectName = { v: projectName, t: 's' };
    var cellProjectNameRef = _xlsx2.default.utils.encode_cell({ c: 0, r: R + 1 });
    ws[cellProjectNameRef] = cellProjectName;
    var cellProjectCode = { v: data[R].projectCode, t: 's' };
    var cellProjectCodeRef = _xlsx2.default.utils.encode_cell({ c: 1, r: R + 1 });
    ws[cellProjectCodeRef] = cellProjectCode;
    var cellName = { v: data[R].name, t: 's' };
    var cellNameRef = _xlsx2.default.utils.encode_cell({ c: 2, r: R + 1 });
    ws[cellNameRef] = cellName;
    var cellUnit = { v: data[R].unit, t: 's' };
    var cellUnitRef = _xlsx2.default.utils.encode_cell({ c: 3, r: R + 1 });
    ws[cellUnitRef] = cellUnit;
    var cellAmount = { v: data[R].amount, t: 'n' };
    var cellAmountRef = _xlsx2.default.utils.encode_cell({ c: 4, r: R + 1 });
    ws[cellAmountRef] = cellAmount;
    var cellQuotaUnit = { v: data[R].quotaUnit, t: 'n' };
    var cellQuotaUnitRef = _xlsx2.default.utils.encode_cell({ c: 5, r: R + 1 });
    ws[cellQuotaUnitRef] = cellQuotaUnit;
    var quotaTotal = Number((data[R].quotaUnit * data[R].amount).toFixed(2));
    types[projectName][0] += quotaTotal;
    var cellQuotaTotal = { v: quotaTotal, t: 'n' };
    var cellQuotaTotalRef = _xlsx2.default.utils.encode_cell({ c: 6, r: R + 1 });
    ws[cellQuotaTotalRef] = cellQuotaTotal;
    var cellMoneyUnit = { v: data[R].moneyUnit, t: 'n' };
    var cellMoneyUnitRef = _xlsx2.default.utils.encode_cell({ c: 7, r: R + 1 });
    ws[cellMoneyUnitRef] = cellMoneyUnit;
    var moneyTotal = Number((data[R].moneyUnit * data[R].amount).toFixed(2));
    types[projectName][1] += moneyTotal;
    var cellMoneyTotal = { v: moneyTotal, t: 'n' };
    var cellMoneyTotalRef = _xlsx2.default.utils.encode_cell({ c: 8, r: R + 1 });
    ws[cellMoneyTotalRef] = cellMoneyTotal;
    var cellMainUnit = { v: data[R].mainUnit, t: 'n' };
    var cellMainUnitRef = _xlsx2.default.utils.encode_cell({ c: 9, r: R + 1 });
    ws[cellMainUnitRef] = cellMainUnit;
    var mainTotal = Number((data[R].mainUnit * data[R].amount).toFixed(2));
    types[projectName][2] += mainTotal;
    var cellMainTotal = { v: mainTotal, t: 'n' };
    var cellMainTotalRef = _xlsx2.default.utils.encode_cell({ c: 10, r: R + 1 });
    ws[cellMainTotalRef] = cellMainTotal;
    var cellManUnit = { v: data[R].manUnit, t: 'n' };
    var cellManUnitRef = _xlsx2.default.utils.encode_cell({ c: 11, r: R + 1 });
    ws[cellManUnitRef] = cellManUnit;
    var manTotal = Number((data[R].manUnit * data[R].amount).toFixed(2));
    types[projectName][3] += manTotal;
    var cellManTotal = { v: manTotal, t: 'n' };
    var cellManTotalRef = _xlsx2.default.utils.encode_cell({ c: 12, r: R + 1 });
    ws[cellManTotalRef] = cellManTotal;
    var cellMaterialUnit = { v: data[R].materialUnit, t: 'n' };
    var cellMaterialUnitRef = _xlsx2.default.utils.encode_cell({ c: 13, r: R + 1 });
    ws[cellMaterialUnitRef] = cellMaterialUnit;
    var materialTotal = Number((data[R].materialUnit * data[R].amount).toFixed(2));
    types[projectName][4] += materialTotal;
    var cellMaterialTotal = { v: materialTotal, t: 'n' };
    var cellMaterialTotalRef = _xlsx2.default.utils.encode_cell({ c: 14, r: R + 1 });
    ws[cellMaterialTotalRef] = cellMaterialTotal;
    var cellMachineUnit = { v: data[R].machineUnit, t: 'n' };
    var cellMachineUnitRef = _xlsx2.default.utils.encode_cell({ c: 15, r: R + 1 });
    ws[cellMachineUnitRef] = cellMachineUnit;
    var machineTotal = Number((data[R].machineUnit * data[R].amount).toFixed(2));
    types[projectName][5] += machineTotal;
    var cellMachineTotal = { v: machineTotal, t: 'n' };
    var cellMachineTotalRef = _xlsx2.default.utils.encode_cell({ c: 16, r: R + 1 });
    ws[cellMachineTotalRef] = cellMachineTotal;
  }

  // We need different projects, and a summary
  var totalLength = length + typesNumber + 1;
  var counter = 1;
  var quotaSummary = 0;
  var moneySummary = 0;
  var mainSummary = 0;
  var manSummary = 0;
  var materialSummary = 0;
  var machineSummary = 0;
  range.e.r = totalLength;

  for (var item in types) {
    ws[_xlsx2.default.utils.encode_cell({ c: 0, r: length + counter })] = { v: item, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 6, r: length + counter })] = { v: types[item][0], t: 'n' };
    quotaSummary += types[item][0];
    ws[_xlsx2.default.utils.encode_cell({ c: 8, r: length + counter })] = { v: types[item][1], t: 'n' };
    moneySummary += types[item][1];
    ws[_xlsx2.default.utils.encode_cell({ c: 10, r: length + counter })] = { v: types[item][2], t: 'n' };
    mainSummary += types[item][2];
    ws[_xlsx2.default.utils.encode_cell({ c: 12, r: length + counter })] = { v: types[item][3], t: 'n' };
    manSummary += types[item][3];
    ws[_xlsx2.default.utils.encode_cell({ c: 14, r: length + counter })] = { v: types[item][4], t: 'n' };
    materialSummary += types[item][4];
    ws[_xlsx2.default.utils.encode_cell({ c: 16, r: length + counter })] = { v: types[item][5], t: 'n' };
    machineSummary += types[item][5];
    counter += 1;
  }

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: totalLength })] = { v: '总计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: totalLength })] = { v: quotaSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: totalLength })] = { v: moneySummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: totalLength })] = { v: mainSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: totalLength })] = { v: manSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: totalLength })] = { v: materialSummary, t: 'n' };
  ws[_xlsx2.default.utils.encode_cell({ c: 16, r: totalLength })] = { v: machineSummary, t: 'n' };

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function sheetFromStatisticsMan(data) {
  var length = data.length;
  var ws = {};
  var range = { s: { c: 0, r: 0 }, e: { c: 15, r: length } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '表格名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '人工预算价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '人工市场价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '人工差价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '机械预算价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '机械市场价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '机械差价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '材料预算价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: 0 })] = { v: '材料市场价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 9, r: 0 })] = { v: '材料差价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: 0 })] = { v: '主材预算价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 11, r: 0 })] = { v: '主材市场价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: 0 })] = { v: '主材差价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 13, r: 0 })] = { v: '总计预算价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: 0 })] = { v: '总计市场价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 15, r: 0 })] = { v: '总计差价', t: 's' };

  for (var i = 0; i < length; i++) {
    ws[_xlsx2.default.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].name, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].manBudget, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].manMarket, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].manDelta, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].machineBudget, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].machineMarket, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].machineDelta, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].materialBudget, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].materialMarket, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].materialDelta, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 10, r: i + 1 })] = { v: data[i].mainBudget, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 11, r: i + 1 })] = { v: data[i].mainMarket, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 12, r: i + 1 })] = { v: data[i].mainDelta, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 13, r: i + 1 })] = { v: data[i].totalBudget, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 14, r: i + 1 })] = { v: data[i].totalMarket, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 15, r: i + 1 })] = { v: data[i].totalDelta, t: 'n' };
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function sheetFromStatisticsCon(data) {
  var length = data.length;
  var ws = {};
  var range = { s: { c: 0, r: 0 }, e: { c: 12, r: length } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '表格名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '分项名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '定额', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '金额', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '人工费', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '机械费', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '材料费', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '主材费', t: 's' };

  for (var i = 0; i < length; i++) {
    ws[_xlsx2.default.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].tableName, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].name, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].quota, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].money, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].man, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].machine, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].material, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].main, t: 'n' };
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function sheetFromStatisticsDetailMan(data) {
  var length = data.length;
  var ws = {};
  var range = { s: { c: 0, r: 0 }, e: { c: 16, r: length } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '分类', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '编码', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '地方码', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '规格', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '单位', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '数量', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '预算价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: 0 })] = { v: '预算价合击', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 9, r: 0 })] = { v: '市场价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: 0 })] = { v: '市场价合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 11, r: 0 })] = { v: '差价单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: 0 })] = { v: '差价合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 13, r: 0 })] = { v: '数量/m2', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: 0 })] = { v: '厂家', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 15, r: 0 })] = { v: '品牌', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 16, r: 0 })] = { v: '备注', t: 's' };

  for (var i = 0; i < length; i++) {
    ws[_xlsx2.default.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].category, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].code, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].regionCode, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].name, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].form, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].unit, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].amount, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].budgetUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].budgetTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].marketUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 10, r: i + 1 })] = { v: data[i].marketTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 11, r: i + 1 })] = { v: data[i].deltaUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 12, r: i + 1 })] = { v: data[i].deltaTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 13, r: i + 1 })] = { v: data[i].area, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 14, r: i + 1 })] = { v: data[i].brand, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 15, r: i + 1 })] = { v: data[i].vendor, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 16, r: i + 1 })] = { v: data[i].note, t: 's' };
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function sheetFromStatisticsDetailCon(data) {
  var length = data.length;
  var ws = {};
  var range = { s: { c: 0, r: 0 }, e: { c: 16, r: length } };

  ws[_xlsx2.default.utils.encode_cell({ c: 0, r: 0 })] = { v: '项目分类', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 1, r: 0 })] = { v: '项目代码', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 2, r: 0 })] = { v: '项目名称', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 3, r: 0 })] = { v: '计量单位', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 4, r: 0 })] = { v: '工程数量', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 5, r: 0 })] = { v: '定额单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 6, r: 0 })] = { v: '定额合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 7, r: 0 })] = { v: '金额单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 8, r: 0 })] = { v: '金额合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 9, r: 0 })] = { v: '主材费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 10, r: 0 })] = { v: '主材费合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 11, r: 0 })] = { v: '人工费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 12, r: 0 })] = { v: '人工费合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 13, r: 0 })] = { v: '材料费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 14, r: 0 })] = { v: '材料费合计', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 15, r: 0 })] = { v: '机械费单价', t: 's' };
  ws[_xlsx2.default.utils.encode_cell({ c: 16, r: 0 })] = { v: '机械费合计', t: 's' };

  for (var i = 0; i < length; i++) {
    ws[_xlsx2.default.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].projectName, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].projectCode, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].name, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].unit, t: 's' };
    ws[_xlsx2.default.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].amount, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].quotaUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].quotaTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].moneyUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].moneyTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].mainUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 10, r: i + 1 })] = { v: data[i].mainTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 11, r: i + 1 })] = { v: data[i].manUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 12, r: i + 1 })] = { v: data[i].manTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 13, r: i + 1 })] = { v: data[i].materialUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 14, r: i + 1 })] = { v: data[i].materialTotal, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 15, r: i + 1 })] = { v: data[i].machineUnit, t: 'n' };
    ws[_xlsx2.default.utils.encode_cell({ c: 16, r: i + 1 })] = { v: data[i].machineTotal, t: 'n' };
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  }

  return ws;
}

function exportStatistics(dataMan, dataCon, path) {
  var wb = new Workbook();
  var stat1 = sheetFromStatisticsMan(dataMan);
  wb.SheetNames.push('人材机表汇总');
  wb.Sheets['人材机表汇总'] = stat1;
  var stat2 = sheetFromStatisticsCon(dataCon);
  wb.SheetNames.push('工程量表汇总');
  wb.Sheets['工程量表汇总'] = stat2;
  _xlsx2.default.writeFile(wb, path);
}

function exportDetailStatistics(dataMan, dataCon, path) {
  var wb = new Workbook();
  var stat1 = sheetFromStatisticsDetailMan(dataMan);
  wb.SheetNames.push('人材机表筛选');
  wb.Sheets['人材机表筛选'] = stat1;
  var stat2 = sheetFromStatisticsDetailCon(dataCon);
  wb.SheetNames.push('工程量表筛选');
  wb.Sheets['工程量表筛选'] = stat2;
  _xlsx2.default.writeFile(wb, path);
}

function exportExcelTable(data, name, path) {
  // Firstly we create a workbook object.
  var wb = new Workbook();
  // Then we should push our data to a worksheet.
  switch (name.substr(-3)) {
    case '人材机':
      var man = sheetFromArrayOfManMachine(data);
      wb.SheetNames.push(name);
      wb.Sheets[name] = man;
      _xlsx2.default.writeFile(wb, path);
      break;
    case '工程量':
      var cons = sheetFromArrayOfConstruction(data);
      wb.SheetNames.push(name);
      wb.Sheets[name] = cons;
      _xlsx2.default.writeFile(wb, path);
      break;
    default:
    // Do nothing.
  }
}