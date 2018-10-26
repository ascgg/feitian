'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var statManMachineTable = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name, id, helper) {
    var result, model, man, machine, material, main;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {
              name: encryptionHelper.decryptHelper(name).slice(0, -(1 + String(id).length)),
              manBudget: 0,
              manMarket: 0,
              manDelta: 0,
              machineBudget: 0,
              machineMarket: 0,
              machineDelta: 0,
              materialBudget: 0,
              materialMarket: 0,
              materialDelta: 0,
              mainBudget: 0,
              mainMarket: 0,
              mainDelta: 0,
              totalBudget: 0,
              totalMarket: 0,
              totalDelta: 0
            };
            model = modelRepo[name];
            _context.next = 4;
            return model.findAll({ where: { category: encryptionHelper.encryptHelper('人工') } });

          case 4:
            man = _context.sent;
            _context.next = 7;
            return model.findAll({ where: { category: encryptionHelper.encryptHelper('机械') } });

          case 7:
            machine = _context.sent;
            _context.next = 10;
            return model.findAll({ where: { category: encryptionHelper.encryptHelper('材料') } });

          case 10:
            material = _context.sent;
            _context.next = 13;
            return model.findAll({ where: { category: encryptionHelper.encryptHelper('主材') } });

          case 13:
            main = _context.sent;

            man.forEach(function (item) {
              var datum = item.get({ plain: true });
              var amount = encryptionHelper.decryptHelper(datum.amount);
              var budgetUnit = encryptionHelper.decryptHelper(datum.budgetUnit);
              var marketUnit = encryptionHelper.decryptHelper(datum.marketUnit);
              var budgetTotal = amount * budgetUnit;
              var marketTotal = amount * marketUnit;
              result.manBudget += budgetTotal;
              result.manMarket += marketTotal;
            });
            machine.forEach(function (item) {
              var datum = item.get({ plain: true });
              var amount = encryptionHelper.decryptHelper(datum.amount);
              var budgetUnit = encryptionHelper.decryptHelper(datum.budgetUnit);
              var marketUnit = encryptionHelper.decryptHelper(datum.marketUnit);
              var budgetTotal = amount * budgetUnit;
              var marketTotal = amount * marketUnit;
              result.machineBudget += budgetTotal;
              result.machineMarket += marketTotal;
            });
            material.forEach(function (item) {
              var datum = item.get({ plain: true });
              var amount = encryptionHelper.decryptHelper(datum.amount);
              var budgetUnit = encryptionHelper.decryptHelper(datum.budgetUnit);
              var marketUnit = encryptionHelper.decryptHelper(datum.marketUnit);
              var budgetTotal = amount * budgetUnit;
              var marketTotal = amount * marketUnit;
              result.materialBudget += budgetTotal;
              result.materialMarket += marketTotal;
            });
            main.forEach(function (item) {
              var datum = item.get({ plain: true });
              var amount = encryptionHelper.decryptHelper(datum.amount);
              var budgetUnit = encryptionHelper.decryptHelper(datum.budgetUnit);
              var marketUnit = encryptionHelper.decryptHelper(datum.marketUnit);
              var budgetTotal = amount * budgetUnit;
              var marketTotal = amount * marketUnit;
              result.mainBudget += budgetTotal;
              result.mainMarket += marketTotal;
            });
            // And to fixed 2.
            result.manBudget = Number(result.manBudget.toFixed(2));
            result.manMarket = Number(result.manMarket.toFixed(2));
            result.manDelta = Math.abs(Number((result.manBudget - result.manMarket).toFixed(2)));
            result.machineBudget = Number(result.machineBudget.toFixed(2));
            result.machineMarket = Number(result.machineMarket.toFixed(2));
            result.machineDelta = Math.abs(Number((result.machineBudget - result.machineMarket).toFixed(2)));
            result.materialBudget = Number(result.materialBudget.toFixed(2));
            result.materialMarket = Number(result.materialMarket.toFixed(2));
            result.materialDelta = Math.abs(Number((result.materialBudget - result.materialMarket).toFixed(2)));
            result.mainBudget = Number(result.mainBudget.toFixed(2));
            result.mainMarket = Number(result.mainMarket.toFixed(2));
            result.mainDelta = Math.abs(Number((result.mainBudget - result.mainMarket).toFixed(2)));
            result.totalBudget = Number((result.manBudget + result.machineBudget + result.materialBudget + result.mainBudget).toFixed(2));
            result.totalMarket = Number((result.manMarket + result.machineMarket + result.materialMarket + result.mainMarket).toFixed(2));
            result.totalDelta = Math.abs(Number((result.totalBudget - result.totalMarket).toFixed(2)));
            helper(result);

          case 34:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function statManMachineTable(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var statConstructionTable = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name, id, helper) {
    var result, model, items;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = [];
            model = modelRepo[name];
            _context2.next = 4;
            return model.findAll();

          case 4:
            items = _context2.sent;

            items.forEach(function (item) {
              var datum = item.get({ plain: true });
              var projectName = encryptionHelper.decryptHelper(datum.projectName);
              var amount = encryptionHelper.decryptHelper(datum.amount);
              var quotaUnit = encryptionHelper.decryptHelper(datum.quotaUnit);
              var moneyUnit = encryptionHelper.decryptHelper(datum.moneyUnit);
              var manUnit = encryptionHelper.decryptHelper(datum.manUnit);
              var machineUnit = encryptionHelper.decryptHelper(datum.machineUnit);
              var materialUnit = encryptionHelper.decryptHelper(datum.materialUnit);
              var mainUnit = encryptionHelper.decryptHelper(datum.mainUnit);
              var place = result.findIndex(function (item) {
                return item.name === projectName;
              });
              if (place === -1) {
                // This is a new entry, add it.
                result.push({
                  tableName: encryptionHelper.decryptHelper(name).slice(0, -(1 + String(id).length)),
                  name: projectName,
                  quota: amount * quotaUnit,
                  money: amount * moneyUnit,
                  man: amount * manUnit,
                  machine: amount * machineUnit,
                  material: amount * materialUnit,
                  main: amount * mainUnit
                });
              } else {
                // This is an old entry, increment it.
                result[place].quota += amount * quotaUnit;
                result[place].money += amount * moneyUnit;
                result[place].man += amount * manUnit;
                result[place].machine += amount * machineUnit;
                result[place].material += amount * materialUnit;
                result[place].main += amount * mainUnit;
              }
            });
            result.forEach(function (item) {
              item.quota = Number(item.quota.toFixed(2));
              item.money = Number(item.money.toFixed(2));
              item.man = Number(item.man.toFixed(2));
              item.machine = Number(item.machine.toFixed(2));
              item.material = Number(item.material.toFixed(2));
              item.main = Number(item.main.toFixed(2));
            });
            result.forEach(function (item) {
              helper(item);
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function statConstructionTable(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// Called when user try to get the statistics of a project.


var tableForming1 = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(name, sub1, tableResult) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return modelRepo[name].findAll().then(function (data) {
              data.forEach(function (item) {
                var datum = item.get({ plain: true });
                var name1 = '';
                if (encryptionHelper.decryptHelper(datum.form) === '') {
                  name1 = encryptionHelper.decryptHelper(datum.name);
                } else {
                  name1 = encryptionHelper.decryptHelper(datum.name) + '_' + encryptionHelper.decryptHelper(datum.form);
                }
                var str = "," + sub1.toString() + ",";
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
                    deltaUnit: Math.abs(encryptionHelper.decryptHelper(datum.budgetUnit) - encryptionHelper.decryptHelper(datum.marketUnit)),
                    budgetTotal: encryptionHelper.decryptHelper(datum.budgetUnit) * encryptionHelper.decryptHelper(datum.amount),
                    marketTotal: encryptionHelper.decryptHelper(datum.marketUnit) * encryptionHelper.decryptHelper(datum.amount),
                    deltaTotal: Math.abs(encryptionHelper.decryptHelper(datum.budgetUnit) - encryptionHelper.decryptHelper(datum.marketUnit)) * encryptionHelper.decryptHelper(datum.amount)
                  };
                  useful1.budgetTotal = Number(useful1.budgetTotal.toFixed(2));
                  useful1.marketTotal = Number(useful1.marketTotal.toFixed(2));
                  useful1.deltaTotal = Number(useful1.deltaTotal.toFixed(2));
                  tableResult.push(useful1);
                }
              });
            });

          case 2:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function tableForming1(_x11, _x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

var tableForming2 = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(name, sub2, tableResult) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return modelRepo[name].findAll().then(function (data) {
              data.forEach(function (item) {
                var datum = item.get({ plain: true });
                var name2 = encryptionHelper.decryptHelper(datum.name);
                var str = "," + sub2.toString() + ",";
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
                  tableResult.push(useful2);
                }
              });
            });

          case 2:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function tableForming2(_x14, _x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.getTablesInProject = getTablesInProject;
exports.createProject = createProject;
exports.editProject = editProject;
exports.removeProject = removeProject;
exports.statProject = statProject;
exports.statFilterProject = statFilterProject;
exports.getTable = getTable;
exports.importTable = importTable;
exports.removeTable = removeTable;
exports.createTable = createTable;
exports.editTable = editTable;
exports.addRowTable = addRowTable;
exports.removeRowTable = removeRowTable;
exports.selectValueGetter = selectValueGetter;
exports.getDetailTable = getDetailTable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encryptionHelper = require('./encrypt-decrypt.js');
var db = require('./models');
var log = require('electron-log');

var ignoreTime = {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
};

var manMachineSchema = {
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
    type: db.Sequelize.STRING,
    defaultValue: encryptionHelper.encryptHelper('')
  }
};

var constructionQuantitySchema = {
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

function getProjects() {
  var project = db.project;
  // Get all things in the project registry.
  var findAll = project.findAll().then(function (items) {
    items.forEach(function (item) {
      var datum = item.get({ plain: true });
      datum.name = encryptionHelper.decryptHelper(datum.name);
      datum.description = encryptionHelper.decryptHelper(datum.description);
    });
    return items;
  });
  return findAll;
}

function getProjectById(id) {
  var project = db.project;
  var findOne = project.findOne({ where: { id: id } }).then(function (item) {
    var datum = item.get({ plain: true });
    datum.name = encryptionHelper.decryptHelper(datum.name);
    datum.description = encryptionHelper.decryptHelper(datum.description);
    return item;
  });
  return findOne;
}

function getTablesInProject(id) {
  var table = db.table;
  // Get all tables with project `id`.
  var findAll = table.findAll({ where: { project: id } }).then(function (items) {
    items.forEach(function (item) {
      var datum = item.get({ plain: true });
      datum.name = encryptionHelper.decryptHelper(datum.name);
      datum.category = encryptionHelper.decryptHelper(datum.category);
    });
    return items;
  });
  return findAll;
}

// Called when user try to create a new project.
function createProject(name, desc, successHandler, errorHandler) {
  var project = db.project;
  name = encryptionHelper.encryptHelper(name);
  desc = encryptionHelper.encryptHelper(desc);
  project.create({ name: name, description: desc }).then(function (item) {
    var datum = item.get({ plain: true });
    datum.name = encryptionHelper.decryptHelper(datum.name);
    datum.description = encryptionHelper.decryptHelper(datum.description);
    successHandler(datum);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'createProject ' + error);
    errorHandler(Error('创建项目失败'));
  });
}

// Called when user try to edit a project info.
function editProject(id, name, desc, successHandler, errorHandler) {
  var project = db.project;
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
      });
    }
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'editProject ' + error);
    errorHandler(Error('寻找项目失败'));
  });
}

