import XLSX from 'xlsx'


export function importExcelTable(path) {
	try {
	  const workbook = XLSX.readFile(path);
	  const files = workbook.SheetNames.length;
  	if (files === 2) {
    	const data1 = importManMachineTable(workbook);
    	const data2 = importConstructionQuantityTable(workbook);
    	if (data1.error) {
      	if (data2.error) {
        	return { error: data1.error + '，' + data2.error };
      	} else {
        	return { error: data1.error, data2: data2.total };
      	}
    	} else {
    		if (data2.error) {
    			return { data1: data1.total, error: data2.error };
    		} else {
	      	return { data1: data1.total, data2: data2.total };
	    	}
    	}
  	} else if (files === 1) {
    	if (files[0].includes('人材机')) {
      	const man = importManMachineTable(workbook);
      	if (man.error) {
        	return { error: man.error };
      	} else {
        	return { man: man.total };
      	}
    	} else if (files[0].includes('工程量')) {
      	const quantity = importConstructionQuantityTable(workbook);
      	if (quantity.error) {
        	return { error: quantity.error };
      	} else {
        	return { quantity: quantity.total };
      	}
    	} else {
    		return { error: '对应表格不存在' }
    	}
  	}
	} catch (error) {
		return { error: '文件格式错误' }
	}
}

// Read data, create new table in database, dump data, and return data to grid.
function importManMachineTable(workbook) {
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const refs = sheet['!ref'].split(':');
  const start = refs[0];
  const end = refs[1];
  const endNumber = end.slice(1);
  if (sheet['B' + endNumber].v === 'f' && sheet['G' + (parseInt(endNumber) - 1).toString()].v.startsWith('未来软件编制')) {
    var category = '';
    var total = [];
    for (var x = 13; x < parseInt(endNumber) - 2; x++) {
    	const xString = x.toString();
      if (sheet['G' + xString] === undefined || sheet['G' + xString].v === ' ') {
        category = sheet['J' + xString].v;
      } else {
        total.push({
          category: category,
          code: sheet['H' + xString] === undefined ? '' : sheet['H' + xString].v,
          regionCode: sheet['I' + xString] === undefined ? '' : sheet['I' + xString].v,
          name: sheet['J' + xString] === undefined ? '' : sheet['J' + xString].v,
          form: sheet['K' + xString] === undefined ? '' : sheet['K' + xString].v,
          unit: sheet['L' + xString] === undefined ? '' : sheet['L' + xString].v,
          amount: sheet['M' + xString] === undefined ? 0 : sheet['M' + xString].v,
          budgetUnit: sheet['N' + xString] === undefined ? 0 : sheet['N' + xString].v,
          marketUnit: sheet['P' + xString] === undefined ? 0 : sheet['P' + xString].v,
          area: sheet['T' + xString] === undefined ? 0 : sheet['T' + xString].v,
          brand: sheet['U' + xString] === undefined ? '' : sheet['U' + xString].v,
          vendor: sheet['V' + xString] === undefined ? '' : sheet['V' + xString].v,
          note: sheet['W' + xString] === undefined ? '' : sheet['W' + xString].v
        });
      }
    }
    return { error: null, total: total }
  } else {
  	return { error: '人材机汇总文件格式错误', total: null }
  }
}

function importConstructionQuantityTable(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[1]];
  const refs = sheet['!ref'].split(':');
  const start = refs[0];
  const end = refs[1];
  const endNumber = end.slice(1);
  if (sheet['B' + endNumber].v === 'f' && sheet['G' + (parseInt(endNumber) - 1).toString()].v.startsWith('未来软件编制')) {
    var projectName = '';
    var total = [];
    for (var x = 13; x < parseInt(endNumber) - 2; x++) {
      const xString = x.toString();
      if (sheet['G' + xString] === undefined) {
        projectName = sheet['I' + xString].v
      } else {
        total.push({
          projectName: projectName,
          projectCode: sheet['H' + xString] === undefined ? '' : sheet['H' + xString].v,
          name: sheet['I' + xString] === undefined ? '' : sheet['I' + xString].v,
          unit: sheet['J' + xString] === undefined ? '' : sheet['J' + xString].v,
          amount: sheet['K' + xString] === undefined ? 0 : sheet['K' + xString].v,
          quotaUnit: sheet['L' + xString] === undefined ? 0 : sheet['L' + xString].v,
          moneyUnit: sheet['N' + xString] === undefined ? 0 : sheet['N' + xString].v,
          mainUnit: sheet['P' + xString] === undefined ? 0 : sheet['P' + xString].v,
          manUnit: sheet['R' + xString] === undefined ? 0 : sheet['R' + xString].v,
          materialUnit: sheet['T' + xString] === undefined ? 0 : sheet['T' + xString].v,
          machineUnit: sheet['V' + xString] === undefined ? 0 : sheet['V' + xString].v
        });
      }
    }
    return { error: null, total: total }
  } else {
  	return { error: '工程量清单文件格式错误', total: null }
  }
}
