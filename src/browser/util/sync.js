const encryptionHelper = require('./encrypt-decrypt.js');
var db = require('./models');
const log = require('electron-log');


const ignoreTime = {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
};

const manMachineSchema = {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  code: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  regionCode: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  name: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper(''),
    allowNull: false
  },
  form: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  unit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  amount: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  budgetUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  marketUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  area: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0')
  },
  brand: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  vendor: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  note: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('')
  }
};

const constructionQuantitySchema = {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  projectCode: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  name: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: encryptionHelper.encryptHelper('')
  },
  unit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper(''),
    allowNull: false
  },
  amount: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  quotaUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  moneyUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  mainUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  manUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  materialUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  },
  machineUnit: {
    type: db.Sequelize.TEXT,
    defaultValue: encryptionHelper.encryptHelper('0'),
    allowNull: false
  }
};

var modelRepo = {};

export function getProjects() {
	const project = db.project;
	// Get all things in the project registry.
  const findAll = project.findAll().then(function (items) {
    items.forEach(function (item) {
      const datum = item.get({ plain: true });
      datum.name = encryptionHelper.decryptHelper(datum.name);
      datum.description = encryptionHelper.decryptHelper(datum.description);
    });
    return items
  });
	return findAll;
}

export function getProjectById(id) {
  const project = db.project;
  const findOne = project.findOne({ where: { id: id } }).then(function (item) {
    const datum = item.get({ plain: true });
    datum.name = encryptionHelper.decryptHelper(datum.name);
    datum.description = encryptionHelper.decryptHelper(datum.description);
    return item
  });
  return findOne;
}

export function getTablesInProject(id) {
	const table = db.table;
	// Get all tables with project `id`.
  const findAll = table.findAll({ where: { project: id } }).then(function (items) {
    items.forEach(function (item) {
      const datum = item.get({ plain: true });
      datum.name = encryptionHelper.decryptHelper(datum.name);
      datum.category = encryptionHelper.decryptHelper(datum.category);
    })
    return items
  });
	return findAll;
}

// Called when user try to create a new project.
export function createProject(name, desc, successHandler, errorHandler) {
	const project = db.project;
	name = encryptionHelper.encryptHelper(name);
  desc = encryptionHelper.encryptHelper(desc);
	project.create({ name: name, description: desc }).then(function (item) {
    const datum = item.get({ plain: true });
    datum.name = encryptionHelper.decryptHelper(datum.name);
    datum.description = encryptionHelper.decryptHelper(datum.description);
    successHandler(datum);
	}).catch(function (error) {
	  log.error('[' + new Date() + '] Error: ' + 'createProject ' + error);
		errorHandler(Error('创建项目失败'));
	})
}

// Called when user try to edit a project info.
export function editProject(id, name, desc, successHandler, errorHandler) {
	const project = db.project;
  name = encryptionHelper.encryptHelper(name);
  desc = encryptionHelper.encryptHelper(desc);
	project.findById(id).then(function (item) {
		if (!item) {
			errorHandler(Error('该项目不存在'));
		} else {
			item.update({ name: name, description: desc }).then(function (item) {
			  name = encryptionHelper.decryptHelper(name);
			  desc = encryptionHelper.decryptHelper(desc);
				successHandler(name, desc);
			}).catch(function (error) {
        log.error('[' + new Date() + '] Error: ' + 'editProject ' + error);
        errorHandler(Error('已存在该名称的项目'));
      })
		}
	}).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'editProject ' + error);
	  errorHandler(Error('寻找项目失败'));
	})
}

// Called when user try to remove a project, also remove all tables belong to this project.
export function removeProject(id, errorHandler) {
	const project = db.project;
	const table = db.table;
	project.destroy({ where: { id: id } }).then(function () {
		// Firstly find all their names, and remove the tables, then the entries.
		table.findAll({ where: { project: id } }).then(function (items) {
			items.forEach(function (item) {
				const datum = item.get({ plain: true });
				const name =  encryptionHelper.encryptHelper(datum.name);
				table.destroy({ where: { name: name } }).then(function () {
					modelRepo[name] = undefined;
					db.query.dropTable(name)
				})
			})
		}).catch(function (error) {
      log.error('[' + new Date() + '] Error: ' + 'removeProject ' + error);
      errorHandler(Error('遍历表格错误'));
    })
	}).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'removeProject ' + error);
		errorHandler(Error('删除项目失败'));
	})
}

