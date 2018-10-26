import XLSX from 'xlsx'


function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function sheetFromArrayOfManMachine(data) {
  const length = Object.keys(data).length
  var ws = {}
  var range = {s: { c: 0, r: 0 }, e: { c: 16, r: length + 5 } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '类别', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '编码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '地方码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '规格', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '预算价单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '预算价总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '市场价单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 10, r: 0 })] = { v: '市场价总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 11, r: 0 })] = { v: '差价单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 12, r: 0 })] = { v: '差价总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 13, r: 0 })] = { v: '数量/m2', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 14, r: 0 })] = { v: '品牌', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 15, r: 0 })] = { v: '厂家', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 16, r: 0 })] = { v: '备注', t: 's' }

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
    const category = data[R].category
    const cellCategory = { v: category, t: 's' }
    const cellCategoryRef = XLSX.utils.encode_cell({ c: 0, r: R + 1 })
    ws[cellCategoryRef] = cellCategory
    const cellCode = { v: data[R].code, t: 's' }
    const cellCodeRef = XLSX.utils.encode_cell({ c: 1, r: R + 1 })
    ws[cellCodeRef] = cellCode
    const cellRegionCode = { v: data[R].regionCode, t: 's' }
    const cellRegionCodeRef = XLSX.utils.encode_cell({ c: 2, r: R + 1 })
    ws[cellRegionCodeRef] = cellRegionCode
    const cellName = { v: data[R].name, t: 's' }
    const cellNameRef = XLSX.utils.encode_cell({ c: 3, r: R + 1 })
    ws[cellNameRef] = cellName
    const cellForm = { v: data[R].form, t: 's' }
    const cellFormRef = XLSX.utils.encode_cell({ c: 4, r: R + 1 })
    ws[cellFormRef] = cellForm
    const cellUnit = { v: data[R].unit, t: 's' }
    const cellUnitRef = XLSX.utils.encode_cell({ c: 5, r: R + 1 })
    ws[cellUnitRef] = cellUnit
    const cellAmount = { v: data[R].amount, t: 'n' }
    const cellAmountRef = XLSX.utils.encode_cell({ c: 6, r: R + 1 })
    ws[cellAmountRef] = cellAmount
    const cellBudgetUnit = { v: data[R].budgetUnit, t: 'n' }
    const cellBudgetUnitRef = XLSX.utils.encode_cell({ c: 7, r: R + 1 })
    ws[cellBudgetUnitRef] = cellBudgetUnit
    const budgetTotal = Number((data[R].amount * data[R].budgetUnit).toFixed(2))
    const cellBudgetTotal = { v: budgetTotal, t: 'n' }
    const cellBudgetTotalRef = XLSX.utils.encode_cell({ c: 8, r: R + 1 })
    ws[cellBudgetTotalRef] = cellBudgetTotal
    const cellMarketUnit = { v: data[R].marketUnit, t: 'n' }
    const cellMarketUnitRef = XLSX.utils.encode_cell({ c: 9, r: R + 1 })
    ws[cellMarketUnitRef] = cellMarketUnit
    const marketTotal = Number((data[R].amount * data[R].marketUnit).toFixed(2))
    const cellMarketTotal = { v: marketTotal, t: 'n' }
    const cellMarketTotalRef = XLSX.utils.encode_cell({ c: 10, r: R + 1 })
    ws[cellMarketTotalRef] = cellMarketTotal
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
    const delta = Math.abs(data[R].budgetUnit - data[R].marketUnit).toFixed(2)
    const cellDeltaUnit = { v: delta, t: 'n' }
    const cellDeltaUnitRef = XLSX.utils.encode_cell({ c: 11, r: R + 1 })
    ws[cellDeltaUnitRef] = cellDeltaUnit
    const cellDeltaTotal = { v: Number((data[R].amount * delta).toFixed(2)), t: 'n' }
    const cellDeltaTotalRef = XLSX.utils.encode_cell({ c: 12, r: R + 1 })
    ws[cellDeltaTotalRef] = cellDeltaTotal
    const cellArea = { v: data[R].area, t: 'n' }
    const cellAreaRef = XLSX.utils.encode_cell({ c: 13, r: R + 1 })
    ws[cellAreaRef] = cellArea
    const cellBrand = { v: data[R].brand, t: 's' }
    const cellBrandRef = XLSX.utils.encode_cell({ c: 14, r: R + 1 })
    ws[cellBrandRef] = cellBrand
    const cellVendor = { v: data[R].vendor, t: 's' }
    const cellVendorRef = XLSX.utils.encode_cell({ c: 15, r: R + 1 })
    ws[cellVendorRef] = cellVendor
    const cellNote = { v: data[R].note, t: 's' }
    const cellNoteRef = XLSX.utils.encode_cell({ c: 16, r: R + 1 })
    ws[cellNoteRef] = cellNote
  }

  // And then the conclusion rows.
  ws[XLSX.utils.encode_cell({ c: 0, r: length + 1 })] = { v: '人工汇总', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: length + 1 })] = { v: manBudgetSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: length + 1 })] = { v: manMarketSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: length + 1 })] = { v: Math.abs(manBudgetSummary - manMarketSummary), t: 'n' }

  ws[XLSX.utils.encode_cell({ c: 0, r: length + 2 })] = { v: '机械汇总', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: length + 2 })] = { v: machineBudgetSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: length + 2 })] = { v: machineMarketSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: length + 2 })] = { v: Math.abs(machineBudgetSummary - machineMarketSummary), t: 'n' }

  ws[XLSX.utils.encode_cell({ c: 0, r: length + 3 })] = { v: '材料汇总', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: length + 3 })] = { v: materialBudgetSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: length + 3 })] = { v: materialMarketSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: length + 3 })] = { v: Math.abs(materialBudgetSummary - materialMarketSummary), t: 'n' }

  ws[XLSX.utils.encode_cell({ c: 0, r: length + 4 })] = { v: '主材汇总', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: length + 4 })] = { v: mainBudgetSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: length + 4 })] = { v: mainMarketSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: length + 4 })] = { v: Math.abs(mainBudgetSummary - mainMarketSummary), t: 'n' }

  const totalBudgetSummary = manBudgetSummary + machineBudgetSummary + materialBudgetSummary + mainBudgetSummary
  const totalMarketSummary = manMarketSummary + machineMarketSummary + materialMarketSummary + mainMarketSummary
  ws[XLSX.utils.encode_cell({ c: 0, r: length + 5 })] = { v: '总计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: length + 5 })] = { v: totalBudgetSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: length + 5 })] = { v: totalMarketSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: length + 5 })] = { v: Math.abs(totalBudgetSummary - totalMarketSummary), t: 'n' }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

function sheetFromArrayOfConstruction(data) {
  const length = Object.keys(data).length
  var ws = {}
  var types = {}
  var typesNumber = 0
  var range = {s: { c: 0, r: 0 }, e: { c: 16, r: 0 } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '总项名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '项目编号', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '项目名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '计量单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '工程数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '定额单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '定额总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '金额单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '金额总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '主材费单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 10, r: 0 })] = { v: '主材费总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 11, r: 0 })] = { v: '人工费单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 12, r: 0 })] = { v: '人工费总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 13, r: 0 })] = { v: '材料费单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 14, r: 0 })] = { v: '材料费总价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 15, r: 0 })] = { v: '机械费单价', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 16, r: 0 })] = { v: '机械费总价', t: 's' }

  for (var R = 0; R != length; R++) {
    const projectName = data[R].projectName
    // If the project is new, create a new slot
    if (types[projectName] === undefined) {
      types[projectName] = [0, 0, 0, 0, 0, 0]
      typesNumber += 1
    }
    const cellProjectName = { v: projectName, t: 's' }
    const cellProjectNameRef = XLSX.utils.encode_cell({ c: 0, r: R + 1 })
    ws[cellProjectNameRef] = cellProjectName
    const cellProjectCode = { v: data[R].projectCode, t: 's' }
    const cellProjectCodeRef = XLSX.utils.encode_cell({ c: 1, r: R + 1 })
    ws[cellProjectCodeRef] = cellProjectCode
    const cellName = { v: data[R].name, t: 's' }
    const cellNameRef = XLSX.utils.encode_cell({ c: 2, r: R + 1 })
    ws[cellNameRef] = cellName
    const cellUnit = { v: data[R].unit, t: 's' }
    const cellUnitRef = XLSX.utils.encode_cell({ c: 3, r: R + 1 })
    ws[cellUnitRef] = cellUnit
    const cellAmount = { v: data[R].amount, t: 'n' }
    const cellAmountRef = XLSX.utils.encode_cell({ c: 4, r: R + 1 })
    ws[cellAmountRef] = cellAmount
    const cellQuotaUnit = { v: data[R].quotaUnit, t: 'n' }
    const cellQuotaUnitRef = XLSX.utils.encode_cell({ c: 5, r: R + 1 })
    ws[cellQuotaUnitRef] = cellQuotaUnit
    const quotaTotal = Number((data[R].quotaUnit * data[R].amount).toFixed(2))
    types[projectName][0] += quotaTotal
    const cellQuotaTotal = { v: quotaTotal, t: 'n' }
    const cellQuotaTotalRef = XLSX.utils.encode_cell({ c: 6, r: R + 1 })
    ws[cellQuotaTotalRef] = cellQuotaTotal
    const cellMoneyUnit = { v: data[R].moneyUnit, t: 'n' }
    const cellMoneyUnitRef = XLSX.utils.encode_cell({ c: 7, r: R + 1 })
    ws[cellMoneyUnitRef] = cellMoneyUnit
    const moneyTotal = Number((data[R].moneyUnit * data[R].amount).toFixed(2))
    types[projectName][1] += moneyTotal
    const cellMoneyTotal = { v: moneyTotal, t: 'n' }
    const cellMoneyTotalRef = XLSX.utils.encode_cell({ c: 8, r: R + 1 })
    ws[cellMoneyTotalRef] = cellMoneyTotal
    const cellMainUnit = { v: data[R].mainUnit, t: 'n' }
    const cellMainUnitRef = XLSX.utils.encode_cell({ c: 9, r: R + 1 })
    ws[cellMainUnitRef] = cellMainUnit
    const mainTotal = Number((data[R].mainUnit * data[R].amount).toFixed(2))
    types[projectName][2] += mainTotal
    const cellMainTotal = { v: mainTotal, t: 'n' }
    const cellMainTotalRef = XLSX.utils.encode_cell({ c: 10, r: R + 1 })
    ws[cellMainTotalRef] = cellMainTotal
    const cellManUnit = { v: data[R].manUnit, t: 'n' }
    const cellManUnitRef = XLSX.utils.encode_cell({ c: 11, r: R + 1 })
    ws[cellManUnitRef] = cellManUnit
    const manTotal = Number((data[R].manUnit * data[R].amount).toFixed(2))
    types[projectName][3] += manTotal
    const cellManTotal = { v: manTotal, t: 'n' }
    const cellManTotalRef = XLSX.utils.encode_cell({ c: 12, r: R + 1 })
    ws[cellManTotalRef] = cellManTotal
    const cellMaterialUnit = { v: data[R].materialUnit, t: 'n' }
    const cellMaterialUnitRef = XLSX.utils.encode_cell({ c: 13, r: R + 1 })
    ws[cellMaterialUnitRef] = cellMaterialUnit
    const materialTotal = Number((data[R].materialUnit * data[R].amount).toFixed(2))
    types[projectName][4] += materialTotal
    const cellMaterialTotal = { v: materialTotal, t: 'n' }
    const cellMaterialTotalRef = XLSX.utils.encode_cell({ c: 14, r: R + 1 })
    ws[cellMaterialTotalRef] = cellMaterialTotal
    const cellMachineUnit = { v: data[R].machineUnit, t: 'n' }
    const cellMachineUnitRef = XLSX.utils.encode_cell({ c: 15, r: R + 1 })
    ws[cellMachineUnitRef] = cellMachineUnit
    const machineTotal = Number((data[R].machineUnit * data[R].amount).toFixed(2))
    types[projectName][5] += machineTotal
    const cellMachineTotal = { v: machineTotal, t: 'n' }
    const cellMachineTotalRef = XLSX.utils.encode_cell({ c: 16, r: R + 1 })
    ws[cellMachineTotalRef] = cellMachineTotal
  }

  // We need different projects, and a summary
  const totalLength = length + typesNumber + 1
  var counter = 1
  var quotaSummary = 0
  var moneySummary = 0
  var mainSummary = 0
  var manSummary = 0
  var materialSummary = 0
  var machineSummary = 0
  range.e.r = totalLength

  for (var item in types) {
    ws[XLSX.utils.encode_cell({ c: 0, r: length + counter })] = { v: item, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 6, r: length + counter })] = { v: types[item][0], t: 'n' }
    quotaSummary += types[item][0]
    ws[XLSX.utils.encode_cell({ c: 8, r: length + counter })] = { v: types[item][1], t: 'n' }
    moneySummary += types[item][1]
    ws[XLSX.utils.encode_cell({ c: 10, r: length + counter })] = { v: types[item][2], t: 'n' }
    mainSummary += types[item][2]
    ws[XLSX.utils.encode_cell({ c: 12, r: length + counter })] = { v: types[item][3], t: 'n' }
    manSummary += types[item][3]
    ws[XLSX.utils.encode_cell({ c: 14, r: length + counter })] = { v: types[item][4], t: 'n' }
    materialSummary += types[item][4]
    ws[XLSX.utils.encode_cell({ c: 16, r: length + counter })] = { v: types[item][5], t: 'n' }
    machineSummary += types[item][5]
    counter += 1
  }

  ws[XLSX.utils.encode_cell({ c: 0, r: totalLength })] = { v: '总计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: totalLength })] = { v: quotaSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 8, r: totalLength })] = { v: moneySummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 10, r: totalLength })] = { v: mainSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 12, r: totalLength })] = { v: manSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 14, r: totalLength })] = { v: materialSummary, t: 'n' }
  ws[XLSX.utils.encode_cell({ c: 16, r: totalLength })] = { v: machineSummary, t: 'n' }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

function sheetFromStatisticsMan(data) {
  const length = data.length
  var ws = {}
  var range = {s: { c: 0, r: 0 }, e: { c: 9, r: length } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '分类', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '编码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '地方码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '规格', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '预算价合击', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '市场价合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '差价合计', t: 's' }


  for (var i = 0; i < length; i++) {
    ws[XLSX.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].category, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].code, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].regionCode, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].name, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].form, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].unit, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].amount, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].budgetTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].marketTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].deltaTotal, t: 'n' }
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

