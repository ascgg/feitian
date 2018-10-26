'use strict';

var _electron = require('electron');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encryptionHelper = require('../encrypt-decrypt.js');

var db = {};

var sequelize = new _sequelize2.default('database', null, null, {
  dialect: 'sqlite',
  logging: false,
  storage: _path2.default.join(_electron.app.getPath('userData'), '063A6429-2634-496C-B15E-F1C01AD52A81')
});

sequelize.sync().then(function () {
  var project = sequelize.define(encryptionHelper.encryptHelper('project'), {
    name: {
      type: _sequelize2.default.TEXT,
      unique: true,
      allowNull: false
    },
    description: {
      type: _sequelize2.default.TEXT
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['project'] = project;
  project.sync();

  var record = sequelize.define(encryptionHelper.encryptHelper('record'), {
    personId: {
      type: _sequelize2.default.TEXT,
      unique: true,
      allowNull: false
    },
    account: {
      type: _sequelize2.default.TEXT,
      unique: true
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['record'] = record;
  record.sync().then(function () {
    record.findAndCountAll().then(function (result) {
      if (result.count === 0) {
        record.bulkCreate([{ personId: '480819DF0B86468C', account: null }]);
      }
    });
  });

  var table = sequelize.define(encryptionHelper.encryptHelper('table'), {
    name: {
      type: _sequelize2.default.TEXT, // NAME_PROJECT, like `table_123`. 255 is enough.
      unique: true,
      allowNull: false
    },
    category: {
      type: _sequelize2.default.TEXT,
      allowNull: false
    },
    type: {
      type: _sequelize2.default.TEXT,
      allowNull: false
    },
    project: {
      type: _sequelize2.default.INTEGER,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['table'] = table;
  table.sync();

  var user = sequelize.define(encryptionHelper.encryptHelper('user'), {
    account: {
      type: _sequelize2.default.TEXT,
      unique: true,
      allowNull: false
    },
    password: {
      type: _sequelize2.default.TEXT,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['user'] = user;
  user.sync();
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;
db.query = sequelize.getQueryInterface();

module.exports = db;