async function statManMachineTable(name, result, sign, signNumber) {
  await modelRepo[name].findAll().then(function (datas) {
    datas.forEach(function (item) {
      const data = item.get({plain: true});
      for(var i in result) {
        if(result[i].regionCode === encryptionHelper.decryptHelper(data.regionCode)) {
          sign = 1;
          signNumber = i;
        } else {}
      }
      if(sign === 1) {
        result[signNumber].id = data.id;
        result[signNumber].category = encryptionHelper.decryptHelper(data.category);
        result[signNumber].code = encryptionHelper.decryptHelper(data.code);
        result[signNumber].regionCode = encryptionHelper.decryptHelper(data.regionCode);
        result[signNumber].name = encryptionHelper.decryptHelper(data.name);
        result[signNumber].form = encryptionHelper.decryptHelper(data.form);
        result[signNumber].unit = encryptionHelper.decryptHelper(data.unit);
        result[signNumber].amount += Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].budgetUnit = encryptionHelper.decryptHelper(data.budgetUnit);
        result[signNumber].marketUnit = encryptionHelper.decryptHelper(data.marketUnit);
        result[signNumber].area = encryptionHelper.decryptHelper(data.area);
        result[signNumber].brand = encryptionHelper.decryptHelper(data.brand);
        result[signNumber].vendor = encryptionHelper.decryptHelper(data.vendor);
        result[signNumber].note = encryptionHelper.decryptHelper(data.note);
        result[signNumber].deltaUnit = Math.abs(encryptionHelper.decryptHelper(data.budgetUnit) - encryptionHelper.decryptHelper(data.marketUnit));
        result[signNumber].budgetTotal += Number(encryptionHelper.decryptHelper(data.budgetUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].marketTotal += Number(encryptionHelper.decryptHelper(data.marketUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].deltaTotal += Number(encryptionHelper.decryptHelper(data.marketUnit) - encryptionHelper.decryptHelper(data.budgetUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].budgetTotal = Number(result[signNumber].budgetTotal.toFixed(2));
        result[signNumber].marketTotal = Number(result[signNumber].marketTotal.toFixed(2));
        result[signNumber].deltaTotal = Number(result[signNumber].deltaTotal.toFixed(2));
      }
      if(sign === 0) {
        var resultHelper = {
          id: 0,
          category: 0,
          code: 0,
          regionCode: 0,
          name: 0,
          form: 0,
          unit: 0,
          amount: 0,
          budgetUnit: 0,
          marketUnit: 0,
          area: 0,
          brand: 0,
          vendor: 0,
          note: 0,
          deltaUnit: 0,
          budgetTotal: 0,
          marketTotal: 0,
          deltaTotal: 0
        };
        {
          resultHelper.id = data.id;
          resultHelper.category = encryptionHelper.decryptHelper(data.category);
          resultHelper.code = encryptionHelper.decryptHelper(data.code);
          resultHelper.regionCode = encryptionHelper.decryptHelper(data.regionCode);
          resultHelper.name = encryptionHelper.decryptHelper(data.name);
          resultHelper.form = encryptionHelper.decryptHelper(data.form);
          resultHelper.unit = encryptionHelper.decryptHelper(data.unit);
          resultHelper.amount += Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.budgetUnit = encryptionHelper.decryptHelper(data.budgetUnit);
          resultHelper.marketUnit = encryptionHelper.decryptHelper(data.marketUnit);
          resultHelper.area = encryptionHelper.decryptHelper(data.area);
          resultHelper.brand = encryptionHelper.decryptHelper(data.brand);
          resultHelper.vendor = encryptionHelper.decryptHelper(data.vendor);
          resultHelper.note = encryptionHelper.decryptHelper(data.note);
          resultHelper.deltaUnit += Number(Math.abs(encryptionHelper.decryptHelper(data.budgetUnit) - encryptionHelper.decryptHelper(data.marketUnit)));
          resultHelper.budgetTotal += Number(encryptionHelper.decryptHelper(data.budgetUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.marketTotal += Number(encryptionHelper.decryptHelper(data.marketUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.deltaTotal += Number(encryptionHelper.decryptHelper(data.marketUnit) - encryptionHelper.decryptHelper(data.budgetUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.budgetTotal = Number(resultHelper.budgetTotal.toFixed(2));
          resultHelper.marketTotal = Number(resultHelper.marketTotal.toFixed(2));
          resultHelper.deltaTotal = Number(resultHelper.deltaTotal.toFixed(2));
        }
        result.push(resultHelper);
      }
      sign = 0;
    });
  });
}

async function statConstructionTable(name, result, sign, signNumber) {
  await modelRepo[name].findAll().then(function (datas) {
    datas.forEach(function (item) {
      const data = item.get({plain: true});
      for(var i in result) {
        if(result[i].projectCode === encryptionHelper.decryptHelper(data.projectCode)) {
          sign = 1;
          signNumber = i;
        } else {}
      }
      if(sign === 1) {
        result[signNumber].id = data.id;
        result[signNumber].projectName = encryptionHelper.decryptHelper(data.projectName);
        result[signNumber].projectCode = encryptionHelper.decryptHelper(data.projectCode);
        result[signNumber].name = encryptionHelper.decryptHelper(data.name);
        result[signNumber].unit = encryptionHelper.decryptHelper(data.unit);
        result[signNumber].amount += Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].quotaUnit = encryptionHelper.decryptHelper(data.quotaUnit);
        result[signNumber].moneyUnit = encryptionHelper.decryptHelper(data.moneyUnit);
        result[signNumber].mainUnit = encryptionHelper.decryptHelper(data.mainUnit);
        result[signNumber].manUnit = encryptionHelper.decryptHelper(data.manUnit);
        result[signNumber].materialUnit = encryptionHelper.decryptHelper(data.materialUnit);
        result[signNumber].machineUnit = encryptionHelper.decryptHelper(data.machineUnit);
        result[signNumber].quotaTotal += Number(encryptionHelper.decryptHelper(data.quotaUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].moneyTotal += Number(encryptionHelper.decryptHelper(data.moneyUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].mainTotal += Number(encryptionHelper.decryptHelper(data.mainUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].manTotal += Number(encryptionHelper.decryptHelper(data.manUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].materialTotal += Number(encryptionHelper.decryptHelper(data.materialUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].machineTotal += Number(encryptionHelper.decryptHelper(data.machineUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
        result[signNumber].quotaTotal = Number(result[signNumber].quotaTotal.toFixed(2));
        result[signNumber].moneyTotal = Number(result[signNumber].moneyTotal.toFixed(2));
        result[signNumber].mainTotal = Number(result[signNumber].mainTotal.toFixed(2));
        result[signNumber].materialTotal = Number(result[signNumber].materialTotal.toFixed(2));
        result[signNumber].machineTotal = Number(result[signNumber].machineTotal.toFixed(2));
        result[signNumber].manTotal = Number(result[signNumber].manTotal.toFixed(2));
      }
      if(sign === 0) {
        var resultHelper = {
          id: 0,
          projectName: 0,
          projectCode: 0,
          name: 0,
          unit: 0,
          amount: 0,
          quotaUnit: 0,
          moneyUnit: 0,
          mainUnit: 0,
          manUnit: 0,
          materialUnit: 0,
          machineUnit: 0,
          quotaTotal: 0,
          moneyTotal: 0,
          mainTotal: 0,
          manTotal: 0,
          materialTotal: 0,
          machineTotal: 0
        };
        {
          resultHelper.id = data.id;
          resultHelper.projectName = encryptionHelper.decryptHelper(data.projectName);
          resultHelper.projectCode = encryptionHelper.decryptHelper(data.projectCode);
          resultHelper.name = encryptionHelper.decryptHelper(data.name);
          resultHelper.unit = encryptionHelper.decryptHelper(data.unit);
          resultHelper.amount += Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.quotaUnit = encryptionHelper.decryptHelper(data.quotaUnit);
          resultHelper.moneyUnit = encryptionHelper.decryptHelper(data.moneyUnit);
          resultHelper.mainUnit = encryptionHelper.decryptHelper(data.mainUnit);
          resultHelper.manUnit = encryptionHelper.decryptHelper(data.manUnit);
          resultHelper.materialUnit = encryptionHelper.decryptHelper(data.materialUnit);
          resultHelper.machineUnit = encryptionHelper.decryptHelper(data.machineUnit);
          resultHelper.quotaTotal += Number(encryptionHelper.decryptHelper(data.quotaUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.moneyTotal += Number(encryptionHelper.decryptHelper(data.moneyUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.mainTotal += Number(encryptionHelper.decryptHelper(data.mainUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.manTotal += Number(encryptionHelper.decryptHelper(data.manUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.materialTotal += Number(encryptionHelper.decryptHelper(data.materialUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.machineTotal += Number(encryptionHelper.decryptHelper(data.machineUnit)) * Number(encryptionHelper.decryptHelper(data.amount));
          resultHelper.quotaTotal = Number(resultHelper.quotaTotal.toFixed(2));
          resultHelper.moneyTotal = Number(resultHelper.moneyTotal.toFixed(2));
          resultHelper.mainTotal = Number(resultHelper.mainTotal.toFixed(2));
          resultHelper.materialTotal = Number(resultHelper.materialTotal.toFixed(2));
          resultHelper.machineTotal = Number(resultHelper.machineTotal.toFixed(2));
          resultHelper.manTotal = Number(resultHelper.manTotal.toFixed(2));
        }
        result.push(resultHelper);
      }
      sign = 0;
    });
  });
}

// Called when user try to get the statistics of a project.
export function statProject(id, successHandler, errorHandler) {
	const table = db.table;
	table.findAll({ where: { project: id } }).then(async function (items) {
		// For every table, we firstly fetch its name, then direct to its real table,
		// then sum up all things depends on whether it is man machine or not, so do it separately.
		const pointer = this;
		const manHelper = function (data) {
			pointer.totalManMachineProjects.push(data);
		}
		const conHelper = function (data) {
			pointer.totalConstructionProjects.push(data);
		}
		this.totalConstructionProjects = [];
		this.totalManMachineProjects = [];
    var i = items.length;
    var resultMan = [];
    var resultCons = [];
    var signMan = 0;
    var signCons = 0;
    var signNumberMan = 0;
    var signNumberCons = 0;
    while (i--) {
      const datum = items[i].get({ plain: true });
      const type = datum.type;
      const name = datum.name;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          // We sum up by type, and there are four types in total, so the result will be like
          // { `name`: { man: XXX, machine: XXX, material: XXX, main: XXX } }
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
          }
          await statManMachineTable(name, resultMan, signMan, signNumberMan);
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
          }
          await statConstructionTable(name, resultCons, signCons, signNumberCons);
          break;
        default:
        // Do nothing, there won't be.
      }
    }
    for(var j in resultMan) {
      manHelper(resultMan[j]);
    }
    for(var k in resultCons) {
      conHelper(resultCons[k]);
    }
		successHandler(this.totalManMachineProjects, this.totalConstructionProjects);
	}).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'statProject ' + error);
		errorHandler(Error('统计项目失败'));
	})
}

export function statFilterProject(id, successHandler, errorHandler, filterName) {
  const table = db.table;
  let array = [];
  const arrayFilter = function () {
    var i = filterName.length;
    while(i--) {
      let arrays = {name: encryptionHelper.encryptHelper(filterName[i] + '_' + id)};
      array.push(arrays)
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(async function (items) {
    // For every table, we firstly fetch its name, then direct to its real table,
    // then sum up all things depends on whether it is man machine or not, so do it separately.
    const pointer = this;
    const manHelper = function (data) {
      pointer.totalManMachineProjects.push(data);
    }
    const conHelper = function (data) {
      pointer.totalConstructionProjects.push(data);
    }
    this.totalConstructionProjects = [];
    this.totalManMachineProjects = [];
    var i = items.length;
    var resultMan = [];
    var resultCons = [];
    var signMan = 0;
    var signCons = 0;
    var signNumberMan = 0;
    var signNumberCons = 0;
    while (i--) {
      const datum = items[i].get({ plain: true });
      const type = datum.type;
      const name = datum.name;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          // We sum up by type, and there are four types in total, so the result will be like
          // { `name`: { man: XXX, machine: XXX, material: XXX, main: XXX } }
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
          }
          await statManMachineTable(name, resultMan, signMan, signNumberMan);
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
          }
          await statConstructionTable(name, resultCons, signCons, signNumberCons);
          break;
        default:
        // Do nothing, there won't be.
      }
    }
    for(var j in resultMan) {
      manHelper(resultMan[j]);
    }
    for(var k in resultCons) {
      conHelper(resultCons[k]);
    }
    successHandler(this.totalManMachineProjects, this.totalConstructionProjects);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'statFilterProject ' + error);
    errorHandler(Error('统计项目失败'));
  })
}

// Called when user try to read a table.
export function getTable(name, projectId, successHandler, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + projectId);
  // Firstly get the category information in the global registry, then read data from the table.
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
    	const info = item.get({ plain: true });
      const type = info.type;
      const name = info.name;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
          }
          modelRepo[name].findAll().then(function (data) {
            var useful1 = [];
            data.forEach(function (item) {
            	const datum = item.get({ plain: true });
              useful1.push({
                id: datum.id,
                category: encryptionHelper.decryptHelper(datum.category),
                code: encryptionHelper.decryptHelper(datum.code),
                regionCode: encryptionHelper.decryptHelper(datum.regionCode),
                name: encryptionHelper.decryptHelper(datum.name),
                form: encryptionHelper.decryptHelper(datum.form),
                unit: encryptionHelper.decryptHelper(datum.unit),
                amount: encryptionHelper.decryptHelper(datum.amount),
                budgetUnit: encryptionHelper.decryptHelper(datum.budgetUnit),
                marketUnit: encryptionHelper.decryptHelper(datum.marketUnit),
                area: encryptionHelper.decryptHelper(datum.area),
                brand: encryptionHelper.decryptHelper(datum.brand),
                vendor: encryptionHelper.decryptHelper(datum.vendor),
                note: encryptionHelper.decryptHelper(datum.note)
              });
            });
            successHandler(useful1);
          });
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
          }
          modelRepo[name].findAll().then(function (data) {
            var useful2 = [];
            data.forEach(function (item) {
            	const datum = item.get({ plain: true });
              useful2.push({
                id: datum.id,
                projectName: encryptionHelper.decryptHelper(datum.projectName),
                projectCode: encryptionHelper.decryptHelper(datum.projectCode),
                name: encryptionHelper.decryptHelper(datum.name),
                unit: encryptionHelper.decryptHelper(datum.unit),
                amount: encryptionHelper.decryptHelper(datum.amount),
                quotaUnit: encryptionHelper.decryptHelper(datum.quotaUnit),
                moneyUnit: encryptionHelper.decryptHelper(datum.moneyUnit),
                mainUnit: encryptionHelper.decryptHelper(datum.mainUnit),
                manUnit: encryptionHelper.decryptHelper(datum.manUnit),
                materialUnit: encryptionHelper.decryptHelper(datum.materialUnit),
                machineUnit: encryptionHelper.decryptHelper(datum.machineUnit)
              });
            });
            successHandler(useful2);
          });
          break;
        default:
          errorHandler(Error('表格类型错误'));
      }
    }
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'getTable ' + error);
    errorHandler(Error('表格读取错误'));
  });
}

// Called when user try to import a new table.
export function importTable(data, name, category, type, projectId, successHandler) {
  const table = db.table;
  category = encryptionHelper.encryptHelper(category);
  type = encryptionHelper.encryptHelper(type);
  const realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  // Firstly write the category of the table in the global registry, then create table safely.
  table.create({ name: realName, category: category, type: type, project: projectId }).then(function (item) {
    const id = item.get({ plain: true }).id;
    switch (type) {
      case encryptionHelper.encryptHelper('人材机'):
        db.query.createTable(realName, manMachineSchema, ignoreTime).then(function () {
          const manMachine = db.sequelize.define(realName, manMachineSchema, ignoreTime);
          modelRepo[realName] = manMachine;
          data.forEach(function (item) {
            {
              item.category = encryptionHelper.encryptHelper(item.category.toString());
              item.code = encryptionHelper.encryptHelper(item.code.toString());
              item.regionCode = encryptionHelper.encryptHelper(item.regionCode.toString());
              item.name = encryptionHelper.encryptHelper(item.name.toString());
              item.form = encryptionHelper.encryptHelper(item.form.toString());
              item.unit = encryptionHelper.encryptHelper(item.unit.toString());
              item.amount = encryptionHelper.encryptHelper(item.amount.toString());
              item.budgetUnit = encryptionHelper.encryptHelper(item.budgetUnit.toString());
              item.marketUnit = encryptionHelper.encryptHelper(item.marketUnit.toString());
              item.area = encryptionHelper.encryptHelper(item.area.toString());
              item.brand = encryptionHelper.encryptHelper(item.brand.toString());
              item.vendor = encryptionHelper.encryptHelper(item.vendor.toString());
              item.note = encryptionHelper.encryptHelper(item.note.toString());
            }
            manMachine.create(item);
          });
          category = encryptionHelper.decryptHelper(category);
          type = encryptionHelper.decryptHelper(type);
          successHandler(id, category, type);
        })
        break;
      case encryptionHelper.encryptHelper('工程量'):
        db.query.createTable(realName, constructionQuantitySchema, ignoreTime).then(function () {
          const construction = db.sequelize.define(realName, constructionQuantitySchema, ignoreTime);
          modelRepo[realName] = construction;
          data.forEach(function (item) {
            {
              item.projectName = encryptionHelper.encryptHelper(item.projectName.toString());
              item.projectCode = encryptionHelper.encryptHelper(item.projectCode.toString());
              item.name = encryptionHelper.encryptHelper(item.name.toString());
              item.unit = encryptionHelper.encryptHelper(item.unit.toString());
              item.amount = encryptionHelper.encryptHelper(item.amount.toString());
              item.quotaUnit = encryptionHelper.encryptHelper(item.quotaUnit.toString());
              item.moneyUnit = encryptionHelper.encryptHelper(item.moneyUnit.toString());
              item.mainUnit = encryptionHelper.encryptHelper(item.mainUnit.toString());
              item.manUnit = encryptionHelper.encryptHelper(item.manUnit.toString());
              item.materialUnit = encryptionHelper.encryptHelper(item.materialUnit.toString());
              item.machineUnit = encryptionHelper.encryptHelper(item.machineUnit.toString());
            }
            construction.create(item);
          });
          category = encryptionHelper.decryptHelper(category);
          type = encryptionHelper.decryptHelper(type);
          successHandler(id, category, type);
        })
        break;
      default:
        // Shouldn't be here.
    }
  })
}

// Called when user try to remove a current table.
export function removeTable(name, projectId, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  // Firstly remove the entry in global registry, then safely drop the table.
  table.destroy({ where: { name: realName }}).then(function () {
    // Of course we have to remove the entry in the global repo.
    modelRepo[realName] = undefined;
    db.query.dropTable(realName);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'removeTable ' + error);
    errorHandler(Error('表格不存在'));
  });
}

export function createTable(name, category, type, projectId, successHandler, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + type + '_' + String(projectId));
  category = encryptionHelper.encryptHelper(category);
  type = encryptionHelper.encryptHelper(type);
  name = encryptionHelper.encryptHelper(name);
  if (type !== encryptionHelper.encryptHelper('人材机') && type !== encryptionHelper.encryptHelper('工程量')) {
  	errorHandler(Error('表格类型错误'));
  } else {
  	table.create({ name: realName, category: category, type: type, project: projectId }).then(function (item) {
    	const id = item.get({ plain: true }).id;
    	switch (type) {
      	case encryptionHelper.encryptHelper('人材机'):
        	db.query.createTable(realName, manMachineSchema, ignoreTime).then(function () {
          	modelRepo[realName] = db.sequelize.define(realName, manMachineSchema, ignoreTime)
          	modelRepo[realName].create({}).then(function (item) {
              category = encryptionHelper.decryptHelper(category);
              type = encryptionHelper.decryptHelper(type);
              name = encryptionHelper.decryptHelper(name);
              {
                item.category = encryptionHelper.decryptHelper(item.category);
                item.code = encryptionHelper.decryptHelper(item.code);
                item.regionCode = encryptionHelper.decryptHelper(item.regionCode);
                item.name = encryptionHelper.decryptHelper(item.name);
                item.form = encryptionHelper.decryptHelper(item.form);
                item.unit = encryptionHelper.decryptHelper(item.unit);
                item.amount = encryptionHelper.decryptHelper(item.amount);
                item.budgetUnit = encryptionHelper.decryptHelper(item.budgetUnit);
                item.marketUnit = encryptionHelper.decryptHelper(item.marketUnit);
                item.area = encryptionHelper.decryptHelper(item.area);
                item.brand = encryptionHelper.decryptHelper(item.brand);
                item.vendor = encryptionHelper.decryptHelper(item.vendor);
                item.note = encryptionHelper.decryptHelper(item.note);
              }
            	successHandler(id, item, name, category, type);
          	});
        	})
        	break;
      	case encryptionHelper.encryptHelper('工程量'):
        	db.query.createTable(realName, constructionQuantitySchema, ignoreTime).then(function () {
          	modelRepo[realName] = db.sequelize.define(realName, constructionQuantitySchema, ignoreTime)
          	modelRepo[realName].create({}).then(function (item) {
              category = encryptionHelper.decryptHelper(category);
              type = encryptionHelper.decryptHelper(type);
              name = encryptionHelper.decryptHelper(name);
              {
                item.projectName = encryptionHelper.decryptHelper(item.projectName);
                item.projectCode = encryptionHelper.decryptHelper(item.projectCode);
                item.name = encryptionHelper.decryptHelper(item.name);
                item.unit = encryptionHelper.decryptHelper(item.unit);
                item.amount = encryptionHelper.decryptHelper(item.amount);
                item.quotaUnit = encryptionHelper.decryptHelper(item.quotaUnit);
                item.moneyUnit = encryptionHelper.decryptHelper(item.moneyUnit);
                item.mainUnit = encryptionHelper.decryptHelper(item.mainUnit);
                item.manUnit = encryptionHelper.decryptHelper(item.manUnit);
                item.materialUnit = encryptionHelper.decryptHelper(item.materialUnit);
                item.machineUnit = encryptionHelper.decryptHelper(item.machineUnit);
              }
            	successHandler(id, item, name, category, type);
          	});
        	})
        	break;
      	default:
        	errorHandler(Error('表格类型错误'));
    	}
  	}).catch(function (error) {
      log.error('[' + new Date() + '] Error: ' + 'createTable ' + error);
    	errorHandler(Error('表格创建失败'));
  	});
  }
}

export function editTable(name, id, data, projectId, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + projectId);
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
    	const info = item.get({ plain: true });
      const { name, type } = info;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime)
            modelRepo[name].findById(id).then(function (entry) {
              entry.update(data);
            })
          } else {
            modelRepo[name].findById(id).then(function (entry) {
              for(var i in data) {
                data[i] = encryptionHelper.encryptHelper(data[i].toString())
              }
              entry.update(data);
            })
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime)
            modelRepo[name].findById(id).then(function (entry) {
              entry.update(data);
            })
          } else {
            modelRepo[name].findById(id).then(function (entry) {
              for(var i in data) {
                data[i] = encryptionHelper.encryptHelper(data[i].toString())
              }
              entry.update(data);
            })
          }
          break;
        default:
          errorHandler(Error('表格类型错误'));
      }
    }
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'editTable ' + error);
    errorHandler(Error('表格修改失败'));
  });
}