function sheetFromStatisticsCon(data) {
  const length = data.length
  var ws = {}
  var range = {s: { c: 0, r: 0 }, e: { c: 10, r: length } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '项目分类', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '项目代码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '项目名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '计量单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '工程数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '定额合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '金额合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '主材费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '人工费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '材料费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 10, r: 0 })] = { v: '机械费合计', t: 's' }


  for (var i = 0; i < length; i++) {
    ws[XLSX.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].projectName, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].projectCode, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].name, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].unit, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].amount, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].quotaTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].moneyTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].mainTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].manTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].materialTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 10, r: i + 1 })] = { v: data[i].machineTotal, t: 'n' }
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

function sheetFromStatisticsDetailMan(data) {
  const length = data.length
  var ws = {}
  var range = {s: { c: 0, r: 0 }, e: { c: 9, r: length } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '分类', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '编码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '地方码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '规格', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '预算价合击', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '市场价合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '差价合计', t: 's' }


  for (var i = 0; i < length; i++) {
    ws[XLSX.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].category, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].code, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].regionCode, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].name, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].form, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].unit, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].amount, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].budgetTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].marketTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].deltaTotal, t: 'n' }
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

function sheetFromStatisticsDetailCon(data) {
  const length = data.length
  var ws = {}
  var range = {s: { c: 0, r: 0 }, e: { c: 10, r: length } }

  ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] = { v: '项目分类', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 1, r: 0 })] = { v: '项目代码', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 2, r: 0 })] = { v: '项目名称', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 3, r: 0 })] = { v: '计量单位', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 4, r: 0 })] = { v: '工程数量', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 5, r: 0 })] = { v: '定额合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 6, r: 0 })] = { v: '金额合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 7, r: 0 })] = { v: '主材费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 8, r: 0 })] = { v: '人工费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 9, r: 0 })] = { v: '材料费合计', t: 's' }
  ws[XLSX.utils.encode_cell({ c: 10, r: 0 })] = { v: '机械费合计', t: 's' }


  for (var i = 0; i < length; i++) {
    ws[XLSX.utils.encode_cell({ c: 0, r: i + 1 })] = { v: data[i].projectName, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 1, r: i + 1 })] = { v: data[i].projectCode, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 2, r: i + 1 })] = { v: data[i].name, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 3, r: i + 1 })] = { v: data[i].unit, t: 's' }
    ws[XLSX.utils.encode_cell({ c: 4, r: i + 1 })] = { v: data[i].amount, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 5, r: i + 1 })] = { v: data[i].quotaTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 6, r: i + 1 })] = { v: data[i].moneyTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 7, r: i + 1 })] = { v: data[i].mainTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 8, r: i + 1 })] = { v: data[i].manTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 9, r: i + 1 })] = { v: data[i].materialTotal, t: 'n' }
    ws[XLSX.utils.encode_cell({ c: 10, r: i + 1 })] = { v: data[i].machineTotal, t: 'n' }
  }

  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }

  return ws
}