// Called when user try to remove a project, also remove all tables belong to this project.
function removeProject(id, errorHandler) {
  var project = db.project;
  var table = db.table;
  project.destroy({ where: { id: id } }).then(function () {
    // Firstly find all their names, and remove the tables, then the entries.
    table.findAll({ where: { project: id } }).then(function (items) {
      items.forEach(function (item) {
        var datum = item.get({ plain: true });
        var name = encryptionHelper.encryptHelper(datum.name);
        table.destroy({ where: { name: name } }).then(function () {
          modelRepo[name] = undefined;
          db.query.dropTable(name);
        });
      });
    }).catch(function (error) {
      log.error('[' + new Date() + '] Error: ' + 'removeProject ' + error);
      errorHandler(Error('遍历表格错误'));
    });
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'removeProject ' + error);
    errorHandler(Error('删除项目失败'));
  });
}

function statProject(id, successHandler, errorHandler) {
  var table = db.table;
  table.findAll({ where: { project: id } }).then(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(items) {
      var pointer, manHelper, conHelper, i, datum, type, name;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // For every table, we firstly fetch its name, then direct to its real table,
              // then sum up all things depends on whether it is man machine or not, so do it separately.
              pointer = this;

              manHelper = function manHelper(data) {
                pointer.totalManMachineProjects.push(data);
              };

              conHelper = function conHelper(data) {
                pointer.totalConstructionProjects.push(data);
              };

              this.totalConstructionProjects = [];
              this.totalManMachineProjects = [];
              i = items.length;

            case 6:
              if (!i--) {
                _context3.next = 23;
                break;
              }

              datum = items[i].get({ plain: true });
              type = datum.type;
              name = datum.name;
              _context3.t0 = type;
              _context3.next = _context3.t0 === encryptionHelper.encryptHelper('人材机') ? 13 : _context3.t0 === encryptionHelper.encryptHelper('工程量') ? 17 : 21;
              break;

            case 13:
              // We sum up by type, and there are four types in total, so the result will be like
              // { `name`: { man: XXX, machine: XXX, material: XXX, main: XXX } }
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
              }
              _context3.next = 16;
              return statManMachineTable(name, id, manHelper);

            case 16:
              return _context3.abrupt('break', 21);

            case 17:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
              }
              _context3.next = 20;
              return statConstructionTable(name, id, conHelper);

            case 20:
              return _context3.abrupt('break', 21);

            case 21:
              _context3.next = 6;
              break;

            case 23:
              successHandler(this.totalManMachineProjects, this.totalConstructionProjects);

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x7) {
      return _ref3.apply(this, arguments);
    };
  }()).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'statProject ' + error);
    errorHandler(Error('统计项目失败'));
  });
}