export function addRowTable(name, projectId, successHandler, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
    	const info = item.get({ plain: true });
      const { name, type } = info;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime)
            modelRepo[name].create({}).then(function (entry) {
              {
                entry.category = encryptionHelper.decryptHelper(entry.category);
                entry.code = encryptionHelper.decryptHelper(entry.code);
                entry.regionCode = encryptionHelper.decryptHelper(entry.regionCode);
                entry.name = encryptionHelper.decryptHelper(entry.name);
                entry.form = encryptionHelper.decryptHelper(entry.form);
                entry.unit = encryptionHelper.decryptHelper(entry.unit);
                entry.amount = encryptionHelper.decryptHelper(entry.amount);
                entry.budgetUnit = encryptionHelper.decryptHelper(entry.budgetUnit);
                entry.marketUnit = encryptionHelper.decryptHelper(entry.marketUnit);
                entry.area = encryptionHelper.decryptHelper(entry.area);
                entry.brand = encryptionHelper.decryptHelper(entry.brand);
                entry.vendor = encryptionHelper.decryptHelper(entry.vendor);
                entry.note = encryptionHelper.decryptHelper(entry.note);
              }
              successHandler([entry.get({ plain: true })]);
            })
          } else {
            modelRepo[name].create({}).then(function (entry) {
              {
                entry.category = encryptionHelper.decryptHelper(entry.category);
                entry.code = encryptionHelper.decryptHelper(entry.code);
                entry.regionCode = encryptionHelper.decryptHelper(entry.regionCode);
                entry.name = encryptionHelper.decryptHelper(entry.name);
                entry.form = encryptionHelper.decryptHelper(entry.form);
                entry.unit = encryptionHelper.decryptHelper(entry.unit);
                entry.amount = encryptionHelper.decryptHelper(entry.amount);
                entry.budgetUnit = encryptionHelper.decryptHelper(entry.budgetUnit);
                entry.marketUnit = encryptionHelper.decryptHelper(entry.marketUnit);
                entry.area = encryptionHelper.decryptHelper(entry.area);
                entry.brand = encryptionHelper.decryptHelper(entry.brand);
                entry.vendor = encryptionHelper.decryptHelper(entry.vendor);
                entry.note = encryptionHelper.decryptHelper(entry.note);
              }
              successHandler([entry.get({ plain: true })]);
            });
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime)
            modelRepo[name].create({}).then(function (entry) {
              {
                entry.projectName = encryptionHelper.decryptHelper(entry.projectName);
                entry.projectCode = encryptionHelper.decryptHelper(entry.projectCode);
                entry.name = encryptionHelper.decryptHelper(entry.name);
                entry.unit = encryptionHelper.decryptHelper(entry.unit);
                entry.amount = encryptionHelper.decryptHelper(entry.amount);
                entry.quotaUnit = encryptionHelper.decryptHelper(entry.quotaUnit);
                entry.moneyUnit = encryptionHelper.decryptHelper(entry.moneyUnit);
                entry.mainUnit = encryptionHelper.decryptHelper(entry.mainUnit);
                entry.manUnit = encryptionHelper.decryptHelper(entry.manUnit);
                entry.materialUnit = encryptionHelper.decryptHelper(entry.materialUnit);
                entry.machineUnit = encryptionHelper.decryptHelper(entry.machineUnit);
              }
              successHandler([entry.get({ plain: true })]);
            })
          } else {
            modelRepo[name].create({}).then(function (entry) {
              {
                entry.projectName = encryptionHelper.decryptHelper(entry.projectName);
                entry.projectCode = encryptionHelper.decryptHelper(entry.projectCode);
                entry.name = encryptionHelper.decryptHelper(entry.name);
                entry.unit = encryptionHelper.decryptHelper(entry.unit);
                entry.amount = encryptionHelper.decryptHelper(entry.amount);
                entry.quotaUnit = encryptionHelper.decryptHelper(entry.quotaUnit);
                entry.moneyUnit = encryptionHelper.decryptHelper(entry.moneyUnit);
                entry.mainUnit = encryptionHelper.decryptHelper(entry.mainUnit);
                entry.manUnit = encryptionHelper.decryptHelper(entry.manUnit);
                entry.materialUnit = encryptionHelper.decryptHelper(entry.materialUnit);
                entry.machineUnit = encryptionHelper.decryptHelper(entry.machineUnit);
              }
              successHandler([entry.get({ plain: true })]);
            });
          }
          break;
        default:
          errorHandler(Error('表格类型错误'));
      }
    }
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'addRowTable ' + error);
    errorHandler(Error('表格修改失败'));
  });
}