export function exportStatistics(dataMan, dataCon, path) {
  var wb = new Workbook();
  const stat1 = sheetFromStatisticsMan(dataMan);
  wb.SheetNames.push('人材机表汇总');
  wb.Sheets['人材机表汇总'] = stat1;
  const stat2 = sheetFromStatisticsCon(dataCon);
  wb.SheetNames.push('工程量表汇总');
  wb.Sheets['工程量表汇总'] = stat2;
  XLSX.writeFile(wb, path);
}

export function exportDetailStatistics(dataMan, dataCon, path) {
  var wb = new Workbook();
  const stat1 = sheetFromStatisticsDetailMan(dataMan);
  wb.SheetNames.push('人材机表筛选');
  wb.Sheets['人材机表筛选'] = stat1;
  const stat2 = sheetFromStatisticsDetailCon(dataCon);
  wb.SheetNames.push('工程量表筛选');
  wb.Sheets['工程量表筛选'] = stat2;
  XLSX.writeFile(wb, path);
}

export function exportExcelTable(data, name, path) {
  // Firstly we create a workbook object.
  var wb = new Workbook()
  // Then we should push our data to a worksheet.
  switch (name.substr(-3)) {
    case '人材机':
      const man = sheetFromArrayOfManMachine(data)
      wb.SheetNames.push(name)
      wb.Sheets[name] = man
      XLSX.writeFile(wb, path)
      break;
    case '工程量':
      const cons = sheetFromArrayOfConstruction(data)
      wb.SheetNames.push(name)
      wb.Sheets[name] = cons
      XLSX.writeFile(wb, path)
      break;
    default:
      // Do nothing.
  }
}