function statFilterProject(id, successHandler, errorHandler, filterName) {
  var table = db.table;
  var array = [];
  var arrayFilter = function arrayFilter() {
    var i = filterName.length;
    while (i--) {
      var arrays = { name: encryptionHelper.encryptHelper(filterName[i] + '_' + id) };
      array.push(arrays);
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(items) {
      var pointer, manHelper, conHelper, i, datum, type, name;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // For every table, we firstly fetch its name, then direct to its real table,
              // then sum up all things depends on whether it is man machine or not, so do it separately.
              pointer = this;

              manHelper = function manHelper(data) {
                pointer.totalManMachineProjects.push(data);
              };

              conHelper = function conHelper(data) {
                pointer.totalConstructionProjects.push(data);
              };

              this.totalConstructionProjects = [];
              this.totalManMachineProjects = [];
              i = items.length;

            case 6:
              if (!i--) {
                _context4.next = 23;
                break;
              }

              datum = items[i].get({ plain: true });
              type = datum.type;
              name = datum.name;
              _context4.t0 = type;
              _context4.next = _context4.t0 === encryptionHelper.encryptHelper('人材机') ? 13 : _context4.t0 === encryptionHelper.encryptHelper('工程量') ? 17 : 21;
              break;

            case 13:
              // We sum up by type, and there are four types in total, so the result will be like
              // { `name`: { man: XXX, machine: XXX, material: XXX, main: XXX } }
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
              }
              _context4.next = 16;
              return statManMachineTable(name, id, manHelper);

            case 16:
              return _context4.abrupt('break', 21);

            case 17:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
              }
              _context4.next = 20;
              return statConstructionTable(name, id, conHelper);

            case 20:
              return _context4.abrupt('break', 21);

            case 21:
              _context4.next = 6;
              break;

            case 23:
              successHandler(this.totalManMachineProjects, this.totalConstructionProjects);

            case 24:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x8) {
      return _ref4.apply(this, arguments);
    };
  }()).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'statFilterProject ' + error);
    errorHandler(Error('统计项目失败'));
  });
}