export function removeRowTable(name, projectId, ids, errorHandler) {
  const table = db.table;
  const realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
    	const info = item.get({ plain: true });
      const { name, type } = info;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime)
            modelRepo[name].destroy({ where: { id: ids } });
          } else {
            modelRepo[name].destroy({ where: { id: ids } });
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime)
            modelRepo[name].destroy({ where: { id: ids } });
          } else {
            modelRepo[name].destroy({ where: { id: ids } });
          }
          break;
        default:
          errorHandler(Error('表格类型错误'));
      }
    }
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'removeRowTable ' + error);
    errorHandler(Error('表格修改失败'));
  });
}

export function selectValueGetter(id, successHandler1, successHandler2, errorHandler, result) {
  const table = db.table;
  let array = [];
  const arrayFilter = function () {
    var i = result.length;
    while(i--) {
      let arrays = {name: encryptionHelper.encryptHelper(result[i] + '_' + id)};
      array.push(arrays)
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(async function (items) {
    var i = items.length;
    const pointer = this;
    const manHelper = function (data) {
      pointer.nameFilter1.push(data);
    };
    this.nameFilter1 = [];
    const conHelper = function (data) {
      pointer.nameFilter2.push(data);
    };
    this.nameFilter2 = [];
    while(i--) {
      const info = items[i].get({plain: true});
      const {name, type} = info;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
          }
          await modelRepo[name].findAll().then(function (data) {
            data.forEach(function (item) {
              var useful1 = [];
              const datum = item.get({plain: true});
              useful1.push({
                id: datum.id,
                category: encryptionHelper.decryptHelper(datum.category),
                code: encryptionHelper.decryptHelper(datum.code),
                regionCode: encryptionHelper.decryptHelper(datum.regionCode),
                name: encryptionHelper.decryptHelper(datum.name),
                form: encryptionHelper.decryptHelper(datum.form),
                unit: encryptionHelper.decryptHelper(datum.unit),
                amount: encryptionHelper.decryptHelper(datum.amount),
                budgetUnit: encryptionHelper.decryptHelper(datum.budgetUnit),
                marketUnit: encryptionHelper.decryptHelper(datum.marketUnit),
                area: encryptionHelper.decryptHelper(datum.area),
                brand: encryptionHelper.decryptHelper(datum.brand),
                vendor: encryptionHelper.decryptHelper(datum.vendor),
                note: encryptionHelper.decryptHelper(datum.note)
              });
              if(encryptionHelper.decryptHelper(datum.form) === '') {
                manHelper(encryptionHelper.decryptHelper(datum.name));
              } else {
                manHelper(encryptionHelper.decryptHelper(datum.name) + '_' + encryptionHelper.decryptHelper(datum.form));
              }
            });
          });
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
          }
          await modelRepo[name].findAll().then(function (data) {
            data.forEach(function (item) {
              const datum = item.get({plain: true});
              var useful2 = [];
              useful2.push({
                id: datum.id,
                projectName: encryptionHelper.decryptHelper(datum.projectName),
                projectCode: encryptionHelper.decryptHelper(datum.projectCode),
                name: encryptionHelper.decryptHelper(datum.name),
                unit: encryptionHelper.decryptHelper(datum.unit),
                amount: encryptionHelper.decryptHelper(datum.amount),
                quotaUnit: encryptionHelper.decryptHelper(datum.quotaUnit),
                moneyUnit: encryptionHelper.decryptHelper(datum.moneyUnit),
                mainUnit: encryptionHelper.decryptHelper(datum.mainUnit),
                manUnit: encryptionHelper.decryptHelper(datum.manUnit),
                materialUnit: encryptionHelper.decryptHelper(datum.materialUnit),
                machineUnit: encryptionHelper.decryptHelper(datum.machineUnit)
              });
              conHelper(encryptionHelper.decryptHelper(datum.name))
            });
          });
          break;
        default:
        // Do nothing, there won't be.
      }
    }
    successHandler1(this.nameFilter1);
    successHandler2(this.nameFilter2);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'selectValueGetter ' + error);
    errorHandler(Error('统计项目失败'));
  })
}

export function getDetailTable(id, successHandler, errorHandler, result, sub1, sub2) {
  const table = db.table;
  let array = [];
  const arrayFilter = function () {
    var i = result.length;
    while(i--) {
      let arrays = {name: encryptionHelper.encryptHelper(result[i] + '_' + id)};
      array.push(arrays)
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(async function (items) {
    var i = items.length;
    const pointer = this;
    const manHelper = function (data) {
      pointer.totalManMachineDetailProjects.push(data);
    };
    const conHelper = function (data) {
      pointer.totalConstructionDetailProjects.push(data);
    };
    this.totalConstructionDetailProjects = [];
    this.totalManMachineDetailProjects = [];
    var tableResultMan = [];
    var tableResultCons = [];
    var tableManSuccessData = [];
    var tableConsSuccessData = [];
    while(i--) {
      const info = items[i].get({plain: true});
      const {name, type} = info;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
          }
          await tableForming1(name, sub1, tableResultMan);
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[name] === undefined) {
            modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
          }
          await tableForming2(name, sub2, tableResultCons);
          break;
        default:
        // Do nothing, there won't be.
      }
    }
    var tableManArr = [];
    var sameMan = [];
    var signMan = 0;
    for(var j = 0; j < tableResultMan.length; j++) {
      tableManArr[j] = [];
      for(var c in sameMan) {
        if(sameMan[c] === j) {
          signMan = 1;
        }
      }
      if(signMan === 0) {
        tableManArr[j].push(j);
        if(j < tableResultMan.length) {
          for (var i = j + 1; i < tableResultMan.length; i++) {
            if (tableResultMan[j].regionCode === tableResultMan[i].regionCode) {
              tableManArr[j].push(i);
              sameMan.push(j);
              sameMan.push(i);
            }
          }
        } else if (j === tableResultMan.length) {}
      }
      signMan = 0;
    }
    for(var m in tableManArr) {
      if(tableManArr[m].length !== 0) {
        var useful1 = {
          id: 0,
          category: 0,
          code: 0,
          regionCode: 0,
          name: 0,
          form: 0,
          unit: 0,
          amount: 0,
          budgetUnit: 0,
          marketUnit: 0,
          area: 0,
          brand: 0,
          vendor: 0,
          note: 0,
          deltaUnit: 0,
          budgetTotal: 0,
          marketTotal: 0,
          deltaTotal: 0
        };
        for(var i in tableManArr[m]) {
          const number = tableManArr[m][i];
          useful1.id = tableResultMan[number].id;
          useful1.category = tableResultMan[number].category;
          useful1.code = tableResultMan[number].code;
          useful1.regionCode = tableResultMan[number].regionCode;
          useful1.name = tableResultMan[number].name;
          useful1.form = tableResultMan[number].form;
          useful1.unit = tableResultMan[number].unit;
          useful1.amount += Number(tableResultMan[number].amount);
          useful1.budgetUnit = tableResultMan[number].budgetUnit;
          useful1.marketUnit = tableResultMan[number].marketUnit;
          useful1.area = tableResultMan[number].area;
          useful1.brand = tableResultMan[number].brand;
          useful1.vendor = tableResultMan[number].vendor;
          useful1.note = tableResultMan[number].note;
          useful1.deltaUnit = tableResultMan[number].deltaUnit;
          useful1.budgetTotal += Number(tableResultMan[number].budgetTotal);
          useful1.marketTotal += Number(tableResultMan[number].marketTotal);
          useful1.deltaTotal += Number(tableResultMan[number].deltaTotal);
        }
        tableManSuccessData.push(useful1)
      }
    }
    var tableConsArr = [];
    var sameCons = [];
    var signCons = 0;
    for(var j = 0; j < tableResultCons.length; j++) {
      tableConsArr[j] = [];
      for(var c in sameCons) {
        if(sameCons[c] === j) {
          signCons = 1;
        }
      }
      if(signCons === 0) {
        tableConsArr[j].push(j);
        if(j < tableResultCons.length) {
          for (var i = j + 1; i < tableResultCons.length; i++) {
            if (tableResultCons[j].projectCode === tableResultCons[i].projectCode) {
              tableConsArr[j].push(i);
              sameCons.push(j);
              sameCons.push(i);
            }
          }
        } else if(j === tableResultCons.length) {}
      }
      signCons = 0;
    }
    for(var m in tableConsArr) {
      if(tableConsArr[m].length !== 0) {
        var useful2 = {
          id: 0,
          projectName: 0,
          projectCode: 0,
          name: 0,
          unit: 0,
          amount: 0,
          quotaUnit: 0,
          moneyUnit: 0,
          mainUnit: 0,
          manUnit: 0,
          materialUnit: 0,
          machineUnit: 0,
          quotaTotal: 0,
          moneyTotal: 0,
          mainTotal: 0,
          manTotal: 0,
          materialTotal: 0,
          machineTotal: 0
        };
        for(var i in tableConsArr[m]) {
          const number = tableConsArr[m][i];
          useful2.id = tableResultCons[number].id;
          useful2.projectName = tableResultCons[number].projectName;
          useful2.projectCode = tableResultCons[number].projectCode;
          useful2.name = tableResultCons[number].name;
          useful2.unit = tableResultCons[number].unit;
          useful2.amount += Number(tableResultCons[number].amount);
          useful2.quotaUnit = tableResultCons[number].quotaUnit;
          useful2.moneyUnit = tableResultCons[number].moneyUnit;
          useful2.mainUnit = tableResultCons[number].mainUnit;
          useful2.manUnit = tableResultCons[number].manUnit;
          useful2.materialUnit = tableResultCons[number].materialUnit;
          useful2.machineUnit = tableResultCons[number].machineUnit;
          useful2.quotaTotal += Number(tableResultCons[number].quotaUnit) * Number(tableResultCons[number].amount);
          useful2.moneyTotal += Number(tableResultCons[number].moneyUnit) * Number(tableResultCons[number].amount);
          useful2.mainTotal += Number(tableResultCons[number].mainUnit) * Number(tableResultCons[number].amount);
          useful2.manTotal += Number(tableResultCons[number].manUnit) * Number(tableResultCons[number].amount);
          useful2.materialTotal += Number(tableResultCons[number].materialUnit) * Number(tableResultCons[number].amount);
          useful2.machineTotal += Number(tableResultCons[number].machineUnit) * Number(tableResultCons[number].amount);
        }
        tableConsSuccessData.push(useful2)
      }
    }
    for(var x in tableManSuccessData) {
      manHelper(tableManSuccessData[x])
    }
    for(var y in tableConsSuccessData) {
      conHelper(tableConsSuccessData[y])
    }
    successHandler(this.totalManMachineDetailProjects, this.totalConstructionDetailProjects);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'getDetailTable ' + error);
    errorHandler(Error('统计项目失败'));
  })
}