// Called when user try to read a table.
function getTable(name, projectId, successHandler, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + projectId);
  // Firstly get the category information in the global registry, then read data from the table.
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
      var info = item.get({ plain: true });
      var type = info.type;
      var _name = info.name;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[_name] === undefined) {
            modelRepo[_name] = db.sequelize.define(_name, manMachineSchema, ignoreTime);
          }
          modelRepo[_name].findAll().then(function (data) {
            var useful1 = [];
            data.forEach(function (item) {
              var datum = item.get({ plain: true });
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
          if (modelRepo[_name] === undefined) {
            modelRepo[_name] = db.sequelize.define(_name, constructionQuantitySchema, ignoreTime);
          }
          modelRepo[_name].findAll().then(function (data) {
            var useful2 = [];
            data.forEach(function (item) {
              var datum = item.get({ plain: true });
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
function importTable(data, name, category, type, projectId, successHandler) {
  var table = db.table;
  category = encryptionHelper.encryptHelper(category);
  type = encryptionHelper.encryptHelper(type);
  var realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  // Firstly write the category of the table in the global registry, then create table safely.
  table.create({ name: realName, category: category, type: type, project: projectId }).then(function (item) {
    var id = item.get({ plain: true }).id;
    switch (type) {
      case encryptionHelper.encryptHelper('人材机'):
        db.query.createTable(realName, manMachineSchema, ignoreTime).then(function () {
          var manMachine = db.sequelize.define(realName, manMachineSchema, ignoreTime);
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
        });
        break;
      case encryptionHelper.encryptHelper('工程量'):
        db.query.createTable(realName, constructionQuantitySchema, ignoreTime).then(function () {
          var construction = db.sequelize.define(realName, constructionQuantitySchema, ignoreTime);
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
        });
        break;
      default:
      // Shouldn't be here.
    }
  });
}

// Called when user try to remove a current table.
function removeTable(name, projectId, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  // Firstly remove the entry in global registry, then safely drop the table.
  table.destroy({ where: { name: realName } }).then(function () {
    // Of course we have to remove the entry in the global repo.
    modelRepo[realName] = undefined;
    db.query.dropTable(realName);
  }).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'removeTable ' + error);
    errorHandler(Error('表格不存在'));
  });
}

function createTable(name, category, type, projectId, successHandler, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + type + '_' + String(projectId));
  category = encryptionHelper.encryptHelper(category);
  type = encryptionHelper.encryptHelper(type);
  name = encryptionHelper.encryptHelper(name);
  if (type !== encryptionHelper.encryptHelper('人材机') && type !== encryptionHelper.encryptHelper('工程量')) {
    errorHandler(Error('表格类型错误'));
  } else {
    table.create({ name: realName, category: category, type: type, project: projectId }).then(function (item) {
      var id = item.get({ plain: true }).id;
      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          db.query.createTable(realName, manMachineSchema, ignoreTime).then(function () {
            modelRepo[realName] = db.sequelize.define(realName, manMachineSchema, ignoreTime);
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
          });
          break;
        case encryptionHelper.encryptHelper('工程量'):
          db.query.createTable(realName, constructionQuantitySchema, ignoreTime).then(function () {
            modelRepo[realName] = db.sequelize.define(realName, constructionQuantitySchema, ignoreTime);
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
          });
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

function editTable(name, id, data, projectId, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + projectId);
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
      var info = item.get({ plain: true });
      var _name2 = info.name,
          type = info.type;

      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[_name2] === undefined) {
            modelRepo[_name2] = db.sequelize.define(_name2, manMachineSchema, ignoreTime);
            modelRepo[_name2].findById(id).then(function (entry) {
              entry.update(data);
            });
          } else {
            modelRepo[_name2].findById(id).then(function (entry) {
              for (var i in data) {
                data[i] = encryptionHelper.encryptHelper(data[i].toString());
              }
              entry.update(data);
            });
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[_name2] === undefined) {
            modelRepo[_name2] = db.sequelize.define(_name2, constructionQuantitySchema, ignoreTime);
            modelRepo[_name2].findById(id).then(function (entry) {
              entry.update(data);
            });
          } else {
            modelRepo[_name2].findById(id).then(function (entry) {
              for (var i in data) {
                data[i] = encryptionHelper.encryptHelper(data[i].toString());
              }
              entry.update(data);
            });
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

function addRowTable(name, projectId, successHandler, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
      var info = item.get({ plain: true });
      var _name3 = info.name,
          type = info.type;

      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[_name3] === undefined) {
            modelRepo[_name3] = db.sequelize.define(_name3, manMachineSchema, ignoreTime);
            modelRepo[_name3].create({}).then(function (entry) {
              successHandler([entry.get({ plain: true })]);
            });
          } else {
            modelRepo[_name3].create({}).then(function (entry) {
              successHandler([entry.get({ plain: true })]);
            });
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[_name3] === undefined) {
            modelRepo[_name3] = db.sequelize.define(_name3, constructionQuantitySchema, ignoreTime);
            modelRepo[_name3].create({}).then(function (entry) {
              successHandler([entry.get({ plain: true })]);
            });
          } else {
            modelRepo[_name3].create({}).then(function (entry) {
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

function removeRowTable(name, projectId, ids, errorHandler) {
  var table = db.table;
  var realName = encryptionHelper.encryptHelper(name + '_' + String(projectId));
  table.findOne({ where: { name: realName } }).then(function (item) {
    if (!item) {
      errorHandler(Error('该表格不存在'));
    } else {
      var info = item.get({ plain: true });
      var _name4 = info.name,
          type = info.type;

      switch (type) {
        case encryptionHelper.encryptHelper('人材机'):
          if (modelRepo[_name4] === undefined) {
            modelRepo[_name4] = db.sequelize.define(_name4, manMachineSchema, ignoreTime);
            modelRepo[_name4].destroy({ where: { id: ids } });
          } else {
            modelRepo[_name4].destroy({ where: { id: ids } });
          }
          break;
        case encryptionHelper.encryptHelper('工程量'):
          if (modelRepo[_name4] === undefined) {
            modelRepo[_name4] = db.sequelize.define(_name4, constructionQuantitySchema, ignoreTime);
            modelRepo[_name4].destroy({ where: { id: ids } });
          } else {
            modelRepo[_name4].destroy({ where: { id: ids } });
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

function selectValueGetter(id, successHandler1, successHandler2, errorHandler, result) {
  var table = db.table;
  var array = [];
  var arrayFilter = function arrayFilter() {
    var i = result.length;
    while (i--) {
      var arrays = { name: encryptionHelper.encryptHelper(result[i] + '_' + id) };
      array.push(arrays);
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(items) {
      var i, pointer, manHelper, conHelper, info, name, type;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              i = items.length;
              pointer = this;

              manHelper = function manHelper(data) {
                pointer.nameFilter1.push(data);
              };

              this.nameFilter1 = [];

              conHelper = function conHelper(data) {
                pointer.nameFilter2.push(data);
              };

              this.nameFilter2 = [];

            case 6:
              if (!i--) {
                _context5.next = 22;
                break;
              }

              info = items[i].get({ plain: true });
              name = info.name, type = info.type;
              _context5.t0 = type;
              _context5.next = _context5.t0 === encryptionHelper.encryptHelper('人材机') ? 12 : _context5.t0 === encryptionHelper.encryptHelper('工程量') ? 16 : 20;
              break;

            case 12:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
              }
              _context5.next = 15;
              return modelRepo[name].findAll().then(function (data) {
                data.forEach(function (item) {
                  var useful1 = [];
                  var datum = item.get({ plain: true });
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
                  if (encryptionHelper.decryptHelper(datum.form) === '') {
                    manHelper(encryptionHelper.decryptHelper(datum.name));
                  } else {
                    manHelper(encryptionHelper.decryptHelper(datum.name) + '_' + encryptionHelper.decryptHelper(datum.form));
                  }
                });
              });

            case 15:
              return _context5.abrupt('break', 20);

            case 16:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
              }
              _context5.next = 19;
              return modelRepo[name].findAll().then(function (data) {
                data.forEach(function (item) {
                  var datum = item.get({ plain: true });
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
                  conHelper(encryptionHelper.decryptHelper(datum.name));
                });
              });

            case 19:
              return _context5.abrupt('break', 20);

            case 20:
              _context5.next = 6;
              break;

            case 22:
              successHandler1(this.nameFilter1);
              successHandler2(this.nameFilter2);

            case 24:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x9) {
      return _ref5.apply(this, arguments);
    };
  }()).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'selectValueGetter ' + error);
    errorHandler(Error('统计项目失败'));
  });
}

function getDetailTable(id, successHandler, errorHandler, result, sub1, sub2) {
  var table = db.table;
  var array = [];
  var arrayFilter = function arrayFilter() {
    var i = result.length;
    while (i--) {
      var arrays = { name: encryptionHelper.encryptHelper(result[i] + '_' + id) };
      array.push(arrays);
    }
  };
  arrayFilter();
  table.findAll({ where: { project: id, $or: array } }).then(function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(items) {
      var i, pointer, manHelper, conHelper, tableResultMan, tableResultCons, info, name, type, x, y;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              i = items.length;
              pointer = this;

              manHelper = function manHelper(data) {
                pointer.totalManMachineDetailProjects.push(data);
              };

              conHelper = function conHelper(data) {
                pointer.totalConstructionDetailProjects.push(data);
              };

              this.totalConstructionDetailProjects = [];
              this.totalManMachineDetailProjects = [];
              tableResultMan = [];
              tableResultCons = [];

            case 8:
              if (!i--) {
                _context6.next = 24;
                break;
              }

              info = items[i].get({ plain: true });
              name = info.name, type = info.type;
              _context6.t0 = type;
              _context6.next = _context6.t0 === encryptionHelper.encryptHelper('人材机') ? 14 : _context6.t0 === encryptionHelper.encryptHelper('工程量') ? 18 : 22;
              break;

            case 14:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, manMachineSchema, ignoreTime);
              }
              _context6.next = 17;
              return tableForming1(name, sub1, tableResultMan);

            case 17:
              return _context6.abrupt('break', 22);

            case 18:
              if (modelRepo[name] === undefined) {
                modelRepo[name] = db.sequelize.define(name, constructionQuantitySchema, ignoreTime);
              }
              _context6.next = 21;
              return tableForming2(name, sub2, tableResultCons);

            case 21:
              return _context6.abrupt('break', 22);

            case 22:
              _context6.next = 8;
              break;

            case 24:
              for (x in tableResultMan) {
                manHelper(tableResultMan[x]);
              }
              for (y in tableResultCons) {
                conHelper(tableResultCons[y]);
              }
              successHandler(this.totalManMachineDetailProjects, this.totalConstructionDetailProjects);

            case 27:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x10) {
      return _ref6.apply(this, arguments);
    };
  }()).catch(function (error) {
    log.error('[' + new Date() + '] Error: ' + 'getDetailTable ' + error);
    errorHandler(Error('统计项目失败'));
  });
}