async function tableForming1(name, sub1, tableResult) {
  await modelRepo[name].findAll().then(function (data) {
    data.forEach(function (item) {
      const datum = item.get({plain: true});
      var name1 = '';
      if(encryptionHelper.decryptHelper(datum.form) === '') {
         name1 = encryptionHelper.decryptHelper(datum.name);
      } else {
         name1 = encryptionHelper.decryptHelper(datum.name) + '_' + encryptionHelper.decryptHelper(datum.form);
      }
      var str = ","+sub1.toString()+",";
      if (str.indexOf("," + name1 + ",") >= 0) {
        var useful1 = {
          id: datum.id,
          category: encryptionHelper.decryptHelper(datum.category),
          code: encryptionHelper.decryptHelper(datum.code),
          regionCode: encryptionHelper.decryptHelper(datum.regionCode),
          name: encryptionHelper.decryptHelper(datum.name),
          form: encryptionHelper.decryptHelper(datum.form),
          unit: encryptionHelper.decryptHelper(datum.unit),
          amount: encryptionHelper.decryptHelper(datum.amount),
          budgetUnit: encryptionHelper.decryptHelper(datum.budgetUnit),
          marketUnit: encryptionHelper.decryptHelper(datum.marketUnit),
          area: encryptionHelper.decryptHelper(datum.area),
          brand: encryptionHelper.decryptHelper(datum.brand),
          vendor: encryptionHelper.decryptHelper(datum.vendor),
          note: encryptionHelper.decryptHelper(datum.note),
          deltaUnit: Math.abs(encryptionHelper.decryptHelper(datum.marketUnit) - encryptionHelper.decryptHelper(datum.budgetUnit)),
          budgetTotal: encryptionHelper.decryptHelper(datum.budgetUnit) * encryptionHelper.decryptHelper(datum.amount),
          marketTotal: encryptionHelper.decryptHelper(datum.marketUnit) * encryptionHelper.decryptHelper(datum.amount),
          deltaTotal: (encryptionHelper.decryptHelper(datum.marketUnit) - encryptionHelper.decryptHelper(datum.budgetUnit)) * encryptionHelper.decryptHelper(datum.amount)
        };
        useful1.budgetTotal = Number(useful1.budgetTotal.toFixed(2));
        useful1.marketTotal = Number(useful1.marketTotal.toFixed(2));
        useful1.deltaTotal = Number(useful1.deltaTotal.toFixed(2));
        tableResult.push(useful1)
      }
    });
  })
}

async function tableForming2(name, sub2, tableResult) {
  await modelRepo[name].findAll().then(function (data) {
    data.forEach(function (item) {
      const datum = item.get({plain: true});
      const name2 = encryptionHelper.decryptHelper(datum.name);
      var str = ","+sub2.toString()+",";
      if (str.indexOf("," + name2 + ",") >= 0) {
        var useful2 = {
          id: datum.id,
          projectName: encryptionHelper.decryptHelper(datum.projectName),
          projectCode: encryptionHelper.decryptHelper(datum.projectCode),
          name: encryptionHelper.decryptHelper(datum.name),
          unit: encryptionHelper.decryptHelper(datum.unit),
          amount: encryptionHelper.decryptHelper(datum.amount),
          quotaUnit: encryptionHelper.decryptHelper(datum.quotaUnit),
          moneyUnit: encryptionHelper.decryptHelper(datum.moneyUnit),
          mainUnit: encryptionHelper.decryptHelper(datum.mainUnit),
          manUnit: encryptionHelper.decryptHelper(datum.manUnit),
          materialUnit: encryptionHelper.decryptHelper(datum.materialUnit),
          machineUnit: encryptionHelper.decryptHelper(datum.machineUnit),
          quotaTotal: encryptionHelper.decryptHelper(datum.quotaUnit) * encryptionHelper.decryptHelper(datum.amount),
          moneyTotal: encryptionHelper.decryptHelper(datum.moneyUnit) * encryptionHelper.decryptHelper(datum.amount),
          mainTotal: encryptionHelper.decryptHelper(datum.mainUnit) * encryptionHelper.decryptHelper(datum.amount),
          manTotal: encryptionHelper.decryptHelper(datum.manUnit) * encryptionHelper.decryptHelper(datum.amount),
          materialTotal: encryptionHelper.decryptHelper(datum.materialUnit) * encryptionHelper.decryptHelper(datum.amount),
          machineTotal: encryptionHelper.decryptHelper(datum.machineUnit) * encryptionHelper.decryptHelper(datum.amount)
        };
        useful2.quotaTotal = Number(useful2.quotaTotal.toFixed(2));
        useful2.moneyTotal = Number(useful2.moneyTotal.toFixed(2));
        useful2.mainTotal = Number(useful2.mainTotal.toFixed(2));
        useful2.materialTotal = Number(useful2.materialTotal.toFixed(2));
        useful2.machineTotal = Number(useful2.machineTotal.toFixed(2));
        useful2.manTotal = Number(useful2.manTotal.toFixed(2));
        tableResult.push(useful2)
      }
    });
  });
}